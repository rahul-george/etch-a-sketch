function createNode(flex_basis) {
  const originalDiv = document.createElement("div");
  originalDiv.style = `flex-basis: ${flex_basis}%`; // Other styles are injected via CSS
}

function generateDivs(size = 4) {
  const flex_basis = 100 / size;
  const originalDiv = createNode(flex_basis);
  const documentFragment = document.createDocumentFragment();

  for (let i = 0; i < size * size; i++) {
    documentFragment.appendChild(originalDiv.cloneNode());
  }
  container.appendChild(documentFragment);
}

const container = document.querySelector(".container");

generateDivs(10);
