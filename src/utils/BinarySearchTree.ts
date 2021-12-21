export class TreeNode<T> {
  public readonly id: string = String(Math.random()).replace('0.', '')
  public left: TreeNode<T> | null = null
  public right: TreeNode<T> | null = null

  constructor(public data: T) {
  }
}

export class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null

  addNewData(data: T) {
    const newNode = new TreeNode(data)
    if (this.root === null) {
      this.root = newNode
    } else
    {
      this.addNewDataNode(this.root, newNode)
    }
  }

  addNewDataNode(node: TreeNode<T>, newNode: TreeNode<T>) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode
      } else {
        this.addNewDataNode(node.left, newNode)
      }
    }
    else {
      if (node.right === null) {
        node.right = newNode
      } else {
        this.addNewDataNode(node.right, newNode)
      }
    }
  }

  deleteExistingData(data: T) {
    this.root = this.deleteExistingDataNode(this.root, data)
  }

  deleteExistingDataNode(node: TreeNode<T> | null, key: T) {
    if (node === null) {
      return null
    }
    else if (key < node.data) {
      node.left = this.deleteExistingDataNode(node.left, key)
      return node
    }
    else if (key > node.data) {
      node.right = this.deleteExistingDataNode(node.right, key)
      return node
    }
    else {
      if (node.left === null && node.right === null) {
        node = null
        return node
      }
      if (node.left === null) {
        node = node.right
        return node
      } else if (node.right === null) {
        node = node.left
        return node
      }
      const aux = this.findMinValue(node.right)
      node.data = aux.data
      node.right = this.deleteExistingDataNode(node.right, aux.data)
      return node
    }
  }

  inorderTraversal(node: TreeNode<T> | null, cb: (node: TreeNode<T>) => void) {
    if (node !== null) {
      this.inorderTraversal(node.left, cb)
      cb(node)
      this.inorderTraversal(node.right, cb)
    }
  }

  preorderTraversal(node: TreeNode<T> | null, cb: (node: TreeNode<T>) => void) {
    if (node !== null) {
      cb(node)
      this.preorderTraversal(node.left, cb)
      this.preorderTraversal(node.right, cb)
    }
  }

  postorderTraversal(node: TreeNode<T> | null, cb: (node: TreeNode<T>) => void) {
    if (node !== null) {
      this.postorderTraversal(node.left, cb)
      this.postorderTraversal(node.right, cb)
      cb(node)
    }
  }

  findMinValue(node: TreeNode<T> | null): TreeNode<T> {
    if (node?.left === null) {
      return node
    } else { // @ts-ignore
      return this.findMinValue(node.left)
    }
  }

  getRoot() {
    return this.root
  }

  find(node: TreeNode<T> | null, data: T): TreeNode<T> | null {
    if (node === null) {
      return null
    }
    else if (data < node.data) {
      return this.find(node.left, data)
    }
    else if (data > node.data) {
      return this.find(node.right, data)
    }
    else {
      return node
    }
  }
}
