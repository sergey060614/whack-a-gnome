import "./styles.css";
import maskSrc from "./assets/mask.png";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  container.className = "game-container";

  for (let i = 0; i < 16; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;

    cell.addEventListener("click", handleCellClick);
    container.appendChild(cell);
  }

  document.body.appendChild(container);

  let currentMaskIndex = null;
  let intervalId = null;
  let maskImg = null;

  function placeMask() {
    if (!maskImg) {
      maskImg = new Image();
      maskImg.src = maskSrc;
      maskImg.classList.add("mask");
    }

    const cells = container.querySelectorAll(".cell");
    const randomIndex = Math.floor(Math.random() * cells.length);

    if (currentMaskIndex !== null && currentMaskIndex !== randomIndex) {
      cells[currentMaskIndex].removeChild(maskImg);
    }

    cells[randomIndex].appendChild(maskImg);
    currentMaskIndex = randomIndex;
  }

  function moveMask() {
    placeMask();
  }

  function handleCellClick(event) {
    if (
      event.target.tagName === "IMG" &&
      event.target.classList.contains("mask")
    ) {
      event.target.remove();

      placeMask();
    }
  }

  setTimeout(() => {
    placeMask();
    intervalId = setInterval(moveMask, 1000);
  }, 1000);
});
