import LinkedList from "./linkedList.js"

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

  set(key, value) {
    let keyHash = this.hash(key)
    let node = this.map[keyHash].findNode(key)
    if (node) node.value = value
    else this.map[keyHash].append(key, value)
    if (this.length() > this.capacity * this.loadFactor) this.resize()
  }

  resize() {
    let entries = this.entries()
    this.capacity *= 2
    this.map = Array.from({ length: this.capacity }, () => new LinkedList())
    entries.forEach((entry) => {
      this.set(entry[0], entry[1])
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

  values() {
    let values = []
    this.map.forEach((bucket) => {
      values = values.concat(bucket.toArray("value"))
    })
    return values
  }

  entries() {
    let entries = []
    this.map.forEach((bucket) => {
      entries = entries.concat(bucket.toArray())
    })
    return entries
  }
}

// Test Case 1: Basic Set and Get Operations
let map = new HashMap()

map.set("name", "Alice")
map.set("age", 25)

console.assert(map.get("name") === "Alice", "Test 1 Failed")
console.assert(map.get("age") === 25, "Test 2 Failed")
console.assert(map.get("nonexistent") === undefined, "Test 3 Failed")
console.log("Test 1 passed: Basic Set and Get")

// Test Case 2: Overwrite an Existing Key
map = new HashMap()

map.set("name", "Alice")
map.set("name", "Bob")

console.assert(map.get("name") === "Bob", "Test 4 Failed")
console.log("Test 2 passed: Overwrite Existing Key")

// Test Case 3: Check Presence of a Key (has)
map = new HashMap()

map.set("name", "Alice")

console.assert(map.has("name") === true, "Test 5 Failed")
console.assert(map.has("age") === false, "Test 6 Failed")
console.log("Test 3 passed: Check Presence of a Key")

// Test Case 4: Remove a Key
map = new HashMap()

map.set("name", "Alice")
map.remove("name")

console.assert(map.get("name") === undefined, "Test 7 Failed")
console.assert(map.has("name") === false, "Test 8 Failed")
console.log("Test 4 passed: Remove a Key")

// Test Case 5: Resizing the HashMap
map = new HashMap(0.75, 4) // small initial capacity to trigger resizing

map.set("name", "Alice")
map.set("age", 25)
map.set("city", "Wonderland")
map.set("country", "Fiction")

console.assert(map.capacity === 8, "Test 9 Failed") // HashMap should resize after 4 entries
console.log("Test 5 passed: Resizing the HashMap")

// Test Case 6: Clear the HashMap
map = new HashMap()

map.set("name", "Alice")
map.set("age", 25)

map.clear()

console.assert(map.length() === 0, "Test 10 Failed")
console.assert(map.get("name") === undefined, "Test 11 Failed")
console.log("Test 6 passed: Clear the HashMap")

// Test Case 7: Keys, Values, and Entries Methods
map = new HashMap()

map.set("name", "Alice")
map.set("age", 25)
map.set("city", "Wonderland")

const keys = map.keys()
const values = map.values()
const entries = map.entries()

console.assert(keys.length === 3, "Test 12 Failed")
console.assert(values.length === 3, "Test 13 Failed")
console.assert(entries.length === 3, "Test 14 Failed")
console.assert(keys.includes("name"), "Test 15 Failed")
console.assert(values.includes("Alice"), "Test 16 Failed")
console.log("Test 7 passed: Keys, Values, and Entries Methods")

// Test Case 8: Edge Case for Empty HashMap
map = new HashMap()

console.assert(map.length() === 0, "Test 17 Failed")
console.assert(map.get("anyKey") === undefined, "Test 18 Failed")
console.log("Test 8 passed: Edge Case for Empty HashMap")

// Test Case 9: Handling Collisions (if hash function causes collisions)
map = new HashMap()

map.set("dog", "brown")
map.set("lion", "golden") // This has same hash as dog

console.assert(map.get("dog") === "brown", "Test 19 Failed")
console.assert(map.get("lion") === "golden", "Test 20 Failed")
console.log("Test 9 passed: Handling Collisions")

// Test Case 10: Large Number of Entries (Stress Test)
map = new HashMap()

for (let i = 0; i < 1000; i++) {
  map.set(`key${i}`, `value${i}`)
}

console.assert(map.length() === 1000, "Test 21 Failed")
console.log("Test 10 passed: Large Number of Entries (Stress Test)")
