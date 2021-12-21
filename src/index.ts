import cytoscape from 'cytoscape'
import dagre from 'cytoscape-dagre'
import { BinarySearchTree, TreeNode } from './utils/BinarySearchTree'
import { generateNumberInRange } from './utils/commonUtils'

cytoscape.use(dagre)

const cy = (window.cy = cytoscape({
  container: document.getElementById('cy'),

  autoungrabify: true,

  layout: {
    name: 'dagre',
  },

  style: [
    {
      selector: 'node',
      style: {
        content: 'data(weight)',
        'text-opacity': 0.7,
        'text-valign': 'center',
        'text-halign': 'center',
        'background-color': '#9db6e3',
      },
    },

    {
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
        width: 4,
        'target-arrow-shape': 'triangle',
        'line-color': '#9dbaea',
        'target-arrow-color': '#9dbaea',
      },
    },
  ],
}))


let counter = 0

// const addNewData = () => {
//   const rand = Math.random()
//   const newData = [
//     { group: 'nodes', data: { id: 'n' + rand } },
//     { group: 'edges', data: { id: 'e' + rand, target: 'n' + rand } },
//   ]
//   if (!cy.nodes().length) {
//     cy.add(newData)
//   } else {
//     addNewDataNode(cy.nodes()[0], newData)
//   }
// }
//
// const addNewDataNode = (node, newNode) => {
//   if (newNode.data < node.data) {
//     if (node.left === null) {
//       node.left = newNode
//     } else {
//       this.addNewDataNode(node.left, newNode)
//     }
//   }
//   else {
//     if (node.right === null) {
//       node.right = newNode
//     } else {
//       this.addNewDataNode(node.right, newNode)
//     }
//   }
// }

document.getElementById('add-node').addEventListener('click', () => {
  console.log([
    { group: 'nodes', data: { id: 'n' + counter } },
    { group: 'edges', data: { id: 'e' + counter, source: 'n' + (counter-1), target: 'n' + counter } },
  ])
  cy.add([
    { group: 'nodes', data: { id: 'n' + counter, weight: generateNumberInRange(-100, 100) } },
    { group: 'edges', data: { id: 'e' + counter, source: 'n' + (counter-1), target: 'n' + counter } },
  ])
  counter += 1
  cy.layout({ name: 'dagre', animate: true }).run()
})

cy.addListener('tap', 'node', (e) => {
  const node = e.target
  console.log(node.data())
  console.log(cy.nodes())
})

const tree = new BinarySearchTree<number>()

tree.addNewData(1)
tree.addNewData(2)
tree.addNewData(3)
tree.addNewData(4)
tree.addNewData(5)
tree.addNewData(6)

tree.inorderTraversal(tree.getRoot(), (node) => {

  console.log(node)
})
