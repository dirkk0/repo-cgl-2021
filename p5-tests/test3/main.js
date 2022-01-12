let dx;
let dy;

let vx = 1.5;
let vy = 1.5;

let canvasWidth = 250;
let canvasHeight = 300;

let dw = 15;

function setup() {
  // frameRate(5);
  createCanvas(canvasWidth, canvasHeight);
  dx = canvasWidth / 2;
  dy = canvasHeight / 2;
}

function mousePressed() {
  vy = -vy;
}

function draw() {
  background(120);

  if (dx > canvasWidth - dw) {
    vx = -vx;
  }
  if (dx < 0 + dw) {
    vx = -vx;
  }
  if (dy > canvasHeight - dw) {
    vy = -vy;
  }
  if (dy < 0 + dw) {
    vy = -vy;
  }

  dx += vx;
  dy += vy;
  ellipse(dx, dy, dw * 2, dw * 2);
}

let sketch = function (p5) {
  let x = 100;
  let y = 100;

  p.setup = function () {
    // frameRate(5);
    createCanvas(canvasWidth, canvasHeight);
    dx = canvasWidth / 2;
    dy = canvasHeight / 2;
    // p.createCanvas(700, 410);
  };

  p.draw = function () {
    p.background(0);
    p.fill(255);
    p.rect(x, y, 50, 50);
  };
};

let myp5 = new p5(sketch);
