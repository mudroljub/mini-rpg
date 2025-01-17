import Entity from './Entity.js'

function createTree() {
  const treeData = {
    geom: {
      leaves: new THREE.CylinderGeometry(0, 25, 60, 4, 1),
      trunk: new THREE.BoxGeometry(5, 20, 5)
    },
    materials: {
      leaves: new THREE.MeshLambertMaterial({ color: 0x3EA055 }),
      trunk: new THREE.MeshLambertMaterial({ color: 0x966F33 })
    }
  }
  const tree = new THREE.Object3D()
  const leaves = new THREE.Mesh(treeData.geom.leaves, treeData.materials.leaves)
  const trunk = new THREE.Mesh(treeData.geom.trunk, treeData.materials.trunk)
  leaves.name = 'leaves'
  trunk.name = 'trunk'

  leaves.castShadow = true
  trunk.castShadow = true

  leaves.position.y += 50
  trunk.position.y += 20

  tree.add(leaves)
  tree.add(trunk)
  tree.castShadow = true

  return tree
}

/**
 * Trees constructed from primitives.
 * Provide wood resources.
 */
export default class Tree extends Entity {
  constructor(game, data) {
    super(game, data.pos)
    this.name = 'tree'
    this.destination = data.pos.clone()
    this.units = 4
  }

  createMesh() {
    this.mesh = createTree()
  }
}
