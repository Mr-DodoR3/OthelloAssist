var GRID_SIZE = 64;
var GRID_NUMBER = 8;
var STONE_SIZE = 48;
var LINE_THICKNESS = 2;

var COLOR_BACK;
var COLOR_LINE;
var COLOR_SELECT;
var COLOR_MOUSE;
var COLOR_P1;
var COLOR_P2;
var COLOR_P1_ALPHA;
var COLOR_P2_ALPHA;

var delta = 100;

var data = [];
var data_eff = [];
var data_history = [];
var nowPlayer = 0;
var nowCandidate = 0;
var selectX = -1;
var selectY = -1;

var clickCheck = false;

function setup() {
  COLOR_BACK = color(50, 150, 50);
  COLOR_LINE = color(0);
  COLOR_SELECT = color(255, 0, 0)
  COLOR_MOUSE = color(255, 100, 100);
  COLOR_P1 = color(255);
  COLOR_P2 = color(0);
  COLOR_P1_ALPHA = color(255, 100);
  COLOR_P2_ALPHA = color(0, 100);

  data = [GRID_NUMBER];
  data_eff = [GRID_NUMBER];
  for (let i = 0; i < GRID_NUMBER; i++) {
    data[i] = [GRID_NUMBER];
    data_eff[i] = [GRID_NUMBER];
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
  selectReset();
}

function saveData() {
  data_history.push(data.map(v => v.map(v2 => v2)));
}

function backData() {
  if (data_history.length > 1) {
    data_history.pop();
    data = data_history[data_history.length - 1];
  }
  else {
    resetup(GRID_SIZE, GRID_NUMBER);
  }
}

function drawBoard() {
  for (let i = 0; i < GRID_NUMBER; i++) {
    for (let j = 0; j < GRID_NUMBER; j++) {
      push();
      fill(COLOR_BACK);
      stroke(COLOR_LINE);
      strokeWeight(LINE_THICKNESS);
      if (selectX == j && selectY == i) {
        fill(COLOR_SELECT);
      }
      else if (mouseX > GRID_SIZE * j &&
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

      const drawStoneAlpha = (x, y, c) => {
        push();
        fill(c.levels[0], c.levels[1], c.levels[2], (delta / 100) * 255);
        noStroke();
        ellipse(x + GRID_SIZE / 2, y + GRID_SIZE / 2, STONE_SIZE, STONE_SIZE);
        pop();
      };
      
      if (data[i][j] == 1)
        drawStone(GRID_SIZE * j, GRID_SIZE * i, COLOR_P1);
      else if (data[i][j] == 2)
        drawStone(GRID_SIZE * j, GRID_SIZE * i, COLOR_P2);
      
      const diff_draw = (d) => {
        switch (d) {
          case 1:
            drawStoneAlpha(GRID_SIZE * j, GRID_SIZE * i, COLOR_P1);
            break;
          case 2:
            drawStoneAlpha(GRID_SIZE * j, GRID_SIZE * i, COLOR_P2);
            break;
          default:
            break;
        }
      };
      diff_draw(data_eff[i][j]);
    }
  }
}

function selectReset() {
  nowCandidate = 0;
  selectX = -1;
  selectY = -1;
  for (let i = 0; i < GRID_NUMBER; i++) {
    for (let j = 0; j < GRID_NUMBER; j++) {
      data_eff[i][j] = 0;
    }
  }
}

function stoneSet() {
  const x = Math.floor(mouseX / GRID_SIZE);
  const y = Math.floor(mouseY / GRID_SIZE);
  if (x >= 0 && x < GRID_NUMBER && y >= 0 && y < GRID_NUMBER) {
    data[y][x] = nowPlayer;
    if (nowPlayer == 0) {
      if (selectX == x && selectY == y) {
        selectX = -1;
        selectY = -1;
      }
      else {
        selectX = x;
        selectY = y;
      }
    }
    else {
      saveData();
    }
  }
}

function runSim() {
  data[selectY][selectX] = nowCandidate;
  for (let i = 0; i < GRID_NUMBER; i++) {
    for (let j = 0; j < GRID_NUMBER; j++) {
      if (data[i][j] > 0 && data_eff[i][j] > 0)
        data[i][j] = nowCandidate;
    }
  }

  saveData();
  selectReset();
}

function reveseSimAll(x, y, c) {
  reveseSim(x, y, 1, 0, c);
  reveseSim(x, y, -1, 0, c);
  reveseSim(x, y, 0, 1, c);
  reveseSim(x, y, 0, -1, c);
  reveseSim(x, y, 1, 1, c);
  reveseSim(x, y, -1, 1, c);
  reveseSim(x, y, 1, -1, c);
  reveseSim(x, y, -1, -1, c);
}

function reveseSim(x, y, mx, my, c) {
  const n = reveseCheck(x, y, mx, my, c) - 1;
  if (n > 0) {
    for (let i = 0; i < n; i++) {
      x += mx;
      y += my;
      data_eff[y][x] = c;
    }
  }
}

function reveseCheck(x, y, mx, my, c) {
  let i = 0;
  while (i < GRID_NUMBER) {
    x += mx;
    y += my;
    i++;
    if (x >= 0 && x < GRID_NUMBER && y >= 0 && y < GRID_NUMBER) {
      if (i == 1 && data[y][x] == (c == 1 ? 2 : 1)) {
        continue;
      }
      else if (i > 1 && data[y][x] == c) {
        return i;
      }
      else if (i > 1 && data[y][x] == (c == 1 ? 2 : 1)) {
        continue;
      }
      else {
        break;
      }
    }
    else {
      break;
    }
  }

  return 0;
}

function candidate() {
  selectReset();
  nowCandidate = nowPlayer;

  for (let i = 0; i < GRID_NUMBER; i++) {
    for (let j = 0; j < GRID_NUMBER; j++) {
      if ((reveseCheck(j, i, 1, 0, nowPlayer) ||
          reveseCheck(j, i, -1, 0, nowPlayer) ||
          reveseCheck(j, i, 0, 1, nowPlayer) ||
          reveseCheck(j, i, 0, -1, nowPlayer) ||
          reveseCheck(j, i, 1, 1, nowPlayer) ||
          reveseCheck(j, i, 1, -1, nowPlayer) || 
          reveseCheck(j, i, -1, 1, nowPlayer) ||
          reveseCheck(j, i, -1, -1, nowPlayer)) &&
          data[i][j] == 0) {
        data_eff[i][j] = nowPlayer;
      }
    }
  }
}

function draw() {
  background(50, 150, 50);
  // if (clickCheck) {
  //   stoneSet();
  // }
  drawBoard();

  delta -= 2;
  if (delta < 0)
    delta = 100;
}

function mousePressed() {
  clickCheck = true;
  stoneSet();
}

function mouseReleased() {
  clickCheck = false;
}