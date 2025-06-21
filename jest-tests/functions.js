export function capitalize(str) {
  if (!str) return "";
  return str[0].toUpperCase() + str.slice(1);
}

export function reverseString(str) {
  return str.split("").reverse().join("");
}

export const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  divide: (a, b) => a / b,
  multiply: (a, b) => a * b,
};

export function caesarCipher(str, shift) {
  return str.replace(/[a-z]/gi, (c) => {
    const base = c >= "a" && c <= "z" ? 97 : 65;
    if (!/[a-z]/i.test(c)) return c;
    return String.fromCharCode(
      ((((c.charCodeAt(0) - base + shift) % 26) + 26) % 26) + base
    );
  });
}

export function analyzeArray(arr) {
  if (!arr.length)
    return { average: NaN, min: undefined, max: undefined, length: 0 };
  const sum = arr.reduce((a, b) => a + b, 0);
  return {
    average: sum / arr.length,
    min: Math.min(...arr),
    max: Math.max(...arr),
    length: arr.length,
  };
}
