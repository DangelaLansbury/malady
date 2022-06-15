let w;
let columns;
let rows;
let board;
let next;
let progression;
let mutationChance;
let mutant;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('game-canvas');
  if (windowWidth > 1500) {
    frameRate(16);
    w = 10;
  }
  else {
    frameRate(20);
    w = 7;
  }
  // Calculate columns and rows
  columns = floor(windowWidth / w);
  rows = floor(windowHeight / w);
  // Create 2D array
  board = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  }
  // Create multiple 2D arrays to swap them later
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  init();
}

function draw() {
  background("#1F2439");
  noStroke();
  generate();
  for (let i = 0; i < columns;i++) {
    for (let j = 0; j < rows;j++) {
      createCell(i, j);
    }
  }
  prognosis();
  if (mouseIsPressed === true) {
    fill('rgba(255,255,255,0.60)');
    ellipse(mouseX, mouseY, 40, 40);
  }
}

// Fill board randomly
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Lining the edges with 0s
      if (i == 0 || j == 0 || i == columns-1 || j == rows-1) board[i][j] = 0;
      // Filling the rest randomly
      else board[i][j] = floor(random(2));
      next[i][j] = 0;
    }
  }
  progression = 0;
}

// The process of creating the new generation
function generate() {
  // Loop through every spot in 2D array and check neighbors
  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      // Check if the cell mutates
      mutate();
      // Add up all the states in surrounding cells
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          neighbors += board[x+i][y+j];
        }
      }
      // Subtract the current cell's state after including it in the above loop
      neighbors -= board[x][y];
      // Rules of Life
      if ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0; // Loneliness
      else if ((board[x][y] == 1) && (neighbors >  3) && (neighbors < 8)) next[x][y] = 0; // Overpopulation
      else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1; // Reproduction
      // Disease spread
      else if ((board[x][y] == 1) && (neighbors > 32) && (neighbors <= 80)) {
        next[x][y] = 10; // Cancer spread
        progression++; // Increment progression and worsen outlook
      }
      else if ((board[x][y] == 0) && (neighbors > 22)) {
        next[x][y] = 10; // Cancer spread
        progression++; // Increment progression and worsen outlook
      }
      // Handle mutation
      else if (mutant == 1) next[x][y] = 10; // Turn into cancer cell
      // Kill cancer cells naturally
      else if ((board[x][y] == 10) && (neighbors <  3)) next[x][y] = 0; // Natural cancer cell death
      // Nothing happens
      else next[x][y] = board[x][y];  // Stasis
    }
  }
  // Swap
  let temp = board;
  board = next;
  next = temp;
}

// Click on a cancer cell to kill it
function mousePressed() {
  for (let i = 0; i < columns;i++) {
    for (let j = 0; j < rows;j++) {
      let d = dist(mouseX, mouseY, i * w, j * w);
      if (d < w) {
        if (board[i][j] == 1) {
          board[i][j] = 0;
          progression = progression + 0.25; // Progression penalty for killing healthy cells
        }
        else if (board[i][j] == 10) {
          board[i][j] = 0;
          progression--; // Slow progression for killing cancer cells
        }
      }
    }
  }
}

// Reset board when key is pressed
function keyPressed() {
  progression = 0;
  init();
}

// Resize canvas and restart automaton when window size changes
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}
