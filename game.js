/* global AssetManager, Mob, Mine, Village, rndInt */
import GameEngine from './classes/GameEngine.js'

const MESHES = ['tree', 'mine', 'cloud', 'village']
const MOBS = 3

const game = new GameEngine()
const assets = new AssetManager()

assets.loadMeshes(MESHES, () => {
  game.init()
  game.start()
  game.plantTrees()

  for (let i = 0; i < MOBS; i++)
    game.addEntity(new Mob(game))

  for (let i = 0; i < 1; i++) {
    let rndPoint = new THREE.Vector3(rndInt(1100), 100, rndInt(1100))
    let collision = game.place(rndPoint)
    collision.y += 10
    game.addEntity(new Mine(game, {pos: collision}))

    rndPoint = new THREE.Vector3(rndInt(1100), 100, rndInt(1100))
    collision = game.place(rndPoint)
    collision.y += 20
    game.addEntity(new Village(game, {pos: collision}))
  }
})

