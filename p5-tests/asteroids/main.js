// instance mode usage of p5.js

let x = 100;
let y = 100;
let dx;
let dy;

// let dw = 15;

let canvasWidth = 300;
let canvasHeight = 300;



// create an instance mode object for p5js
let sketch = function (p5) {

  const MAX_SHIP_VELOCITY = 3.0
  const MAX_ROTATION_VELOCITY = 0.05
  
  // p5.mousePressed = function () {
  //   ship.vy += 0.1;
  // };

  // =====Thing start====
  function Thing() {
    // object, but dont tell anyone
    this.dx = Math.random() * canvasWidth;
    this.dy = Math.random() * canvasHeight;
    this.dw = Math.random() * 10;
    this.col = p5.color(
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255
    );

    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;

    this.draw = function () {
      if (this.dx > canvasWidth) this.dx = 0;
      if (this.dx < 0) this.dx = canvasWidth;
      if (this.dy > canvasHeight) this.dy = 0;
      if (this.dy < 0) this.dy = canvasHeight;

      this.dx += this.vx;
      this.dy += this.vy;

      p5.stroke(this.col);
      p5.fill(this.col);
      p5.circle(this.dx, this.dy, this.dw * 2);
    };
  }

  const NUM_ASTEROIDS = 10;
  let asteroids = [];


  for (let i = 0; i <= NUM_ASTEROIDS; i++) {
    asteroids[i] = new Thing();
  }
  // ====Thing end=====

  // ====Ship start==================
  function Ship() {
    this.dx = canvasWidth / 2;
    this.dy = canvasHeight / 2;
    this.dw = 15;
    this.col = p5.color(10, 0, 0);

    // this.vx = 0;
    // this.vy = 0;

    this.vel = 0;

    this.deg = 0;  // ships rotation
    this.vector = 0;  // ships course

    this.move = function () {
      if (this.dx > canvasWidth) this.dx = 0;
      if (this.dx < 0) this.dx = canvasWidth;
      if (this.dy > canvasHeight) this.dy = 0;
      if (this.dy < 0) this.dy = canvasHeight;

      this.dx += this.vel * Math.sin(this.deg)
      this.dy += this.vel * Math.cos(this.deg)

    };

    this.draw = function () {
      // ship rendering
      // p5.push(this.dx, this.dy);
      p5.translate(this.dx, this.dy);
      p5.rotate(-this.deg);

      p5.stroke(this.col);
      p5.fill(this.col);
      p5.rect(-this.dw/2, -this.dw, this.dw, this.dw * 2);
      // p5.pop();
    };

  }

  let ship = new Ship();
  // ====Ship end=====

  p5.setup = function () {
    // frameRate(5);
    p5.createCanvas(canvasWidth, canvasHeight);
    dx = canvasWidth / 2;
    dy = canvasHeight / 2;
  };

  // generic draw routine
  p5.draw = function () {
    p5.background(120);
    // draw all asteroids
    for (let i = 0; i <= NUM_ASTEROIDS; i++) {
      asteroids[i].draw();
    }

    if (p5.keyIsDown(p5.LEFT_ARROW)) {
      ship.deg += MAX_ROTATION_VELOCITY;
    }

    if (p5.keyIsDown(p5.RIGHT_ARROW)) {
      ship.deg -= MAX_ROTATION_VELOCITY;
    }

    if (p5.keyIsDown(p5.UP_ARROW)) {
      ship.vel += 0.1;
    }

    if (ship.vel > MAX_SHIP_VELOCITY) ship.vel = MAX_SHIP_VELOCITY

    ship.vel *= 0.99
    // console.log(ship.vel)

    // move the ship
    ship.move();
    // draw the ship
    ship.draw();
  };
};

// switch global mode to instance mode
// https://p5js.org/examples/instance-mode-instantiation.html

let myp5 = new p5(sketch);
