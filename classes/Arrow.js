import Entity from './Entity.js'
import {rndInt, roll} from '../utils/helpers.js'

export default function Arrow(game, data) {
  const offset = data.offset || 10
  const randomOffset = new THREE.Vector3(rndInt(offset), roll(offset), rndInt(offset))
  this.name = 'arrow'
  Entity.call(this, game)
  this.pos = data.pos
  this.destination = data.destination.add(randomOffset)
  this.speed = data.speed || 600
  this.lifeSpan = data.lifeSpan || 150
}

Arrow.prototype = new Entity()
Arrow.prototype.constructor = Arrow

Arrow.prototype.update = function() {
  this.lifeSpan--
  this.speed--
  if (this.lifeSpan <= 0) {
    this.speed = 0
    this.remove = true
  }
  Entity.prototype.update.call(this)
}

Arrow.prototype.create = function() {
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 5)
  const material = new THREE.MeshLambertMaterial({ color: 0x966f33, shading: THREE.SmoothShading })
  this.mesh = new THREE.Mesh(geometry, material)
  this.mesh.castShadow = true
}