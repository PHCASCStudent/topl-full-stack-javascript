import { Ship } from "./ship.js";

export class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.board = Array.from({ length: size }, () => Array(size).fill(null));
    this.ships = [];
    this.missedAttacks = [];
  }

  placeShip(x, y, length, horizontal = true) {
    const ship = new Ship(length);
    let coords = [];
    for (let i = 0; i < length; i++) {
      const xi = horizontal ? x + i : x;
      const yi = horizontal ? y : y + i;
      if (xi >= this.size || yi >= this.size || this.board[yi][xi])
        return false;
      coords.push([xi, yi]);
    }
    coords.forEach(([xi, yi]) => (this.board[yi][xi] = ship));
    this.ships.push(ship);
    return true;
  }

  receiveAttack(x, y) {
    const target = this.board[y][x];
    if (target && typeof target.hit === "function") {
      target.hit();
      return "hit";
    } else {
      this.missedAttacks.push([x, y]);
      return "miss";
    }
  }

  allSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
