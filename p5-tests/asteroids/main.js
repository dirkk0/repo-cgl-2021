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
  // p5.mousePressed = function () {
  //   vy = -vy;
  // };

  // =========
  function Thing() {
    // object, but dont tell anyone
    this.dx = 100;
    this.dy = 100;
    this.dw = 15;
    this.col = p5.color(
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255
    );

    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;

    this.draw = function () {
      // console.log(123)
      this.dx += this.vx;
      this.dy += this.vy;

      p5.stroke(this.col)
      p5.fill(this.col)
      p5.circle(this.dx, this.dy, this.dw * 2);
    };
  }

  const NUM_THINGS = 100;
  let things = [];

  for (let i = 0; i <= NUM_THINGS; i++) {
    things[i] = new Thing();
  }

  // thing1 = new Thing();
  // thing2 = new Thing();
  // thing3 = new Thing();

  // =========

  p5.setup = function () {
    // frameRate(5);
    p5.createCanvas(canvasWidth, canvasHeight);
    dx = canvasWidth / 2;
    dy = canvasHeight / 2;
    // p.createCanvas(700, 410);
  };

  p5.draw = function () {
    // p5.background(120);

    for (let i = 0; i <= NUM_THINGS; i++) {
      things[i].draw();
    }

    // thing1.draw();
    // thing2.draw();
    // thing3.draw();

    // if (dx > canvasWidth) {
    //   // vx = -vx;
    //   dx = 0;
    // }
    // if (dx < 0) {
    //   // vx = -vx;
    //   dx = canvasWidth;
    // }
    // if (dy > canvasHeight) {
    //   // vy = -vy;
    //   dy = 0;
    // }
    // if (dy < 0) {
    //   // vy = -vy;
    //   dy = canvasHeight;
    // }

    // dx += vx;
    // dy += vy;
    // p5.ellipse(dx, dy, dw * 2, dw * 2);
    // p5.circle(dx, dy, dw * 2);
    // p5.rect(dx, dy, 25, 25, 2);
  };
};

// switch global mode to instance mode
// https://p5js.org/examples/instance-mode-instantiation.html

let myp5 = new p5(sketch);
