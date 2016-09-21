//IMPROVE THIS CODE

(function () {
    function getRnd(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function tryPlaceHorizontal(data) {
        var defence = [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1];
        var pixels = [];
        var r, c;
        if (data.budget >= defence.length) {
            console.log('=== horizontal', horizontalCounter++);
            //horizontalCounter++;
            //c = Math.floor((data.cols / 6) * horizontalCounter);
            c = horizontalC;
            horizontalC += defence.length * 2;
            r = Math.floor((data.rows / 3) * 2);
            for (var i = 0; i < defence.length; i++) {
                c++;
                if (defence[i]) pixels.push([c, r]);
            }
        }
        return pixels;
    }

    function tryPlaceBomb(data) {
        var pixels = [];
        var r, c;
        if (data.budget >= 4) {
            c = getRnd(1, data.cols - 1);
            r = 10;
            pixels.push([c, r]);
            pixels.push([c - 1, r]);
            pixels.push([c + 1, r]);
            pixels.push([c, r + 1]);
        }
        return pixels;
    }

    function tryPlaceBigBomb(data) {
        if (bigBombC > data.cols - 5) {
            bigBombC = 0;
        }
        var pixels = [];
        var r, c;
        if (data.budget >= 8) {
            c = getRnd(3, data.cols - 10);
            r = 0;
            pixels.push([c, r]);
            pixels.push([c - 1, r]);
            pixels.push([c + 1, r]);
            pixels.push([c, r + 1]);

            c += 6;

            pixels.push([c, r]);
            pixels.push([c - 1, r]);
            pixels.push([c + 1, r]);
            pixels.push([c, r + 1]);

        }
        return pixels;
    }

    function tryPlaceGliderGun(data) {

    }

    function tryPlaceMine(data) {
        var pixels = [];
        var r, c;
        if (data.budget >= 4) {
            console.log('=== mine', mineCounter++);
            mineC = (mineC + 6) % data.cols;
            if (mineC < 6) {
                mineR -= 6;
            }
            c = mineC;
            r = mineR;
            pixels.push([c, r]);
            pixels.push([c, r + 1]);
            pixels.push([c + 1, r]);
            pixels.push([c + 1, r + 1]);
        }
        return pixels;
    }

    function tryPlaceGlider(data) {
        var pixels = [];
        var r, c;
        if (data.budget >= 5) {

            c = Math.floor(Math.random() * (data.cols - 2));
            r = 0;
            pixels.push([c, r]);
            pixels.push([c + 1, r]);
            pixels.push([c + 2, r]);
            pixels.push(Math.floor(Math.random() * 2) === 0 ? [c, r + 1] : [c + 2, r + 1]);
            pixels.push([c + 1, r + 2]);
        }
        return pixels;
    }

    function tryPlaceSpaceship(data) {
        var pixels = [];
        if (data.budget >= 9) {
            console.log('=== spaceship', spaceshipCounter++);
            spaceshipC = (spaceshipC + 1) % spaceshipCArr.length;
            var c = data.generation < 600 ? spaceshipCArr[spaceshipC] : getRnd(0, data.cols - 4);
            var r = 0;
            pixels.push([c, r]);
            pixels.push([c + 1, r]);
            pixels.push([c + 2, r]);
            pixels.push([c, r + 1]);
            pixels.push([c + 3, r + 1]);
            pixels.push([c, r + 2]);
            pixels.push([c, r + 3]);
            pixels.push([c + 1, r + 4]);
            pixels.push([c + 3, r + 4]);

        }
        return pixels;
    }

    var getPixels = function (data, pattern) {
        var pixels = null;
        switch (pattern) {
            case 'mine':
                pixels = tryPlaceMine(data);
                break;
            case 'glider':
                pixels = tryPlaceGlider(data);
                break;
            case 'spaceship':
                pixels = tryPlaceSpaceship(data);
                break;
            case 'bomb':
                pixels = tryPlaceBomb(data);
                break;
            case 'bigBomb':
                pixels = tryPlaceBigBomb(data);
                break;
            case 'horizontal':
                pixels = tryPlaceHorizontal(data);
                break;
            default:
                pixels = tryPlaceMine(data);
        }
        for (var i = 0; i < pixels.length; i++) {
            if (pixels[i][0] > data.cols || pixels[i][0] < 0 || pixels[i][1] > data.rows || pixels[i][1] < 0) {
                console.error('=== ', pattern, pixels);
            }
        }
        return pixels;
    };
    var spaceshipBudget = 9;
    var horizontalBudget = 28;
    var gliderBudget = 4;
    var mineBudget = 4;

    var ph1 = spaceshipBudget * 10;
    var ph2 = horizontalBudget * 6;
    var ph3 = spaceshipBudget * 20;
    var ph4 = mineBudget * 70;

    function getPlan(generation) {
        var plan = [
            'horizontal',
            'glider',
            'spaceship',
            'mine',
            'bomb',
            'bigBomb'
        ];

        if (generation <= ph1*3) {
            plan = ['spaceship'];
        } else if (generation <= ph1 + ph2) {
            plan = ['spaceship'];
        } else if (generation <= ph1 + ph2 + ph3) {
            plan = ['spaceship'];
        } else if (generation <= ph1 + ph2 + ph3 + ph4) {
            plan = ['mine'];
        } else {
            plan = ['spaceship', 'glider', 'bomb', 'mine'];
        }
        return plan;
    }

    //REGISTER ARMY
    setTimeout(function registerArmy() {
        window.registerArmy({
            name: 'vik2',
            icon: 'user',
            cb: cb
        });
    }, 0);

    //ALGORITHM CODE
    var planIndex;
    var mineC, mineR, mineCounter;
    var horizontalC, horizontalCounter;
    var bigBombC;
    var spaceshipCArr, spaceshipC, spaceshipCounter;

    var initVars = function (rows, cols) {
        planIndex = 0;
        mineC = 0;
        mineR = rows - 5;
        mineCounter = 0;
        horizontalC = 10;
        horizontalCounter = 0;
        bigBombC = 0;
        spaceshipCArr = [2,cols - 13,10, cols - 5];
        spaceshipC = 0;
        spaceshipCounter = 0;
    };
    initVars(100, 400);
    function cb(data) {
        if (data.generation === 1) {
            initVars(data.rows, data.cols);
        }

        var plan = getPlan(data.generation);

        var pixels = getPixels(data, plan[planIndex]);

        if (pixels && pixels.length > 0) {
            if (data.budget < pixels.length) {
                console.error('=== didn\'t use all budget', data.budget, pixels.length)
            }
            planIndex = (planIndex + 1) % plan.length;
        }
        return pixels;
    }
})();
