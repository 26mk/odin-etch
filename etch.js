// GRID OPTIONS

const grid = document.getElementById("grid");
let mousedown = false;

function createGrid(n) {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  grid.style.backgroundColor = document.getElementById("grid-colour").value;
  for (let i = 0; i < n; i++) {
    let newRow = document.createElement("div");
    newRow.classList.add("grid-row");
    newRow.style.height = (700 / n).toString() + "px";
    for (let j = 0; j < n; j++) {
      let newDiv = document.createElement("div");
      newDiv.classList.add("grid-box");
      newDiv.setAttribute("draggable", "false");
      if (j == n - 1) {
        newDiv.classList.add("row-end");
      }
      if (i == n - 1) {
        newDiv.classList.add("grid-end");
      }
      newRow.appendChild(newDiv);
    }
    grid.appendChild(newRow);
  }
  if (
    document.getElementById("gridlines-btn").classList.contains("btn-selected")
  ) {
    toggleGridlines();
  }
  listen();
}

function listen() {
  let gridBoxes = document.getElementsByClassName("grid-box");
  for (let i = 0; i < gridBoxes.length; i++) {
    gridBoxes[i].addEventListener("mousedown", () => {
      mousedown = true;
    });
    gridBoxes[i].addEventListener("mouseup", () => {
      mousedown = false;
    });
    gridBoxes[i].addEventListener("mousedown", drawClick);
    gridBoxes[i].addEventListener("mouseenter", drawClickHov);
  }
}

createGrid(document.getElementById("grid-dimension").value);

function toggleGridlines() {
  let gridboxes = document.getElementsByClassName("grid-box");
  let rowends = document.getElementsByClassName("row-end");
  let gridends = document.getElementsByClassName("grid-end");
  for (let i = 0; i < gridboxes.length; i++) {
    gridboxes[i].classList.toggle("gridline");
  }
  for (let j = 0; j < rowends.length; j++) {
    rowends[j].classList.toggle("gridline-r");
  }
  for (let k = 0; k < gridends.length; k++) {
    gridends[k].classList.toggle("gridline-b");
  }
}

document.getElementById("gridlines-btn").addEventListener("click", () => {
  toggleGridlines();
});

document.getElementById("clear-btn").addEventListener("click", () => {
  let gridboxes = document.getElementsByClassName("grid-box");
  for (let i = 0; i < gridboxes.length; i++) {
    gridboxes[i].style.backgroundColor = "transparent";
  }
});

const gridColSelect = document.getElementById("grid-colour");
gridColSelect.addEventListener("input", (e) => {
  grid.style.backgroundColor = e.target.value;
});

document.getElementById("grid-dimension").addEventListener("input", (e) => {
  document.getElementById("dim-x").innerHTML = e.target.value;
  document.getElementById("dim-y").innerHTML = e.target.value;
});

document.getElementById("reset-btn").addEventListener("click", () => {
  createGrid(document.getElementById("grid-dimension").value);
});

let selectable_btns = document.getElementsByClassName("selectable-btn");
for (let i = 0; i < selectable_btns.length; i++) {
  selectable_btns[i].addEventListener("click", () => {
    selectable_btns[i].classList.toggle("btn-selected");
  });
}

document.getElementById("reset-btn").addEventListener("click", () => {
  createGrid(document.getElementById("grid-dimension").value);
});

// PEN OPTIONS

const penOptions = ["colour-btn", "rainbow-btn", "eraser-btn"];
let penOpt = "";

for (let i = 0; i < penOptions.length; i++) {
  document.getElementById(penOptions[i]).addEventListener("click", () => {
    for (let j = 0; j < penOptions.length; j++) {
      document.getElementById(penOptions[j]).classList.remove("btn-selected");
    }
    document.getElementById(penOptions[i]).classList.add("btn-selected");
    penOpt = penOptions[i];
  });
}

const hexVals = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

function randomColor() {
  let randColor = "#";
  for (let i = 0; i < 6; i++) {
    randColor += hexVals[Math.floor(Math.random() * 16)];
  }
  return randColor;
}

function drawClick(e) {
  if (penOpt != "") {
    if (penOpt == "eraser-btn") {
      e.target.style.backgroundColor = "transparent";
    } else if (penOpt == "rainbow-btn") {
      e.target.style.backgroundColor = randomColor();
    } else {
      e.target.style.backgroundColor =
        document.getElementById("pen-colour").value;
    }
  }
}

function drawClickHov(e) {
  if (penOpt != "" && mousedown) {
    if (penOpt == "eraser-btn") {
      e.target.style.backgroundColor = "transparent";
    } else if (penOpt == "rainbow-btn") {
      e.target.style.backgroundColor = randomColor();
    } else {
      e.target.style.backgroundColor =
        document.getElementById("pen-colour").value;
    }
  }
}
