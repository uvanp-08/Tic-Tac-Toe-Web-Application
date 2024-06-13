let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let xScore = 0;
let oScore = 0;
let ties = 0;
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');
const xScoreDisplay = document.getElementById('xScore');
const oScoreDisplay = document.getElementById('oScore');
const tiesDisplay = document.getElementById('ties');

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
let winningCells = []; 

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) {
        return;
    }

    updateCell(cell, index);
    checkWinner();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.innerText = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winningCells = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        message.innerText = `Player ${currentPlayer === 'X' ? 'O' : 'X'} Wins!`;
        isGameActive = false;
        highlightWinningCells(winningCells);
        updateScore(currentPlayer === 'X' ? 'O' : 'X');
        return;
    }

    if (!board.includes('')) {
        message.innerText = 'Game Draw!';
        isGameActive = false;
        ties++;
        tiesDisplay.innerText = ties;
        return;
    }

    message.innerText = `Player ${currentPlayer}'s Turn`;
}

function updateScore(winner) {
    if (winner === 'X') {
        xScore++;
        xScoreDisplay.innerText = xScore;
    } else {
        oScore++;
        oScoreDisplay.innerText = oScore;
    }
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    message.innerText = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => cell.innerText = '');
    setFirstPlayer();
    restartBtn.innerHTML = "Play Again";
    dehightlightWinningCells(winningCells);
}

function setFirstPlayer() {
    if (message.innerText.includes('Draw')) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    } else if (message.innerText.includes('Wins')) {
        currentPlayer = message.innerText.includes('X') ? 'X' : 'O';
    }
}

function highlightWinningCells(winningCells) {
    winningCells.forEach(index => {
        cells[index].classList.add('blink');
    });
}

function dehightlightWinningCells(winningCells) {
    winningCells.forEach(index => {
        cells[index].classList.remove('blink');
    });
}