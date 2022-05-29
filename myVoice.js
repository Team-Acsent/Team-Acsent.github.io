import { moveFR } from "./myChess.js";
import { moveS } from "./myChess.js";
import { takeFR } from "./myChess.js";
import { takeS } from "./myChess.js";
import { undo } from "./myChess.js";

window.moveFR = moveFR;
window.moveS = moveS;
window.takeFR = takeFR;
window.takeS = takeS;
window.undo = undo;

var speakNotn = {"p": "pawn", "n": "knight", "b": "bishop", "r": "rook", "q": "queen", "k": "king"};

var alanBtnInstance = alanBtn({
key: "da1d9475216f062601b014eb6f9a7ca22e956eca572e1d8b807a3e2338fdd0dc/stage",
onCommand: function (commandData) {
  var isLegal = false;
  var isCapture = false;
  if (commandData.command === "moveFR") {
    if (window.moveFR(commandData.piece, commandData.file, commandData.rank)) {
      isLegal = true;
    }
    speakMove(isLegal, isCapture);
  }
  if (commandData.command === "moveS") {
    if (window.moveS(commandData.piece, commandData.square)) {
      isLegal = true;
    }
    speakMove(isLegal, isCapture);
  }
  if (commandData.command === "takeFR") {
    isCapture = true;
    if (window.takeFR(commandData.piece, commandData.file, commandData.rank)) {
      isLegal = true;
    }
    speakMove(isLegal, isCapture);
  }
  if (commandData.command === "takeS") {
    isCapture = true;
    if (window.takeS(commandData.piece, commandData.square)) {
      isLegal = true;
    }
    speakMove(isLegal, isCapture);
  }

  if (commandData.command === "undo") {
    var lastUndo = window.undo(1);
    speakUndo(lastUndo);
  }

},
rootEl: document.getElementById("alan-btn"),
});
alanBtnInstance.setVisualState({"screen": "Game in Progress"});

function speakMove(isLegal, isCapture) {
  alanBtnInstance.callProjectApi("speakMove", {
    "isLegal": isLegal,
    "isCapture": isCapture
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
    if (lastUndo.flags.includes("c")) {
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
