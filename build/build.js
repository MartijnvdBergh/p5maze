var LinePixel = (function () {
    function LinePixel(width, height) {
        if (height === void 0) { height = width; }
        this.sharedLinePixelType = 0;
        this.random = true;
        this.lerpAmount = 0;
        this.lerpStep = 0.02;
        this.linePixelTypeOptions = [];
        this.sharedLinePixelTypeOptions = [0, 1];
        this.addPoints = false;
        this.width = width;
        this.height = height;
        if (this.addPoints) {
            this.linePixelTypeOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        }
        else {
            this.linePixelTypeOptions = [0, 1, 2, 3, 4, 5];
        }
        this.calculateRandomPixelType();
        this.calculateVectors();
        this.draw(this.vector1, this.vector2);
        this.calculateNextRandomPixelType();
        this.calculateNewVectors();
    }
    LinePixel.prototype.draw = function (vector1, vector2) {
        line(vector1.x, vector1.y, vector2.x, vector2.y);
    };
    LinePixel.prototype.updateVectors = function () {
        var lerpVector1 = p5.Vector.lerp(this.vector1, this.newVector1, this.lerpAmount);
        var lerpVector2 = p5.Vector.lerp(this.vector2, this.newVector2, this.lerpAmount);
        this.lerpAmount += this.lerpStep;
        if (this.lerpAmount > 1) {
            this.vector1 = this.newVector1;
            this.vector2 = this.newVector2;
            this.linePixelType = this.nextLinePixelType;
        }
        if (this.lerpAmount > 2) {
            this.calculateNextRandomPixelType();
            this.calculateNewVectors();
            this.random = !this.random;
            if (this.random) {
                this.sharedLinePixelType++;
                if (this.sharedLinePixelType > this.sharedLinePixelTypeOptions.length - 1) {
                    this.sharedLinePixelType = 0;
                }
                this.calculateNextRandomPixelType();
                this.calculateNewVectors();
            }
            else {
                this.calculateNextPixelType();
                this.calculateNewVectors();
            }
            this.lerpAmount = 0;
        }
        this.draw(lerpVector1, lerpVector2);
    };
    LinePixel.prototype.setStrokeWeight = function (linePixelStrokeWeight) {
        strokeWeight(linePixelStrokeWeight);
    };
    LinePixel.prototype.calculateNextRandomPixelType = function () {
        this.nextLinePixelType = random(this.linePixelTypeOptions);
        if (this.linePixelType === this.nextLinePixelType) {
            this.calculateNextRandomPixelType();
        }
    };
    LinePixel.prototype.calculateNextPixelType = function () {
        this.nextLinePixelType = this.sharedLinePixelType;
        if (this.nextLinePixelType > this.linePixelTypeOptions.length - 1) {
            this.nextLinePixelType = 0;
        }
    };
    LinePixel.prototype.calculateRandomPixelType = function () {
        this.linePixelType = random(this.linePixelTypeOptions);
    };
    LinePixel.prototype.setFirstVector = function (x1, y1) {
        this.vector1 = createVector(x1, y1);
    };
    LinePixel.prototype.setSecondVector = function (x2, y2) {
        this.vector2 = createVector(x2, y2);
    };
    LinePixel.prototype.setNewFirstVector = function (x1, y1) {
        this.newVector1 = createVector(x1, y1);
    };
    LinePixel.prototype.setNewSecondVector = function (x2, y2) {
        this.newVector2 = createVector(x2, y2);
    };
    LinePixel.prototype.calculateVectors = function () {
        switch (this.linePixelType) {
            case LinePixelType.TopLeftBottomRight:
                this.setFirstVector(0, 0);
                this.setSecondVector(this.width, this.height);
                break;
            case LinePixelType.TopRightBottomLeft:
                this.setFirstVector(this.width, 0);
                this.setSecondVector(0, this.height);
                break;
            case LinePixelType.TopLeftTopRight:
                this.setFirstVector(0, 0);
                this.setSecondVector(this.width, 0);
                break;
            case LinePixelType.BottomLeftBottomRight:
                this.setFirstVector(0, this.height);
                this.setSecondVector(this.width, this.height);
                break;
            case LinePixelType.TopLeftBottomLeft:
                this.setFirstVector(0, 0);
                this.setSecondVector(0, this.height);
                break;
            case LinePixelType.TopRightBottomRight:
                this.setFirstVector(this.width, 0);
                this.setSecondVector(this.width, this.height);
                break;
            case LinePixelType.TopLeft:
                this.setFirstVector(0, 0);
                this.setSecondVector(0, 0);
                break;
            case LinePixelType.TopRight:
                this.setFirstVector(this.width, 0);
                this.setSecondVector(this.width, 0);
                break;
            case LinePixelType.BottomLeft:
                this.setFirstVector(0, this.height);
                this.setSecondVector(0, this.height);
                break;
            case LinePixelType.BottomRight:
                this.setFirstVector(this.width, this.height);
                this.setSecondVector(this.width, this.height);
                break;
        }
    };
    LinePixel.prototype.calculateNewVectors = function () {
        switch (this.nextLinePixelType) {
            case LinePixelType.TopLeftBottomRight:
                this.setNewFirstVector(0, 0);
                this.setNewSecondVector(this.width, this.height);
                break;
            case LinePixelType.TopRightBottomLeft:
                this.setNewFirstVector(this.width, 0);
                this.setNewSecondVector(0, this.height);
                break;
            case LinePixelType.TopLeftTopRight:
                this.setNewFirstVector(0, 0);
                this.setNewSecondVector(this.width, 0);
                break;
            case LinePixelType.BottomLeftBottomRight:
                this.setNewFirstVector(0, this.height);
                this.setNewSecondVector(this.width, this.height);
                break;
            case LinePixelType.TopLeftBottomLeft:
                this.setNewFirstVector(0, 0);
                this.setNewSecondVector(0, this.height);
                break;
            case LinePixelType.TopRightBottomRight:
                this.setNewFirstVector(this.width, 0);
                this.setNewSecondVector(this.width, this.height);
                break;
            case LinePixelType.TopLeft:
                this.setNewFirstVector(0, 0);
                this.setNewSecondVector(0, 0);
                break;
            case LinePixelType.TopRight:
                this.setNewFirstVector(this.width, 0);
                this.setNewSecondVector(this.width, 0);
                break;
            case LinePixelType.BottomLeft:
                this.setNewFirstVector(0, this.height);
                this.setNewSecondVector(0, this.height);
                break;
            case LinePixelType.BottomRight:
                this.setNewFirstVector(this.width, this.height);
                this.setNewSecondVector(this.width, this.height);
                break;
        }
    };
    return LinePixel;
}());
var amountOfWidthPixels;
var amountOfHeightPixels;
var padding;
var linePixels = [];
var strokeWeightSlider;
var amountOfWidthPixelsSlider;
var amountOfHeightPixelsSlider;
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    padding = 150;
    createCanvas(1080, 1350);
    stroke(255);
    setupControls();
    amountOfWidthPixels = 2;
    amountOfHeightPixels = 2;
    translate(padding, padding);
    createGrid(amountOfWidthPixels, amountOfHeightPixels);
}
function setupControls() {
    strokeWeightSlider = createSlider(1, 600, 50);
    strokeWeightSlider.position(10, 10);
    strokeWeightSlider.style('width', '400px');
    amountOfWidthPixelsSlider = createSlider(1, 40, 2);
    amountOfWidthPixelsSlider.position(10, 40);
    amountOfWidthPixelsSlider.style('width', '400px');
    amountOfHeightPixelsSlider = createSlider(1, 40, 3);
    amountOfHeightPixelsSlider.position(10, 70);
    amountOfHeightPixelsSlider.style('width', '400px');
}
function draw() {
    var linePixelStrokeWeight = strokeWeightSlider.value();
    amountOfWidthPixels = +amountOfWidthPixelsSlider.value();
    amountOfHeightPixels = +amountOfHeightPixelsSlider.value();
    if (millis() > 1000) {
        background(0);
        translate(padding, padding);
        linePixels.forEach(function (rowOfLinePixels, xIndex) {
            rowOfLinePixels.forEach(function (linePixel, yIndex) {
                push();
                translate(linePixel.width * xIndex, linePixel.height * yIndex);
                linePixel.setStrokeWeight(+linePixelStrokeWeight);
                linePixel.updateVectors();
                pop();
            });
        });
    }
}
function mouseReleased() {
    linePixels = [];
    createGrid(amountOfWidthPixels, amountOfHeightPixels);
}
function getGridWidth() {
    return width - padding * 2;
}
function getGridHeight() {
    return height - padding * 2;
}
function createGrid(amountOfWidthPixels, amountOfHeightPixels) {
    if (amountOfHeightPixels === void 0) { amountOfHeightPixels = amountOfWidthPixels; }
    var gridWidth = getGridWidth();
    var gridHeight = getGridHeight();
    var pixelWidth = gridWidth / amountOfWidthPixels;
    var pixelHeight = gridHeight / amountOfHeightPixels;
    background(0);
    for (var x = 0; x < amountOfWidthPixels; x++) {
        linePixels[x] = [];
        for (var y = 0; y < amountOfHeightPixels; y++) {
            push();
            translate(x * pixelWidth, y * pixelHeight);
            var linePixel = new LinePixel(pixelWidth, pixelHeight);
            linePixels[x][y] = linePixel;
            pop();
        }
    }
    console.log(linePixels);
}
var LinePixelType;
(function (LinePixelType) {
    LinePixelType[LinePixelType["TopLeftBottomRight"] = 0] = "TopLeftBottomRight";
    LinePixelType[LinePixelType["TopRightBottomLeft"] = 1] = "TopRightBottomLeft";
    LinePixelType[LinePixelType["TopLeftTopRight"] = 2] = "TopLeftTopRight";
    LinePixelType[LinePixelType["BottomLeftBottomRight"] = 3] = "BottomLeftBottomRight";
    LinePixelType[LinePixelType["TopLeftBottomLeft"] = 4] = "TopLeftBottomLeft";
    LinePixelType[LinePixelType["TopRightBottomRight"] = 5] = "TopRightBottomRight";
    LinePixelType[LinePixelType["TopLeft"] = 6] = "TopLeft";
    LinePixelType[LinePixelType["TopRight"] = 7] = "TopRight";
    LinePixelType[LinePixelType["BottomLeft"] = 8] = "BottomLeft";
    LinePixelType[LinePixelType["BottomRight"] = 9] = "BottomRight";
})(LinePixelType || (LinePixelType = {}));
//# sourceMappingURL=build.js.map