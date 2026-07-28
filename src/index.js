import "./styles.css";
import maskSrc from "./assets/mask.png";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  container.className = "game-container";

  const FIELD_SIZE = 4;
  const TOTAL_CELLS = FIELD_SIZE * FIELD_SIZE;

  for (let i = 0; i < TOTAL_CELLS; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;

    cell.tabIndex = 0;
    cell.setAttribute("role", "button");
    cell.setAttribute("aria-label", `Ячейка номер ${i + 1}`);

    cell.addEventListener("click", handleCellClick);
    cell.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCellClick(e);
      }
    });

    container.appendChild(cell);
  }

  document.body.appendChild(container);

  let currentMaskIndex = null;
  let intervalId = null;
  let maskImg = null;
  let isPageVisible = true;

  function placeMask(targetIndex) {
    if (!maskImg) {
      maskImg = new Image();
      maskImg.src = maskSrc;
      maskImg.classList.add("mask");
    }

    const cells = Array.from(container.querySelectorAll(".cell"));

    cells[targetIndex].appendChild(maskImg);
    currentMaskIndex = targetIndex;
  }

  function moveMask() {
    if (!isPageVisible || currentMaskIndex === null) return;

    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * TOTAL_CELLS);
    } while (nextIndex === currentMaskIndex);

    placeMask(nextIndex);
  }

  function startGameLoop() {
    if (!intervalId) {
      intervalId = setInterval(moveMask, 1000);
    }
  }

  function stopGameLoop() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function handleCellClick(event) {
    const clickedCell = event.target.closest(".cell");
    if (!clickedCell) return;

    const index = Number(clickedCell.dataset.index);

    if (index === currentMaskIndex) {
      console.log("Попадание!");
      moveMask();
    } else {
      console.log(
        `Промах! Выбрана ячейка ${index}, маска была в ${currentMaskIndex}`
      );
      clickedCell.classList.add("miss");
      setTimeout(() => clickedCell.classList.remove("miss"), 200);
    }
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      isPageVisible = false;
      stopGameLoop();
    } else {
      isPageVisible = true;
      startGameLoop();
    }
  });

  const initialIndex = Math.floor(Math.random() * TOTAL_CELLS);
  placeMask(initialIndex);
  startGameLoop();
});
