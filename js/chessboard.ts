const form = document.getElementById("FENform");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputFEN = document.getElementById("FENinput");
  createBoard();
  layoutPieces((inputFEN as HTMLInputElement).value);
});

window.addEventListener("DOMContentLoaded", () => {
  // Get the element by id
  const elements = document.querySelectorAll(".square");

  elements.forEach((element) => {
    console.log(element);
    element.addEventListener("dragstart", dragstart_handler);
    element.addEventListener("dragover", dragover_handler);
    element.addEventListener("drop", drop_handler);
  });
});

function dragstart_handler(event) {
  event.dataTransfer.dropEffect = "move";
}

function dragover_handler(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function drop_handler(event) {
  event.preventDefault();
  console.log(event);
}

export default (position) => {
  createBoard();
  layoutPieces(position);
};

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function createBoard() {
  const board = document.getElementById("board");
  removeAllChildNodes(board);
  for (let file = 0; file < 8; file++) {
    for (let rank = 0; rank < 8; rank++) {
      let isLightSquare = (file + rank) % 2 === 0;
      let square = document.createElement("span");
      square.setAttribute("data-id", "" + file + rank);
      square.setAttribute("draggable", true);
      square.classList.add("square");
      if (isLightSquare) {
        square.classList.add("light");
      } else {
        square.classList.add("dark");
      }

      board?.appendChild(square);
    }
  }
}

function layoutPieces(position) {
  let fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  // let fen = "rnbqkbnr/pp1pppp1/7p/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3";

  if (position && position !== "start") {
    fen = position;
  }

  let fenArray = fen.split("/");

  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
      let char = fenArray[row].charAt(0);
      fenArray[row] = fenArray[row].substring(1);
      if (isNumber(char)) {
        column = column + Number(char) - 1;
      } else {
        let cellidx = "" + row + column;
        let square = document.querySelector(`[data-id="${cellidx}"]`);
        renderPiece(char, square);
      }
    }
  }
}

function isNumber(character) {
  return !isNaN(character);
}

function renderPiece(piece, square) {
  const pieceClasses = pieceMap[piece];
  square.classList.add(...pieceClasses);
}

const pieceMap = {
  p: ["black", "pawn"],
  k: ["black", "king"],
  q: ["black", "queen"],
  r: ["black", "rook"],
  b: ["black", "bishop"],
  n: ["black", "knight"],
  P: ["white", "pawn"],
  K: ["white", "king"],
  Q: ["white", "queen"],
  R: ["white", "rook"],
  B: ["white", "bishop"],
  N: ["white", "knight"],
};
