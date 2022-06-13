function createCell(i , j) {
  this.x = i * w;
  this.y = j * w;
  this.side = w-1;
  this.cell = board[i][j];

  if ((this.cell == 1)) {
    fill(255);
  }
  else if ((this.cell == 10)) {
    fill('#FE534B');
  }
  else fill("#1F2439");
  stroke("#1F2439");
  rect(this.x, this.y, this.side, this.side);
}
