import LinkedList from "./linkedList.js"

function Node(key = null, value = null, nextNode = null) {
  return { key, value, nextNode }
}

class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.map = Array.from({ length: capacity }, () => new LinkedList())
    this.loadFactor = 0.75
    this.capacity = capacity
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
    let size = 0
    this.map.forEach((bucket) => {
      if (bucket) size += bucket.size()
    })
    return size
  }

  clear() {
    this.map = Array.from({ length: capacity }, () => new LinkedList())
    this.capacity = 16
  }

  keys() {
    let keys = []
    this.map.forEach((bucket) => {
      keys = keys.concat(bucket.toArrayKeys())
    })
    return keys
  }

  values() {
    let values = []
    this.map.forEach((bucket) => {
      values = values.concat(bucket.toArrayValues())
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

console.log(test.get("kite"))
console.log(test.has("kite"))
console.log(test.length())
test.remove("kite")

console.log(test.get("kite"))
console.log(test.has("kite"))
console.log(test.length())

test.set("grape", "purplesss")
console.log(test.get("grape"))
console.log(test.length())
console.log(test.keys())
console.log(test.values())
console.log(test.entries())
