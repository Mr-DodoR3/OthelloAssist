window.addEventListener("load", (e) => {
  const resetButton = document.getElementById("resetButton");
  const backButton = document.getElementById("backButton");
  const candidateButton = document.getElementById("candidateButton");
  const freeButton = document.getElementById("freeButton");
  const simButton = document.getElementById("simButton");
  const adaptButton = document.getElementById("adaptButton");
  const stoneSelectButton = [
    document.getElementById("stoneRadio1"),
    document.getElementById("stoneRadio2"),
    document.getElementById("stoneRadio3")
  ];

  const selectMode = () => {
    nowPlayer = 0;
    stoneSelectButton[0].checked = false;
    stoneSelectButton[1].checked = false;
    stoneSelectButton[2].checked = true;
  };

  resetButton.addEventListener("click", (e) => {
    resetup(GRID_SIZE, GRID_NUMBER);
  });

  backButton.addEventListener("click", (e) => {
    backData();
  });

  candidateButton.addEventListener("click", (e) => {
    if (nowPlayer != 0) {
      delta = 100;
      candidate();
    }
    selectMode();
  });

  freeButton.addEventListener("click", (e) => {
    selectReset();
  });

  simButton.addEventListener("click", (e) => {
    if (selectX >= 0 && selectY >= 0 && nowCandidate > 0)
      reveseSimAll(selectX, selectY, nowCandidate);
    selectMode();
  });

  adaptButton.addEventListener("click", (e) => {
    if (selectX >= 0 && selectY >= 0 && nowCandidate > 0)
      runSim();
    selectMode();
  });

  stoneSelectButton[2].addEventListener("click", (e) => {
    nowPlayer = 0;
  });

  stoneSelectButton[0].addEventListener("click", (e) => {
    nowPlayer = 1;
  });

  stoneSelectButton[1].addEventListener("click", (e) => {
    nowPlayer = 2;
  });

  stoneSelectButton[2].addEventListener("click", (e) => {
    nowPlayer = 0;
  });
});