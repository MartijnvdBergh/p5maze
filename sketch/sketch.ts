// GLOBAL VARS & TYPES
let amountOfWidthPixels: number;
let amountOfHeightPixels: number;
let padding: number;
let linePixels: LinePixel[][] = [];
let strokeWeightSlider: p5.Element;
let amountOfWidthPixelsSlider: p5.Element;
let amountOfHeightPixelsSlider: p5.Element;

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
    const linePixelStrokeWeight = strokeWeightSlider.value();
    amountOfWidthPixels = +amountOfWidthPixelsSlider.value();
    amountOfHeightPixels = +amountOfHeightPixelsSlider.value();

    if (millis() > 1000) {
        background(0);
        translate(padding, padding);

        linePixels.forEach((rowOfLinePixels, xIndex) => {
            rowOfLinePixels.forEach((linePixel, yIndex) => {
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

function createGrid(amountOfWidthPixels: number, amountOfHeightPixels = amountOfWidthPixels) {
    const gridWidth = getGridWidth();
    const gridHeight = getGridHeight();
    const pixelWidth = gridWidth / amountOfWidthPixels;
    const pixelHeight = gridHeight / amountOfHeightPixels;

    background(0);


    for (let x = 0; x < amountOfWidthPixels; x++) {
        linePixels[x] = [];
        for (let y = 0; y < amountOfHeightPixels; y++) {

            push();
            translate(x * pixelWidth, y * pixelHeight);
            const linePixel = new LinePixel(pixelWidth, pixelHeight);
            linePixels[x][y] = linePixel;
            pop();

        }
    }
    console.log(linePixels);
}

enum LinePixelType {
    TopLeftBottomRight,
    TopRightBottomLeft,
    TopLeftTopRight,
    BottomLeftBottomRight,
    TopLeftBottomLeft,
    TopRightBottomRight,
    TopLeft,
    TopRight,
    BottomLeft,
    BottomRight
}