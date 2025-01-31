import LinkedList from "./linkedListKeys.js"

class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor
    this.capacity = capacity
    this.map = Array.from({ length: this.capacity }, () => new LinkedList())
  }

  hash(key) {
    let hashCode = 0
    const primeNumber = 31
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity
    }
    return hashCode
  }

  set(key) {
    let keyHash = this.hash(key)
    let node = this.map[keyHash].findNode(key)
    if (node) node.key = key
    else this.map[keyHash].append(key)
    if (this.length() > this.capacity * this.loadFactor) this.resize()
  }

  resize() {
    let keys = this.keys()
    this.capacity *= 2
    this.map = Array.from({ length: this.capacity }, () => new LinkedList())
    keys.forEach((key) => {
      this.set(key)
    })
  }

  get(key) {
    let keyHash = this.hash(key)
    let list = this.map[keyHash]
    return list.find(key)
  }

  has(key) {
    return !!this.get(key)
  }

  remove(key) {
    let keyHash = this.hash(key)
    let list = this.map[keyHash]
    list.removeAt(list.findIndex(key))
  }

  length() {
    return this.keys().length
  }

  clear() {
    this.map = Array.from({ length: this.capacity }, () => new LinkedList())
    this.capacity = 16
  }

  keys() {
    let keys = []
    this.map.forEach((bucket, i) => {
      keys = keys.concat(bucket.toArray("key"))
    })
    return keys
  }
}

// Test Case 1: Basic Set and Get Operations
let map = new HashMap()

map.set("Alice")
map.set(25)

console.assert(map.get("Alice") === "Alice", "Test 1 Failed")
console.assert(map.get(25) === 25, "Test 2 Failed")
console.assert(map.get("nonexistent") === undefined, "Test 3 Failed")
console.log("Test 1 passed: Basic Set and Get")

// Test Case 2: Overwrite an Existing Key
map = new HashMap()

map.set("Alice")
map.set("Alice")

console.assert(map.length() === 1, "Test 4 Failed")
console.log("Test 2 passed: Overwrite Existing Key")

// Test Case 3: Check Presence of a Key (has)
map = new HashMap()

map.set("Alice")

console.assert(map.has("Alice") === true, "Test 5 Failed")
console.assert(map.has("age") === false, "Test 6 Failed")
console.log("Test 3 passed: Check Presence of a Key")

// Test Case 4: Remove a Key
map = new HashMap()

map.set("Alice")
map.remove("Alice")

console.assert(map.get("Alice") === undefined, "Test 7 Failed")
console.assert(map.has("Alice") === false, "Test 8 Failed")
console.log("Test 4 passed: Remove a Key")

// Test Case 5: Resizing the HashMap
map = new HashMap(0.75, 4) // small initial capacity to trigger resizing

map.set("Alice")
map.set(25)
map.set("Wonderland")
map.set("Fiction")

console.assert(map.capacity === 8, "Test 9 Failed") // HashMap should resize after 4 entries
console.log("Test 5 passed: Resizing the HashMap")

// Test Case 6: Clear the HashMap
map = new HashMap()

map.set("Alice")
map.set(25)

map.clear()

console.assert(map.length() === 0, "Test 10 Failed")
console.assert(map.get("Alice") === undefined, "Test 11 Failed")
console.log("Test 6 passed: Clear the HashMap")

// Test Case 7: Keys method
map = new HashMap()

map.set("Alice")
map.set(25)
map.set("Wonderland")

const keys = map.keys()

console.assert(keys.length === 3, "Test 12 Failed")
console.assert(keys.includes("Alice"), "Test 15 Failed")
console.log("Test 7 passed: Keys method")

// Test Case 8: Edge Case for Empty HashMap
map = new HashMap()

console.assert(map.length() === 0, "Test 17 Failed")
console.assert(map.get("anyKey") === undefined, "Test 18 Failed")
console.log("Test 8 passed: Edge Case for Empty HashMap")

// Test Case 9: Handling Collisions (if hash function causes collisions)
map = new HashMap()

map.set("dog")
map.set("lion") // This has same hash as dog

console.assert(map.get("dog") === "dog", "Test 19 Failed")
console.assert(map.get("lion") === "lion", "Test 20 Failed")
console.log("Test 9 passed: Handling Collisions")

// Test Case 10: Large Number of Entries (Stress Test)
map = new HashMap()

for (let i = 0; i < 1000; i++) {
  map.set(`key${i}`)
}

console.assert(map.length() === 1000, "Test 21 Failed")
console.log("Test 10 passed: Large Number of Entries (Stress Test)")
