// @ts-ignore
import cytoscape, { ElementDefinition } from 'cytoscape'
import dagre from 'cytoscape-dagre'
import { BinarySearchTree } from './utils/BinarySearchTree'
import { generateNumberInRange } from './utils/commonUtils'

cytoscape.use(dagre)

// @ts-ignore
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

const tree = new BinarySearchTree<number>()

document.getElementById('add-node').addEventListener('click', () => {
  tree.addNewData(generateNumberInRange(-100, 100))
  rerenderTree()
  cy.layout({ name: 'dagre', animate: false }).run()
})

cy.addListener('tap', 'node', (e) => {
  const node = e.target
  console.log(node.data())
  console.log(cy.elements().map((e) => e.data()))
  console.log(tree.getRoot())
})


const rerenderTree = () => {
  cy.remove(cy.elements())
  const edges: ElementDefinition[] = []
  tree.inorderTraversal(tree.getRoot(), (node) => {
    const currentId = 'n' + node.id
    const newData: ElementDefinition[] = [{ group: 'nodes', data: { id: currentId, weight: node.data } }]
    if (node.left) {
      edges.push(
        { group: 'edges', data: { source: currentId, target: 'n' + node.left.id } }
      )
    }
    if (node.right) {
      edges.push(
        { group: 'edges', data: { source: currentId, target: 'n' + node.right.id } }
      )
    }
    cy.add(newData)
  })
  cy.add(edges)
}

