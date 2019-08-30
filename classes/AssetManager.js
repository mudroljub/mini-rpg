const IMAGES = []
export const objects   = {}

const loader = new THREE.JSONLoader()

export default class AssetManager {
  constructor() {
    this.TEXTURES  = {}
    this.MATERIALS = {}
  }

  loadMaterials(callback) {
    for (let i = 0; i < IMAGES.length; i++) {
      const texture = THREE.ImageUtils.loadTexture('assets/textures/' + IMAGES[i] + '.jpg')
      texture.magFilter = THREE.NearestFilter
      texture.minFilter = THREE.LinearMipMapLinearFilter
      this.TEXTURES[IMAGES[i]] = texture
      this.MATERIALS[IMAGES[i]] = new THREE.MeshLambertMaterial({map: texture })
      this.MATERIALS[IMAGES[i]].dynamic = true
    }
    return callback()
  }

  loadMeshes(meshes, callback) {
    let i = 0
    meshes.forEach(mesh => {
      loader.load('assets/' + mesh + '.json', (geometry, materials) => {
        const material = new THREE.MultiMaterial(materials)
        objects[mesh] = new THREE.Mesh(geometry, material)
        i++
        if (i === meshes.length) callback(objects)
      })
    })
  }
}
