function knightMoves(start, end) {
  const moves = [
    [2, 1], [1, 2], [-1, 2], [-2, 1],
    [-2, -1], [-1, -2], [1, -2], [2, -1]
  ];
  const isValid = ([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8;
  const queue = [[start, [start]]];
  const visited = Array.from({ length: 8 }, () => Array(8).fill(false));
  visited[start[0]][start[1]] = true;

  while (queue.length) {
    const [pos, path] = queue.shift();
    if (pos[0] === end[0] && pos[1] === end[1]) {
      console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
      path.forEach(p => console.log(p));
      return path;
    }
    for (const [dx, dy] of moves) {
      const next = [pos[0] + dx, pos[1] + dy];
      if (isValid(next) && !visited[next[0]][next[1]]) {
        visited[next[0]][next[1]] = true;
        queue.push([next, [...path, next]]);
      }
    }
  }
  return null;
}

// Example usage:
// knightMoves([0,0],[1,2]);
// knightMoves([0,0],[3,3]);
// knightMoves([3,3],[0,0]);
// knightMoves([0,0],[7,7]);
