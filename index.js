window.addEventListener("load", (e) => {
  const resetButton = document.getElementById("resetButton");
  const candidateButton = document.getElementById("candidateButton");
  const freeButton = document.getElementById("freeButton");
  const stoneSelectButton = [
    document.getElementById("stoneRadio1"),
    document.getElementById("stoneRadio2"),
    document.getElementById("stoneRadio3")
  ];

  resetButton.addEventListener("click", (e) => {
    resetup(GRID_SIZE, GRID_NUMBER);
  });

  candidateButton.addEventListener("click", (e) => {
    if (nowPlayer != 0)
      candidate();
  })

  freeButton.addEventListener("click", (e) => {
    selectReset();
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