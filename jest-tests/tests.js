import {
  capitalize,
  reverseString,
  calculator,
  caesarCipher,
  analyzeArray,
} from "./functions.js";

describe("capitalize", () => {
  test("capitalizes first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });
  test("empty string returns empty", () => {
    expect(capitalize("")).toBe("");
  });
  test("already capitalized", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });
});

describe("reverseString", () => {
  test("reverses string", () => {
    expect(reverseString("hello")).toBe("olleh");
  });
  test("empty string", () => {
    expect(reverseString("")).toBe("");
  });
});

describe("calculator", () => {
  test("add", () => {
    expect(calculator.add(2, 3)).toBe(5);
  });
  test("subtract", () => {
    expect(calculator.subtract(5, 2)).toBe(3);
  });
  test("divide", () => {
    expect(calculator.divide(6, 2)).toBe(3);
  });
  test("multiply", () => {
    expect(calculator.multiply(3, 4)).toBe(12);
  });
});

describe("caesarCipher", () => {
  test("shifts lowercase letters", () => {
    expect(caesarCipher("abc", 1)).toBe("bcd");
  });
  test("wraps z to a", () => {
    expect(caesarCipher("xyz", 3)).toBe("abc");
  });
  test("preserves case", () => {
    expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
  });
  test("keeps punctuation", () => {
    expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
  });
});

describe("analyzeArray", () => {
  test("analyzes array", () => {
    expect(analyzeArray([1, 8, 3, 4, 2, 6])).toEqual({
      average: 4,
      min: 1,
      max: 8,
      length: 6,
    });
  });
  test("empty array", () => {
    expect(analyzeArray([])).toEqual({
      average: NaN,
      min: undefined,
      max: undefined,
      length: 0,
    });
  });
});
