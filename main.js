let SELECTED_COLOR = "#25242b";

// flags
let MOUSEUP = true;

function generateRandomInteger(min = 0, max = 255) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomColor() {
  return `RGB(${generateRandomInteger()}, ${generateRandomInteger()}, ${generateRandomInteger()})`;
}

function createNode(flex_basis, bgColor) {
  const originalDiv = document.createElement("div");
  originalDiv.role = "gridCell";
  originalDiv.style = `flex-basis: ${flex_basis}%; 
  /*background-color: ${bgColor};*/ 
  opacity: 0`; // Other styles are injected via CSS
  originalDiv.addEventListener("mouseenter", paint);
  originalDiv.addEventListener("mousedown", (e) => {
    MOUSEUP = false;
  });
  originalDiv.addEventListener("mouseup", (e) => {
    MOUSEUP = true;
  });
  return originalDiv;
}

function generateDivs(size = 16, bgColor) {
  const flex_basis = 100 / size;
  const documentFragment = document.createDocumentFragment();
  for (let i = 0; i < size * size; i++) {
    const gridCell = createNode(flex_basis, bgColor);
    documentFragment.appendChild(gridCell);
  }
  container.appendChild(documentFragment);
}

function removeDivs() {
  let gridCells = document.querySelectorAll("div[role=gridCell]");
  gridCells.forEach((cell) => {
    cell.remove();
  });
}

function resizeGrid(e) {
  let gridSize = parseInt(e.target.value);
  redrawGrid(gridSize, SELECTED_COLOR);
}

function clearSketchPad(e) {
  redrawGrid(parseInt(gridSizeInput.value), SELECTED_COLOR);
}

function redrawGrid(gridSize, bgColor) {
  removeDivs();
  generateDivs(gridSize, bgColor);
  updateGridSizeLabel(gridSize);
}

function getColor() {
  if (colorizeCheckBoxInput.checked) {
    return generateRandomColor();
  } else {
    return SELECTED_COLOR;
  }
}

function paint(e) {
  /* If mouse is up ignore the mousehover */
  if (MOUSEUP) {
    return;
  }

  const target = e.target;
  /* If the cell is visited for the first itme a color is assigned via getColor, 
  otherwise up the opacity of the cell backgroundColor */
  target.style.opacity = parseFloat(target.style.opacity) + 0.1;
  if (target.style.backgroundColor === "") {
    target.style.backgroundColor = getColor();
  }

  e.stopPropagation();
}

function updateGridSizeLabel(gridSize) {
  gridSizeLabel.textContent = `${gridSize}x${gridSize}`;
}

const container = document.querySelector(".container");
const gridSizeInput = document.querySelector("input[name=gridSize]");
const gridSizeLabel = document.querySelector("#gridSizeLabel");
const clearSketchPadButton = document.querySelector("#clearSketchPad");
const colorizeCheckBoxInput = document.querySelector("#colorize");
const currentYearLabel = document.querySelector("#currentYear");
currentYearLabel.textContent = new Date().getFullYear();

gridSizeInput.addEventListener("input", resizeGrid);
clearSketchPadButton.addEventListener("click", clearSketchPad);

generateDivs(16, SELECTED_COLOR);
