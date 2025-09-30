function createNode(flex_basis) {
  const originalDiv = document.createElement("div");
  originalDiv.style = `flex-basis: ${flex_basis}%`; // Other styles are injected via CSS
  originalDiv.addEventListener("mouseenter", paintDivBlack);
  return originalDiv;
}

function generateDivs(size = 16) {
  const flex_basis = 100 / size;
  const documentFragment = document.createDocumentFragment();
  for (let i = 0; i < size * size; i++) {
    const gridCell = createNode(flex_basis);
    documentFragment.appendChild(gridCell);
  }
  container.appendChild(documentFragment);
}

function paintDivBlack(e) {
  // console.log({ e });
  const target = e.target;
  target.classList.add("cell");
  e.stopPropagation();
}

const container = document.querySelector(".container");

generateDivs(16);
