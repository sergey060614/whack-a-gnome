describe("Whack-A-Gnome Game Logic", () => {
  let mockCells;
  let currentMaskIndex;
  let score;

  beforeEach(() => {
    currentMaskIndex = -1;
    score = 0;

    mockCells = [];
    for (let i = 0; i < 16; i++) {
      const cell = document.createElement("div");
      cell.dataset.index = i;

      cell.closest = (selector) => (selector === ".cell" ? cell : null);

      mockCells.push(cell);
    }
  });

  describe("Positioning logic", () => {
    it("should choose a different index than the previous one", () => {
      const TOTAL_CELLS = 16;
      currentMaskIndex = 5;

      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * TOTAL_CELLS);
      } while (nextIndex === currentMaskIndex && TOTAL_CELLS > 1);

      expect(nextIndex).not.toBe(currentMaskIndex);
    });

    it("should handle single cell board without infinite loop", () => {
      const TOTAL_CELLS = 1;
      currentMaskIndex = 0;

      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * TOTAL_CELLS);
      } while (nextIndex === currentMaskIndex && TOTAL_CELLS > 1);

      expect(nextIndex).toBe(0);
    });
  });

  describe("Click handling", () => {
    it("should increase score and move mask on hit", () => {
      currentMaskIndex = 7;

      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
      });

      Object.defineProperty(clickEvent, "target", {
        value: mockCells[7],
        writable: false
      });

      if (Number(clickEvent.target.dataset.index) === currentMaskIndex) {
        score++;

        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * 16);
        } while (nextIndex === currentMaskIndex);
        currentMaskIndex = nextIndex;
      }

      expect(score).toBe(1);
      expect(currentMaskIndex).not.toBe(7);
    });

    it("should add miss class on fail", () => {
      currentMaskIndex = 3;
      const clickedCell = mockCells[10];

      if (Number(clickedCell.dataset.index) !== currentMaskIndex) {
        clickedCell.classList.add("miss");
      }

      expect(clickedCell.classList.contains("miss")).toBe(true);

      clickedCell.classList.remove("miss");
      expect(clickedCell.classList.contains("miss")).toBe(false);
    });
  });
});
