let SELECTED_COLOR = "#25242b";

// flags
let MOUSEUP = true;

function createNode(flex_basis, bgColor) {
  const originalDiv = document.createElement("div");
  originalDiv.role = "gridCell";
  originalDiv.style = `flex-basis: ${flex_basis}%; 
  background-color: ${bgColor}; 
  opacity: 0`; // Other styles are injected via CSS
  originalDiv.addEventListener("mouseenter", paintDivBlack);
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
  removeDivs();
  generateDivs(gridSize, SELECTED_COLOR);
  updateGridSizeLabel(gridSize);
}

function paintDivBlack(e) {
  /* If mouse is up ignore the mousehover */
  if (MOUSEUP) {
    return;
  }
  const target = e.target;
  target.style.opacity = parseFloat(target.style.opacity) + 0.1;
  e.stopPropagation();
}

function updateGridSizeLabel(gridSize) {
  gridSizeLabel.textContent = `${gridSize}x${gridSize}`;
}

const container = document.querySelector(".container");
const gridSizeInput = document.querySelector("input[name=gridSize]");
const gridSizeLabel = document.querySelector("#gridSizeLabel");

gridSizeInput.addEventListener("input", resizeGrid);

generateDivs(16, SELECTED_COLOR);
