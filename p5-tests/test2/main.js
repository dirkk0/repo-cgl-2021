let dx;
let dy;

let vx = 1.5;
let vy = 1.5;

let canvasWidth = 400
let canvasHeight = 300

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  dx = canvasWidth / 2;
  dy = canvasHeight / 2;


}

function mousePressed () {
  vy = -vy
}

function draw() {
  background(120);
  // dx *= 1.02

  if (dx > canvasWidth) {
    vx = - vx
  }
  if (dx < 0) {
    vx = - vx
  }
  if (dy > canvasHeight) {
    vy = - vy
  }
  if (dy < 0) {
    vy = - vy
  }

  dx += vx
  dy += vy
  ellipse(dx, dy, 20, 20);
}
