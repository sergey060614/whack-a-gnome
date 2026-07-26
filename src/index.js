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
  let _intervalId = null;
  let maskImg = null;
  let isPageVisible = true;

  function placeMask(targetIndex) {
    if (!maskImg) {
      maskImg = new Image();
      maskImg.src = maskSrc;
      maskImg.classList.add("mask");

      maskImg.onload = () => {
        if (targetIndex !== null) {
          container.querySelectorAll(".cell")[targetIndex].appendChild(maskImg);
        }
      };
    }

    const cells = Array.from(container.querySelectorAll(".cell"));

    if (maskImg.parentNode) {
      maskImg.remove();
    }
    cells[targetIndex].appendChild(maskImg);

    currentMaskIndex = targetIndex;
  }

  function moveMask() {
    if (!isPageVisible) return;

    const cellsCount = container.querySelectorAll(".cell").length;
    let nextIndex;

    do {
      nextIndex = Math.floor(Math.random() * cellsCount);
    } while (nextIndex === currentMaskIndex && cellsCount > 1);

    placeMask(nextIndex);
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
      clearInterval(_intervalId);
      _intervalId = null;
    } else {
      isPageVisible = true;
      _intervalId = setInterval(moveMask, 1000);
    }
  });

  setTimeout(() => {
    const initialIndex = Math.floor(Math.random() * TOTAL_CELLS);
    placeMask(initialIndex);
    _intervalId = setInterval(moveMask, 1000);
  }, 1000);
});
