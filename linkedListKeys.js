export default class LinkedListKeys {
  constructor(headNode = null) {
    this.headNode = headNode
  }

  append(key) {
    if (this.headNode) {
      let lastNode = this.headNode
      while (lastNode.nextNode) lastNode = lastNode.nextNode
      lastNode.nextNode = new Node(key)
    } else {
      this.headNode = new Node(key)
    }
  }

  prepend(key) {
    this.headNode = new Node(key, this.headNode)
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

  contains(key) {
    return !!this.find(key)
  }

  findNode(key) {
    for (let i = 0, node = this.headNode; node; i++, node = node.nextNode) {
      if (node.key === key) return node
    }
    return null
  }

  find(key) {
    for (let i = 0, node = this.headNode; node; i++, node = node.nextNode) {
      if (node.key === key) return node.key
    }
    return undefined
  }

  findIndex(key) {
    for (let i = 0, node = this.headNode; node; i++, node = node.nextNode) {
      if (node.key === key) return i
    }
    return null
  }

  insertAt(key, index = 0) {
    if (index <= 0) this.prepend(key)
    else {
      let node = this.at(index - 1)
      node.nextNode = new Node(key, node.nextNode)
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
    return this.toArray().join(" -> ") || "List is empty"
  }

  toArray() {
    const result = []
    for (let node = this.headNode; node; node = node.nextNode) {
      result.push(node.key)
    }
    return result
  }
}

class Node {
  constructor(key = null, nextNode = null) {
    this.key = key
    this.nextNode = nextNode
  }
}
