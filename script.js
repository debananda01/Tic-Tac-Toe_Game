const board = document.getElementById('board');
const status = document.getElementById('status');
const newGameButton = document.getElementById('new-game-button');
const gameTitle = document.querySelector('.game-title');
const background = document.querySelector('.background');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    renderBoard();
    if (checkWinner()) {
        gameActive = false;
        showResult(`${currentPlayer} wins!`);
    } else if (gameBoard.every(cell => cell !== '')) {
        gameActive = false;
        showResult('It\'s a draw!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Current Player: ${currentPlayer}`;
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function renderBoard() {
    board.innerHTML = '';
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellElement);
    });
}

function showResult(message) {
    status.textContent = message;
    newGameButton.style.display = 'block';
    newGameButton.addEventListener('click', () => resetGame());
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = `Current Player: ${currentPlayer}`;
    newGameButton.style.display = 'none';
    renderBoard();
}

gameTitle.textContent = 'Tic-Tac-Toe';
background.style.opacity = '0.5';
renderBoard();
status.textContent = `Current Player: ${currentPlayer}`;
