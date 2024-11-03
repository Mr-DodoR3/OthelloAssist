window.addEventListener("load", (e) => {
  const resetButton = document.getElementById("resetButton");
  const stoneSelectButton = [
    document.getElementById("stoneRadio1"),
    document.getElementById("stoneRadio2"),
    document.getElementById("stoneRadio3")
  ];

  resetButton.addEventListener("click", (e) => {
    resetup(GRID_SIZE, GRID_NUMBER);
  });

  stoneSelectButton[2].addEventListener("click", (e) =>{
    nowPlayer = 0;
  });

  stoneSelectButton[0].addEventListener("click", (e) =>{
    nowPlayer = 1;
  });

  stoneSelectButton[1].addEventListener("click", (e) =>{
    nowPlayer = 2;
  });

  stoneSelectButton[2].addEventListener("click", (e) =>{
    nowPlayer = 0;
  });
});