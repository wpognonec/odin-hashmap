export default class LinkedList {
  constructor(headNode = null) {
    this.headNode = headNode
  }

  append(key, value) {
    if (this.headNode) {
      let lastNode = this.headNode
      while (lastNode.nextNode) lastNode = lastNode.nextNode
      lastNode.nextNode = new Node(key, value)
    } else {
      this.headNode = new Node(key, value)
    }
  }

  prepend(key, value) {
    this.headNode = new Node(key, value, this.headNode)
  }

  size() {
    let count = 0
    for (let node = this.headNode; node; node = node.nextNode) count++
    return count
  }

  head() {
    return this.headNode
  }

  tail() {
    if (!this.headNode) return this.headNode
    let currentNode = this.headNode
    while (currentNode.nextNode) {
      currentNode = currentNode.nextNode
    }
    return currentNode
  }

  at(index) {
    let currentNode = this.headNode
    while (index--) {
      currentNode = currentNode.nextNode
    }
    return currentNode
  }

  pop() {
    let currentNode = this.headNode
    if (!this.headNode?.nextNode) {
      this.headNode = null
    } else {
      while (currentNode.nextNode.nextNode) {
        currentNode = currentNode.nextNode
      }
      currentNode.nextNode = null
    }
  }

  contains(value) {
    return !!this.find(value)
  }

  findNode(key) {
    for (let i = 0, node = this.headNode; node; i++, node = node.nextNode) {
      if (node.key === key) return node
    }
    return null
  }

  find(key) {
    for (let i = 0, node = this.headNode; node; i++, node = node.nextNode) {
      if (node.key === key) return node.value
    }
    return null
  }

  findIndex(key) {
    for (let i = 0, node = this.headNode; node; i++, node = node.nextNode) {
      if (node.key === key) return i
    }
    return null
  }

  insertAt(key, value, index = 0) {
    if (index <= 0) this.prepend(key, value)
    else {
      let node = this.at(index - 1)
      node.nextNode = new Node(key, value, node.nextNode)
    }
  }

  removeAt(index) {
    if (index <= 0) this.headNode = this.headNode.nextNode
    else {
      let node = this.at(index - 1)
      if (node && node.nextNode) node.nextNode = node.nextNode.nextNode
    }
  }

  toString() {
    return this.toArrayValues().join(" -> ") || "List is empty"
  }

  toArray(type) {
    const result = []
    for (let node = this.headNode; node; node = node.nextNode) {
      result.push(
        type === "value"
          ? node.value
          : type === "key"
          ? node.key
          : [node.key, node.value]
      )
    }
    return result
  }
}

class Node {
  constructor(key = null, value = null, nextNode = null) {
    this.key = key
    this.value = value
    this.nextNode = nextNode
  }
}
