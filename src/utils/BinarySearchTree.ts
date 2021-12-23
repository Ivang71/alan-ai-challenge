export class TreeNode<T> {
  public readonly id: string = String(Math.random()).replace('0.', '')
  public left: TreeNode<T> | null = null
  public right: TreeNode<T> | null = null

  constructor(public data: T) {
  }
}

export class BinarySearchTree<T> {
  private _root: TreeNode<T> | null = null
  lastAddedNode: TreeNode<T> | null = null

  get root(): TreeNode<T> | null {
    return this._root
  }

  addNewData(data: T) {
    const newNode = new TreeNode(data)
    this.lastAddedNode = newNode
    if (this._root === null) {
      this._root = newNode
    } else {
      this.addNewDataNode(this._root, newNode)
    }
  }

  private addNewDataNode(node: TreeNode<T>, newNode: TreeNode<T>) {
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
    this._root = this.deleteExistingDataNode(this._root, data)
  }

  private deleteExistingDataNode(node: TreeNode<T> | null, key: T) {
    if (node === null) {
      return node
    }
    else if (key < node.data) {
      node.left = this.deleteExistingDataNode(node.left, key)
    }
    else if (key > node.data) {
      node.right = this.deleteExistingDataNode(node.right, key)
    }
    else {
      if (node.left === null) {
        return node.right
      } else if (node.right === null) {
        return  node.left
      }
      node.data = this.findMinValue(node.right)
      node.right = this.deleteExistingDataNode(node.right, node.data)
    }
    return node
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

  findMinValue(node: TreeNode<T> | null): T {
    let minv = node.data
    while (node.left != null)
    {
      minv = node.left.data
      node = node.left
    }
    return minv
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
