const MiniRPG = new GameEngine()
const loader = new THREE.JSONLoader()
const objects   = {}

const TREES = 100
const BIRDS = 15
const RABBITS = 50
const CLOUDS = 15
const MOBS = 1

window.onload = function() {
  const assets = new AssetManager()
  assets.loadMeshes(MESHES, () => {
    MiniRPG.init()
    MiniRPG.start()
    MiniRPG.plantTrees()

    for (var i = 0; i < MOBS; i++)
      MiniRPG.addEntity(new Mob(MiniRPG))

    for (var i = 0; i < 1; i++) {
      var rndPoint = new THREE.Vector3(rndInt(1100), 100, rndInt(1100))
      var collision = MiniRPG.place(rndPoint)
      collision.y += 10
      MiniRPG.addEntity(new Mine(MiniRPG, {pos: collision}))

      var rndPoint = new THREE.Vector3(rndInt(1100), 100, rndInt(1100))
      var collision = MiniRPG.place(rndPoint)
      collision.y += 20
      MiniRPG.addEntity(new Village(MiniRPG, {pos: collision}))
    }
  })
}
