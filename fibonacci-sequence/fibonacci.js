const fibsRec = (num) => {
  if (num <= 0) return [];
  if (num === 1) return [0];
  if (num === 2) return [0, 1];

  const sequence = [0, 1];
  for (let i = 2; i < num; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }

  return sequence;
};

const fibs = (num) => {
  if (num <= 0) return [];
  if (num === 1) return [0];
  if (num === 2) return [0, 1];

  const sequence = [0, 1];
  let a = 0,
    b = 1;

  for (let i = 2; i < num; i++) {
    const next = a + b;
    sequence.push(next);
    a = b;
    b = next;
  }

  return sequence;
};

console.log("Recursive Fibonnaci function: [" + fibsRec(8) + "]");
console.log("Iterative Fibonacci function: [" + fibs(10) + "]");
