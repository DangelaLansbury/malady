// Create prognosis badge
function prognosis() {
  // set color and fade out as disease progresses
  let whiteLight = color(255, 255, 255); // white
  whiteLight.setAlpha(120 - (progression / (windowWidth / windowHeight * 42)));
  let pinkLight = color(200, 106, 227); // magenta
  pinkLight.setAlpha(160 - (progression / (windowWidth / windowHeight * 42)));
  let blueLight = color(110, 218, 252); // blue
  blueLight.setAlpha(140 - (progression / (windowWidth / windowHeight * 42)));

  let darkLight = color(31, 36, 57); // dark
  darkLight.setAlpha(180 - (progression / (windowWidth / windowHeight * 42)));

  // light circles
  createCircle(whiteLight, 10, 160, 176);
  createCircle(blueLight, 4, 152, 176);
  createCircle(pinkLight, 2.5, 174, 166);
  createCircle(blueLight, 3, 152, 176);
  createCircle(whiteLight, 8, 176, 160);
  createCircle(whiteLight, 3.5, 176, 152);
  createCircle(whiteLight, 4.5, 160, 168);
  createCircle(whiteLight, 6, 166, 174);
  // dark circles
  createCircle(darkLight, 4, 88, 76);
  createCircle(darkLight, 6, 80, 92);
  createCircle(darkLight, 8, 92, 88);
}

function createCircle(colorMod, speedMod, widthMod, heightMod) {
  fill(colorMod);
  noStroke();
  push();
  translate((windowWidth / 2), (windowHeight / 2)); // centering
  rotate(millis() / 1000 * PI / speedMod);
  ellipseMode(CENTER)
  ellipse(0, 0, widthMod, heightMod);
  pop();
}
