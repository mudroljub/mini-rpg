/* global Entity, rndInt, roll */

const rabbitJson = {
  id: 'idle', strategy: 'prioritised',
  children: [
    { id: 'explore', strategy: 'sequential',
      children: [
        { id: 'getRandomDestination' }
      ]
    }
  ]
}

const rabbitModel = (function() {
  const geometry = new THREE.BoxGeometry(2, 2, 5)
  const material = new THREE.MeshLambertMaterial({ color: 0x777777, shading: THREE.SmoothShading, vertexColors: THREE.FaceColors })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.castShadow = true
  for (let i = 0; i < mesh.geometry.vertices.length; i++)
    mesh.geometry.vertices[i].y += 5
  return mesh
})()

function Rabbit(game) {
  this.name = 'rabbit'
  Entity.call(this, game)
  this.pos = new THREE.Vector3(rndInt(1200), 0, rndInt(1200))
  this.destination = this.pos.clone()
  this.health = 5
  this.speed = 50 + rndInt(40)
  this.state = this.game.machine.generate(rabbitJson, this, Rabbit.states)
}

Rabbit.prototype = new Entity()
Rabbit.prototype.constructor = Rabbit

Rabbit.prototype.update = function() {
  const collision = this.game.place(this.pos)
  this.pos.y = collision.y + 5
  this.state = this.state.tick()
  Entity.prototype.update.call(this)
}

Rabbit.prototype.create = function() {
  this.mesh = rabbitModel.clone()
}

Rabbit.prototype.attacked = function() {
  this.health -= roll(6)
  if (this.health <= 0) {
    this.speed = 0
    this.remove = true
  }
  this.speed = 140
}

Rabbit.states = {
  idle() {console.log('idle')},
  getRandomDestination() {
    const rndPoint = new THREE.Vector3(rndInt(1100), 10, rndInt(1100))
    const collision = this.game.place(rndPoint)
    if (collision.y > 5)
      this.destination = collision
  },
  canExplore() {
    return Math.random() > 0.99 && !this.remove && this.health > 0
  },
  sleep() {}
}
