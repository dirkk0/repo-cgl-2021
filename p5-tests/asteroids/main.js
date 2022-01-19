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
  const MAX_SHIP_VELOCITY = 3.0;
  const MAX_ROTATION_VELOCITY = 0.05;


  let gameIsRunning = true;

  p5.mousePressed = function () {

    if (gameIsRunning == false ) {
      reset()
      gameIsRunning = true  
    }

  };

  function reset () {
    for (let i = 0; i <= NUM_ASTEROIDS; i++) {
      asteroids[i] = new Thing();
    }

    ship.dx = canvasWidth / 2;
    ship.dy = canvasHeight / 2;
    ship.vel = 0;
    ship.deg = 0; // ships rotation
    ship.vector = 0; // ships course

  }

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

  // ====Thing end=====

  // ====Ship start==================
  function Ship() {

    this.dw = 15;
    this.col = p5.color(10, 0, 0);



    this.move = function () {
      if (this.dx > canvasWidth) this.dx = 0;
      if (this.dx < 0) this.dx = canvasWidth;
      if (this.dy > canvasHeight) this.dy = 0;
      if (this.dy < 0) this.dy = canvasHeight;

      this.dx += this.vel * Math.sin(this.vector);
      this.dy += this.vel * Math.cos(this.vector);
    };

    this.draw = function () {
      // ship rendering
      // p5.push(this.dx, this.dy);
      p5.translate(this.dx, this.dy);
      p5.rotate(-this.deg);

      p5.stroke(this.col);
      p5.fill(this.col);
      p5.rect(-this.dw / 2, -this.dw, this.dw, this.dw * 2);
      // p5.pop();
    };
  }
  // ====Ship end=====

  const NUM_ASTEROIDS = 15;
  let asteroids = [];

  let ship = new Ship();

  p5.setup = function () {
    // frameRate(5);
    p5.createCanvas(canvasWidth, canvasHeight);
    dx = canvasWidth / 2;
    dy = canvasHeight / 2;

    reset()
  };

  // generic draw routine
  p5.draw = function () {
    if (gameIsRunning == false) {
      // end screen
      p5.background(220);
      p5.fill(p5.color(0,0,0))
      p5.textAlign(p5.CENTER, p5.CENTER)
      p5.text("Oh noes! You lost!", canvasWidth / 2, canvasWidth / 2)

    } else {
      // game screen
      p5.background(120);
      // draw all asteroids
      for (let i = 0; i <= NUM_ASTEROIDS; i++) {
        asteroids[i].draw();

        // collision detection
        let dist_x = asteroids[i].dx - ship.dx;
        let dist_y = asteroids[i].dy - ship.dy;

        let distance = Math.sqrt(dist_x * dist_x + dist_y * dist_y);

        if (distance < 12.0) {
          // TODO: change 12
          console.log("hit by asteroid #", i);
          gameIsRunning = false
        }
      }

      if (p5.keyIsDown(p5.LEFT_ARROW)) {
        ship.deg += MAX_ROTATION_VELOCITY;
      }

      if (p5.keyIsDown(p5.RIGHT_ARROW)) {
        ship.deg -= MAX_ROTATION_VELOCITY;
      }

      if (p5.keyIsDown(p5.UP_ARROW)) {
        ship.vel += 0.1;
        ship.vector = ship.deg;
      }

      if (ship.vel > MAX_SHIP_VELOCITY) ship.vel = MAX_SHIP_VELOCITY;

      ship.vel *= 0.95;
      // console.log(ship.vel)

      // move the ship
      ship.move();
      // draw the ship
      ship.draw();
    }
  };
};

// switch global mode to instance mode
// https://p5js.org/examples/instance-mode-instantiation.html

let myp5 = new p5(sketch);
