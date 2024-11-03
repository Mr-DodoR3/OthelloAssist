var GRID_SIZE = 64;
var GRID_NUMBER = 8;
var STONE_SIZE = 48;
var LINE_THICKNESS = 2;
var COLOR_BACK;
var COLOR_LINE;
var COLOR_MOUSE;
var COLOR_P1;
var COLOR_P2;

var data = [];
var nowPlayer = 0;

var clickCheck = false;

function setup() {
  COLOR_BACK = color(50, 150, 50);
  COLOR_LINE = color(0);
  COLOR_MOUSE = color(255, 0, 0);
  COLOR_P1 = color(255);
  COLOR_P2 = color(0);

  data = [GRID_NUMBER];
  for (let i = 0; i < GRID_NUMBER; i++) {
    data[i] = [GRID_NUMBER];
  }

  resetup(GRID_SIZE, GRID_NUMBER);
}

function resetup(GRID_SIZE, GRID_NUMBER) {
  let result = document.getElementById('canvas_pos');
  let canvas = createCanvas(GRID_SIZE * GRID_NUMBER, GRID_SIZE * GRID_NUMBER);
  canvas.parent(result);

  for (let i = 0; i < GRID_NUMBER; i++) {
    for (let j = 0; j < GRID_NUMBER; j++) {
      data[i][j] = 0;
    }
  }
}

function drawBoard() {
  for (let i = 0; i < GRID_NUMBER; i++) {
    for (let j = 0; j < GRID_NUMBER; j++) {
      push();
      fill(COLOR_BACK);
      stroke(COLOR_LINE);
      strokeWeight(LINE_THICKNESS);
      if (mouseX > GRID_SIZE * j &&
          mouseX < GRID_SIZE * j + GRID_SIZE &&
          mouseY > GRID_SIZE * i &&
          mouseY < GRID_SIZE * i + GRID_SIZE) {
        fill(COLOR_MOUSE);
      }
      rect(GRID_SIZE * j, GRID_SIZE * i, GRID_SIZE, GRID_SIZE);
      pop();

      const drawStone = (x, y, c) => {
        push();
        fill(c);
        ellipse(x + GRID_SIZE / 2, y + GRID_SIZE / 2, STONE_SIZE, STONE_SIZE);
        pop();
      };

      if (data[i][j] == 1)
        drawStone(GRID_SIZE * j, GRID_SIZE * i, COLOR_P1);
      else if (data[i][j] == 2)
        drawStone(GRID_SIZE * j, GRID_SIZE * i, COLOR_P2);
    }
  }
}

function stoneSet() {
  const x = Math.floor(mouseX / GRID_SIZE);
  const y = Math.floor(mouseY / GRID_SIZE);
  if (x >= 0 && x < GRID_NUMBER && y >= 0 && y < GRID_NUMBER)
    data[y][x] = nowPlayer;
}

function draw() {
  background(50, 150, 50);
  if (clickCheck) {
    stoneSet();
  }
  drawBoard();
}

function mousePressed() {
  clickCheck = true;
}

function mouseReleased() {
  clickCheck = false;
}