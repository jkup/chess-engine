import { Chess } from "chess.js";
import { Chessboard } from "cm-chessboard/src/cm-chessboard/Chessboard.js";

let chessboard = new Chessboard(document.getElementById("board"), {
  position: "start",
});

let game = Chess();

function makeRandomMove() {
  // exit if the game is over
  if (game.game_over()) return;

  type MovesObject = {
    checks: string[];
    captures: string[];
    moves: string[];
  };

  let movesObject: MovesObject = {
    checks: [],
    captures: [],
    moves: [],
  };

  let possibleMoves = game.moves();

  possibleMoves.forEach((val) => {
    if (val.includes("+")) {
      movesObject.checks.push(val);
    } else if (val.includes("x")) {
      movesObject.captures.push(val);
    } else {
      movesObject.moves.push(val);
    }
  });

  if (movesObject.checks.length > 0) {
    let randomIdx = Math.floor(Math.random() * movesObject.checks.length);

    game.move(movesObject.checks[randomIdx]);

    chessboard.setPosition(game.fen());
  } else if (movesObject.captures.length > 0) {
    let randomIdx = Math.floor(Math.random() * movesObject.checks.length);

    game.move(movesObject.captures[randomIdx]);

    chessboard.setPosition(game.fen());
  } else {
    let randomIdx = Math.floor(Math.random() * movesObject.moves.length);

    game.move(movesObject.moves[randomIdx]);

    chessboard.setPosition(game.fen());
  }

  window.setTimeout(makeRandomMove, 500);
}

window.setTimeout(makeRandomMove, 500);
