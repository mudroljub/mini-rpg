/* global Entity, rndInt, roll */
import Arrow from './Arrow.js'
import Resource from './Resource.js'

const mobJson = {
  id: 'idle', strategy: 'prioritised',
  children: [
    {
      id: 'explore', strategy: 'sequential',
      children: [
        {
          id: 'hunt', strategy: 'sequential',
          children: [
            { id: 'getPrey' },
            { id: 'track' },
            { id: 'attack' },
            { id: 'getKill' },
            { id: 'deliverKill' },
            { id: 'dropKill' }
          ]
        }
      ]
    }
  ]
}

export default function Mob(game) {
  this.name = 'mob'
  Entity.call(this, game)
  this.pos = new THREE.Vector3(rndInt(1100), 100, rndInt(1100))
  this.destination = this.pos.clone()
  this.target = null
  this.speed = 40
  this.log = false
  this.fps = false
  this.state = this.game.machine.generate(mobJson, this, Mob.states)
  this.carryEntity = undefined
  this.shootCooldown = 5
  this.vision = 50
}

Mob.prototype = new Entity()
Mob.prototype.constructor = Mob

Mob.prototype.update = function() {
  const collision = this.game.place(this.pos)
  this.pos.y = collision.y + 1.5
  this.shootCooldown--

  this.state = this.state.tick()
  // Mob is carrying a resource.
  if (this.carryEntity) {
    this.carryEntity.pos.x = this.pos.x - 4
    this.carryEntity.pos.y = this.pos.y
    this.carryEntity.pos.z = this.pos.z - 4
  }
  Entity.prototype.update.call(this)
  if (this.fps)
    this.game.cameraFPS.lookAt(this.destination)
}

Mob.prototype.create = function() {
  const geometry = new THREE.BoxGeometry(5, 10, 5)
  const material = new THREE.MeshLambertMaterial({ color: 0xecc2a7, shading: THREE.SmoothShading })
  this.mesh = new THREE.Mesh(geometry, material)
  for (let i = 0; i < this.mesh.geometry.vertices.length; i++)
    this.mesh.geometry.vertices[i].y += 5

  this.mesh.castShadow = true
  this.mesh.name = this.name
}

Mob.prototype.carry = function(entity) {
  if (entity.name !== 'rabbit') {
    if (entity.units > 0) {
      entity.units -= 1
      const resource = new Resource(this.game, entity.name, this.pos.clone())
      this.game.addEntity(resource)
      this.carryEntity = resource
    }
  } else
    this.carryEntity = entity
}

Mob.prototype.drop = function() {
  if (this.carryEntity) {
    this.carryEntity.pos = new THREE.Vector3(this.pos.x, 0, this.pos.z)
    this.carryEntity = undefined
  }
  if (this.prey)
    this.prey = undefined
}

Mob.prototype.shoot = function(destination) {
  if (this.shootCooldown <= 0) {
    this.game.addEntity(
      new Arrow(
        this.game,
        {
          pos: this.pos.clone(),
          destination,
          lifeSpan: 300,
          speed: 600,
          offset: 10
        }
      )
    )
    this.shootCooldown = 5
  }
}

Mob.prototype.getPrey = function() {
  const rabbit = this.game.getCloseEntity('rabbit', this.pos, 1100)
  const bird = this.game.getCloseEntity('bird', this.pos, 1100)
  const prey = [rabbit, bird]
  this.prey = prey[roll(2)]
}

Mob.prototype.hasPrey = function() {
  if (this.prey)
    return true
  return false
}

Mob.prototype.track = function() {
  this.destination = this.prey.pos.clone()
}

Mob.prototype.goRandom = function() {
  const rndPoint = new THREE.Vector3(rndInt(1100), 10, rndInt(1100))
  const collision = this.game.place(rndPoint)
  if (collision.y > 5)
    this.destination = collision
}

Mob.prototype.attack = function() {
  this.shoot(this.prey.pos.clone())
  if (roll(5) === 1)
    this.prey.attacked()
}

Mob.states = {
  idle() { console.log('idle') },
  explore() { console.log('exploring') },
  hunt() { console.log('hunting') },
  getRandomDestination() {
    this.goRandom()
  },
  canExplore() {
    return Math.random() > 0.99
  },
  canHunt() {
    return !this.carryEntity
  },
  getPrey() {
    if (!this.hasPrey())
      this.getPrey()
  },
  canGetPrey() {
    return !this.hasPrey() && !this.carryEntity
  },
  track() {
    this.track()
  },
  canTrack() {
    return this.hasPrey()
  },
  attack() {
    this.attack()
  },
  canAttack() {
    return this.hasPrey() && this.prey.pos.distanceTo(this.pos) < 500 && this.prey.health > 0
  },
  getKill() {
    this.destination = this.prey.pos.clone()
  },
  canGetKill() {
    return this.hasPrey() && this.prey.health <= 0 && !this.carryEntity
  },
  deliverKill() {
    this.carry(this.prey)
    this.destination = this.game.getCloseEntity('village', this.pos, 2000).pos.clone()
  },
  canDeliverKill() {
    return this.hasPrey() && this.prey.pos.distanceTo(this.pos) < 50 && this.prey.health <= 0
  },
  dropKill() {
    this.drop()
  },
  canDropKill() {
    return this.hasPrey() && this.prey.health <= 0 && this.carryEntity && this.game.getCloseEntity('village', this.pos, 1500).pos.distanceTo(this.pos) < 100
  }
}
