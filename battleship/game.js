import { Player } from "./player.js";

export class Game {
  constructor() {
    this.player = new Player(false);
    this.computer = new Player(true);
    this.current = this.player;
    this.opponent = this.computer;
  }

  switchTurn() {
    [this.current, this.opponent] = [this.opponent, this.current];
  }

  isOver() {
    return this.player.board.allSunk() || this.computer.board.allSunk();
  }

  winner() {
    if (this.player.board.allSunk()) return "Computer";
    if (this.computer.board.allSunk()) return "Player";
    return null;
  }
}
