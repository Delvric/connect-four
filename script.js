let currentPlayer = "red";
const gameBoard = document.getElementById("gameboard");
let logic = "";

let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

function displayGame(displayBoard) {
    for (rowSel = 5; rowSel >= 0; rowSel--) {
        let currentRow = displayBoard[rowSel];
        for (colCell = 0; colCell < 7; colCell++) {
            cellInHTML = document.getElementById(rowSel + "-" + colCell);
            cellInHTML.dataset.color = currentRow[colCell];
        }
    }
}


function displayPlayer(color) {
    if (currentPlayer === "red") {
        currentPlayer = "yellow";
    } else if (currentPlayer === "yellow") {
        currentPlayer = "red";
    }
    return currentPlayer;
}



function addDisk(color, gameUpdate, selectedCol) {
    let updatedGame = gameUpdate;
    let selectedRow;
    let rowUpdate;
    for (let i = gameUpdate.length - 1; i >= 0; i--) {
        rowUpdate = gameUpdate[i];
        if (rowUpdate[selectedCol] === 0) {
            selectedRow = i;
            break;
        }
    }
    rowUpdate[selectedCol] = color;
    updatedGame[selectedRow];
    return updatedGame;
}



function checkRowWin(boardToCheck) {
    for (let j = 0; j <= 5; j++) {
        let blueCount = 0;
        let redCount = 0;
        for (let i = 0; i <= 6; i++) {
            if (board[j][i] === 0) {
                continue;
            } else if (board[j][i] === "yellow") {
                blueCount++;
                redCount = 0;
                if (blueCount === 4) {
                    logic = "yellow";
                }
            } else if (board[j][i] === "red") {
                redCount++;
                blueCount = 0;
                if (redCount === 4) {
                    logic = "red";
                }
            }
        }
    }
    return logic;
}

function checkColWin(boardToCheck) {
    for (let j = 0; j <= 6; j++) {
        let blueCount = 0;
        let redCount = 0;
        for (let i = 0; i <= 5; i++) {
            if (board[i][j] === 0) {
                continue;
            } else if (board[i][j] === "yellow") {
                blueCount++;
                redCount = 0;
                if (blueCount === 4) {
                    logic = "yellow";
                }
            } else if (board[i][j] === "red") {
                redCount++;
                blueCount = 0;
                if (redCount === 4) {
                    logic = "red";
                }
            }
        }
    }
    return logic;
}

function checkDiagonalWin(boardToCheck) {
    let holdArray = [];
    for (let i = 0; i <= 5; i++) {
        boardPart = boardToCheck[i];
        for (let p = 0; p < boardPart.length; p++) {
            holdArray.push(boardPart[p]);
        }
    }

    function winnings(holder) {
        let redWinCount = 0;
        let blueWinCount = 0;
        for (w = 0; w <= 3; w++) {
            if (holder[w] === "red") {
                redWinCount++;
            }
            if (holder[w] === "yellow") {
                blueWinCount++;
            }
            if (redWinCount === 4) {
                logic = "red";
            }
            if (blueWinCount === 4) {
                logic = "yellow";
            }
        }
    }

    for (let i = 0; i <= 3; i++) {
        let holder = [];
        holder.push(holdArray[i]);
        holder.push(holdArray[i + 8]);
        holder.push(holdArray[i + 16]);
        holder.push(holdArray[i + 24]);
        winnings(holder);
    }
    for (let i = 1; i <= 4; i++) {
        let holder = [];
        holder.push(holdArray[i + 6]);
        holder.push(holdArray[i + 14]);
        holder.push(holdArray[i + 22]);
        holder.push(holdArray[i + 30]);
        winnings(holder);
    }
    for (let i = 1; i <= 4; i++) {
        let holder = [];
        holder.push(holdArray[i + 13]);
        holder.push(holdArray[i + 21]);
        holder.push(holdArray[i + 29]);
        holder.push(holdArray[i + 37]);
        winnings(holder);
    }

    for (let i = 1; i <= 4; i++) {
        let holder = [];
        holder.push(holdArray[34 + i]);
        holder.push(holdArray[28 + i]);
        holder.push(holdArray[22 + i]);
        holder.push(holdArray[16 + i]);
        winnings(holder);
    }

    for (let i = 1; i <= 4; i++) {
        let holder = [];
        holder.push(holdArray[27 + i]);
        holder.push(holdArray[21 + i]);
        holder.push(holdArray[15 + i]);
        holder.push(holdArray[9 + i]);
        winnings(holder);
    }

    for (let i = 1; i <= 4; i++) {
        let holder = [];
        holder.push(holdArray[20 + i]);
        holder.push(holdArray[14 + i]);
        holder.push(holdArray[8 + i]);
        holder.push(holdArray[2 + i]);
        winnings(holder);
    }
    return logic;
}

function checkforTie(boardToCheck) {
    let holdArray = [];
    let takenCells = 0;

    for (let i = 0; i <= 5; i++) {
        boardPart = boardToCheck[i];
        for (let p = 0; p < boardPart.length; p++) {
            holdArray.push(boardPart[p]);
        }
    }

    for (let i = 0; i < holdArray.length; i++) {
        if (holdArray[i] != 0) {
            takenCells++;
        }
    }

    if (takenCells === 42) {
        logic = "It is a Tie!";
    }
    return logic;
}

function checkForEndinglogic(boardToCheck) {
    checkRowWin(boardToCheck);
    checkColWin(boardToCheck);
    checkDiagonalWin(boardToCheck);
    checkforTie(boardToCheck);
    return logic;
}

function showMessage(logic) {
    if (logic === "red") {
        alert("Red player has won! Click Reset Game to play again!!");
    }
    if (logic === "yellow") {
        alert("yellow player has won! Click Reset Game to play again!");
    }
    if (logic === "tie") {
        alert("It is a Tie!");
    }
}

gameBoard.addEventListener("click", function (evt) {
    let clickedColumn = evt.target.dataset.col;
    if (clickedColumn === undefined) {
        return;
    }
    board = addDisk(currentPlayer, board, clickedColumn);
    displayGame(board);
    checkForEndinglogic(board);
    if (logic !== "") {
        showMessage(logic);
    } else {
        currentPlayer = displayPlayer(currentPlayer);
    }
    turn.innerHTML = currentPlayer;
});

function reset() {
    window.location.reload();
}