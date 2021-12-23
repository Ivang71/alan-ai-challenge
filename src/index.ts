// @ts-ignore
import cytoscape, { ElementDefinition } from 'cytoscape'
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


const tree = new BinarySearchTree<number>()


document.getElementById('add-node').addEventListener('click', () => {
  tree.addNewData(generateNumberInRange(-100, 100))
  updateTree()
  cy.layout({ name: 'dagre', animate: true }).run()
})


cy.addListener('tap', 'node', (e) => {
  e.target.animate({
    style: { backgroundColor: '#ae3f3f' },
  }, {
    duration: 300,
  })
  setTimeout(() => {
    tree.deleteExistingData(e.target.weight)
    updateTree()
    cy.layout({ name: 'dagre', animate: false }).run()
  }, 300)
})


const updateTree = () => {
  const nodes = cy.nodes().jsons()

  if (nodes.length === 0) {
    cy.add({
      group: 'nodes',
      data: { id: tree.root.id, weight: tree.root.data, },
    })
    return
  }

  const renderChild = (node: TreeNode<any>, side: 'left' | 'right') => {
    const childNotRendered = nodes.filter((n) => n.data.id === node[side].id).length === 0

    if (childNotRendered) {
      const parentRenderedNode = nodes.find<object>((n) => n.data.id === node.id)
      cy.add([
        {
          group: 'nodes',
          data: { id: node[side].id, weight: node[side].data },
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
      renderChild(node, 'left')
    }
    if (node.right) {
      renderChild(node, 'right')
    }
  })
}

