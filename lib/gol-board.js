function GolBoard() {

    var that = this;

    that.init = function init(settings) {
        var i;
        that.settings = settings;
        that.cols = settings.cols;
        that.rows = settings.rows;
        that.points = that.cols * that.rows;
        that.arrays = [[], []];
        for (i = 0; i < that.points; i++) {
            that.arrays[0][i] = that.arrays[1][i] = -1;
        }
    };

    that.getIndex = function getIndex(x, y) {
        return y * that.cols + x;
    };

    that.getX = function getX(index) {
        return index % that.cols;
    };

    that.getY = function getY(index) {
        return Math.floor(index / that.cols);
    };

    that.getAdjacentIndexes = function getAdjacentIndexes(index) {
        var indices = [],
            x = index % that.cols,
            y = Math.floor(index / that.cols),
            cols = that.cols,
            rows = that.rows;
        if ((y - 1) >= 0 && (x - 1) >= 0) {
            indices.push((y - 1) * cols + (x - 1));
        }
        if ((y - 1) >= 0) {
            indices.push((y - 1) * cols + (x));
        }
        if ((y - 1) >= 0 && (x + 1) <= (cols - 1)) {
            indices.push((y - 1) * cols + (x + 1));
        }
        if ((x - 1) >= 0) {
            indices.push((y) * cols + (x - 1));
        }
        if ((x + 1) <= (cols - 1)) {
            indices.push((y) * cols + (x + 1));
        }
        if ((y + 1) <= (rows - 1) && (x - 1) >= 0) {
            indices.push((y + 1) * cols + (x - 1));
        }
        if ((y + 1) <= (rows - 1)) {
            indices.push((y + 1) * cols + (x));
        }
        if ((y + 1) <= (rows - 1) && (x + 1) <= (cols - 1)) {
            indices.push((y + 1) * cols + (x + 1));
        }
        return indices;
    };

    that.getAdjacentIndexesByXY = function getAdjacentIndexesByXY(x, y) {
        return that.getAdjacentIndexes(y * that.cols + x);
    };

    that.computeNextState = function computeNextState(array1, array2) {
        var i, a, j, n, v, c0, adjacents;
        for (i = 0; i < that.points; i++) {
            n = 0;
            c0 = 0;
            adjacents = that.getAdjacentIndexes(i);
            for (a = 0; a < adjacents.length; a++) {
                j = adjacents[a];
                if (array1[j] === 0) {
                    n++;
                    c0++;
                } else if (array1[j] === 1) {
                    n++;
                }
            }
            v = array1[i];
            if ((v === 0 || v === 1) && (n < 2 || n > 3))  {
                array2[i] = -1;
            } else if (v === -1 && n === 3) {
                array2[i] = (c0 >= 2) ? 0 : 1;
            } else {
                array2[i] = v;
            }
        }
    };

    that.adjustNewPixels = function adjustNewPixels(pixels) {
        var i, j, x, y, adjustedPixels;
        adjustedPixels = [[],[]];
        for (i = 0; i < pixels.length; i++) {
            for (j = 0; j < pixels[i].length; j++) {
                x = pixels[i][j][0];
                y = pixels[i][j][1];
                if (x >= 0 && x < that.cols && y >= 0 && y < that.rows / 2) {
                    y = (i === 0) ? that.rows / 2 + y : that.rows / 2 - 1 - y;
                    adjustedPixels[i].push([x,y]);
                } else {
                    _err('New pixel out of range! ArmyIndex: ' + i + ', X: ' + pixels[i][j][0] + ', Y: ' + pixels[i][j][1]);
                }
            }
        }
        return adjustedPixels;
    };

    that.getNewPixelIndices = function getNewPixelIndices(pixels) {
        var i, j, v, pixelIndices;
        pixelIndices = [[],[]];
        for (i = 0; i < pixels.length; i++) {
            for (j = 0; j < pixels[i].length; j++) {
                v = (i == 0)
                    ? that.getIndex(pixels[i][j][0], that.rows / 2 + pixels[i][j][1])
                    : that.getIndex(pixels[i][j][0], that.rows / 2 - 1 - pixels[i][j][1]);
                if (v < 0 || v > that.points) {
                    _err('new pixel out of range');
                } else {
                    pixelIndices[i][j] = v;
                }
            }
        }
        return pixelIndices;
    };

    that.placeNewPixelsOnBoard = function placeNewPixelsOnBoard(array, pixels) {
        var i, j;
        for (i = 0; i < pixels.length; i++) {
            for (j = 0; j < pixels[i].length; j++) {
                array[pixels[i][j][1] * that.cols + pixels[i][j][0]] = i;
            }
        }
    };

    that.countScoringPixels = function countScoringPixels(array) {
        var a, r, c, i;
        var scoringPixels = [0, 0];
        for (a = 0; a < 2; a++) {
            r = a === 0 ? 0 : that.rows - 1;
            for (c = 0; c < that.cols; c++) {
                i = r * that.cols + c;
                if (array[i] === a) {
                    scoringPixels[a]++;
                }
            }
        }
        return scoringPixels;
    };

    that.deleteScoringPixels = function deleteScoringPixels(array) {
        var a, r, c, i, adjs, j;
        for (a = 0; a < 2; a++) {
            r = a === 0 ? 0 : that.rows - 1;
            for (c = 0; c < that.cols; c++) {
                i = r * that.cols + c;
                if (array[i] === a) {
                    array[i] = -1;
                    adjs = that.getAdjacentIndexes(i);
                    for (j = 0; j < adjs.length; j++) {
                        if (array[adjs[j]] === a) {
                            array[adjs[j]] = -1;
                        }
                    }
                }
            }
        }
    };

}