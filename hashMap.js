import LinkedList from "./linkedList.js"

function Node(key = null, value = null, nextNode = null) {
  return { key, value, nextNode }
}

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
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16
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

const test = new HashMap()
test.set("apple", "red")
test.set("banana", "yellow")
test.set("carrot", "orange")
test.set("dog", "brown")
test.set("elephant", "gray")
test.set("frog", "green")
test.set("grape", "purple")
test.set("hat", "black")
test.set("ice cream", "white")
test.set("jacket", "blue")
test.set("kite", "pink")
test.set("lion", "golden")

console.log(test.length())
test.set("hats", "blacks")
console.log(test.length())

// console.log(test.get("kite"))
// console.log(test.has("kite"))
// console.log(test.length())
// test.remove("kite")

// console.log(test.get("kite"))
// console.log(test.has("kite"))
// console.log(test.length())

test.set("grape", "purplesss")
// console.log(test.get("grape"))
// console.log(test.length())
// console.log(test.keys())
// console.log(test.values())
// console.log(test.entries())
