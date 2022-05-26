import { Chess } from '/chess-js-logic/chess.js'

const chess = new Chess()

var board = document.getElementById("ascii-board");
chess.move("e4");
chess.move("c5");
board.innerHTML = chess.ascii();

var board1 = Chessboard('board1', 'start')
