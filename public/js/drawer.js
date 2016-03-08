(function() {
  /*!
   * tap.js
   * Copyright (c) 2015 Alex Gibson
   * https://github.com/alexgibson/tap.js/
   * Released under MIT license
   */
  function Tap(el) {
      this.el = typeof el === 'object' ? el : document.getElementById(el);
      this.moved = false; //flags if the finger has moved
      this.startX = 0; //starting x coordinate
      this.startY = 0; //starting y coordinate
      this.hasTouchEventOccured = false; //flag touch event
      this.el.addEventListener('touchstart', this, false);
      this.el.addEventListener('mousedown', this, false);
  }

  // return true if left click is in the event, handle many browsers
  Tap.prototype.leftButton = function(event) {
      // modern & preferred:  MSIE>=9, Firefox(all)
      if ('buttons' in event) {
         // https://developer.mozilla.org/docs/Web/API/MouseEvent/buttons
         return event.buttons === 1;
      } else {
         return 'which' in event ?
             // 'which' is well defined (and doesn't exist on MSIE<=8)
             // https://developer.mozilla.org/docs/Web/API/MouseEvent/which
             event.which === 1 :
             // for MSIE<=8 button is 1=left (0 on all other browsers)
             // https://developer.mozilla.org/docs/Web/API/MouseEvent/button
             event.button === 1;
      }
      return false;
  };

  Tap.prototype.start = function(e) {
      if (e.type === 'touchstart') {

          this.hasTouchEventOccured = true;
          this.el.addEventListener('touchmove', this, false);
          this.el.addEventListener('touchend', this, false);
          this.el.addEventListener('touchcancel', this, false);

      } else if (e.type === 'mousedown' && this.leftButton(e)) {

          this.el.addEventListener('mousemove', this, false);
          this.el.addEventListener('mouseup', this, false);
      }

      this.moved = false;
      this.startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      this.startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
  };

  Tap.prototype.move = function(e) {
      //if finger moves more than 10px flag to cancel
      var x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      var y = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
      if (Math.abs(x - this.startX) > 10 || Math.abs(y - this.startY) > 10) {
          this.moved = true;
      }
  };

  Tap.prototype.end = function(e) {
      var evt;

      this.el.removeEventListener('touchmove', this, false);
      this.el.removeEventListener('touchend', this, false);
      this.el.removeEventListener('touchcancel', this, false);
      this.el.removeEventListener('mouseup', this, false);
      this.el.removeEventListener('mousemove', this, false);

      if (!this.moved) {
          //create custom event
          try {
              evt = new window.CustomEvent('tap', {
                  bubbles: true,
                  cancelable: true
              });
          } catch (e) {
              evt = document.createEvent('Event');
              evt.initEvent('tap', true, true);
          }

          //prevent touchend from propagating to any parent
          //nodes that may have a tap.js listener attached
          e.stopPropagation();

          // dispatchEvent returns false if any handler calls preventDefault,
          if (!e.target.dispatchEvent(evt)) {
              // in which case we want to prevent clicks from firing.
              e.preventDefault();
          }
      }
  };

  Tap.prototype.cancel = function() {
      this.hasTouchEventOccured = false;
      this.moved = false;
      this.startX = 0;
      this.startY = 0;
  };

  Tap.prototype.destroy = function() {
      this.el.removeEventListener('touchstart', this, false);
      this.el.removeEventListener('touchmove', this, false);
      this.el.removeEventListener('touchend', this, false);
      this.el.removeEventListener('touchcancel', this, false);
      this.el.removeEventListener('mousedown', this, false);
      this.el.removeEventListener('mouseup', this, false);
      this.el.removeEventListener('mousemove', this, false);
  };

  Tap.prototype.handleEvent = function(e) {
      switch (e.type) {
          case 'touchstart': this.start(e); break;
          case 'touchmove': this.move(e); break;
          case 'touchend': this.end(e); break;
          case 'touchcancel': this.cancel(e); break;
          case 'mousedown': this.start(e); break;
          case 'mouseup': this.end(e); break;
          case 'mousemove': this.move(e); break;
      }
  };

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

  /**
   * Copyright (c) 2016 Florian Klampfer
   * https://github.com/qwtel/hydejack/
   * Released under MIT license
   */
  function createSidebar(sidebar, backdrop, menu) {
    polyfillRequestAnimationFrame();

    new Tap(backdrop);
    new Tap(menu);

    var browerCapabilities = getBrowserCapabilities();
    var transformPrefix = browerCapabilities.prefix;
    var transformProperty = browerCapabilities.transform;

    var IDLE = 'IDLE';
    var START_TOUCHING = 'START_TOUCHING';
    var TOUCHING = 'TOUCHING';
    var START_ANIMATING = 'START_ANIMATING';
    var ANIMATING = 'ANIMATING';

    var DURATION = 200;
    var HITBOX_WIDTH = 75;
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

    var animationStartTime;
    var animationStartX;
    var animationEndX;
    var animationChangeInValue;
    var lastTime;
    var timeDiff;

    var sliderWidth;
    var screenWidth;

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

    function onTouchEnd(e) {
      if (isScrolling || e.touches.length > 0) {
        return;
      }

      if (startedMoving) {
        menuOpen = velocity > VELOCITY_THRESHOLD ? 1 :
          velocity < -VELOCITY_THRESHOLD ? 0 :
            translateX >= sliderWidth / 2 ? 1 :
            0;
      }

      state = START_ANIMATING;
      startedMoving = false;

      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    }

    function onTouchStart(e) {
      if (e.touches.length === 1) {
        isScrolling = undefined;

        var touch = e.touches[0] ;
        startX = pageX = lastPageX = touch.pageX;
        startY = pageY = lastPageY = touch.pageY;

        if (menuOpen || !menuOpen && pageX < (window.innerWidth / 3 || HITBOX_WIDTH)) {
          document.addEventListener('touchmove', onTouchMove);
          document.addEventListener('touchend', onTouchEnd);
        }
      }
    }

    function onMenuClick(e) {
      e.preventDefault();
      animateTo((menuOpen + 1) % 2);
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

    function addressbarHeightFix(f) {
      f(sidebar);
      f(backdrop);
    }

    function setToScreenHeight(el) {
      var screenHeight = window.screen.height;
      el.style.height = screenHeight + 'px';
      el.style.top = 'auto';
    }

    // function setToFullHeight(el) {
    //   el.style.height = 'auto'
    //   el.style.top = 0;
    // }

    function enableSlider() {
      document.body.classList.add('drawer');
      document.addEventListener('touchstart', onTouchStart);
      menu.addEventListener('tap', onMenuClick);
      backdrop.addEventListener('tap', onBackdropClick);
      animateTo(menuOpen);
    }

    function disableSlider() {
      document.body.classList.remove('drawer')
      document.removeEventListener('touchstart', onTouchStart);
      menu.removeEventListener('tap', onMenuClick);
      backdrop.removeEventListener('tap', onBackdropClick);
    }

    function onResize() {
      if (window.matchMedia("(min-width: 48em)").matches) {
        disableSlider();
      } else {
        enableSlider();
      }
      // This prevents repaints when the window heights changes due to disappearing address bars in mobile browsers.
      addressbarHeightFix(setToScreenHeight);
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

  var sidebar = document.getElementById('_sidebar');
  var backdrop = document.getElementById('_backdrop');
  var menu = document.getElementById('_menu');

  // TODO: Don't run in incapable browsers
  createSidebar(sidebar, backdrop, menu);
}());
