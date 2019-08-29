import Entity from './Entity.js'

const treeModel = (function() {
  const treeData = {
    geom: {
      leaves: new THREE.CylinderGeometry(0, 25, 60, 4, 1),
      trunk: new THREE.BoxGeometry(5, 20, 5)
    },
    materials: {
      leaves: new THREE.MeshLambertMaterial({ color: 0x3EA055, shading: THREE.SmoothShading }),
      trunk: new THREE.MeshLambertMaterial({ color: 0x966F33, shading: THREE.SmoothShading })
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
})()

/**
 * Trees constructed from primitives.
 * Provide wood resources.
 * @param game
 * @constructor
 */
export default function Tree(game, data) {
  this.name = 'tree'
  Entity.call(this, game)
  this.pos = data.pos
  this.destination = this.pos.clone()
  this.units = 4
}

Tree.prototype = new Entity()
Tree.prototype.constructor = Tree

Tree.prototype.create = function() {
  this.mesh = treeModel.clone()
}
