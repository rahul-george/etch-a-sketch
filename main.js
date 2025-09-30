function createNode(flex_basis) {
  const originalDiv = document.createElement("div");
  originalDiv.style = `flex-basis: ${flex_basis}%`; // Other styles are injected via CSS
  originalDiv.addEventListener("click", paintDivBlack);
  return originalDiv;
}

function generateDivs(size = 4) {
  const flex_basis = 100 / size;
  for (let i = 0; i < size * size; i++) {
    container.appendChild(createNode(flex_basis));
  }
}

function paintDivBlack(e) {
  console.log({ e });
}

const container = document.querySelector(".container");

generateDivs(10);
