/* global Entity, objects, roll */

export default class Mine extends Entity {
  constructor(game, data) {
    super(game)
    this.name = 'mine'
    this.pos = data.pos
    this.destination = this.pos.clone()
    this.units = 100
  }

  create() {
    if (objects.mine) {
      objects.mine.scale.set(10, 10, 10)
      objects.mine.castShadow = true
      this.mesh = objects.mine.clone()
      this.rotation.y = roll(180) * (Math.PI / 180)
    }
  }
}