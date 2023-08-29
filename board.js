const visualBoard = document.getElementById("board");
const CheckersBoard = [];
function createBoard() {
  for (let row = 0; row < 8; row++) {
    for (let coulmn = 0; coulmn < 8; coulmn++) {
      const square = document.createElement("div");
      if (row % 2 === 0) {
        square.className = coulmn % 2 === 0 ? "white" : "black";
        square.id = row + "" + coulmn;
        if (row !== 3 && row !== 4) {
          if (square.className === "black") {
            const newCheker = document.createElement("button");
            newCheker.id = row + "" + coulmn;
            newCheker.classList.add("checker");
            if (row < 4) {
              // addChecker("white_checker")
              newCheker.classList.add("white_checker");
              square.appendChild(newCheker);
              CheckersBoard[square.id] = "white_checker";
            } else {
              // addChecker("black_checker")
              newCheker.classList.add("black_checker");
              square.appendChild(newCheker);
              CheckersBoard[square.id] = "black_checker";
            }
          } else {
            CheckersBoard[square.id] = "empty";
          }
        } else {
          CheckersBoard[square.id] = "empty";
        }
      } else {
        square.className = coulmn % 2 === 0 ? "black" : "white";
        square.id = row + "" + coulmn;
        if (row !== 3 && row !== 4) {
          if (square.className === "black") {
            const newCheker = document.createElement("button");
            newCheker.id = row + "" + coulmn;
            newCheker.classList.add("checker");
            if (row > 4) {
              newCheker.classList.add("black_checker");
              square.appendChild(newCheker);
              CheckersBoard[square.id] = "black_checker";
            } else {
              newCheker.classList.add("white_checker");
              square.appendChild(newCheker);
              CheckersBoard[square.id] = "white_checker";
            }
          } else {
            CheckersBoard[square.id] = "empty";
          }
        } else {
          CheckersBoard[square.id] = "empty";
        }
      }
      board.appendChild(square);
    }
  }
}
createBoard();
let isWhiteTurn = true;
let whiteCheckerCounter = 12,
  blackCheckerCounter = 12;
let checkersCanEatId = [];
let checkerMustEatAgain = false;
let firstClickId = null;
let secondClickId = null;
let isEatNow = false;
let placesCheckerMustEatAgainId = [];
const resignBtn = document.getElementById("resign-btn");
const drawBtn = document.getElementById("draw-btn");
const endModal = document.getElementById("end-modal");
const txtEndModal = document.getElementById("txt-end-modal");
const okEndBtn = document.getElementById("ok-btn");
const drawModal = document.getElementById("draw-modal");
const txtDrawModal = document.getElementById("txt-draw-modal");
const noDrawBtn = document.getElementById("no-btn");
const yesDrawBtn = document.getElementById("yes-btn");
addEventListenerButtons();
addEventListenersClicks();
document.getElementById("turn").style = isWhiteTurn
  ? "background-Color : white; outline: 3px solid #dddddd; color: #dddddd; text-align: center;"
  : "background-Color : #333; outline: 3px solid #000; color: #000; text-align: center;";

function resetClicks() {
  firstClickId = null;
  secondClickId = null;
}
function isLegalMove(firstClickId, secondClickId) {
  let startRow = parseInt(firstClickId[0]);
  let startColumn = parseInt(firstClickId[1]);
  let endRow = parseInt(secondClickId[0]);
  let endColumn = parseInt(secondClickId[1]);
  let isKing;
  if (
    CheckersBoard[firstClickId] === "black_checker_king" ||
    CheckersBoard[firstClickId] === "white_checker_king"
  )
    isKing = true;
  else isKing = false;

  if (isKing) {
    let isLegalStepKing = isLegalMoveKing(firstClickId, secondClickId);
    return isLegalStepKing;
  }
  if (isWhiteTurn) {
    if (endRow === startRow + 1) {
      if (
        (endColumn === startColumn - 1 || endColumn === startColumn + 1) &&
        CheckersBoard[secondClickId] === "empty"
      )
        return true;
    } else if (isLegalEat(firstClickId, secondClickId)) return true;
    else return false;
  } else {
    if (endRow === startRow - 1) {
      if (
        (endColumn === startColumn - 1 || endColumn === startColumn + 1) &&
        CheckersBoard[secondClickId] === "empty"
      )
        return true;
    } else if (isLegalEat(firstClickId, secondClickId)) return true;
    else return false;
  }
}
function isLegalEat(firstClickId, secondClickId) {
  let startRow = parseInt(firstClickId[0]);
  let startColumn = parseInt(firstClickId[1]);
  let endRow = parseInt(secondClickId[0]);
  let endColumn = parseInt(secondClickId[1]);
  if (
    CheckersBoard[firstClickId] === "white_checker_king" ||
    CheckersBoard[firstClickId] === "black_checker_king"
  ) {
    if (isLegalEatKing(firstClickId, secondClickId)) {
      return true;
    }
    return false;
  }
  if (isWhiteTurn) {
    if (endRow === startRow + 2) {
      if (endColumn === startColumn - 2 || endColumn === startColumn + 2) {
        if (
          CheckersBoard[
            (startRow + endRow) / 2 + "" + (startColumn + endColumn) / 2
          ] === "black_checker_king" ||
          CheckersBoard[
            (startRow + endRow) / 2 + "" + (startColumn + endColumn) / 2
          ] === "black_checker"
        ) {
          if (CheckersBoard[secondClickId] === "empty") return true;
        }
      }
      return false;
    } else {
      return false;
    }
  } else {
    if (endRow === startRow - 2) {
      if (endColumn === startColumn - 2 || endColumn === startColumn + 2) {
        if (
          CheckersBoard[
            (startRow + endRow) / 2 + "" + (startColumn + endColumn) / 2
          ] === "white_checker_king" ||
          CheckersBoard[
            (startRow + endRow) / 2 + "" + (startColumn + endColumn) / 2
          ] === "white_checker"
        ) {
          if (CheckersBoard[secondClickId] === "empty") return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }
}
function isLegalEatKing(firstClickId, secondClickId) {
  let startRow = parseInt(firstClickId[0]);
  let startColumn = parseInt(firstClickId[1]);
  let endRow = parseInt(secondClickId[0]);
  let endColumn = parseInt(secondClickId[1]);
  if (endRow === startRow + 2 || endRow === startRow - 2) {
    if (endColumn === startColumn - 2 || endColumn === startColumn + 2) {
      if (
        isWhiteTurn
          ? CheckersBoard[
              (startRow + endRow) / 2 + "" + (startColumn + endColumn) / 2
            ] === "black_checker_king" ||
            CheckersBoard[
              (startRow + endRow) / 2 + "" + (startColumn + endColumn) / 2
            ] === "black_checker"
          : CheckersBoard[
              (startRow + endRow) / 2 + "" + (startColumn + endColumn) / 2
            ] === "white_checker_king" ||
            CheckersBoard[
              (startRow + endRow) / 2 + "" + (startColumn + endColumn) / 2
            ] === "white_checker"
      ) {
        if (CheckersBoard[secondClickId] === "empty") return true;
      }
    }
    return false;
  }
  return false;
}
function isLegalMoveKing(firstClickId, secondClickId) {
  let startRow = parseInt(firstClickId[0]);
  let startColumn = parseInt(firstClickId[1]);
  let endRow = parseInt(secondClickId[0]);
  let endColumn = parseInt(secondClickId[1]);
  if (endRow === startRow + 1 || endRow === startRow - 1) {
    if (endColumn === startColumn - 1 || endColumn === startColumn + 1)
      return true;
  } else if (isLegalEatKing(firstClickId, secondClickId)) return true;
  else return false;
}
function Move(firstClickId, secondClickId) {
  let startRow = parseInt(firstClickId[0]);
  let startColumn = parseInt(firstClickId[1]);
  let endRow = parseInt(secondClickId[0]);
  let endColumn = parseInt(secondClickId[1]);
  let isKing;
  if (
    CheckersBoard[firstClickId] === "black_checker_king" ||
    CheckersBoard[firstClickId] === "white_checker_king"
  ) {
    isKing = true;
  } else {
    isKing = false;
  }
  let checkerToMoveForCheckersBoard = CheckersBoard[firstClickId];
  const checkerToMove = document.getElementById(firstClickId).firstChild;
  if (endRow === startRow + 1 || endRow === startRow - 1) {
    const newCheker = document.createElement("button");
    document.getElementById(secondClickId).appendChild(newCheker);
    newCheker.id = document.getElementById(secondClickId).id;
    newCheker.classList.add(
      "checker",
      isWhiteTurn ? "white_checker" : "black_checker"
    );
    if (isKing) {
      newCheker.classList.add("king");
    } else {
      if (isWhiteTurn && endRow === 7) {
        newCheker.classList.add("king");
        checkerToMoveForCheckersBoard = "white_checker_king";
      } else if (!isWhiteTurn && endRow === 0) {
        newCheker.classList.add("king");
        checkerToMoveForCheckersBoard = "black_checker_king";
      }
    }
    document.getElementById(firstClickId).innerHTML = "";
    CheckersBoard[firstClickId] = "empty";
    CheckersBoard[secondClickId] = checkerToMoveForCheckersBoard;
    console.log(CheckersBoard);
  } else if (endRow === startRow + 2 || endRow === startRow - 2) {
    const newCheker = document.createElement("button");
    document.getElementById(secondClickId).appendChild(newCheker);
    newCheker.id = document.getElementById(secondClickId).id;
    newCheker.classList.add(
      "checker",
      isWhiteTurn ? "white_checker" : "black_checker"
    );
    if (isKing) {
      newCheker.classList.add("king");
    } else {
      if (isWhiteTurn && endRow === 7) {
        newCheker.classList.add("king");
        checkerToMoveForCheckersBoard = "white_checker_king";
      } else if (!isWhiteTurn && endRow === 0) {
        newCheker.classList.add("king");
        checkerToMoveForCheckersBoard = "black_checker_king";
      }
    }
    document.getElementById(firstClickId).innerHTML = "";
    document.getElementById(
      (startRow + endRow) / 2 + "" + (startColumn + endColumn) / 2
    ).innerHTML = "";
    CheckersBoard[firstClickId] = "empty";
    CheckersBoard[
      (startRow + endRow) / 2 + "" + (startColumn + endColumn) / 2
    ] = "empty";
    if (isWhiteTurn) {
      blackCheckerCounter--;
    } else {
      whiteCheckerCounter--;
    }
    isEatNow = true;
    CheckersBoard[secondClickId] = checkerToMoveForCheckersBoard;
  }
}
function addEventListenersClicks() {
  ////first click
  document.getElementById("board").addEventListener("click", (event) => {
    if (!isCorrectTurn(isWhiteTurn, event.target.id)) return false;
    if (
      firstClickId !== null ||
      event.target.id == null ||
      event.target.id == "board" ||
      CheckersBoard[event.target.id] == "empty"
    ) {
      if (isWhiteTurn && CheckersBoard[event.target.id] === "black_checker")
        return false;
    }
    // if(placesCheckerMustEatAgainId>0)return false;
    firstClickId = event.target.id;
    console.log("firstClickId=", firstClickId);
  });
  ////second click
  document.getElementById("board").addEventListener("click", (event) => {
    if (placesCheckerMustEatAgainId.length > 0) {
      let isCorrectChoice = false;
      for (let i = 0; i < placesCheckerMustEatAgainId.length; i++) {
        if (event.target.id == placesCheckerMustEatAgainId[i]) {
          isCorrectChoice = true;
          break;
        }
      }
      if (!isCorrectChoice) {
        return false;
      }
    }
    if (
      firstClickId === null ||
      event.target.id === null ||
      event.target.classList.contains("white") ||
      event.target.id === "board" ||
      CheckersBoard[event.target.id] === "black_checker" ||
      CheckersBoard[event.target.id] === "white_checker" ||
      CheckersBoard[event.target.id] === "white_checker_king" ||
      CheckersBoard[event.target.id] === "black_checker_king"
    )
      return false;

    secondClickId = event.target.id;
    saveCheckersCanEatId();
    console.log(checkersCanEatId);

    console.log("secondClickId=", secondClickId);
    if (isLegalMove(firstClickId, secondClickId)) {
      Move(firstClickId, secondClickId);
      if (!isEatNow) {
        BurnCheckers();
        for (let index = 0; index < checkersCanEatId.length; index++) {
          if (checkersCanEatId[index] === firstClickId) {
            CheckersBoard[secondClickId] = "empty";
            document.getElementById(secondClickId).innerHTML = "";
          }
        }
        isWhiteTurn = passTurn(isWhiteTurn);
      }
      if (isEatNow) {
        checkerMustEatAgain = isCanEatAgain();
        if (!checkerMustEatAgain) {
          isWhiteTurn = passTurn(isWhiteTurn);
        }
      }
    }
    resetClicks();
    console.log(whiteCheckerCounter, blackCheckerCounter);
    if (isStalment()) {
      endModal.className = "modal";
      txtEndModal.innerHTML = isWhiteTurn
      ? "GAME ENDED IN STALMENT, BLACK WINS!"
      : "GAME ENDED IN STALMENT, WHITE WINS!";
    }
    checkForWin();
  });
}
function addEventListenerButtons() {
  ////drawRequest
  drawBtn.addEventListener("click", () => {
    drawModal.className = "modal";
    txtDrawModal.innerHTML =
      (isWhiteTurn ? "WHITE" : "BLACK") + " WANTS TO DRAW, DO YOU AGREE?";
  });
  ////resign
  resignBtn.addEventListener("click", () => {
    endModal.className = "modal";
    txtEndModal.innerHTML = isWhiteTurn
      ? "WHITE RESIGNED, BLACK WINS!"
      : "BLACK RESIGNED, WHITE WINS!";
  });
  okEndBtn.addEventListener("click", () => {
    document.location.reload();
    endModal.className = "none";
  });
  noDrawBtn.addEventListener("click", () => {
    drawModal.className = "none";
  });
  yesDrawBtn.addEventListener("click", () => {
    drawModal.className = "none";
    endModal.className = "modal";
    txtEndModal.innerHTML = "GAME ENDED, DRAW BY AGREEMENT.";
  });
}
function isCorrectTurn(isWhiteTurn, firstClickId) {
  if (
    isWhiteTurn &&
    (CheckersBoard[firstClickId] === "black_checker" ||
      CheckersBoard[firstClickId] === "empty" ||
      CheckersBoard[firstClickId] === "black_checker_king")
  )
    return false;
  else if (
    !isWhiteTurn &&
    (CheckersBoard[firstClickId] === "white_checker" ||
      CheckersBoard[firstClickId] === "empty" ||
      CheckersBoard[firstClickId] === "white_checker_king")
  ) {
    return false;
  }
  return true;
}
function saveCheckersCanEatId() {
  for (let row = 0; row < 8; row++) {
    for (let coulmn = 0; coulmn < 8; coulmn++) {
      let startPlace = "";
      startPlace += "" + row + "" + coulmn;
      if (isWhiteTurn) {
        if (
          CheckersBoard[startPlace] === "white_checker" ||
          CheckersBoard[startPlace] === "white_checker_king"
        ) {
          for (let endrow = 0; endrow < 8; endrow++) {
            for (let endColumn = 0; endColumn < 8; endColumn++) {
              let endPlace = "";
              endPlace = "" + endrow + "" + endColumn;
              if (isLegalEat(startPlace, endPlace)) {
                checkersCanEatId.push(startPlace);
              }
            }
          }
        }
      } else {
        if (
          CheckersBoard[startPlace] === "black_checker" ||
          CheckersBoard[startPlace] === "black_checker_king"
        ) {
          for (let endrow = 0; endrow < 8; endrow++) {
            for (let endColumn = 0; endColumn < 8; endColumn++) {
              let endPlace = "";
              endPlace = "" + endrow + "" + endColumn;
              if (isLegalEat(startPlace, endPlace)) {
                checkersCanEatId.push(startPlace);
              }
            }
          }
        }
      }
    }
  }
}
function BurnCheckers() {
  if (!isEatNow && checkersCanEatId !== null) {
    for (let i = 0; i < checkersCanEatId.length; i++) {
      CheckersBoard[checkersCanEatId[i]] = "empty";
      document.getElementById(checkersCanEatId[i]).innerHTML = "";
    }
  }
  isWhiteTurn
    ? (whiteCheckerCounter -= checkersCanEatId.length)
    : (blackCheckerCounter -= checkersCanEatId.length);
}
function isCanEatAgain() {
  let startRow = parseInt(secondClickId[0]);
  let startColumn = parseInt(secondClickId[1]);
  let isCanEat = false;
  let placesId = [
    startRow + 2 + "" + (startColumn + 2),
    startRow + 2 + "" + (startColumn - 2),
    startRow - 2 + "" + (startColumn + 2),
    startRow - 2 + "" + (startColumn - 2),
  ];
  for (let index = 0; index < placesId.length; index++) {
    if (isLegalEat(secondClickId, placesId[index])) {
      placesCheckerMustEatAgainId.push(placesId[index]);
      isCanEat = true;
    }
  }
  return isCanEat;
}
function passTurn(isWhiteTurn) {
  document.getElementById("turn").style = !isWhiteTurn
    ? "background-Color : white; outline: 3px solid #dddddd; color: #dddddd; text-align: center;"
    : "background-Color : #333; outline: 3px solid #000; color: #000; text-align: center;";
  checkersCanEatId = [];
  isEatNow = false;
  placesCheckerMustEatAgainId = [];
  return !isWhiteTurn;
}
function checkForWin() {
  if (whiteCheckerCounter === 0 || blackCheckerCounter === 0) {
    endModal.className = "modal";
    txtEndModal.innerHTML =
      whiteCheckerCounter === 0
        ? "GAME ENDED, BLACK WINS!"
        : "GAME ENDED, WHITE WINS!";
  }
}
function isStalment() {
  for (let startRow = 0; startRow < CheckersBoard.length; startRow++) {
    for (let coulmn = 0; coulmn < 8; coulmn++) {
      let startPlace = "";
      startPlace += "" + startRow + "" + coulmn;
      if (isWhiteTurn) {
        if (
          CheckersBoard[startPlace] === "white_checker" ||
          CheckersBoard[startPlace] === "white_checker_king"
        ) {
          for (let endrow = 0; endrow < 8; endrow++) {
            for (let endColumn = 0; endColumn < 8; endColumn++) {
              let endPlace = "";
              endPlace = "" + endrow + "" + endColumn;
              if (isLegalMove(startPlace, endPlace)) {
                return false;
              }
            }
          }
        }
      } else {
        if (
          CheckersBoard[startPlace] === "black_checker" ||
          CheckersBoard[startPlace] === "black_checker_king"
        ) {
          for (let endrow = 0; endrow < 8; endrow++) {
            for (let endColumn = 0; endColumn < 8; endColumn++) {
              let endPlace = "";
              endPlace = "" + endrow + "" + endColumn;
              if (isLegalMove(startPlace, endPlace)) {
                return false;
              }
            }
          }
        }
      }
    }
  }
  return true;
}
