// NOTE: this code uses the chess.js and chessboard.js libraries
// https://github.com/jhlywa/chess.js
// https://github.com/oakmac/chessboardjs/

// It uses this example from chessboard.js
// https://chessboardjs.com/examples.html#5003

import { Chess } from '/chess-js-logic/chess.js'

var board = null
var game = new Chess()
var whiteSquareGrey = '#a9a9a9'
var blackSquareGrey = '#696969'
var notn = {"": "", "pawn": "", "knight": "N", "bishop": "B", "rook": "R", "queen": "Q", "king": "K",
  "a" : "a", "b": "b", "c" : "c", "d": "d", "e" : "e", "f": "f", "g" : "g", "h": "h",
  "alpha": "a", "bravo": "b", "charlie": "c", "delta": "d", "echo": "e", "foxtrot": "f", "golf": "g", "hotel": "h",
  "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8,
  "E4": "e4", "F3": "f3"
};

function removeGreySquares () {
  $('#myBoard .square-55d63').css('background', '')
}

function greySquare (square) {
  var $square = $('#myBoard .square-' + square)

  var background = whiteSquareGrey
  if ($square.hasClass('black-3c85d')) {
    background = blackSquareGrey
  }

  $square.css('background', background)
}

function onDragStart (source, piece) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false

  // or if it's not that side's turn
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false
  }
}

function onDrop (source, target) {
  removeGreySquares()

  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })

  // illegal move
  if (move === null) return 'snapback'
}

function onMouseoverSquare (square, piece) {
  // get list of possible moves for this square
  var moves = game.moves({
    square: square,
    verbose: true
  })

  // exit if there are no moves available for this square
  if (moves.length === 0) return

  // highlight the square they moused over
  greySquare(square)

  // highlight the possible squares for this piece
  for (var i = 0; i < moves.length; i++) {
    greySquare(moves[i].to)
  }
}

function onMouseoutSquare (square, piece) {
  removeGreySquares()
}

function onSnapEnd () {
  board.position(game.fen())
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  onSnapEnd: onSnapEnd
}
board = Chessboard('myBoard', config)

export function moveFR(piece, file, rank) {
  piece = notn[piece.toLowerCase()];
  file = notn[file.toLowerCase()];
  rank = notn[rank];
  console.log(piece + file + rank);
  var theMove = game.move(piece + file + rank);
  board.position(game.fen())
  return theMove;
}

export function moveS(piece, square) {
  piece = notn[piece.toLowerCase()];
  square = square.toLowerCase();
  console.log(piece + square);
  var theMove = game.move(piece + square);
  board.position(game.fen())
  return theMove;
}

export function takeFR(piece, file, rank) {
  piece = notn[piece.toLowerCase()];
  file = notn[file.toLowerCase()];
  rank = notn[rank];
  console.log(piece + "x" + file + rank);
  var theMove = game.move(piece + "x" + file + rank);
  board.position(game.fen())
  return theMove;
}

export function takeS(piece, square) {
  piece = notn[piece.toLowerCase()];
  square = square.toLowerCase();
  console.log(piece + "x" + square);
  var theMove = game.move(piece + "x" + square);
  board.position(game.fen())
  return theMove;
}

export function undo(halfUndoes) {
  for (var i=0; i < halfUndoes-1; i++) {
    game.undo();
  }
  var theMove = game.undo();
  board.position(game.fen())
  return theMove;
}
