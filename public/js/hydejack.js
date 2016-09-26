/*! loadCSS: load a CSS file asynchronously. [c]2016 @scottjehl, Filament Group, Inc. Licensed MIT */
(function(w){
	"use strict";
	/* exported loadCSS */
	var loadCSS = function( href, before, media ){
		// Arguments explained:
		// `href` [REQUIRED] is the URL for your CSS file.
		// `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
			// By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
		// `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
		var doc = w.document;
		var ss = doc.createElement( "link" );
		var ref;
		if( before ){
			ref = before;
		}
		else {
			var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
			ref = refs[ refs.length - 1];
		}

		var sheets = doc.styleSheets;
		ss.rel = "stylesheet";
		ss.href = href;
		// temporarily set media to something inapplicable to ensure it'll fetch without blocking render
		ss.media = "only x";

		// wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
		function ready( cb ){
			if( doc.body ){
				return cb();
			}
			setTimeout(function(){
				ready( cb );
			});
		}
		// Inject link
			// Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
			// Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
		ready( function(){
			ref.parentNode.insertBefore( ss, ( before ? ref : ref.nextSibling ) );
		});
		// A method (exposed on return object for external use) that mimics onload by polling document.styleSheets until it includes the new sheet.
		var onloadcssdefined = function( cb ){
			var resolvedHref = ss.href;
			var i = sheets.length;
			while( i-- ){
				if( sheets[ i ].href === resolvedHref ){
					return cb();
				}
			}
			setTimeout(function() {
				onloadcssdefined( cb );
			});
		};

		function loadCB(){
			if( ss.addEventListener ){
				ss.removeEventListener( "load", loadCB );
			}
			ss.media = media || "all";
		}

		// once loaded, set link's media back to `all` so that the stylesheet applies once it loads
		if( ss.addEventListener ){
			ss.addEventListener( "load", loadCB);
		}
		ss.onloadcssdefined = onloadcssdefined;
		onloadcssdefined( loadCB );
		return ss;
	};
	// commonjs
	if( typeof exports !== "undefined" ){
		exports.loadCSS = loadCSS;
	}
	else {
		w.loadCSS = loadCSS;
	}
}( typeof global !== "undefined" ? global : this ));

/*! CSS rel=preload polyfill. Depends on loadCSS function. [c]2016 @scottjehl, Filament Group, Inc. Licensed MIT  */
(function( w ){
  // rel=preload support test
  if( !w.loadCSS ){
    return;
  }
  var rp = loadCSS.relpreload = {};
  rp.support = function(){
    try {
      return w.document.createElement( "link" ).relList.supports( "preload" );
    } catch (e) {
      return false;
    }
  };

  // loop preload links and fetch using loadCSS
  rp.poly = function(){
    var links = w.document.getElementsByTagName( "link" );
    for( var i = 0; i < links.length; i++ ){
      var link = links[ i ];
      if( link.rel === "preload" && link.getAttribute( "as" ) === "style" ){
        w.loadCSS( link.href, link );
        link.rel = null;
      }
    }
  };

  // if link[rel=preload] is not supported, we must fetch the CSS manually using loadCSS
  if( !rp.support() ){
    rp.poly();
    var run = w.setInterval( rp.poly, 300 );
    if( w.addEventListener ){
      w.addEventListener( "load", function(){
        w.clearInterval( run );
      } );
    }
    if( w.attachEvent ){
      w.attachEvent( "onload", function(){
        w.clearInterval( run );
      } )
    }
  }
}( this ));

(function(document, window) {
  function polyfillRequestAnimationFrame() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame =
        window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
  }

  function getBrowserCapabilities() {
    var styles = window.getComputedStyle(document.documentElement, '');
    var pre = (Array.prototype.slice
        .call(styles)
        .join('')
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1];
    return {
      prefix: '-' + pre + '-',
      transform: pre[0].toUpperCase() + pre.substr(1) + 'Transform'
    };
  }

  //this function will work cross-browser for loading scripts asynchronously
  function loadJS(src, callback) {
    var r = false,
        s = document.createElement('script'),
        t = document.getElementsByTagName('script')[0];
    s.type = 'text/javascript';
    s.src = src;
    s.onload = s.onreadystatechange = function() {
      if (!r && (!this.readyState || this.readyState == 'complete')) {
        r = true;
        callback();
      }
    };
    t.parentNode.insertBefore(s, t);
  }

  /**
   * Copyright (c) 2016 Florian Klampfer
   * http://qwtel.com/hydejack/
   * Released under MIT license
   */
  function createSidebar(sidebar, backdrop, menu) {
    polyfillRequestAnimationFrame();

    var browerCapabilities = getBrowserCapabilities();
    // var transformPrefix = browerCapabilities.prefix;
    var transformProperty = browerCapabilities.transform;

    var IDLE = 'IDLE';
    var START_TOUCHING = 'START_TOUCHING';
    var TOUCHING = 'TOUCHING';
    var START_ANIMATING = 'START_ANIMATING';
    var ANIMATING = 'ANIMATING';

    var DURATION = 200;
    var MAX_OPACITY = 0.67;
    var VELOCITY_THRESHOLD = 0.33;
    var VELOCITY_LINEAR_COMBINATION = 0.6;

    var startX = 0;
    var startY = 0;
    var pageX = 0;
    var pageY = 0;
    var lastPageX = 0;
    var lastPageY = 0;
    var isScrolling = undefined;
    var startedMoving = false;
    var state = IDLE;
    var menuOpen = 0;
    var velocity = 0;
    var startTranslateX = 0;
    var translateX = 0;
    var animationFrameRequested = false;
    var touching = false;

    var animationStartTime;
    var animationStartX;
    var animationEndX;
    var animationChangeInValue;
    var lastTime;
    var timeDiff;

    var sliderWidth;

    function requestAnimationLoop() {
      if (!animationFrameRequested) {
        animationFrameRequested = true;
        requestAnimationFrame(animationLoop);
      }
    }

    function distanceToLastTouch(p) {
      return Math.sqrt(
        Math.pow(pageX - p.pageX, 2) +
        Math.pow(pageY - p.pageY, 2)
      );
    }

    function getNearestTouch(touches) {
      return Array.prototype.reduce.call(touches, function (acc, touch) {
        var dist = distanceToLastTouch(touch);
        return (dist < acc.dist) ? {
          dist: dist,
          touch: touch
        } : acc;
      }, {
        dist: Number.POSITIVE_INFINITY,
        touch: null,
      }).touch;
    }

    function onTouchMove(e) {
      if (touching) {
        var touch = getNearestTouch(e.touches);
        pageX = touch.pageX;
        pageY = touch.pageY;

        if (typeof isScrolling === 'undefined' && startedMoving) {
          isScrolling = Math.abs(startY - pageY) > Math.abs(startX - pageX);
          if (!isScrolling) {
            state = START_TOUCHING;
            requestAnimationLoop();
          }
        }

        if (isScrolling && !menuOpen) return;

        e.preventDefault();

        startedMoving = true;
      }
    }

    function onTouchEnd(e) {
      if (touching) {
        if (isScrolling || e.touches.length > 0) {
          return;
        }

        if (startedMoving) {
          menuOpen = velocity > VELOCITY_THRESHOLD ? 1 :
            velocity < -VELOCITY_THRESHOLD ? 0 :
              translateX >= sliderWidth / 2 ? 1 :
              0;
        }

        touching = false;
        state = START_ANIMATING;
        startedMoving = false;
      }
    }

    function onTouchStart(e) {
      // function isCodeBlock(path) {
      //   for (var i = 0; i < path.length; i++) {
      //     var node = path[i];
      //     var classList = node.classList;
      //
      //     if (classList &&
      //         (classList.contains('highlight') || classList.contains('katex-display')) &&
      //         node.scrollLeft > 0) {
      //       return true;
      //     }
      //   }
      //
      //   return false;
      // }

      if (e.touches.length === 1) {
        isScrolling = undefined;

        var touch = e.touches[0] ;
        startX = pageX = lastPageX = touch.pageX;
        startY = pageY = lastPageY = touch.pageY;

        if (menuOpen || (!menuOpen && pageX < window.innerWidth / 3/* && !isCodeBlock(e.path)*/)) {
          touching = true;
        }
      }
    }

    function onMenuClick(e) {
      e.preventDefault();
      animateTo(1);
    }

    function onBackdropClick(e) {
      e.preventDefault();
      animateTo(0);
    }

    function animateTo(_menuOpen) {
      state = START_ANIMATING;
      menuOpen = _menuOpen;
      requestAnimationLoop();
    }

    /**
      * @param t current time
      * @param b start value
      * @param c change in value
      * @param d duration
      * @returns {number}
      */
    function linearTween(t, b, c, d) {
      return c * t / d + b;
    }

    /**
      * Since part of the slider is always visible,
      * the width that is "movable" is less than the complete slider witdh.
      */
    function getMovableSliderWidth() {
      return -sidebar.offsetLeft;
    }

    function animationLoop(time) {
      switch (state) {
        case START_TOUCHING:
          sliderWidth = getMovableSliderWidth();
          state = TOUCHING;
          // no break;

        case TOUCHING:
          timeDiff = time - lastTime;

          if (timeDiff > 0) {
            velocity = VELOCITY_LINEAR_COMBINATION  * (pageX - lastPageX) / timeDiff +
                  (1 - VELOCITY_LINEAR_COMBINATION) *  velocity;
          }

          var deltaX = pageX - startX;
          translateX = startTranslateX + deltaX;
          translateX = Math.max(0, Math.min(sliderWidth, translateX));

          updateDOM(translateX, sliderWidth);

          lastTime = time;
          lastPageX = pageX;
          lastPageY = pageY;

          requestAnimationFrame(animationLoop);
          break;

        case START_ANIMATING:
          sliderWidth = getMovableSliderWidth();

          var deltaX = pageX - startX;
          translateX = startTranslateX + deltaX;
          translateX = Math.max(0, Math.min(sliderWidth, translateX));

          animationStartX = translateX;
          animationEndX = menuOpen * sliderWidth;
          animationChangeInValue = animationEndX - animationStartX;
          animationStartTime = time;

          state = ANIMATING;
          // no break;

        case ANIMATING:
          var t = time - animationStartTime;
          if (t < DURATION) {
            startTranslateX = linearTween(t, animationStartX, animationChangeInValue, DURATION);
            requestAnimationFrame(animationLoop);
          } else {
            // end animation
            startTranslateX = animationEndX;
            animationFrameRequested = false;
            velocity = 0;

            if (menuOpen === 1) {
              document.body.classList.add('drawer-open');
            } else {
              document.body.classList.remove('drawer-open');
            }
          }

          updateDOM(startTranslateX, sliderWidth);
          break;
      }
    };

    function updateDOM(translateX, sliderWidth) {
      sidebar.style[transformProperty] = 'translate3d(' + translateX + 'px,0,0)';
      backdrop.style['opacity'] = MAX_OPACITY * (translateX / sliderWidth);
    }

    function enableSlider() {
      document.body.classList.add('drawer');
      document.addEventListener('touchstart', onTouchStart);
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', onTouchEnd);
      menu.addEventListener('click', onMenuClick);
      backdrop.addEventListener('click', onBackdropClick);
      animateTo(menuOpen);
    }

    function disableSlider() {
      document.body.classList.remove('drawer')
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      menu.removeEventListener('click', onMenuClick);
      backdrop.removeEventListener('click', onBackdropClick);
    }

    function onResize() {
      if (window.matchMedia("(min-width: 48em)").matches) {
        disableSlider();
      } else {
        enableSlider();
      }
    }

    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    onResize();

    // Allow vertical scrolling on code snippets.
    // TODO: Find a generic solution
    // Array.prototype.forEach.call(document.querySelectorAll('pre'), function(pre) {
    //   pre.addEventListener('touchstart', function(e) {
    //     e.stopPropagation();
    //   });
    // });
  }

  if ('matchMedia' in window &&
      'getComputedStyle' in window) {

    var sidebar = document.getElementById('_sidebar');
    var backdrop = document.getElementById('_backdrop');
    var menu = document.getElementById('_menu');

    // TODO: Don't run in incapable browsers
    createSidebar(sidebar, backdrop, menu);
  }

  // KaTeX support
  var mathBlocks = document.querySelectorAll('script[type^="math/tex"]');

  // only load if math blocks are present
  if (mathBlocks.length) {
    // enable math blocks using KaTeX
    loadCSS("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css");
    loadJS("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.js", function () {
      requestAnimationFrame(function () {
        // hide the preview
        document.body.classList.add('katex-loaded');

        // kramdown generates script tags with type "math/tex"
        Array.prototype.forEach.call(mathBlocks, function(el) {
          var tex = el.textContent
            .replace('% <![CDATA[', '')
            .replace('%]]>', '');

          // replace the script tag with KaTeX
          el.outerHTML = katex.renderToString(tex, {
            displayMode: el.type === 'math/tex; mode=display'
          });
        });
      });
    });
  }
}(document, window));
