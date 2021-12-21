import { BinarySearchTree, TreeNode } from './BinarySearchTree'

export const generateNumberInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)
