import { Gameboard } from "./gameboard.js";

export class Player {
  constructor(isComputer = false, size = 10) {
    this.board = new Gameboard(size);
    this.isComputer = isComputer;
    this.attacks = new Set();
  }

  attack(opponent, x, y) {
    return opponent.board.receiveAttack(x, y);
  }

  randomAttack(opponent) {
    let x, y, key;
    do {
      x = Math.floor(Math.random() * opponent.board.size);
      y = Math.floor(Math.random() * opponent.board.size);
      key = `${x},${y}`;
    } while (this.attacks.has(key));
    this.attacks.add(key);
    return this.attack(opponent, x, y);
  }
}
