let SELECTED_COLOR = "#25242b";

function createNode(flex_basis, bgColor) {
  const originalDiv = document.createElement("div");
  originalDiv.style = `flex-basis: ${flex_basis}%; 
  background-color: ${bgColor}; 
  opacity: 0`; // Other styles are injected via CSS
  originalDiv.addEventListener("mouseenter", paintDivBlack);
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

function paintDivBlack(e) {
  const target = e.target;
  target.style.opacity = parseFloat(target.style.opacity) + 0.1;
  e.stopPropagation();
}

const container = document.querySelector(".container");

generateDivs(16, SELECTED_COLOR);
