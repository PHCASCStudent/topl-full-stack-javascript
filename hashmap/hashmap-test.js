import HashMap from "./hashmap.js";

const test = new HashMap(16, 0.75);
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("Before grow:");
console.log("Length:", test.length());
console.log("Capacity:", test.capacity);
console.log("Entries:", test.entries());

test.set("moon", "silver"); // triggers grow

console.log("After grow:");
console.log("Length:", test.length());
console.log("Capacity:", test.capacity);
console.log("Entries:", test.entries());

test.set("apple", "green"); // overwrite
console.log("Get apple:", test.get("apple"));
console.log("Has banana:", test.has("banana"));
console.log("Remove banana:", test.remove("banana"));
console.log("Has banana:", test.has("banana"));
console.log("Keys:", test.keys());
console.log("Values:", test.values());
console.log("Entries:", test.entries());
test.clear();
console.log("After clear, length:", test.length());
