export class TreeNode<T> {
  public id: string = String(Math.random()).replace('0.', '')
  public left: TreeNode<T> | null = null
  public right: TreeNode<T> | null = null

  constructor(public key: T) {
  }
}

export class BinarySearchTree<T> {
  private _root: TreeNode<T> | null = null

  get root(): TreeNode<T> | null {
    return this._root
  }

  contains(key: T): boolean {
    let contains = false
    this.inorderTraversal(this._root, (node) => {
      if (node.key == key) {
        contains = true
      }
    })
    return contains
  }

  insert(key: T): boolean {
    if (this.contains(key)) {
      return false
    }
    const newNode = new TreeNode(key)
    if (this._root === null) {
      this._root = newNode
    } else {
      this.insertNode(this._root, newNode)
    }
    return true
  }

  private insertNode(root: TreeNode<T>, newNode: TreeNode<T>) {
    if (newNode.key < root.key) {
      if (root.left === null) {
        root.left = newNode
      } else {
        this.insertNode(root.left, newNode)
      }
    } else {
      if (root.right === null) {
        root.right = newNode
      } else {
        this.insertNode(root.right, newNode)
      }
    }
  }

  remove(value) {
    this._root = this._removeInner(this.root, value)
  }

  private _removeInner(root: TreeNode<T>, key: T) {
    if (root) {
      if (key < root.key) {
        root.left = this._removeInner(root.left, key)
      }
      else if (key > root.key) {
        root.right = this._removeInner(root.right, key)
      }
      else if (root.left && root.right) {
        const { key, id } = this.findMinNode(root.right)
        root.key = key
        root.id = id
        root.right = this._removeInner(root.right, root.key)
      }
      else {
        root = root.left || root.right
      }
    }
    return root
  }

  inorderTraversal(root: TreeNode<T> | null, cb: (node: TreeNode<T>) => void) {
    if (root !== null) {
      this.inorderTraversal(root.left, cb)
      cb(root)
      this.inorderTraversal(root.right, cb)
    }
  }

  preorderTraversal(root: TreeNode<T> | null, cb: (node: TreeNode<T>) => void) {
    if (root !== null) {
      cb(root)
      this.preorderTraversal(root.left, cb)
      this.preorderTraversal(root.right, cb)
    }
  }

  postorderTraversal(root: TreeNode<T> | null, cb: (node: TreeNode<T>) => void) {
    if (root !== null) {
      this.postorderTraversal(root.left, cb)
      this.postorderTraversal(root.right, cb)
      cb(root)
    }
  }

  findMinNode(root: TreeNode<T> | null): TreeNode<T> | null {
    while (root.left !== null) {
      root = root.left
    }
    return root
  }

  find(root: TreeNode<T> | null, key: T): TreeNode<T> | null {
    if (root === null) {
      return null
    } else if (key < root.key) {
      return this.find(root.left, key)
    } else if (key > root.key) {
      return this.find(root.right, key)
    } else {
      return root
    }
  }
}
