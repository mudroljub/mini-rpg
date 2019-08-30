import Entity from './Entity.js'
import {objects} from './AssetManager.js'
import {rndInt, roll} from '../utils/helpers.js'

export default class Cloud extends Entity {
  constructor(game) {
    super(game)
    this.name = 'cloud'
    this.pos = new THREE.Vector3(rndInt(1200), 100 + rndInt(20), rndInt(1200))
    this.destination = new THREE.Vector3(1200, this.pos.y, this.pos.z)
    this.speed = 25
  }

  update() {
    if (this.pos.x > 600)
      this.pos.x = -600
    super.update()
  }

  create() {
    if (objects.cloud) {
      objects.cloud.scale.set(roll(50) + 10, 15, roll(10) + 10)
      objects.cloud.castShadow = true
      this.mesh = objects.cloud.clone()
      this.mesh.name = 'cloud'
    }
  }
}
