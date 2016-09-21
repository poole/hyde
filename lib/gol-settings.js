function GolSettings() {

    var that = this;

    that.isTournament = true;

    that.colorsRGB = [ [0x11, 0xFF, 0xCC], [0xFF, 0x33, 0x33] ];

    that.cols = 400;
    that.rows = 200;

    that.powerMaxValue = 100;
    that.powerHitQuantum = 5;

    that.initialBudget = 0;
    that.budgetTickQuantum = 1;

    that.secondsMaxRoundDuration = 60;

    that.millisArmyVsArmyMessageDuration = 3000;
    that.millisEndRoundBoardFreezeDuration = 3000;
    that.millisEndRoundMessageDuration = 3000;

    that.winRoundLimit = 3;

    that.remotePlatformLocationRawGit = 'https://rawgit.com/HpeAlgoComp/game-of-life/master/platform';
}