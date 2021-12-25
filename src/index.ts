// @ts-ignore
import cytoscape, { Collection, ElementDefinition } from 'cytoscape'
import dagre from 'cytoscape-dagre'
import { BinarySearchTree, TreeNode } from './utils/BinarySearchTree'
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
        'background-color': '#9dbaea',
      },
    },

    {
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
        width: 4,
        'line-color': '#9dbaea',
        'target-arrow-color': '#9dbaea',
      },
    },
  ],
}))


const updateLayout = () => cy.layout({ name: 'dagre', ranker: 'tight-tree', animate: true }).run()


const tree = new BinarySearchTree<number>()


document.getElementById('add-node').addEventListener('click', () => {
  createNewNode()
  updateLayout()
})


cy.addListener('tap', 'node', (e) => {
  const data = e.target.json().data
  tree.remove(data.weight)
  cy.nodes().$id(data.id).remove()
  const newEdges: ElementDefinition[] = []
  tree.inorderTraversal(tree.root, (node) =>
    ['left', 'right'].forEach((side) => {
      if (node[side]) {
        newEdges.push({
          group: 'edges',
          data: { source: node.id, target: node[side].id },
        })
      }
    }))
  cy.edges().remove()
  cy.add(newEdges)
  updateLayout()
})


const createNewNode = () => {
  let addedSuccessfully: boolean
  do {
    addedSuccessfully = tree.insert(generateNumberInRange(-100, 100))
  } while (!addedSuccessfully)

  const nodes = cy.nodes().jsons()

  if (nodes.length === 0) {
    cy.add({
      group: 'nodes',
      data: { id: tree.root.id, weight: tree.root.key },
    })
    return
  }

  const addEdgeToChildren = (node: TreeNode<any>, side: 'left' | 'right') => {
    const childNotRendered = nodes.filter((n) => n.data.id === node[side].id).length === 0

    if (childNotRendered) {
      const parentRenderedNode = nodes.find<object>((n) => n.data.id === node.id)
      cy.add([
        {
          group: 'nodes',
          data: { id: node[side].id, weight: node[side].key },
          position: { ...parentRenderedNode.position }
        },
        {
          group: 'edges',
          data: { source: node.id, target: node[side].id },
        },
      ])
    }
  }

  tree.inorderTraversal(tree.root, (node) => {
    if (node.left) {
      addEdgeToChildren(node, 'left')
    }
    if (node.right) {
      addEdgeToChildren(node, 'right')
    }
  })
}
