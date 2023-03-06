const magicSquare = d3.select('#magicSquareSvg');
const toggleButton = d3.select("#toggleMagicSquare");
const orderSelect = d3.select('#order');
const svgSize = +magicSquare.attr("width");
const animateDuration = 1000;
const color = "#32d378";
const highlightColor = "#ede444";
let squareCount = 0;

class NumberSquare {
    constructor(x, y, number, size) {
        squareCount++;
        this.square = magicSquare.append('rect')
            .attr("id", `s${squareCount}`)
            .attr("x", `${x - (size / 2)}`)
            .attr("y", `${y - (size / 2)}`)
            .attr("width", `${size}`)
            .attr("height", `${size}`)
            .attr("fill", color)
            .attr("stroke", "black")
            .attr("stroke-width", 1);
        this.number = magicSquare.append('text')
            .attr("id", `n${squareCount}`)
            .attr("x", `${x}`)
            .attr("y", `${y}`)
            .attr("dominant-baseline", "middle")
            .attr("text-anchor", "middle")
            .text(`${number}`);
    }

    animateX(x, xTransform, yTransform, step, totalSteps) {
        if (step === undefined) {
            step = 1;
        } else if (step === totalSteps) {
            return;
        } else {
            step++;
        }

        if (xTransform === undefined || yTransform === undefined) {
            xTransform = 0;
            yTransform = 0;
            let transform = this.square.attr("transform");
            if (transform !== null) {
                let xTransformMatch = transform.match(/(?<=\()\-?\d*(?=,)/);
                if (xTransformMatch !== null && xTransformMatch.length > 0) {
                    xTransform = +xTransformMatch[0];
                }
                let yTransformMatch = transform.match(/(?<=,\s?)\-?\d*(?=\))/);
                if (yTransformMatch !== null && yTransformMatch.length > 0) {
                    yTransform = +yTransformMatch[0];
                }
            }
        }

        if (totalSteps === undefined) {
            totalSteps = Math.abs(x);
        }

        let self = this;
        setTimeout(function() {
            self.square.attr("transform", `translate(${xTransform + (Math.sign(x) * step)}, ${yTransform})`);
            self.number.attr("transform", `translate(${xTransform + (Math.sign(x) * step)}, ${yTransform})`);
            self.animateX(x, xTransform, yTransform, step, totalSteps);
        }, animateDuration / totalSteps);
    }

    animateY(y, xTransform, yTransform, step, totalSteps) {
        if (step === undefined) {
            step = 1;
        } else if (step === totalSteps) {
            return;
        } else {
            step++;
        }

        if (xTransform === undefined || yTransform === undefined) {
            xTransform = 0;
            yTransform = 0;
            let transform = this.square.attr("transform");
            if (transform !== null) {
                let xTransformMatch = transform.match(/(?<=\()[\-\d]*(?=,)/);
                if (xTransformMatch !== null && xTransformMatch.length > 0) {
                    xTransform = +xTransformMatch[0];
                }
                let yTransformMatch = transform.match(/(?<=,\s?)[\-\d]*(?=\))/);
                if (yTransformMatch !== null && yTransformMatch.length > 0) {
                    yTransform = +yTransformMatch[0];
                }
            }
        }

        if (totalSteps === undefined) {
            totalSteps = Math.abs(y);
        }

        let self = this;
        setTimeout(function() {
            self.square.attr("transform", `translate(${xTransform}, ${yTransform + (Math.sign(y) * step)})`);
            self.number.attr("transform", `translate(${xTransform}, ${yTransform + (Math.sign(y) * step)})`);
            self.animateY(y, xTransform, yTransform, step, totalSteps);
        }, animateDuration / totalSteps);
    }

    setColor(color) {
        this.square.attr("fill", color);
    }
}

let magicSquareApp = {
    toggle: false,
    numberSquares: {},
    order: 3,
    squareSize: 40,
    leftIndices: [],
    rightIndices: [],
    topIndices: [],
    bottomIndices: [],

    init: function() {
        this.updateSquareSize();

        this.initMagicSquare();

        let self = this;
        toggleButton.on("click", function() {
            self.animateShuffle();
        });
        orderSelect.on("change", function() {
            self.order = +this.options[this.selectedIndex].value;
            self.updateSquareSize();
            self.initMagicSquare();
        });
    },

    initMagicSquare: function() {
        this.toggle = false;
        magicSquare.selectAll("*").remove();
        this.numberSquares = {};
        this.leftIndices = [];
        this.rightIndices = [];
        this.topIndices= [];
        this.bottomIndices = [];

        for (let i = 1; i <= this.order ** 2; i++) {
            let diagRow = Math.ceil(i / this.order);
            let diagCol = i % this.order;
            if (diagCol === 0) {
                diagCol = this.order;
            }
            let x = diagRow + diagCol - this.order - 1;
            let y = diagRow - diagCol;
            this.numberSquares[`${i}`] = new NumberSquare(x * this.squareSize, y * this.squareSize, i, this.squareSize);
            if (x < -(this.order - 1) / 2) {
                this.leftIndices.push(i);
            } else if (x > (this.order - 1) / 2) {
                this.rightIndices.push(i);
            } else if (y < -(this.order - 1) / 2) {
                this.bottomIndices.push(i);
            } else if (y > (this.order - 1) / 2) {
                this.topIndices.push(i);
            }
        }
    },

    updateSquareSize: function() {
        this.squareSize = Math.floor(svgSize / (2 * this.order - 1));
    },

    animateShuffle: function() {
        toggleButton.attr("disabled", "disabled");
        orderSelect.attr("disabled", "disabled");
        let self = this;
        if (this.toggle) {
            this.leftIndices.forEach(function(index) {
                self.numberSquares[`${index}`].animateX(-self.order * self.squareSize);
            });
            this.bottomIndices.forEach(function(index) {
                self.numberSquares[`${index}`].animateY(-self.order * self.squareSize);
            });
            this.topIndices.forEach(function(index) {
                self.numberSquares[`${index}`].animateY(self.order * self.squareSize);
            });
            this.rightIndices.forEach(function(index) {
                self.numberSquares[`${index}`].animateX(self.order * self.squareSize);
            });
            setTimeout(function() {
                toggleButton.attr("disabled", null);
                orderSelect.attr("disabled", null);
            }, animateDuration);
        } else {
            this.leftIndices.forEach(function(index) {
                self.numberSquares[`${index}`].setColor(highlightColor);
                self.numberSquares[`${index}`].animateX(self.order * self.squareSize);
            });
            setTimeout(function() {
                self.leftIndices.forEach(function(index) {
                    self.numberSquares[`${index}`].setColor(color);
                });
                self.bottomIndices.forEach(function(index) {
                    self.numberSquares[`${index}`].setColor(highlightColor);
                    self.numberSquares[`${index}`].animateY(self.order * self.squareSize);
                });
            }, animateDuration);
            setTimeout(function() {
                self.bottomIndices.forEach(function(index) {
                    self.numberSquares[`${index}`].setColor(color);
                });
                self.topIndices.forEach(function(index) {
                    self.numberSquares[`${index}`].setColor(highlightColor);
                    self.numberSquares[`${index}`].animateY(-self.order * self.squareSize);
                });
            }, 2 * animateDuration);
            setTimeout(function() {
                self.topIndices.forEach(function(index) {
                    self.numberSquares[`${index}`].setColor(color);
                });
                self.rightIndices.forEach(function(index) {
                    self.numberSquares[`${index}`].setColor(highlightColor);
                    self.numberSquares[`${index}`].animateX(-self.order * self.squareSize);
                });
            }, 3 * animateDuration);
            setTimeout(function() {
                self.rightIndices.forEach(function(index) {
                    self.numberSquares[`${index}`].setColor(color);
                });
                toggleButton.attr("disabled", null);
                orderSelect.attr("disabled", null);
            }, 4 * animateDuration);
        }
        this.toggle = !this.toggle;
    }
}

magicSquareApp.init();
