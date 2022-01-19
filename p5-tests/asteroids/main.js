// instance mode usage of p5.js

let x = 100;
let y = 100;
let dx;
let dy;

// let dw = 15;

let canvasWidth = 300;
let canvasHeight = 300;

function randomSeedParkMiller(seed = 111) {
  // doesn't repeat b4 JS dies.
  // https://gist.github.com/blixt/f17b47c62508be59987b
  seed = seed % 2147483647;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

// Math.random = randomSeedParkMiller()

// create an instance mode object for p5js
let sketch = function (p5) {
  const MAX_SHIP_VELOCITY = 3.0;
  const MAX_ROTATION_VELOCITY = 0.05;
  const KEY_SPACE = 32

  let gameIsRunning = true;

  p5.mousePressed = function () {
    if (gameIsRunning == false) {
      reset();
      gameIsRunning = true;
    } else {
      fire()
    }
  };

  function fire() {
    bullet.active = true;
    bullet.dx = ship.dx
    bullet.dy = ship.dy

    bullet.vector = ship.vector
    bullet.deg = ship.deg

    setTimeout(() => {
      bullet.active = false
    }, 2000);
  }

  function reset() {
    for (let i = 0; i <= NUM_ASTEROIDS; i++) {
      asteroids[i] = new Thing();
      asteroids[i].active = true;
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
      p5.push(this.dx, this.dy);
      p5.translate(this.dx, this.dy);
      p5.rotate(-this.deg);

      p5.stroke(this.col);
      p5.fill(this.col);
      p5.rect(-this.dw / 2, -this.dw, this.dw, this.dw * 2);
      p5.pop();
    };
  }
  // ====Ship end=====

  // game object definition

  const NUM_ASTEROIDS = 55;
  let asteroids = [];

  let bullet = new Thing();
  bullet.active = false;
  bullet.col = p5.color(0, 0, 0);
  bullet.dx = 50;
  bullet.dy = 50;
  bullet.dw = 5;
  bullet.vel = 1;
  bullet.vector = 0
  bullet.deg = 0
  // bullet.vx = 0;
  // bullet.vy = 0;

  bullet.move = function () {
    if (this.dx > canvasWidth) this.dx = 0;
    if (this.dx < 0) this.dx = canvasWidth;
    if (this.dy > canvasHeight) this.dy = 0;
    if (this.dy < 0) this.dy = canvasHeight;

    this.dx += this.vel * Math.sin(this.vector);
    this.dy += this.vel * Math.cos(this.vector);
  };

  bullet.draw = function () {
    // ship rendering
    p5.push(this.dx, this.dy);
    p5.translate(this.dx, this.dy);
    p5.rotate(-this.deg);

    p5.stroke(this.col);
    p5.fill(this.col);
    p5.rect(-this.dw / 2, -this.dw/2, this.dw, this.dw);
    p5.pop();
  };

  let ship = new Ship();

  p5.setup = function () {
    // frameRate(5);
    p5.createCanvas(canvasWidth, canvasHeight);
    dx = canvasWidth / 2;
    dy = canvasHeight / 2;

    reset();
  };

  // generic draw routine
  p5.draw = function () {
    if (gameIsRunning == false) {
      // end screen
      p5.background(220);
      p5.fill(p5.color(0, 0, 0));
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.text("Oh noes! You lost!", canvasWidth / 2, canvasWidth / 2);
    } else {
      // game screen
      p5.background(120);
      // draw all asteroids
      for (let i = 0; i <= NUM_ASTEROIDS; i++) {

        // collision detection with ship
        let dist_x = asteroids[i].dx - ship.dx;
        let dist_y = asteroids[i].dy - ship.dy;

        let distance = Math.sqrt(dist_x * dist_x + dist_y * dist_y);

        if (distance < 12.0) {
          // TODO: change 12
          // console.log("hit by asteroid #", i);
          // gameIsRunning = false
        }

        // collision detection with bullet
        dist_x = asteroids[i].dx - bullet.dx;
        dist_y = asteroids[i].dy - bullet.dy;

        distance = Math.sqrt(dist_x * dist_x + dist_y * dist_y);

        if (distance < 52.0) {
          // TODO: change 12
          // console.log("hit by asteroid #", i);
          // gameIsRunning = false
          asteroids[i].active = false
        }

        if (asteroids[i].active == true) asteroids[i].draw();

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

      if (p5.keyIsDown(KEY_SPACE)) {
        fire()
      }

      if (ship.vel > MAX_SHIP_VELOCITY) ship.vel = MAX_SHIP_VELOCITY;

      ship.vel *= 0.95;
      // console.log(ship.vel)

      // move the ship
      ship.move();
      // draw the ship
      ship.draw();

      if (bullet.active) {
        bullet.move()
        bullet.draw();
      }
    }
  };
};

// switch global mode to instance mode
// https://p5js.org/examples/instance-mode-instantiation.html

let myp5 = new p5(sketch);
