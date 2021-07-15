function createBoard() {
    let cells = Array.from(Array(9).keys()).map (i => (
        `
        <div
            class = "cell"
            data-cell>
        </div>
        `
    )).join("");
    document.getElementById("board").innerHTML = cells;
}
createBoard()

const cellElements = document.querySelectorAll("[data-cell]");
let circleTurn = undefined;
let winningMessage = document.getElementById("winningMessage");
let X_score = parseInt(document.getElementById("scoreX").innerText);
let O_score = parseInt(document.getElementById("scoreO").innerText);
const restartButton = document.getElementById("restartBtn");
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const board = document.getElementById("board");
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
    winningMessage.classList.add("hide");
    restartButton.classList.add("hide");
    winningMessage.innerText = "XOXOXO";
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.classList.remove("cursor");
        cell.addEventListener("click", handleClick, {once: true});
    })
    setBoardHoverClass();
}

function handleClick(event) {
    const cell = event.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    }
    else if (isDraw()) {
        endGame(true);
    }
    else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessage.innerText = "Draw!";
        document.getElementById("scoreO").innerText = `${++O_score}`;
        document.getElementById("scoreX").innerText = `${++X_score}`;
    }
    else {
        winningMessage.innerText = `${circleTurn ? "Player O " : "Player X "} wins!`;
        if (circleTurn) {
            document.getElementById("scoreO").innerText = `${++O_score}`;
        }
        else {
            document.getElementById("scoreX").innerText = `${++X_score}`;
        }    
    }
    winningMessage.classList.remove("hide");
    restartButton.classList.remove("hide");
    cellElements.forEach(cell => {
        cell.removeEventListener("click", handleClick);
        cell.classList.add("cursor");
    })
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    }
    else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}
