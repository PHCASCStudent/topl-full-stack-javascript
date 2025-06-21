class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => []);
    this.count = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }
    bucket.push([key, value]);
    this.count++;
    if (this.count / this.capacity > this.loadFactor) {
      this.grow();
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.count--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.count;
  }

  clear() {
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => []);
    this.count = 0;
  }

  keys() {
    const keysArr = [];
    for (const bucket of this.buckets) {
      for (const [key] of bucket) {
        keysArr.push(key);
      }
    }
    return keysArr;
  }

  values() {
    const valuesArr = [];
    for (const bucket of this.buckets) {
      for (const [, value] of bucket) {
        valuesArr.push(value);
      }
    }
    return valuesArr;
  }

  entries() {
    const entriesArr = [];
    for (const bucket of this.buckets) {
      for (const [key, value] of bucket) {
        entriesArr.push([key, value]);
      }
    }
    return entriesArr;
  }

  grow() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => []);
    this.count = 0;
    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }
}

// For testing, create a new file and use:
// const test = new HashMap();
// test.set('apple', 'red'); ...
// console.log(test.entries());
