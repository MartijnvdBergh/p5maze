class LinePixel {
    public width: number;
    public height: number;

    private sharedLinePixelType: LinePixelType = 0;
    private random: boolean = true;

    private linePixelType: LinePixelType;
    private vector1: p5.Vector;
    private vector2: p5.Vector;

    private nextLinePixelType: LinePixelType;
    private newVector1: p5.Vector;
    private newVector2: p5.Vector;

    private lerpAmount: number = 0;
    private lerpStep: number = 0.02;

    private linePixelTypeOptions: number[] = [];
    private sharedLinePixelTypeOptions: number[] = [0, 1];
    private addPoints: boolean = false;

    constructor(width: number, height = width) {
        this.width = width;
        this.height = height;
        if (this.addPoints) {
            this.linePixelTypeOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        } else {
            this.linePixelTypeOptions = [0, 1, 2, 3, 4, 5];
        }

        this.calculateRandomPixelType();
        this.calculateVectors();
        this.draw(this.vector1, this.vector2);
        this.calculateNextRandomPixelType();
        this.calculateNewVectors();

    }

    draw(vector1: p5.Vector, vector2: p5.Vector) {
        line(vector1.x, vector1.y, vector2.x, vector2.y);
    }
    updateVectors() {
        const lerpVector1 = p5.Vector.lerp(this.vector1, this.newVector1, this.lerpAmount);
        const lerpVector2 = p5.Vector.lerp(this.vector2, this.newVector2, this.lerpAmount);
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
            } else {
                this.calculateNextPixelType();
                this.calculateNewVectors();
            }

            this.lerpAmount = 0;
        }
        this.draw(lerpVector1, lerpVector2);
    }
    setStrokeWeight(linePixelStrokeWeight: number) {
        strokeWeight(linePixelStrokeWeight);
    }
    private calculateNextRandomPixelType() {
        this.nextLinePixelType = random(this.linePixelTypeOptions);
        if (this.linePixelType === this.nextLinePixelType) {
            this.calculateNextRandomPixelType();
        }
    }
    private calculateNextPixelType() {
        this.nextLinePixelType = this.sharedLinePixelType;
        if (this.nextLinePixelType > this.linePixelTypeOptions.length - 1) {
            this.nextLinePixelType = 0;
        }
    }
    private calculateRandomPixelType() {
        this.linePixelType = random(this.linePixelTypeOptions);
    }

    private setFirstVector(x1: number, y1: number) {
        this.vector1 = createVector(x1, y1);
    }
    private setSecondVector(x2: number, y2: number) {
        this.vector2 = createVector(x2, y2);
    }
    private setNewFirstVector(x1: number, y1: number) {
        this.newVector1 = createVector(x1, y1);
    }
    private setNewSecondVector(x2: number, y2: number) {
        this.newVector2 = createVector(x2, y2);
    }

    private calculateVectors() {
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
    }
    private calculateNewVectors() {
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
    }
}