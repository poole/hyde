/**
 * @preserve
 * Jribbble @VERSION | @DATE
 * Copyright (c) 2015, Tyler Gaw me@tylergaw.com
 * Released under the ISC-LICENSE
 */
;(function($, window, document, undefined) {
  'use strict';

  // This is our public access point.
  $.jribbble = {};

  var ACCESS_TOKEN = null;
  var API_URL = 'https://api.dribbble.com/v1';

  // The types of shot lists that are available through the API.
  // The default shot list–retrieved by shots()–is any type.
  var SHOT_LIST_TYPES = [
    'animated',
    'attachments',
    'debuts',
    'playoffs',
    'rebounds',
    'teams'
  ];

  // Rather than pepper the code with error messages, we use this object to store
  // them. There are also a number of convenience methods here for creating
  // common error messages for different resources.
  var ERROR_MSGS = {
    token: 'Jribbble: Missing Dribbble access token. Set one with ' +
      '$.jribbble.accessToken = YOUR_ACCESS_TOKEN. If you do not have an ' +
      'access token, you must register a new application at ' +
      'https://dribbble.com/account/applications/new',

    singular: function(str) {
      return str.substr(0, str.length - 1);
    },

    idRequired: function(resource) {
      return 'Jribbble: You have to provide a ' + this.singular(resource) +
        ' ID. ex: $.jribbble.%@("1234").'.replace(/%@/g, resource);
    },

    subResource: function(resource) {
      return 'Jribbble: You have to provide a ' + this.singular(resource) +
        ' ID to get %@. ex: $.jribbble.%@("1234").%@()'.replace(/%@/g, resource);
    },

    // A shot ID is required to get shot sub-resources.
    shotId: function(resource) {
      return 'Jribbble: You have to provide a shot ID to get %@. ex: ' +
        ' $.jribbble.shots("1234").%@()'.replace(/%@/g, resource);
    },

    commentLikes: 'Jribbble: You have to provide a comment ID to get likes. ex: ' +
      ' $.jribbble.shots("1234").comments("456").likes()'
  };

  // A number of resources do not allow for bare calls to them, they require a
  // resource ID. If the ID is not provided, things will not function so we err.
  var checkId = function(id, resource) {
    if (!id || typeof id === 'object') {
      throw new Error(ERROR_MSGS.idRequired(resource));
    } else {
      return id;
    }
  };

  // Many top-level resources–users,buckets, etc–have subresources that all behave
  // in a similar way. We use this function to create new methods on the top-level
  // object's prototype.
  var createSubResources = function(subResources) {
    var obj = {};

    subResources.forEach(function(resource) {
      obj[resource] = subResourceWithOpts.call(this, resource);
    }.bind(this));

    return obj;
  };

  // Provide an object of key: value params. Get back a URL encoded string if
  // params has keys.
  var parseParams = function(params) {
    var p = $.param(params);

    if (p) {
      return '?' + p;
    } else {
      return '';
    }
  };

  // Because we want our API to be as flexible as possible, there are a number
  // of methods where we'll allow different types of arguments to be passed as
  // the first argument and then we'll figure out here what the user meant.
  var negotiateArgs = function(args) {
    // If there's nothing here, just bail, that's OK. Calls like `shots()` are
    // fine on their own.
    if (args.length !== 0) {
      var firstArg = args[0];
      var type = typeof firstArg;
      var params = {};

      // If the first argument is a number or string, we're going to assume that
      // the user wants a resource by id or name.
      if (type === 'number' || type === 'string') {
        var list = SHOT_LIST_TYPES.indexOf(firstArg);

        // Shots can be retrieved by the shot name. The Dribbble API wants this
        // passed as a query paramter, but as a conveinence, you can pass the
        // name of a shot list to shots() and we'll check here if that name
        // is a valid shot list name.
        if (list > -1) {
          params.list = firstArg;
        } else {
          params.resource = firstArg;
        }
      // If we see an object as the first parameter, we assume the user is
      // providing options to be passed as query parameters.
      } else if (type === 'object') {
        params = firstArg;
      }

      return params;
    }
  };

  // All initial Jribbble API methods–shots, buckets, project, etc–share common
  // functionality. We mix this base functionality into each one.
  var jribbbleBase = function() {
    var ext = $.extend({}, $.Deferred());

    var Queue = function() {
      this.methods = [];
      this.response = null;
      this.flushed = false;

      this.add = function(fn) {
        if (this.flushed) {
          fn(this.scope);
        } else {
          this.methods.push(fn);
        }
      };

      this.flush = function(scope) {
        if (this.flushed) {
          return;
        }

        this.scope = scope;
        this.flushed = true;

        while(this.methods[0]) {
          this.methods.shift()(scope);
        }

        return scope;
      };

      return this;
    };

    ext.queue = new Queue();
    ext.url = API_URL;

    ext.get = function() {
      if (!ACCESS_TOKEN) {
        console.error(ERROR_MSGS.token);

        return false;
      }

      $.ajax({
        type: 'GET',
        url: this.url,
        beforeSend: function(jqxhr) {
          jqxhr.setRequestHeader('Authorization', 'Bearer ' + ACCESS_TOKEN);
        },
        success: function(res) {
          this.resolve(res);
        }.bind(this),
        error: function(jqxhr) {
          this.reject(jqxhr);
        }.bind(this)
      });

      return this;
    };

    return ext;
  };

  // Because a number of API resources are set up the same way, we can create
  // new Jribble API methods for them using currying. This extends the method
  // with the JribbbleBase, adds a method to the queue, and sets the needed
  // timeout for flushing the queue.
  // See jribbble.buckets for example usage.
  var resourceWithoutOpts = function(resource) {
    return function(resourceId) {
      $.extend(this, jribbbleBase());

      this.queue.add(function(self) {
        self.url += '/' + resource + '/' + resourceId;
      });

      setTimeout(function() {
        this.queue.flush(this).get();
      }.bind(this));

      return this;
    };
  };

  // Because a number of API resources are set up the same way, we can create
  // new Jribble API methods for them using currying. This function returns a
  // function that allows for creating URLS like:
  // /resource/subresource/?foo=1&bar=2
  var subResourceWithOpts = function(resource) {
    return function(opts) {
      this.queue.add(function(self) {
        self.url += '/' + resource + '/' + parseParams(opts || {});
      });

      return this;
    };
  };

  $.jribbble.shots = function(undefined, opts) {
    var shotArgsNegotiated = negotiateArgs([].slice.call(arguments)) || {};
    var shotsParams = opts || {};

    // Because most shot subresources; likes, projects, buckets, etc. all do
    // pretty much the same thing, we can avoid repeating code by using
    // currying. For each subresource we call this function and pass it the name
    // of the resource, it returns jribbble API method for that resource.
    // Yay programming!
    var shotSubResource = function(resource) {
      return function(undefined, opts) {
        var negotiated = negotiateArgs([].slice.call(arguments)) || {};
        var params = opts || {};

        this.queue.add(function(self) {
          if (!self.shotId) {
            throw new Error(ERROR_MSGS.shotId(resource));
          }

          self.url += '/' + resource + '/';

          if (negotiated.resource) {
            self.url += negotiated.resource;
            delete negotiated.resource;
          }

          self.url += parseParams($.extend(negotiated, params));
        });

        return this;
      };
    };

    var Shots = function() {
      $.extend(this, jribbbleBase());

      this.url += '/shots/';

      this.queue.add(function(self) {
        if (shotArgsNegotiated.resource) {
          self.shotId = shotArgsNegotiated.resource;
          self.url += shotArgsNegotiated.resource;
          delete shotArgsNegotiated.resource;
        }

        self.url += parseParams($.extend(shotArgsNegotiated, shotsParams));
      });

      // Jribbble seems to need an async queue, because we need to run the
      // server request at the end of the chain, but we will never know how
      // long the chain is. This is a super hack way of "waiting" to make sure
      // the queue is stocked before we flush it.
      setTimeout(function() {
        this.queue.flush(this).get();
      }.bind(this));

      return this;
    };

    Shots.prototype.attachments = shotSubResource('attachments');
    Shots.prototype.buckets = shotSubResource('buckets');
    Shots.prototype.likes = shotSubResource('likes');
    Shots.prototype.projects = shotSubResource('projects');
    Shots.prototype.rebounds = shotSubResource('rebounds');

    // Comments is a slightly different subresource because it has it's own
    // likes subresource. Comments shares a number of things with the other
    // shot subresources, but I haven't been able to figure out how to use
    // the shotSubResource currying function here to reduce repitition because
    // of the likes subresource.
    // I think I could get that to work if I created comments as a new Object
    // like comments = new Comments(). Then likes could be added to the
    // prototype of the Comments instance?
    // TODO: Figure that out.
    Shots.prototype.comments = function(undefined, opts) {
      var commentsArgsNegotiated = negotiateArgs([].slice.call(arguments)) || {};
      var commentsParams = opts || {};

      this.queue.add(function(self) {
        if (!self.shotId) {
          throw new Error(ERROR_MSGS.shotId('comments'));
        }

        self.url += '/comments/';

        // If we're looking for a specific comment by its ID.
        if (commentsArgsNegotiated.resource) {
          self.commentId = commentsArgsNegotiated.resource;
          self.url += commentsArgsNegotiated.resource + '/';
          delete commentsArgsNegotiated.resource;
        }

        self.url += parseParams($.extend(commentsArgsNegotiated, commentsParams));
      });

      this.likes = function(opts) {
        var params = opts || {};

        this.queue.add(function(self) {
          if (!self.commentId) {
            throw new Error(ERROR_MSGS.commentLikes);
          }

          self.url += 'likes/' + parseParams(params);
        });

        return this;
      };

      return this;
    };

    return new Shots();
  };

  $.jribbble.teams = function(id) {
    var resource = 'teams';
    var resourceId = checkId(id, resource);
    var Teams = resourceWithoutOpts.call(this, resource);

    Teams.prototype = createSubResources.call(this, [
      'members',
      'shots'
    ]);

    return new Teams(resourceId);
  };

  $.jribbble.users = function(id) {
    var resource = 'users';
    var resourceId = checkId(id, resource);
    var Users = resourceWithoutOpts.call(this, resource);

    Users.prototype = createSubResources.call(this, [
      'buckets',
      'followers',
      'following',
      'likes',
      'projects',
      'shots',
      'teams'
    ]);

    Users.prototype.isFollowing = function(targetUser) {
      this.queue.add(function(self) {
        self.url += '/following/' + targetUser;
      });

      return this;
    };

    return new Users(resourceId);
  };

  $.jribbble.buckets = function(id) {
    var resource = 'buckets';
    var resourceId = checkId(id, resource);
    var Buckets = resourceWithoutOpts.call(this, resource);
    Buckets.prototype = createSubResources.call(this, ['shots']);

    return new Buckets(resourceId);
  };

  $.jribbble.projects = function(id) {
    var resource = 'projects';
    var resourceId = checkId(id, resource);
    var Projects = resourceWithoutOpts.call(this, resource);
    Projects.prototype = createSubResources.call(this, ['shots']);

    return new Projects(resourceId);
  };

  $.jribbble.setToken = function(token) {
    ACCESS_TOKEN = token;
    return this;
  };
})(jQuery, window , document);
