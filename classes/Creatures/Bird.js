/* global Entity, rndInt, roll */

const birdJson = {
  id: 'idle', strategy: 'prioritised',
  children: [
    { id: 'explore', strategy: 'sequential',
      children: [
        {id: 'getRandomDestination'},
      ]
    }
  ]
}

const birdModel = (function() {
  const geometry = new THREE.BoxGeometry(2, 2, 5)
  const material = new THREE.MeshLambertMaterial({ color: 0xff6666, shading: THREE.SmoothShading, vertexColors: THREE.FaceColors })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.castShadow = true
  return mesh
})()

function Bird(game) {
  this.name = 'bird'
  Entity.call(this, game)
  this.pos = new THREE.Vector3(rndInt(1100), 30 + roll(50), rndInt(1100))
  this.destination = this.pos.clone()
  this.health = 5
  this.speed = 50 + rndInt(40)
  this.state = this.game.machine.generate(birdJson, this, Bird.states)
}

Bird.prototype = new Entity()
Bird.prototype.constructor = Bird

Bird.prototype.update = function() {
  this.state = this.state.tick()
  Entity.prototype.update.call(this)
}

Bird.prototype.create = function() {
  this.mesh = birdModel.clone()
}

Bird.prototype.attacked = function() {
  this.health -= roll(6)
  if (this.health <= 0) {
    this.speed = 0
    this.remove = true
  }
}

Bird.states = {
  idle() {console.log('idle')},
  getRandomDestination() {
    const rndPoint = new THREE.Vector3(rndInt(1100), 30 + roll(50), rndInt(1100))
    this.destination = rndPoint
  },
  canExplore() {
    return Math.random() > 0.99
  },
  sleep() {}
}
