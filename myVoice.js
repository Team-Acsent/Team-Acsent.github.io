import { moveFR } from "./myChess.js";
import { moveS } from "./myChess.js";
import { undo } from "./myChess.js";
import { castle } from "./myChess.js";

window.moveFR = moveFR;
window.moveS = moveS;
window.undo = undo;
window.castle = castle;

var speakNotn = {"p": "pawn", "n": "knight", "b": "bishop", "r": "rook", "q": "queen", "k": "king"};

var alanBtnInstance = alanBtn({
key: "da1d9475216f062601b014eb6f9a7ca22e956eca572e1d8b807a3e2338fdd0dc/stage",
onCommand: function (commandData) {
  var isLegal = false;
  var isCapture = false;
  var castleSide = "";
  var isPromotion = false;
  if (commandData.command === "move") {
    if (commandData.flags.includes("c")) {
      isCapture = true;
    }
    if (commandData.format === "fr") {
      if (window.moveFR(commandData.piece, commandData.file, commandData.rank, isCapture)) {
        isLegal = true;
      }
    }
    if (commandData.format === "s") {
      if (window.moveS(commandData.piece, commandData.square, isCapture)) {
        isLegal = true;
      }
    }
    if (commandData.format === "castle") {
      castleSide = castle(commandData.side);
      if (castleSide) {
        isLegal = true;
      } else {
        castleSide = "n";
      }
    }
    speakMove(isLegal, isCapture, castleSide, isPromotion);
  }

  if (commandData.command === "undo") {
    var canUndo = true;
    var numUndoes = 0;
    while (canUndo && numUndoes<commandData.times) {
      var undo = window.undo();
      if (!undo) {
        canUndo=false;
      }
      speakUndo(undo);
      numUndoes ++;
    }
  }

  if(commandData.command === "wait") {
    wait(commandData.time);
  }

  if(commandData.command === "deactivate") {
    alanBtnInstance.deactivate();
  }

},
rootEl: document.getElementById("alan-btn"),
});
alanBtnInstance.setVisualState({"screen": "Game in Progress"});

function speakMove(isLegal, isCapture, castleSide, isPromotion) {
  alanBtnInstance.callProjectApi("speakMove", {
    "isLegal": isLegal,
    "isCapture": isCapture,
    "castleSide": castleSide,
    "isPromotion": isPromotion
  }, function(error, result) {
    if (error) {
      console.error(error);
      return;
    }
    console.log(result);
  });
};

function speakUndo(lastUndo) {
  var undoPhrase;
  if(lastUndo) {
    if (lastUndo.flags.includes("k")) {
      undoPhrase = "kingside castle";
    } else if (lastUndo.flags.includes("q")) {
      undoPhrase = "queenside castle";
    } else if (lastUndo.flags.includes("c")) {
      undoPhrase = speakNotn[lastUndo.piece] + " takes " + speakNotn[lastUndo.captured] + "on" + lastUndo.to + " from " + lastUndo.from;
    } else {
      undoPhrase = speakNotn[lastUndo.piece] + " to " + lastUndo.to + " from " + lastUndo.from;
    }
  }
  alanBtnInstance.callProjectApi("speakUndo", {
    "lastUndo": undoPhrase
  }, function(error, result) {
    if (error) {
      console.error(error);
      return;
    }
    console.log(result);
  });
}

function wait(seconds) {
  setTimeout(activate, seconds*1000);
  function activate (time) {
    if (alanBtnInstance.isActive()) {
      setTimeout(activate, 500); //the button may automatically turn off a bit later --> check again in 500 ms
    }
    alanBtnInstance.activate();
    setTimeout(alanBtnInstance.activate, 500); //check once more just in case (yes this is needed, at least for wait 10 seconds)
  }
}
