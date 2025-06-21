class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
  }

  buildTree(array) {
    if (!array.length) return null;
    const mid = Math.floor(array.length / 2);
    const node = new Node(
      array[mid],
      this.buildTree(array.slice(0, mid)),
      this.buildTree(array.slice(mid + 1))
    );
    return node;
  }

  insert(value, node = this.root) {
    if (!node) return new Node(value);
    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }
    return node;
  }

  deleteItem(value, node = this.root) {
    if (!node) return null;
    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      let minLarger = node.right;
      while (minLarger.left) minLarger = minLarger.left;
      node.data = minLarger.data;
      node.right = this.deleteItem(minLarger.data, node.right);
    }
    return node;
  }

  find(value, node = this.root) {
    if (!node) return null;
    if (value === node.data) return node;
    if (value < node.data) return this.find(value, node.left);
    return this.find(value, node.right);
  }

  levelOrder(callback) {
    if (!callback) throw new Error('Callback required');
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      if (node) {
        callback(node);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
  }

  inOrder(callback, node = this.root) {
    if (!callback) throw new Error('Callback required');
    if (!node) return;
    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  preOrder(callback, node = this.root) {
    if (!callback) throw new Error('Callback required');
    if (!node) return;
    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (!callback) throw new Error('Callback required');
    if (!node) return;
    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  height(value) {
    const node = typeof value === 'object' ? value : this.find(value);
    if (!node) return null;
    const getHeight = n => {
      if (!n) return -1;
      return 1 + Math.max(getHeight(n.left), getHeight(n.right));
    };
    return getHeight(node);
  }

  depth(value, node = this.root, currentDepth = 0) {
    if (!node) return null;
    if (node.data === value) return currentDepth;
    if (value < node.data) return this.depth(value, node.left, currentDepth + 1);
    return this.depth(value, node.right, currentDepth + 1);
  }

  isBalanced(node = this.root) {
    if (!node) return true;
    const lh = this.height(node.left);
    const rh = this.height(node.right);
    if (Math.abs(lh - rh) > 1) return false;
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    const arr = [];
    this.inOrder(node => arr.push(node.data));
    this.root = this.buildTree(arr);
  }
}

// Pretty print function
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

// Driver script
function randomArray(size = 15) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

const arr = randomArray();
const bst = new Tree(arr);
console.log('Initial tree:');
prettyPrint(bst.root);
console.log('Balanced?', bst.isBalanced());

console.log('Level order:');
bst.levelOrder(node => process.stdout.write(node.data + ' '));
console.log('\nPre order:');
bst.preOrder(node => process.stdout.write(node.data + ' '));
console.log('\nPost order:');
bst.postOrder(node => process.stdout.write(node.data + ' '));
console.log('\nIn order:');
bst.inOrder(node => process.stdout.write(node.data + ' '));

// Unbalance the tree
bst.insert(120);
bst.insert(130);
bst.insert(140);
bst.insert(150);
console.log('\nAfter adding >100:');
prettyPrint(bst.root);
console.log('Balanced?', bst.isBalanced());

// Rebalance
bst.rebalance();
console.log('\nAfter rebalance:');
prettyPrint(bst.root);
console.log('Balanced?', bst.isBalanced());

console.log('Level order:');
bst.levelOrder(node => process.stdout.write(node.data + ' '));
console.log('\nPre order:');
bst.preOrder(node => process.stdout.write(node.data + ' '));
console.log('\nPost order:');
bst.postOrder(node => process.stdout.write(node.data + ' '));
console.log('\nIn order:');
bst.inOrder(node => process.stdout.write(node.data + ' '));
