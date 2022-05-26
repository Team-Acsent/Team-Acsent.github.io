import { Chess } from '/logic/chess.js'

const chess = new Chess()

var board = document.getElementById("ascii-board");
chess.move("e4");
chess.move("c5");
board.innerHTML = chess.ascii();
console.log(chess.pgn())
