// instance mode usage of p5.js

let x = 100;
let y = 100;
let dx;
let dy;

// let vx = -1.5;
// let vy = -1.2;

let vx = Math.random() * 2 - 1;
let vy = Math.random() * 2 - 1;

let dw = 15;

let canvasWidth = 300;
let canvasHeight = 300;

// create an instance mode object for p5js
let sketch = function (p5) {
  p5.mousePressed = function () {
    vy = -vy;
  };

  p5.setup = function () {
    // frameRate(5);
    p5.createCanvas(canvasWidth, canvasHeight);
    dx = canvasWidth / 2;
    dy = canvasHeight / 2;
    // p.createCanvas(700, 410);
  };

  p5.draw = function () {
    p5.background(120);

    if (dx > canvasWidth) {
      // vx = -vx;
      dx = 0;
    }
    if (dx < 0) {
      // vx = -vx;
      dx = canvasWidth;
    }
    if (dy > canvasHeight) {
      // vy = -vy;
      dy = 0;
    }
    if (dy < 0) {
      // vy = -vy;
      dy = canvasHeight;
    }

    dx += vx;
    dy += vy;
    p5.ellipse(dx, dy, dw * 2, dw * 2);
  };
};

// switch global mode to instance mode
// https://p5js.org/examples/instance-mode-instantiation.html

let myp5 = new p5(sketch);
