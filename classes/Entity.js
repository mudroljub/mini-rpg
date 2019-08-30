export default class Entity {
  constructor(game, color) {
    this.game = game
    this.pos = new THREE.Vector3(0, 0, 0)
    this.destination = new THREE.Vector3(0, 0, 0)
    this.vel = new THREE.Vector3(0, 0, 0)
    this.rotation = new THREE.Euler(0, 0, 0)
    this.timeMult = 1
    this.remove = false
    this.shadow = false
    this.state = null
    this.color = color ? color : 0xffffff
    this.create()
  }

  update() {
    // rotate to target location
    const deltaX = this.destination.x - this.pos.x
    const deltaZ = this.destination.z - this.pos.z

    const dv = new THREE.Vector3()
    dv.subVectors(this.destination, this.pos)
    dv.setLength(this.speed)
    this.vel = dv
    this.rotation.y = (Math.atan2(deltaX, deltaZ))

    this.pos.x += this.vel.x * this.game.delta * this.timeMult
    this.pos.y += this.vel.y * this.game.delta * this.timeMult
    this.pos.z += this.vel.z * this.game.delta * this.timeMult

    this.mesh.position.copy(this.pos)
    this.mesh.rotation.x = this.rotation.x
    this.mesh.rotation.y = this.rotation.y
    this.mesh.rotation.z = this.rotation.z
  }

  create() {
    const geometry = new THREE.BoxGeometry(10, 10, 10)
    const material = new THREE.MeshLambertMaterial({ color: 0xff0000 })
    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.castShadow = true
  }
}
