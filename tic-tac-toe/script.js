// Gameboard module
const Gameboard = (() => {
  let board = Array(9).fill("");
  const getBoard = () => board;
  const setCell = (index, mark) => {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false;
  };
  const reset = () => {
    board = Array(9).fill("");
  };
  return { getBoard, setCell, reset };
})();

// Player factory
function Player(name, mark) {
  return { name, mark };
}

// Game controller module
const GameController = (() => {
  let players = [];
  let currentPlayer = 0;
  let gameOver = false;

  const start = (name1, name2) => {
    players = [Player(name1, "X"), Player(name2, "O")];
    currentPlayer = 0;
    gameOver = false;
    Gameboard.reset();
    DisplayController.render();
    DisplayController.setResult(
      `${players[currentPlayer].name}'s turn (${players[currentPlayer].mark})`
    );
  };

  const playRound = (index) => {
    if (gameOver || !Gameboard.setCell(index, players[currentPlayer].mark))
      return;
    DisplayController.render();
    if (checkWin(players[currentPlayer].mark)) {
      DisplayController.setResult(`${players[currentPlayer].name} wins!`);
      gameOver = true;
    } else if (Gameboard.getBoard().every((cell) => cell !== "")) {
      DisplayController.setResult("It's a tie!");
      gameOver = true;
    } else {
      currentPlayer = 1 - currentPlayer;
      DisplayController.setResult(
        `${players[currentPlayer].name}'s turn (${players[currentPlayer].mark})`
      );
    }
  };

  const checkWin = (mark) => {
    const b = Gameboard.getBoard();
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // cols
      [0, 4, 8],
      [2, 4, 6], // diags
    ];
    return wins.some((line) => line.every((i) => b[i] === mark));
  };

  return { start, playRound };
})();

// Display controller module
const DisplayController = (() => {
  const boardDiv = document.getElementById("board");
  const resultDiv = document.getElementById("result");

  const render = () => {
    const board = Gameboard.getBoard();
    boardDiv.innerHTML = "";
    board.forEach((cell, i) => {
      const cellDiv = document.createElement("div");
      cellDiv.className = "cell";
      cellDiv.textContent = cell;
      cellDiv.dataset.index = i;
      if (!cell) cellDiv.style.cursor = "pointer";
      boardDiv.appendChild(cellDiv);
    });
  };

  const setResult = (msg) => {
    resultDiv.textContent = msg;
  };

  // Event delegation for board clicks
  boardDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("cell")) {
      GameController.playRound(Number(e.target.dataset.index));
    }
  });

  return { render, setResult };
})();

// Handle player form and start/restart
const playerForm = document.getElementById("playerForm");
playerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name1 = document.getElementById("player1").value.trim() || "Player 1";
  const name2 = document.getElementById("player2").value.trim() || "Player 2";
  GameController.start(name1, name2);
});

// Initial render (empty board)
DisplayController.render();
