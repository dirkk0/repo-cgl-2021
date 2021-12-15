let dx;
let dy;

let vx = 1.5;
let vy = 1.5;

let canvasWidth = 200;
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
