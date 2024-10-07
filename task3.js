const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.querySelector('.game-status');
const restartButton = document.querySelector('.restart-btn');
const darkModeToggle = document.querySelector('.toggle-dark-mode');
const body = document.body;

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Set initial theme based on user preference or default to light
const storedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', storedTheme);

// Toggle between light and dark mode
darkModeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme); // Save the theme preference
});

// Handle cell click
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (gameBoard[index] === '' && !isGameOver) {
      gameBoard[index] = currentPlayer;
      cell.textContent = currentPlayer;
      checkWin();
      switchPlayer();
    }
  });
});

// Check for a win or draw
function checkWin() {
  const winner = winningCombinations.some(combination => {
    return combination.every(index => {
      return gameBoard[index] === currentPlayer;
    });
  });

  if (winner) {
    gameStatus.textContent = `${currentPlayer} Wins!`;
    isGameOver = true;
  } else if (!gameBoard.includes('')) {
    gameStatus.textContent = "It's a Draw!";
    isGameOver = true;
  }
}

// Switch player
function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (!isGameOver) {
    gameStatus.textContent = `${currentPlayer}'s Turn`;
  }
}

// Restart the game
restartButton.addEventListener('click', () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  isGameOver = false;
  currentPlayer = 'X';
  gameStatus.textContent = `${currentPlayer}'s Turn`;
  cells.forEach(cell => (cell.textContent = ''));
});
