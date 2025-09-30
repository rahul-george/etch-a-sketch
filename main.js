function generateDivs(size = 4) {
  const flex_basis = 100 / size;
  for (let i = 0; i < size * size; i++) {
    let newDiv = document.createElement("div");
    newDiv.style = `flex-basis: ${flex_basis}%`; // Other styles are injected via CSS
    container.appendChild(newDiv);
  }
}

const container = document.querySelector(".container");

generateDivs(12);
