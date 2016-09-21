(function() {

    function GolGame() {

        var that = this;

        that.init = function init(settings) {
            var m;
            _dbg('init()');
            that.settings = settings;
            that.htmlHelper = new GolHtmlHelper();
            that.htmlHelper.init(settings);
            that.srcIndices = [-1, -1];
            that.armies = [];
            that.isTournament = false;
            that.round = 0;
            that.roundWins = [0, 0];
            that.lastWinner = '';
            that.hitSounds = [
                {file: 'explosion1.mp3', volume: 1},
                {file: 'explosion2.mp3', volume: 1},
                {file: 'explosion3.mp3', volume: 1},
                {file: 'explosion4.mp3', volume: 1},
                {file: 'explosion5.mp3', volume: 1},
                {file: 'explosion6.mp3', volume: 1},
                {file: 'explosion7.mp3', volume: 1},
                {file: 'explosion8.mp3', volume: 1},
                {file: 'explosion9.mp3', volume: 1}
            ];
            that.selectSourceSound = {file: 'explosion1.mp3', volume: 1};
            that.armyVsArmySound = {file: 'explosion1.mp3', volume: 1};
            that.startRoundSound = {file: 'explosion1.mp3', volume: 1};
            that.endRoundSound = {file: 'explosion1.mp3', volume: 1};
            that.endGameSound = {file: 'explosion1.mp3', volume: 1};
            that.musicFiles = [
                {file: 'terminator_genisys.mp3', volume: 1},
                {file: 'dark_knight_rises.mp3', volume: 1},
                {file: 'wonder_woman.mp3', volume: 1},
                {file: 'transformers.mp3', volume: 1},
                {file: 'fury_road.mp3', volume: 1},
                {file: 'battleship.mp3', volume: 1},
                {file: 'blade_runner.mp3', volume: 1},
                {file: 'battlestar_galactica.mp3', volume: 1}
            ];
            m = (localStorage.getItem('game-of-life-music-index') || 0) % that.musicFiles.length;
            that.music = that.musicFiles[m];
            that.playMusic(that.music);
            m = (m + 1) % that.musicFiles.length;
            localStorage.setItem('game-of-life-music-index', m);
            window.toggleSrc = that.toggleSrc;
            window.loadSources = that.loadSources;
            window.registerArmy = that.registerArmy;
            window.startGame = that.startGame;
        };

        that.startGame = function startGame(isTournament) {
            _dbg('startGame()');
            that.isTournament = !!isTournament;
            that.settings.isTournament = that.isTournament;
            _log('tournament: ' + that.isTournament);
            if (that.isTournament) {
                that.htmlHelper.fadeInLoadSourcesPanel();
                that.htmlHelper.markSrcLines(that.srcIndices);
            } else {
                that.waitForArmies();
            }
        };

        that.toggleSrc = function toggleSrc(srcInput) {
            var senderInd = srcInput.attributes['src-ind'].value;
            if (that.srcIndices[1] === senderInd) {
                that.srcIndices[1] = -1;
            } else if (that.srcIndices[0] === senderInd) {
                that.srcIndices[0] = -1;
            } else if (that.srcIndices[1] === -1) {
                that.srcIndices[1] = senderInd;
            } else if (that.srcIndices[0] === -1) {
                that.srcIndices[0] = senderInd;
            }
            that.htmlHelper.markSrcLines(that.srcIndices);
            that.playSound(that.selectSourceSound);
        };

        that.loadSources = function loadSources() {
            that.playSound(that.startRoundSound);
            that.htmlHelper.hideLoadSourcesPanel();
            that.htmlHelper.loadSource(that.srcIndices[0]);
            setTimeout(function() {
                that.htmlHelper.loadSource(that.srcIndices[1]);
                that.waitForArmies();
            }, 1000);
        };

        that.registerArmy = function registerArmy(data) {
            var army = new GolArmy(that.armies.length, data.name, data.icon, data.cb, that.settings.colorsRGB[that.armies.length], that.settings.powerMaxValue, 0);
            _dbg('registerArmy()');
            _log('army name: ' + data.name + ', icon: ' + data.icon);
            that.armies.push(army);
            _dbg('number of armies: ' + that.armies.length);
        };

        that.waitForArmies = function waitForArmies() {
            _dbg('waitForArmies()');
            if (that.armies.length < 2) {
                _log('waiting for armies...');
                setTimeout(that.waitForArmies, 500);
            } else {
                if (that.isTournament) {
                    that.showArmyVsArmyIntro();
                } else {
                    that.startRound();
                }
            }
        };

        that.showArmyVsArmyIntro = function showArmyVsArmyIntro() {
            that.playSound(that.armyVsArmySound);
            that.htmlHelper.showArmyVsArmyPanel(that.armies);
            setTimeout(that.hideArmyVsArmyIntro, that.settings.millisArmyVsArmyMessageDuration);
        };

        that.hideArmyVsArmyIntro = function hideArmyVsArmyIntro() {
            that.playSound(that.startRoundSound);
            that.htmlHelper.hideArmyVsArmyPanel();
            setTimeout(that.startRound, 1000);
        };

        that.startRound = function startRound() {
            var i;
            _dbg('startRound()');
            that.playSound(that.startRoundSound);
            that.round++;
            for (i = 0; i < 2; i++) {
                that.armies[i].power = that.settings.powerMaxValue;
                that.armies[i].budget = that.settings.initialBudget;
            }
            that.board = new GolBoard();
            that.board.init(that.settings);
            that.newPixels = [[], []];
            that.newPixelsAge = [0, 0];
            that.generation = 0;
            if (that.round === 1) {
                that.htmlHelper.drawUserInterface(that.armies);
            }
            that.roundStartTime = (new Date()).getTime();
            that.secondsLeft = that.settings.secondsMaxRoundDuration;
            that.htmlHelper.updateTimeDisplay(that.secondsLeft);
            //setTimeout(that.onGeneration, 0);
            requestAnimationFrame(that.onGeneration);
        };

        that.onGeneration = function onGeneration() {
            var curArray, nxtArray, newPixels, scoringPixelCount, roundEnded;
            //_dbg('onGeneration()');
            that.generation++;
            curArray = that.board.arrays[(that.generation % 2) * (-1) + 1];
            nxtArray = that.board.arrays[that.generation % 2];
            that.board.computeNextState(curArray, nxtArray);
            scoringPixelCount = that.board.countScoringPixels(nxtArray);
            that.handleScore(scoringPixelCount);
            that.updateTime();
            roundEnded = that.armies[0].power <= 0 || that.armies[1].power <= 0 || that.secondsLeft <= 0;
            newPixels = that.getNewPixels();
            that.newPixelsAge[0]++;
            that.newPixelsAge[1]++;
            that.board.placeNewPixelsOnBoard(nxtArray, newPixels);
            if (!roundEnded) {
                that.htmlHelper.drawArrayToCanvas(nxtArray, that.newPixels, that.newPixelsAge, scoringPixelCount, that.armies, roundEnded);
                that.board.deleteScoringPixels(nxtArray);
                //setTimeout(that.onGeneration, 0);
                requestAnimationFrame(that.onGeneration);
            } else {
                that.htmlHelper.drawArrayToCanvas(nxtArray, that.newPixels, that.newPixelsAge, scoringPixelCount, that.armies, roundEnded);
                setTimeout(that.endRound, that.settings.millisEndRoundBoardFreezeDuration);
            }
        };

        that.updateTime = function updateTime() {
            var millisPassed, secondsPassed, secondsLeft;
            millisPassed = (new Date()).getTime() - that.roundStartTime;
            secondsPassed = Math.floor(millisPassed / 1000);
            secondsLeft = Math.max(0, that.settings.secondsMaxRoundDuration - secondsPassed);
            if (secondsLeft !== that.secondsLeft) {
                that.secondsLeft = secondsLeft;
                that.htmlHelper.updateTimeDisplay(that.secondsLeft);
            }
            return secondsLeft;
        };

        that.endRound = function endRound() {
            var winnerIndex;
            _dbg('endRound()');
            that.playSound(that.endRoundSound);
            if (that.armies[0].power === that.armies[1].power) {
                _log('draw');
                that.htmlHelper.endRoundByDraw();
            } else {
                winnerIndex = (that.armies[0].power > that.armies[1].power) ? 0 : 1;
                _log(that.armies[winnerIndex].name + ' wins');
                that.lastWinner = that.armies[winnerIndex].name;
                that.roundWins[winnerIndex]++;
                that.htmlHelper.endRound(that.round, that.roundWins, that.armies, winnerIndex);
            }
            if (that.roundWins[0] < that.settings.winRoundLimit && that.roundWins[1] < that.settings.winRoundLimit) {
                setTimeout(that.restartRound, that.settings.millisEndRoundMessageDuration);
            } else {
                setTimeout(that.endGame, that.settings.millisEndRoundMessageDuration);
            }
        };

        that.restartRound = function restartRound() {
            that.round++;
            that.startRound();
        };

        that.endGame= function endGame() {
            var winnerIndex;
            _dbg('endGame()');
            that.playSound(that.endGameSound);
            winnerIndex = (that.armies[1].power <= 0) ? 0 : 1;
            that.htmlHelper.endGame(that.armies, winnerIndex, that.roundWins);
        };

        that.getNewPixels = function getNewPixels() {
            var i, pixels, adjustedPixels;
            pixels = [[], []];
            adjustedPixels = [[], []];
            for (i = 0; i < 2; i++) {
                that.armies[i].budget += that.settings.budgetTickQuantum;
                pixels[i] = that.armies[i].cb(
                    {
                        generation: that.generation,
                        cols: that.board.cols,
                        rows: that.board.rows / 2,
                        budget: that.armies[i].budget
                    });
                if (that.armies[i].budget >= pixels[i].length) {
                    that.armies[i].budget -= pixels[i].length;
                } else {
                    _err('Budget exceeded. ArmyName: ' + that.armies[i].name);
                    pixels[i] = [];
                }
                if (pixels[0].length > 0 || pixels[1].length > 0) {
                    adjustedPixels = that.board.adjustNewPixels(pixels);
                }
            }
            for (i = 0; i < 2; i++) {
                if (adjustedPixels[i].length > 0) {
                    that.newPixels[i] = adjustedPixels[i];
                    that.newPixelsAge[i] = 0;
                }
            }
            return adjustedPixels;
        };

        that.playMusic = function playMusic(music) {
            var audio = new Audio(that.settings.remotePlatformLocationRawGit + '/music/' + music.file);
            audio.volume = music.volume;
            audio.loop = true;
            audio.play();
        };

        that.playSound = function playSound(sound) {
            var audio = new Audio(that.settings.remotePlatformLocationRawGit + '/sound/' + sound.file);
            audio.volume = sound.volume;
            audio.play();
        };

        that.handleScore = function handleScore(scoringPixelsCount) {
            if (scoringPixelsCount[0] !== 0 || scoringPixelsCount[1] !== 0) {
                that.playSound(that.hitSounds[Math.floor(Math.random() * that.hitSounds.length)]);
                that.htmlHelper.shake();
                that.armies[1].power -= scoringPixelsCount[0] * that.settings.powerHitQuantum;
                that.armies[0].power -= scoringPixelsCount[1] * that.settings.powerHitQuantum;
                if (scoringPixelsCount[0] !== 0) {
                    _log(that.armies[0].name + ' scores');
                }
                if (scoringPixelsCount[1] !== 0) {
                    _log(that.armies[1].name + ' scores');
                }
            }
            that.armies[0].power = Math.max(that.armies[0].power, 0);
            that.armies[1].power = Math.max(that.armies[1].power, 0);
            that.htmlHelper.updateScore(that.armies[0].index, that.armies[0].power, scoringPixelsCount[1]);
            that.htmlHelper.updateScore(that.armies[1].index, that.armies[1].power, scoringPixelsCount[0]);
        };

    }

    var game = new GolGame();
    game.init(new GolSettings());

})();
