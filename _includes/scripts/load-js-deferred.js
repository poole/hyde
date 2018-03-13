// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Compress via uglify:
// uglifyjs load-js-deferred.js -c -m > load-js-deferred.min.js
(function (window, document) {
  function stdOnEnd(script, cb) {
    script.onload = function () {
      this.onerror = this.onload = null;
      cb(null, script);
    };

    script.onerror = function () {
      this.onerror = this.onload = null;
      cb(new Error('Failed to load ' + this.src), script);
    };
  }

  function ieOnEnd(script, cb) {
    script.onreadystatechange = function () {
      if (this.readyState != 'complete' && this.readyState != 'loaded') return;
      this.onreadystatechange = null;
      cb(null, script);
    };
  }

  window.loadJS = function(src, cb, defer) {
    var script = document.createElement('script');
    script.src = src;

    if (defer) script.defer = '';

    if (cb) {
      ('onload' in script ? stdOnEnd : ieOnEnd)(script, cb);

      if (!script.onload) {
        stdOnEnd(script, cb);
      }
    }

    var ref = document.scripts[0];
    ref.parentNode.insertBefore(script, ref);
    return script;
  };

  window.loadJSDeferred = function (src, cb) {
    return window.loadJS(src, cb, true);
  };

  window.setRelStylesheet = function (id) {
    var link = document.getElementById(id);
    function setRel() { this.rel = 'stylesheet'; }
    if (link.addEventListener) link.addEventListener('load', setRel, false);
    else link.onload = setRel;
  };
})(window, document);
