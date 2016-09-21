function GolHtmlHelper() {

    var that = this;

    that.init = function init(settings) {
        that.settings = settings;
        that.cols = settings.cols;
        that.rows = settings.rows;
        that.colorsRGB = settings.colorsRGB;
        that.colorsHex = [that.getColorHexStr(that.colorsRGB[0]), that.getColorHexStr(that.colorsRGB[1])];
        that.powerBarMaxWidth = Math.floor(that.settings.cols / 2 - 50);
        that.addCssRules();
        that.shakes = ['shake-little'];//['shake', 'shake-little', 'shake-horizontal', 'shake-rotate'];
    };

    that.addCssRules = function addCssRules() {
        var i;

        that.addCssRule('@font-face {font-family: visitor; src: url("' + that.settings.remotePlatformLocationRawGit + '/fonts/visitor.woff?raw=true") format("woff");}');
        that.addCssRule('@font-face {font-family: individigital; src: url("' + that.settings.remotePlatformLocationRawGit + '/fonts/individigital.woff?raw=true") format("woff");}');
        that.addCssRule('* {box-sizing: border-box;}');
        that.addCssRule('html {height: 100%; font-size: 8px;}');
        that.addCssRule('body {height: 100%; margin: 0; overflow: hidden; background-color: #202020; color: #fff; font-family: individigital, sans-serif;}');
        that.addCssRule('#load-src-panel {margin-top: 10px; margin-left: calc(50% - 200px); width: 400px; text-align: center; opacity: 0; transition: 1s all ease;}');
        that.addCssRule('.load-src-title {text-align: left; color: #fff; font-size: 16px;}');
        that.addCssRule('.load-src-msg {text-align: left; font-size: 7px; color: #333; transition: 1s color ease;}');
        that.addCssRule('.load-src-input {outline: none !important; margin-bottom: 1px; width: 100%; height: 8px; border: none; background-color: #000; padding-left: 3px; font-family: visitor, consolas, monospace, sans-serif; font-size: 9px; color: #666; cursor: pointer; transition: 1s all ease;}');
        that.addCssRule('#load-src-button {margin-top: 8px; width: 50px; height: 15px; border: 1px solid #666; background: #666; color: #fff; font-family: individigital, sans-serif; font-size: 7px; cursor: pointer; outline: none; opacity: 0; transition: 1s opacity ease;}');
        that.addCssRule('#army-vs-army-panel {margin-left: calc(50% - 200px); width: 400px; text-align: center; opacity: 0; transition: 4s all ease;}');
        that.addCssRule('.army-vs-army-line {margin-top: 30px;}');
        that.addCssRule('.army-vs-army-vs {margin-top: 30px; color: #666;}');
        that.addCssRule('#gol-container {position: relative; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;}');
        that.addCssRule('#time-display {position: absolute; left: 7px; top: 5px; font-size: 8px; color: #666;');
        that.addCssRule('#gol-canvas {background-color: #000; cursor: crosshair; margin: 5px;}');
        that.addCssRule('.gol-army-img {position: relative; top: 0px; margin-left: 2px;}');
        for (i = 0; i < 2; i++) {
            that.addCssRule('.src-' + i + ' {margin-bottom: 1px; width: 100%; border: none; background-color: #000; padding-left: 3px; font-family: visitor, consolas, monospace, sans-serif; font-size: 9px; color: #' + that.colorsHex[i] + ';}');
            that.addCssRule('#army-vs-army-img-' + i + ' {display: inline-block; height: 60px;}');
            that.addCssRule('#army-vs-army-name-' + i + ' {display: inline-block; position: relative; top: -25px; color: #' + that.colorsHex[i] + '}');
            that.addCssRule('#gol-army-line-' + i + ' {display: flex; justify-content: space-between; align-items: center; text-align: left; height: 10px; line-height: 10px; width: ' + that.cols + 'px; position:relative;}');
            that.addCssRule('#gol-army-name-' + i + ' {height: 10px; width: 50%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #' + that.colorsHex[i] + ';}');
            that.addCssRule('#gol-army-stats-' + i + ' {height: 10px; display: flex; align-items: center;}');
            that.addCssRule('#gol-army-score-' + i + ' {height: 10px; color: #' + that.colorsHex[i] + ';}');
            that.addCssRule('#gol-army-power-' + i + ' {height: 2px; margin-left: 2px; background-color: #' + that.colorsHex[i] + '; box-shadow: 0px 0px 10px #' + that.colorsHex[i] +'; transition: 1s width ease;}');
        }
        //css shake effects
        that.addCssRule('.shake,.shake-little,.shake-slow,.shake-hard,.shake-horizontal,.shake-vertical,.shake-rotate,.shake-opacity,.shake-crazy,.shake-chunk{display:inline-block;transform-origin:center center}.shake-freeze,.shake-constant.shake-constant--hover:hover,.shake-trigger:hover .shake-constant.shake-constant--hover{animation-play-state:paused}.shake-freeze:hover,.shake-trigger:hover .shake-freeze,.shake:hover,.shake-trigger:hover .shake,.shake-little:hover,.shake-trigger:hover .shake-little,.shake-slow:hover,.shake-trigger:hover .shake-slow,.shake-hard:hover,.shake-trigger:hover .shake-hard,.shake-horizontal:hover,.shake-trigger:hover .shake-horizontal,.shake-vertical:hover,.shake-trigger:hover .shake-vertical,.shake-rotate:hover,.shake-trigger:hover .shake-rotate,.shake-opacity:hover,.shake-trigger:hover .shake-opacity,.shake-crazy:hover,.shake-trigger:hover .shake-crazy,.shake-chunk:hover,.shake-trigger:hover .shake-chunk{animation-play-state:running}@keyframes shake{2%{transform:translate(1.5px, 1.5px) rotate(-0.5deg)}4%{transform:translate(-1.5px, 1.5px) rotate(1.5deg)}6%{transform:translate(1.5px, 2.5px) rotate(-0.5deg)}8%{transform:translate(1.5px, -0.5px) rotate(0.5deg)}10%{transform:translate(2.5px, 0.5px) rotate(0.5deg)}12%{transform:translate(-1.5px, -0.5px) rotate(1.5deg)}14%{transform:translate(1.5px, 1.5px) rotate(1.5deg)}16%{transform:translate(0.5px, 0.5px) rotate(-0.5deg)}18%{transform:translate(-1.5px, -1.5px) rotate(1.5deg)}20%{transform:translate(1.5px, 2.5px) rotate(1.5deg)}22%{transform:translate(0.5px, 2.5px) rotate(1.5deg)}24%{transform:translate(2.5px, 1.5px) rotate(-0.5deg)}26%{transform:translate(0.5px, 1.5px) rotate(1.5deg)}28%{transform:translate(-0.5px, -1.5px) rotate(-0.5deg)}30%{transform:translate(-0.5px, 1.5px) rotate(-0.5deg)}32%{transform:translate(1.5px, 1.5px) rotate(-0.5deg)}34%{transform:translate(-1.5px, 0.5px) rotate(1.5deg)}36%{transform:translate(2.5px, 0.5px) rotate(-0.5deg)}38%{transform:translate(-0.5px, -0.5px) rotate(0.5deg)}40%{transform:translate(0.5px, -1.5px) rotate(-0.5deg)}42%{transform:translate(0.5px, 1.5px) rotate(1.5deg)}44%{transform:translate(2.5px, 0.5px) rotate(-0.5deg)}46%{transform:translate(2.5px, 0.5px) rotate(1.5deg)}48%{transform:translate(1.5px, 1.5px) rotate(-0.5deg)}50%{transform:translate(-0.5px, -0.5px) rotate(1.5deg)}52%{transform:translate(2.5px, -1.5px) rotate(0.5deg)}54%{transform:translate(0.5px, 2.5px) rotate(1.5deg)}56%{transform:translate(0.5px, 2.5px) rotate(-0.5deg)}58%{transform:translate(1.5px, 0.5px) rotate(-0.5deg)}60%{transform:translate(1.5px, 1.5px) rotate(-0.5deg)}62%{transform:translate(2.5px, -1.5px) rotate(1.5deg)}64%{transform:translate(2.5px, 1.5px) rotate(0.5deg)}66%{transform:translate(1.5px, 2.5px) rotate(1.5deg)}68%{transform:translate(-0.5px, 0.5px) rotate(0.5deg)}70%{transform:translate(-1.5px, 2.5px) rotate(1.5deg)}72%{transform:translate(1.5px, 2.5px) rotate(1.5deg)}74%{transform:translate(-0.5px, 2.5px) rotate(0.5deg)}76%{transform:translate(1.5px, 2.5px) rotate(0.5deg)}78%{transform:translate(2.5px, 0.5px) rotate(0.5deg)}80%{transform:translate(-1.5px, -0.5px) rotate(0.5deg)}82%{transform:translate(-0.5px, -1.5px) rotate(0.5deg)}84%{transform:translate(1.5px, 1.5px) rotate(-0.5deg)}86%{transform:translate(-0.5px, 2.5px) rotate(0.5deg)}88%{transform:translate(-1.5px, 2.5px) rotate(0.5deg)}90%{transform:translate(-0.5px, -0.5px) rotate(-0.5deg)}92%{transform:translate(2.5px, 1.5px) rotate(-0.5deg)}94%{transform:translate(1.5px, 2.5px) rotate(0.5deg)}96%{transform:translate(0.5px, 2.5px) rotate(-0.5deg)}98%{transform:translate(2.5px, 0.5px) rotate(1.5deg)}0%,100%{transform:translate(0, 0) rotate(0)}}.shake:hover,.shake-trigger:hover .shake,.shake.shake-freeze,.shake.shake-constant{animation:shake 100ms ease-in-out infinite}@keyframes shake-little{2%{transform:translate(1px, 1px) rotate(0.5deg)}4%{transform:translate(1px, 1px) rotate(0.5deg)}6%{transform:translate(1px, 1px) rotate(0.5deg)}8%{transform:translate(1px, 1px) rotate(0.5deg)}10%{transform:translate(1px, 1px) rotate(0.5deg)}12%{transform:translate(1px, 0px) rotate(0.5deg)}14%{transform:translate(0px, 1px) rotate(0.5deg)}16%{transform:translate(1px, 0px) rotate(0.5deg)}18%{transform:translate(1px, 0px) rotate(0.5deg)}20%{transform:translate(0px, 0px) rotate(0.5deg)}22%{transform:translate(0px, 0px) rotate(0.5deg)}24%{transform:translate(0px, 1px) rotate(0.5deg)}26%{transform:translate(0px, 1px) rotate(0.5deg)}28%{transform:translate(0px, 1px) rotate(0.5deg)}30%{transform:translate(1px, 1px) rotate(0.5deg)}32%{transform:translate(0px, 1px) rotate(0.5deg)}34%{transform:translate(0px, 1px) rotate(0.5deg)}36%{transform:translate(1px, 0px) rotate(0.5deg)}38%{transform:translate(1px, 1px) rotate(0.5deg)}40%{transform:translate(1px, 0px) rotate(0.5deg)}42%{transform:translate(1px, 1px) rotate(0.5deg)}44%{transform:translate(0px, 0px) rotate(0.5deg)}46%{transform:translate(1px, 0px) rotate(0.5deg)}48%{transform:translate(1px, 1px) rotate(0.5deg)}50%{transform:translate(0px, 0px) rotate(0.5deg)}52%{transform:translate(1px, 1px) rotate(0.5deg)}54%{transform:translate(0px, 0px) rotate(0.5deg)}56%{transform:translate(0px, 1px) rotate(0.5deg)}58%{transform:translate(1px, 1px) rotate(0.5deg)}60%{transform:translate(0px, 0px) rotate(0.5deg)}62%{transform:translate(0px, 0px) rotate(0.5deg)}64%{transform:translate(0px, 0px) rotate(0.5deg)}66%{transform:translate(0px, 1px) rotate(0.5deg)}68%{transform:translate(1px, 1px) rotate(0.5deg)}70%{transform:translate(0px, 0px) rotate(0.5deg)}72%{transform:translate(0px, 0px) rotate(0.5deg)}74%{transform:translate(0px, 0px) rotate(0.5deg)}76%{transform:translate(0px, 1px) rotate(0.5deg)}78%{transform:translate(0px, 0px) rotate(0.5deg)}80%{transform:translate(1px, 1px) rotate(0.5deg)}82%{transform:translate(0px, 0px) rotate(0.5deg)}84%{transform:translate(1px, 0px) rotate(0.5deg)}86%{transform:translate(1px, 1px) rotate(0.5deg)}88%{transform:translate(1px, 1px) rotate(0.5deg)}90%{transform:translate(1px, 1px) rotate(0.5deg)}92%{transform:translate(1px, 1px) rotate(0.5deg)}94%{transform:translate(0px, 1px) rotate(0.5deg)}96%{transform:translate(0px, 1px) rotate(0.5deg)}98%{transform:translate(0px, 1px) rotate(0.5deg)}0%,100%{transform:translate(0, 0) rotate(0)}}.shake-little:hover,.shake-trigger:hover .shake-little,.shake-little.shake-freeze,.shake-little.shake-constant{animation:shake-little 100ms ease-in-out infinite}@keyframes shake-slow{2%{transform:translate(2px, -9px) rotate(2.5deg)}4%{transform:translate(-4px, 5px) rotate(-2.5deg)}6%{transform:translate(-8px, 8px) rotate(3.5deg)}8%{transform:translate(-7px, 4px) rotate(-1.5deg)}10%{transform:translate(7px, 0px) rotate(1.5deg)}12%{transform:translate(3px, 8px) rotate(-0.5deg)}14%{transform:translate(4px, 4px) rotate(0.5deg)}16%{transform:translate(-4px, -4px) rotate(3.5deg)}18%{transform:translate(-8px, -7px) rotate(3.5deg)}20%{transform:translate(-9px, 8px) rotate(2.5deg)}22%{transform:translate(-9px, -5px) rotate(-2.5deg)}24%{transform:translate(4px, -7px) rotate(-2.5deg)}26%{transform:translate(-1px, 3px) rotate(1.5deg)}28%{transform:translate(-3px, -7px) rotate(3.5deg)}30%{transform:translate(6px, -9px) rotate(2.5deg)}32%{transform:translate(8px, -5px) rotate(-2.5deg)}34%{transform:translate(7px, 8px) rotate(1.5deg)}36%{transform:translate(2px, 5px) rotate(-2.5deg)}38%{transform:translate(-6px, 0px) rotate(2.5deg)}40%{transform:translate(9px, 7px) rotate(-2.5deg)}42%{transform:translate(-2px, -2px) rotate(-0.5deg)}44%{transform:translate(0px, -6px) rotate(-2.5deg)}46%{transform:translate(-5px, 2px) rotate(1.5deg)}48%{transform:translate(-8px, -7px) rotate(3.5deg)}50%{transform:translate(-5px, -6px) rotate(-2.5deg)}52%{transform:translate(8px, 1px) rotate(-2.5deg)}54%{transform:translate(-1px, -1px) rotate(-2.5deg)}56%{transform:translate(5px, -1px) rotate(2.5deg)}58%{transform:translate(-6px, -8px) rotate(-2.5deg)}60%{transform:translate(5px, 5px) rotate(3.5deg)}62%{transform:translate(-4px, -2px) rotate(1.5deg)}64%{transform:translate(-5px, 7px) rotate(3.5deg)}66%{transform:translate(7px, 4px) rotate(0.5deg)}68%{transform:translate(-5px, -2px) rotate(-2.5deg)}70%{transform:translate(1px, 3px) rotate(-1.5deg)}72%{transform:translate(-6px, 0px) rotate(2.5deg)}74%{transform:translate(1px, 9px) rotate(2.5deg)}76%{transform:translate(10px, -5px) rotate(-2.5deg)}78%{transform:translate(-5px, 4px) rotate(3.5deg)}80%{transform:translate(-6px, 1px) rotate(0.5deg)}82%{transform:translate(9px, 10px) rotate(2.5deg)}84%{transform:translate(-1px, 5px) rotate(-1.5deg)}86%{transform:translate(4px, 1px) rotate(2.5deg)}88%{transform:translate(-5px, -7px) rotate(1.5deg)}90%{transform:translate(-8px, -2px) rotate(0.5deg)}92%{transform:translate(10px, -9px) rotate(-0.5deg)}94%{transform:translate(7px, 6px) rotate(-0.5deg)}96%{transform:translate(6px, 1px) rotate(-2.5deg)}98%{transform:translate(5px, 0px) rotate(1.5deg)}0%,100%{transform:translate(0, 0) rotate(0)}}.shake-slow:hover,.shake-trigger:hover .shake-slow,.shake-slow.shake-freeze,.shake-slow.shake-constant{animation:shake-slow 5s ease-in-out infinite}@keyframes shake-hard{2%{transform:translate(2px, -5px) rotate(2.5deg)}4%{transform:translate(4px, 6px) rotate(-1.5deg)}6%{transform:translate(-5px, 3px) rotate(-2.5deg)}8%{transform:translate(-8px, 7px) rotate(3.5deg)}10%{transform:translate(-2px, -8px) rotate(3.5deg)}12%{transform:translate(-9px, -1px) rotate(1.5deg)}14%{transform:translate(1px, -8px) rotate(-0.5deg)}16%{transform:translate(-3px, 10px) rotate(-1.5deg)}18%{transform:translate(9px, -4px) rotate(0.5deg)}20%{transform:translate(4px, 8px) rotate(2.5deg)}22%{transform:translate(3px, 2px) rotate(-0.5deg)}24%{transform:translate(-5px, 6px) rotate(2.5deg)}26%{transform:translate(-7px, -6px) rotate(0.5deg)}28%{transform:translate(3px, 0px) rotate(2.5deg)}30%{transform:translate(8px, -8px) rotate(2.5deg)}32%{transform:translate(-9px, -8px) rotate(2.5deg)}34%{transform:translate(-9px, 3px) rotate(2.5deg)}36%{transform:translate(-2px, 7px) rotate(2.5deg)}38%{transform:translate(8px, 7px) rotate(-1.5deg)}40%{transform:translate(4px, 0px) rotate(-1.5deg)}42%{transform:translate(-4px, -9px) rotate(-0.5deg)}44%{transform:translate(0px, -4px) rotate(2.5deg)}46%{transform:translate(4px, 2px) rotate(2.5deg)}48%{transform:translate(10px, -9px) rotate(2.5deg)}50%{transform:translate(3px, -6px) rotate(2.5deg)}52%{transform:translate(1px, 6px) rotate(0.5deg)}54%{transform:translate(3px, -1px) rotate(-1.5deg)}56%{transform:translate(-1px, -9px) rotate(0.5deg)}58%{transform:translate(7px, -4px) rotate(-0.5deg)}60%{transform:translate(2px, 0px) rotate(2.5deg)}62%{transform:translate(-5px, 3px) rotate(0.5deg)}64%{transform:translate(6px, -8px) rotate(3.5deg)}66%{transform:translate(1px, -3px) rotate(2.5deg)}68%{transform:translate(10px, 1px) rotate(1.5deg)}70%{transform:translate(0px, 7px) rotate(-0.5deg)}72%{transform:translate(-9px, 6px) rotate(3.5deg)}74%{transform:translate(8px, 0px) rotate(-0.5deg)}76%{transform:translate(0px, 5px) rotate(0.5deg)}78%{transform:translate(6px, 6px) rotate(-0.5deg)}80%{transform:translate(4px, 3px) rotate(-2.5deg)}82%{transform:translate(8px, -2px) rotate(3.5deg)}84%{transform:translate(0px, -8px) rotate(1.5deg)}86%{transform:translate(-2px, -8px) rotate(2.5deg)}88%{transform:translate(10px, -7px) rotate(2.5deg)}90%{transform:translate(2px, 10px) rotate(-0.5deg)}92%{transform:translate(-9px, 4px) rotate(2.5deg)}94%{transform:translate(-3px, 1px) rotate(1.5deg)}96%{transform:translate(-2px, -1px) rotate(0.5deg)}98%{transform:translate(7px, -9px) rotate(3.5deg)}0%,100%{transform:translate(0, 0) rotate(0)}}.shake-hard:hover,.shake-trigger:hover .shake-hard,.shake-hard.shake-freeze,.shake-hard.shake-constant{animation:shake-hard 100ms ease-in-out infinite}@keyframes shake-horizontal{2%{transform:translate(4px, 0) rotate(0)}4%{transform:translate(7px, 0) rotate(0)}6%{transform:translate(-2px, 0) rotate(0)}8%{transform:translate(-7px, 0) rotate(0)}10%{transform:translate(-1px, 0) rotate(0)}12%{transform:translate(-2px, 0) rotate(0)}14%{transform:translate(1px, 0) rotate(0)}16%{transform:translate(-8px, 0) rotate(0)}18%{transform:translate(-5px, 0) rotate(0)}20%{transform:translate(9px, 0) rotate(0)}22%{transform:translate(-5px, 0) rotate(0)}24%{transform:translate(6px, 0) rotate(0)}26%{transform:translate(2px, 0) rotate(0)}28%{transform:translate(2px, 0) rotate(0)}30%{transform:translate(-5px, 0) rotate(0)}32%{transform:translate(-7px, 0) rotate(0)}34%{transform:translate(10px, 0) rotate(0)}36%{transform:translate(1px, 0) rotate(0)}38%{transform:translate(-2px, 0) rotate(0)}40%{transform:translate(4px, 0) rotate(0)}42%{transform:translate(-8px, 0) rotate(0)}44%{transform:translate(5px, 0) rotate(0)}46%{transform:translate(9px, 0) rotate(0)}48%{transform:translate(6px, 0) rotate(0)}50%{transform:translate(-9px, 0) rotate(0)}52%{transform:translate(7px, 0) rotate(0)}54%{transform:translate(-9px, 0) rotate(0)}56%{transform:translate(-7px, 0) rotate(0)}58%{transform:translate(-8px, 0) rotate(0)}60%{transform:translate(3px, 0) rotate(0)}62%{transform:translate(-7px, 0) rotate(0)}64%{transform:translate(6px, 0) rotate(0)}66%{transform:translate(-4px, 0) rotate(0)}68%{transform:translate(-2px, 0) rotate(0)}70%{transform:translate(6px, 0) rotate(0)}72%{transform:translate(-9px, 0) rotate(0)}74%{transform:translate(7px, 0) rotate(0)}76%{transform:translate(2px, 0) rotate(0)}78%{transform:translate(-8px, 0) rotate(0)}80%{transform:translate(2px, 0) rotate(0)}82%{transform:translate(2px, 0) rotate(0)}84%{transform:translate(-4px, 0) rotate(0)}86%{transform:translate(-7px, 0) rotate(0)}88%{transform:translate(4px, 0) rotate(0)}90%{transform:translate(-6px, 0) rotate(0)}92%{transform:translate(-8px, 0) rotate(0)}94%{transform:translate(-3px, 0) rotate(0)}96%{transform:translate(4px, 0) rotate(0)}98%{transform:translate(-8px, 0) rotate(0)}0%,100%{transform:translate(0, 0) rotate(0)}}.shake-horizontal:hover,.shake-trigger:hover .shake-horizontal,.shake-horizontal.shake-freeze,.shake-horizontal.shake-constant{animation:shake-horizontal 100ms ease-in-out infinite}@keyframes shake-vertical{2%{transform:translate(0, 6px) rotate(0)}4%{transform:translate(0, -1px) rotate(0)}6%{transform:translate(0, -7px) rotate(0)}8%{transform:translate(0, -1px) rotate(0)}10%{transform:translate(0, 9px) rotate(0)}12%{transform:translate(0, 1px) rotate(0)}14%{transform:translate(0, 3px) rotate(0)}16%{transform:translate(0, 6px) rotate(0)}18%{transform:translate(0, 0px) rotate(0)}20%{transform:translate(0, 2px) rotate(0)}22%{transform:translate(0, 1px) rotate(0)}24%{transform:translate(0, 3px) rotate(0)}26%{transform:translate(0, 4px) rotate(0)}28%{transform:translate(0, 0px) rotate(0)}30%{transform:translate(0, -8px) rotate(0)}32%{transform:translate(0, 6px) rotate(0)}34%{transform:translate(0, 6px) rotate(0)}36%{transform:translate(0, -4px) rotate(0)}38%{transform:translate(0, 2px) rotate(0)}40%{transform:translate(0, -8px) rotate(0)}42%{transform:translate(0, -9px) rotate(0)}44%{transform:translate(0, -3px) rotate(0)}46%{transform:translate(0, 0px) rotate(0)}48%{transform:translate(0, -7px) rotate(0)}50%{transform:translate(0, 0px) rotate(0)}52%{transform:translate(0, 3px) rotate(0)}54%{transform:translate(0, -4px) rotate(0)}56%{transform:translate(0, 3px) rotate(0)}58%{transform:translate(0, -9px) rotate(0)}60%{transform:translate(0, 9px) rotate(0)}62%{transform:translate(0, -6px) rotate(0)}64%{transform:translate(0, 0px) rotate(0)}66%{transform:translate(0, -4px) rotate(0)}68%{transform:translate(0, 1px) rotate(0)}70%{transform:translate(0, 5px) rotate(0)}72%{transform:translate(0, 0px) rotate(0)}74%{transform:translate(0, -6px) rotate(0)}76%{transform:translate(0, -3px) rotate(0)}78%{transform:translate(0, 3px) rotate(0)}80%{transform:translate(0, 6px) rotate(0)}82%{transform:translate(0, 2px) rotate(0)}84%{transform:translate(0, -3px) rotate(0)}86%{transform:translate(0, 1px) rotate(0)}88%{transform:translate(0, 1px) rotate(0)}90%{transform:translate(0, 10px) rotate(0)}92%{transform:translate(0, -2px) rotate(0)}94%{transform:translate(0, -2px) rotate(0)}96%{transform:translate(0, -6px) rotate(0)}98%{transform:translate(0, -9px) rotate(0)}0%,100%{transform:translate(0, 0) rotate(0)}}.shake-vertical:hover,.shake-trigger:hover .shake-vertical,.shake-vertical.shake-freeze,.shake-vertical.shake-constant{animation:shake-vertical 100ms ease-in-out infinite}@keyframes shake-rotate{2%{transform:translate(0, 0) rotate(3.5deg)}4%{transform:translate(0, 0) rotate(4.5deg)}6%{transform:translate(0, 0) rotate(1.5deg)}8%{transform:translate(0, 0) rotate(2.5deg)}10%{transform:translate(0, 0) rotate(3.5deg)}12%{transform:translate(0, 0) rotate(0.5deg)}14%{transform:translate(0, 0) rotate(-5.5deg)}16%{transform:translate(0, 0) rotate(-1.5deg)}18%{transform:translate(0, 0) rotate(1.5deg)}20%{transform:translate(0, 0) rotate(6.5deg)}22%{transform:translate(0, 0) rotate(3.5deg)}24%{transform:translate(0, 0) rotate(6.5deg)}26%{transform:translate(0, 0) rotate(-0.5deg)}28%{transform:translate(0, 0) rotate(7.5deg)}30%{transform:translate(0, 0) rotate(6.5deg)}32%{transform:translate(0, 0) rotate(-3.5deg)}34%{transform:translate(0, 0) rotate(-1.5deg)}36%{transform:translate(0, 0) rotate(3.5deg)}38%{transform:translate(0, 0) rotate(7.5deg)}40%{transform:translate(0, 0) rotate(-0.5deg)}42%{transform:translate(0, 0) rotate(3.5deg)}44%{transform:translate(0, 0) rotate(7.5deg)}46%{transform:translate(0, 0) rotate(7.5deg)}48%{transform:translate(0, 0) rotate(3.5deg)}50%{transform:translate(0, 0) rotate(0.5deg)}52%{transform:translate(0, 0) rotate(2.5deg)}54%{transform:translate(0, 0) rotate(5.5deg)}56%{transform:translate(0, 0) rotate(2.5deg)}58%{transform:translate(0, 0) rotate(-4.5deg)}60%{transform:translate(0, 0) rotate(-4.5deg)}62%{transform:translate(0, 0) rotate(7.5deg)}64%{transform:translate(0, 0) rotate(0.5deg)}66%{transform:translate(0, 0) rotate(2.5deg)}68%{transform:translate(0, 0) rotate(2.5deg)}70%{transform:translate(0, 0) rotate(5.5deg)}72%{transform:translate(0, 0) rotate(5.5deg)}74%{transform:translate(0, 0) rotate(-2.5deg)}76%{transform:translate(0, 0) rotate(7.5deg)}78%{transform:translate(0, 0) rotate(2.5deg)}80%{transform:translate(0, 0) rotate(-6.5deg)}82%{transform:translate(0, 0) rotate(-0.5deg)}84%{transform:translate(0, 0) rotate(2.5deg)}86%{transform:translate(0, 0) rotate(5.5deg)}88%{transform:translate(0, 0) rotate(0.5deg)}90%{transform:translate(0, 0) rotate(-0.5deg)}92%{transform:translate(0, 0) rotate(-1.5deg)}94%{transform:translate(0, 0) rotate(-0.5deg)}96%{transform:translate(0, 0) rotate(0.5deg)}98%{transform:translate(0, 0) rotate(-4.5deg)}0%,100%{transform:translate(0, 0) rotate(0)}}.shake-rotate:hover,.shake-trigger:hover .shake-rotate,.shake-rotate.shake-freeze,.shake-rotate.shake-constant{animation:shake-rotate 100ms ease-in-out infinite}@keyframes shake-opacity{10%{transform:translate(-4px, 4px) rotate(-1.5deg);opacity:0.25}20%{transform:translate(-1px, 2px) rotate(0.5deg);opacity:1}30%{transform:translate(2px, -4px) rotate(-1.5deg);opacity:0.03}40%{transform:translate(-1px, -2px) rotate(1.5deg);opacity:0.55}50%{transform:translate(5px, -4px) rotate(1.5deg);opacity:0.09}60%{transform:translate(-1px, 1px) rotate(-1.5deg);opacity:0.97}70%{transform:translate(4px, 1px) rotate(0.5deg);opacity:0.96}80%{transform:translate(3px, 2px) rotate(2.5deg);opacity:0.83}90%{transform:translate(-2px, -4px) rotate(-1.5deg);opacity:0.09}0%,100%{transform:translate(0, 0) rotate(0)}}.shake-opacity:hover,.shake-trigger:hover .shake-opacity,.shake-opacity.shake-freeze,.shake-opacity.shake-constant{animation:shake-opacity 0.5s ease-in-out infinite}@keyframes shake-crazy{10%{transform:translate(-10px, -19px) rotate(6deg);opacity:0.47}20%{transform:translate(-11px, 10px) rotate(5deg);opacity:0.82}30%{transform:translate(17px, -3px) rotate(-9deg);opacity:0.34}40%{transform:translate(11px, 19px) rotate(5deg);opacity:0.4}50%{transform:translate(-11px, 13px) rotate(1deg);opacity:0.97}60%{transform:translate(17px, -16px) rotate(7deg);opacity:0.24}70%{transform:translate(-10px, -12px) rotate(-6deg);opacity:0.56}80%{transform:translate(13px, -19px) rotate(-4deg);opacity:0.96}90%{transform:translate(-18px, -11px) rotate(3deg);opacity:0.49}0%,100%{transform:translate(0, 0) rotate(0)}}.shake-crazy:hover,.shake-trigger:hover .shake-crazy,.shake-crazy.shake-freeze,.shake-crazy.shake-constant{animation:shake-crazy 100ms ease-in-out infinite}@keyframes shake-chunk{2%{transform:translate(5px, 2px) rotate(-12deg)}4%{transform:translate(-6px, 3px) rotate(1deg)}6%{transform:translate(3px, 6px) rotate(14deg)}8%{transform:translate(1px, 8px) rotate(1deg)}10%{transform:translate(-5px, 10px) rotate(0deg)}12%{transform:translate(-11px, 2px) rotate(7deg)}14%{transform:translate(4px, 15px) rotate(11deg)}16%{transform:translate(4px, -8px) rotate(15deg)}18%{transform:translate(-5px, 10px) rotate(1deg)}20%{transform:translate(-1px, 3px) rotate(15deg)}22%{transform:translate(-8px, 5px) rotate(-6deg)}24%{transform:translate(-1px, -9px) rotate(8deg)}26%{transform:translate(9px, 11px) rotate(-13deg)}28%{transform:translate(-7px, 4px) rotate(9deg)}30%{transform:translate(8px, 14px) rotate(9deg)}32%{transform:translate(-4px, 11px) rotate(-11deg)}34%{transform:translate(14px, 11px) rotate(-8deg)}36%{transform:translate(-13px, -8px) rotate(13deg)}38%{transform:translate(-12px, 1px) rotate(-13deg)}0%,40%,100%{transform:translate(0, 0) rotate(0)}}.shake-chunk:hover,.shake-trigger:hover .shake-chunk,.shake-chunk.shake-freeze,.shake-chunk.shake-constant{animation:shake-chunk 4s ease-in-out infinite}');
    };

    that.addCssRule = function addCssRule(cssText) {
        var style;
        style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = cssText;
        } else {
            style.appendChild(document.createTextNode(cssText));
        }
        document.head.appendChild(style);
    };

    that.getColorHexStr = function getColorHexStr(colorRGBArray) {
        return colorRGBArray[0].toString(16) + colorRGBArray[1].toString(16) + colorRGBArray[2].toString(16);
    };

    that.fadeInLoadSourcesPanel = function fadeInLoadSourcesPanel() {
        document.getElementById('load-src-panel').style['opacity'] = 1;
    };

    that.markSrcLines = function markSrcLines(srcIndices) {
        var i, elm;
        for (i = 0; i < 16; i++) {
            elm = document.getElementById('src-' + i);
            if ('' + i === srcIndices[0]) {
                elm.classList.add('src-0');
                elm.classList.remove('src-1');
            } else if ('' + i === srcIndices[1]) {
                elm.classList.add('src-1');
                elm.classList.remove('src-0');
            } else {
                elm.classList.remove('src-0');
                elm.classList.remove('src-1');
            }
        }
        document.getElementById('load-src-msg-1').style['color'] = srcIndices[1] === -1 ? '#' + that.colorsHex[1] : '#333';
        document.getElementById('load-src-msg-0').style['color'] = srcIndices[0] === -1 && srcIndices[1] !== -1 ? '#' + that.colorsHex[0] : '#333';
        document.getElementById('load-src-button').style['opacity'] = (srcIndices[1] !== -1 && srcIndices[0] !== -1) ? '1' : '0';
    };

    that.loadSource = function loadSource(index) {
        var srcText, srcElm;
        srcText = document.getElementById('src-' + index).value;
        _log('loading source: ' + srcText);
        if (srcText) {
            srcElm = document.createElement('script');
            srcElm.setAttribute('type', 'text/javascript');
            srcElm.setAttribute('src', srcText);
            document.getElementsByTagName('head')[0].appendChild(srcElm);
        }
    };

    that.hideLoadSourcesPanel = function hideLoadSourcesPanel() {
        document.getElementById('load-src-panel').style['display'] = 'none';
    };

    that.showArmyVsArmyPanel = function showArmyVsArmyPanel(armies) {
        var i;
        for (i = 0; i < 2; i++) {
            document.getElementById('army-vs-army-img-' + i).setAttribute('src', 'platform/icons/' + armies[i].icon + '.png');
            document.getElementById('army-vs-army-name-' + i).innerHTML = armies[i].name;
        }
        document.getElementById('army-vs-army-panel').style['opacity'] = '1';
    };

    that.hideArmyVsArmyPanel = function hideArmyVsArmyPanel() {
        document.getElementById('army-vs-army-panel').style['display'] = 'none';
    };

    that.drawUserInterface = function drawUserInterface(armies) {
        var container, canvas;
        container = that.addContainer();
        that.addTimeDisplay(container);
        that.addArmyLine(container, 1, armies[1]);
        canvas = that.addCanvas(container, 'gol-canvas', that.cols, that.rows);
        that.addArmyLine(container, 0, armies[0]);
        that.ctx = canvas.getContext('2d');
    };

    that.addContainer = function addContainer() {
        var container;
        container = document.createElement('div');
        container.setAttribute('id', 'gol-container');
        return document.body.appendChild(container);
    };

    that.addArmyLine = function addArmyLine(container, index, army) {
        var textNode, armyLine, armyIcon, armyName, armyStats, armyPower, armyScore;
        armyLine = document.createElement('div');
        armyLine.setAttribute('id', 'gol-army-line-' + index);

        armyName = document.createElement('div');
        armyName.setAttribute('id', 'gol-army-name-' + index);
        textNode = document.createTextNode(army.name);
        armyName.appendChild(textNode);

        armyLine.appendChild(armyName);

        armyStats = document.createElement('div');

        armyStats.setAttribute('id', 'gol-army-stats-' + index);

        if (that.settings.isTournament) {
            armyIcon = document.createElement('img');
            armyIcon.setAttribute('id', 'gol-army-img-' + index);
            armyIcon.className = 'gol-army-img';
            armyIcon.setAttribute('height', '15px');
            armyIcon.setAttribute('src', 'platform/icons/' + army.icon + '.png');
            armyStats.appendChild(armyIcon);
        }

        armyScore = document.createElement('div');
        armyScore.setAttribute('id', 'gol-army-score-' + index);
        textNode = document.createTextNode('' + that.settings.powerMaxValue);
        armyScore.appendChild(textNode);
        armyStats.appendChild(armyScore);

        armyPower = document.createElement('div');
        armyPower.setAttribute('id', 'gol-army-power-' + index);
        armyPower.style['width'] = that.powerBarMaxWidth + 'px';
        armyStats.appendChild(armyPower);

        armyLine.appendChild(armyStats);

        return container.appendChild(armyLine);
    };

    that.addCanvas = function addCanvas(container, id, width, height) {
        var canvas;
        canvas = document.createElement('canvas');
        canvas.setAttribute('id', id);
        canvas.setAttribute('width', width + 'px');
        canvas.setAttribute('height', height + 'px');
        return container.appendChild(canvas);
    };

    that.addTimeDisplay = function addTimeDisplay(container) {
        var timeDisplay, textNode;
        timeDisplay = document.createElement('div');
        timeDisplay.setAttribute('id', 'time-display');
        return container.appendChild(timeDisplay);
    };

    that.drawArrayToCanvas = function drawArrayToCanvas(array, newPixels, newPixelsAge, scoringPixelCount, armies, roundEnded) {
        var i, j, k, x, y, r, g, b, a, maxAge, maxDistance, multiplier, distance, index, imgData;
        imgData = that.ctx.createImageData(that.cols, that.rows);

        // regular matrix
        for (y = 0; y < that.rows; y++) {
            for (x = 0; x < that.cols; x++) {
                i = y * that.cols + x;
                if (array[i] === -1) {
                    imgData.data[i * 4] = imgData.data[i * 4 + 1] = imgData.data[i * 4 + 2] = 0;
                } else {
                    imgData.data[i * 4] = that.colorsRGB[array[i]][0];
                    imgData.data[i * 4 + 1] = that.colorsRGB[array[i]][1];
                    imgData.data[i * 4 + 2] = that.colorsRGB[array[i]][2];
                }
                imgData.data[i * 4 + 3] = 255;
            }
        }

        // back line
        for (i = 0; i < 2; i++) {
            y = (i === 0) ? that.rows-1 : 0;
            for (x = 0; x < that.cols; x++) {
                index = y * that.cols + x;
                if (array[index] === -1) {
                    if (roundEnded) {
                        if (armies[i].power !== 0 || armies[0].power === 0 && armies[1].power === 0) {
                            // draw
                            r = that.colorsRGB[i][0];
                            g = that.colorsRGB[i][1];
                            b = that.colorsRGB[i][2];
                            a = Math.floor(Math.random() * 255);
                        } else if (armies[i].power === 0) {
                            r = that.colorsRGB[i * -1 + 1][0];
                            g = that.colorsRGB[i * -1 + 1][1];
                            b = that.colorsRGB[i * -1 + 1][2];
                            a = Math.floor(Math.random() * 255);
                        }
                    } else {
                        // regular back line
                        if (scoringPixelCount[i * -1 + 1] === 0) {
                            r = that.colorsRGB[i][0];
                            g = that.colorsRGB[i][1];
                            b = that.colorsRGB[i][2];
                            a = Math.floor(Math.random() * 255);
                        } else {
                            // hit
                            r = g = b = a = 255;
                        }
                    }
                    imgData.data[index * 4] = r;
                    imgData.data[index * 4 + 1] = g;
                    imgData.data[index * 4 + 2] = b;
                    imgData.data[index * 4 + 3] = a;
                }
            }
        }

        // new pixels mark
        maxAge = 5;
        for (i = 0; i < newPixels.length; i++) {
            for (j = 0; j < newPixels[i].length; j++) {
                if (newPixelsAge[i] <= maxAge) {
                    maxDistance = Math.floor(32 / newPixelsAge[i]);
                    multiplier = Math.floor(256 / maxDistance);
                    for (k = 0; k < that.rows; k++) {
                        distance = Math.abs(k - newPixels[i][j][1]);
                        if (distance < maxDistance) {
                            index = k * that.cols + newPixels[i][j][0];
                            if (array[index] === -1) {
                                imgData.data[index * 4] = that.colorsRGB[i][0];
                                imgData.data[index * 4 + 1] = that.colorsRGB[i][1];
                                imgData.data[index * 4 + 2] = that.colorsRGB[i][2];
                                imgData.data[index * 4 + 3] = (1 / newPixelsAge[i]) * (maxDistance - distance) * multiplier - 1;
                            }
                        }
                    }
                    for (k = 0; k < that.cols; k++) {
                        distance = Math.abs(k - newPixels[i][j][0]);
                        if (distance < maxDistance) {
                            index = newPixels[i][j][1] * that.cols + k;
                            if (array[index] === -1) {
                                imgData.data[index * 4] = that.colorsRGB[i][0];
                                imgData.data[index * 4 + 1] = that.colorsRGB[i][1];
                                imgData.data[index * 4 + 2] = that.colorsRGB[i][2];
                                imgData.data[index * 4 + 3] = (1 / newPixelsAge[i]) * (maxDistance - distance) * multiplier - 1;
                            }
                        }
                    }
                }
            }
        }

        // new pixels
        for (i = 0; i < newPixels.length; i++) {
            if (newPixelsAge[i] <= maxAge) {
                for (j = 0; j < newPixels[i].length; j++) {
                    index = newPixels[i][j][1] * that.cols + newPixels[i][j][0];
                    imgData.data[index * 4] = imgData.data[index * 4 + 1] = imgData.data[index * 4 + 2] = imgData.data[index * 4 + 3] = 255;
                }
            }
        }

        that.ctx.putImageData(imgData, 0, 0);
    };

    that.shake = function shake() {
        var shakeIndex = Math.floor(Math.random() * that.shakes.length);
        document.getElementById('gol-canvas').className = that.shakes[shakeIndex] + ' shake-constant';
        setTimeout(function () {
            document.getElementById('gol-canvas').className = '';
        }, 500);
    };

    that.updateTimeDisplay = function updateTimeDisplay(secondsLeft) {
        var minutes, seconds, timeStr;
        minutes = Math.floor(secondsLeft / 60);
        seconds = secondsLeft - minutes * 60;
        timeStr = (minutes >= 10 ? '' + minutes : '0' + minutes) + ':' + (seconds >= 10 ? '' + seconds : '0' + seconds);
        document.getElementById('time-display').innerHTML = timeStr;
        document.getElementById('time-display').style.color = secondsLeft > 10 ? '#666666' : '#ffffff';
        document.getElementById('time-display').style['display'] = 'block';
    };

    that.hideTimeDisplay = function hideTimeDisplay(time) {
        document.getElementById('time-display').style['display'] = 'none';
    };

    that.updateScore = function updateScore(armyIndex, armyPower, scoringPixels) {
        var score, scoreText, powerWidth;
        document.getElementById('gol-army-score-' + armyIndex).style['color'] = (scoringPixels === 0) ? '#' + that.colorsHex[armyIndex] : '#fff';
        document.getElementById('gol-army-power-' + armyIndex).style['background-color'] = (scoringPixels === 0) ? '#' + that.colorsHex[armyIndex] : '#fff';
        score = Math.round(armyPower);
        if (score === 0 && armyPower > 0) {
            score = 1;
        }
        scoreText = '' + score;
        document.getElementById('gol-army-score-' + armyIndex).innerHTML = scoreText;
        powerWidth = Math.round(armyPower / that.settings.powerMaxValue * that.powerBarMaxWidth);
        if (powerWidth === 0 && armyPower > 0) {
            powerWidth = 1;
        }
        document.getElementById('gol-army-power-' + armyIndex).style['width'] = powerWidth + 'px';
    };

    that.endRoundByDraw = function endRoundByDraw()  {
        var i;
        for (i = 0; i < 2; i++) {
            document.getElementById('gol-army-score-' + i).style['color'] = '#' + that.colorsHex[i];
            document.getElementById('gol-army-power-' + i).style['background-color'] = '#' + that.colorsHex[i];
        }
        that.ctx.clearRect(0, 0, that.cols, that.rows);
        that.ctx.textAlign = 'center';
        that.ctx.fillStyle = 'rgb(66, 66, 66)';
        that.ctx.font = '14px visitor';
        that.ctx.fillText('DRAW', that.cols / 2, that.rows / 2);
    };

    that.endRound = function endRound(round, roundWins, armies, winnerIndex)  {
        var i;
        that.hideTimeDisplay();
        for (i = 0; i < 2; i++) {
            document.getElementById('gol-army-score-' + i).style['color'] = '#' + that.colorsHex[i];
            document.getElementById('gol-army-power-' + i).style['background-color'] = '#' + that.colorsHex[i];
        }
        that.ctx.clearRect(0, 0, that.cols, that.rows);
        that.ctx.textAlign = 'center';
        that.ctx.fillStyle = 'rgb(' + armies[1].color[0] + ',' + armies[1].color[1] + ',' + armies[1].color[2] + ')';
        that.ctx.font = (winnerIndex === 1) ? '24px visitor' : '14px visitor';
        that.ctx.fillText(armies[1].name + ' : ' + roundWins[1], that.cols / 2, that.rows / 2 - 12);
        that.ctx.fillStyle = 'rgb(' + armies[0].color[0] + ',' + armies[0].color[1] + ',' + armies[0].color[2] + ')';
        that.ctx.font = (winnerIndex === 0) ? '24px visitor' : '14px visitor';
        that.ctx.fillText(armies[0].name + ' : ' + roundWins[0], that.cols / 2, that.rows / 2 + 12);
    };

    that.endGame = function endGame(armies, winnerIndex, roundWins) {
        var winnerRoundCount = roundWins[winnerIndex];
        var loserRoundCount = roundWins[winnerIndex*-1+1];
        document.getElementById('gol-army-stats-0').style['visibility'] = 'hidden';
        document.getElementById('gol-army-stats-1').style['visibility'] = 'hidden';
        that.ctx.clearRect(0, 0, that.cols, that.rows);
        that.ctx.textAlign = 'center';
        that.ctx.font = '14px visitor';
        that.ctx.fillStyle = 'rgb(255, 255, 255)';
        that.ctx.fillText('winner ( ' + winnerRoundCount + ' : ' + loserRoundCount + ' )', that.cols / 2, that.rows / 2 - 12);
        that.ctx.font = '24px visitor';
        that.ctx.fillStyle = 'rgb(' + armies[winnerIndex].color[0] + ',' + armies[winnerIndex].color[1] + ',' + armies[winnerIndex].color[2] + ')';
        that.ctx.fillText(armies[winnerIndex].name, that.cols / 2, that.rows / 2 + 12);
    };

}