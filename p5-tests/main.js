function setup() {
  createCanvas(400, 400);
}

function draw() {
  // background(220)
  // if (mouseIsPressed) {
  //   fill(0);
  // } else {
  //   fill(255);
  // }
  // ellipse(mouseX, mouseY, 80, 80);

  let dx = Math.random() * 200;
  let dy = Math.random() * 300;
  for (let i = 0; i < 10; i++) {
    ellipse(50 + dx, 50 + dy, 80, 80);
  }
  // ellipse(50, 50, 80, 80);
  // ellipse(80, 80, 80, 80);
  // ellipse(120, 120, 80, 80);
}
