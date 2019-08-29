const MiniRPG = new GameEngine()

const objects   = {}
const MOBS = 1

const assets = new AssetManager()
assets.loadMeshes(MESHES, () => {
  MiniRPG.init()
  MiniRPG.start()
  MiniRPG.plantTrees()

  for (let i = 0; i < MOBS; i++)
    MiniRPG.addEntity(new Mob(MiniRPG))

  for (let i = 0; i < 1; i++) {
    let rndPoint = new THREE.Vector3(rndInt(1100), 100, rndInt(1100))
    let collision = MiniRPG.place(rndPoint)
    collision.y += 10
    MiniRPG.addEntity(new Mine(MiniRPG, {pos: collision}))

    rndPoint = new THREE.Vector3(rndInt(1100), 100, rndInt(1100))
    collision = MiniRPG.place(rndPoint)
    collision.y += 20
    MiniRPG.addEntity(new Village(MiniRPG, {pos: collision}))
  }
})

