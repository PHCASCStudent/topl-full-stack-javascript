import { Game } from "./game.js";

const playerBoardDiv = document.getElementById("player-board");
const computerBoardDiv = document.getElementById("computer-board");
const messageDiv = document.getElementById("message");
const restartBtn = document.getElementById("restart");

let game;

function renderBoard(boardDiv, board, revealShips = false) {
  boardDiv.innerHTML = "";
  for (let y = 0; y < board.size; y++) {
    for (let x = 0; x < board.size; x++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      const ship = board.board[y][x];
      if (ship && (revealShips || ship.hits > 0)) cell.classList.add("ship");
      if (ship && ship.hits > 0 && ship.hits <= ship.length)
        cell.classList.add("hit");
      if (!ship && board.missedAttacks.some(([mx, my]) => mx === x && my === y))
        cell.classList.add("miss");
      cell.dataset.x = x;
      cell.dataset.y = y;
      boardDiv.appendChild(cell);
    }
  }
}

function randomizeShips(board) {
  // Place 1x5, 1x4, 2x3, 1x2 ships randomly
  const ships = [5, 4, 3, 3, 2];
  for (let len of ships) {
    let placed = false;
    while (!placed) {
      const x = Math.floor(Math.random() * board.size);
      const y = Math.floor(Math.random() * board.size);
      const horizontal = Math.random() < 0.5;
      placed = board.placeShip(x, y, len, horizontal);
    }
  }
}

function startGame() {
  game = new Game();
  randomizeShips(game.player.board);
  randomizeShips(game.computer.board);
  render();
  messageDiv.textContent =
    "Your turn! Click a cell on the enemy board to attack.";
}

function render() {
  renderBoard(playerBoardDiv, game.player.board, true);
  renderBoard(computerBoardDiv, game.computer.board, false);
}

computerBoardDiv.onclick = function (e) {
  if (game.isOver()) return;
  const cell = e.target.closest(".cell");
  if (!cell) return;
  const x = +cell.dataset.x;
  const y = +cell.dataset.y;
  // Prevent attacking same cell twice
  if (
    game.computer.board.missedAttacks.some(
      ([mx, my]) => mx === x && my === y
    ) ||
    (game.computer.board.board[y][x] &&
      game.computer.board.board[y][x].hits > 0)
  ) {
    messageDiv.textContent = "You already attacked this cell!";
    return;
  }
  const result = game.player.attack(game.computer, x, y);
  render();
  if (result === "hit") {
    messageDiv.textContent = "Hit!";
  } else {
    messageDiv.textContent = "Miss!";
  }
  if (game.computer.board.allSunk()) {
    messageDiv.textContent = "You win! All enemy ships sunk.";
    render();
    return;
  }
  setTimeout(computerTurn, 700);
};

function computerTurn() {
  if (game.isOver()) return;
  let result;
  do {
    result = game.computer.randomAttack(game.player);
  } while (result === undefined);
  render();
  if (game.player.board.allSunk()) {
    messageDiv.textContent = "You lost! All your ships sunk.";
    render();
    return;
  }
  messageDiv.textContent =
    "Your turn! Click a cell on the enemy board to attack.";
}

restartBtn.onclick = startGame;

startGame();
