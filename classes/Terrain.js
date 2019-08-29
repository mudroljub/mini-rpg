/* global SimplexNoise */

function Terrain() {
  this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000)
  this.camera.position.y = 500
  this.camera.position.z = 500
  this.camera.lookAt(new THREE.Vector3(0, 0, 0))
  this.scene = new THREE.Scene()
  this.renderer = new THREE.WebGLRenderer({antialias: true, maxLights: 100, alpha: true})
  this.renderer.setSize(window.innerWidth, window.innerHeight)
  this.renderer.gammaInput             = true
  this.renderer.gammaOutput            = true
  this.renderer.physicallyBasedShading = true
  this.renderer.shadowMapEnabled       = true
  this.renderer.shadowMapCullFace      = THREE.CullFaceBack
  this.renderer.shadowMapAutoUpdate    = true
  this.renderer.shadowMapType          = THREE.PCFSoftShadowMap
  this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
  document.body.appendChild(this.renderer.domElement)
}

Terrain.prototype.initLighting = function() {
  const d = 500
  const ambient = new THREE.AmbientLight(0x111111)
  const dirLight = new THREE.DirectionalLight(0xffffcc, 0.5, 500)

  // light for shadows
  dirLight.color.setHSL(0.1, 1, 0.95)
  dirLight.position.set(-1, 1.75, 1)
  dirLight.position.multiplyScalar(100)
  dirLight.position = this.camera.position
  dirLight.castShadow = true
  dirLight.shadowMapWidth = 2048
  dirLight.shadowMapHeight = 2048
  dirLight.shadowCameraLeft = -d
  dirLight.shadowCameraRight = d
  dirLight.shadowCameraTop = d
  dirLight.shadowCameraBottom = -d
  dirLight.shadowCameraFar = 3500
  dirLight.shadowBias = -0.0001
  dirLight.shadowDarkness = 0.35

  this.scene.add(dirLight)
  this.scene.add(ambient)
}

const t = new Terrain()

const geometry = new THREE.PlaneGeometry(1200, 1200, 20, 20)
geometry.dynamic = true
geometry.verticesNeedUpdate = true
const material = new THREE.MeshLambertMaterial({color:0x66cc66, vertexColors: THREE.FaceColors, shading: THREE.FlatShading})

const noise = new SimplexNoise()
let n

const factorX = 50
const factorY = 25
const factorZ = 60

for (let i = 0; i < geometry.vertices.length; i++) {
  n = noise.noise(geometry.vertices[i].x / 20 / factorX, geometry.vertices[i].y / 20 / factorY)
  n -= 0.25
  geometry.vertices[i].z = n * factorZ
}

for (let i = 0; i < geometry.faces.length; i++) {
  const {color} = geometry.faces[i]
  const rand = Math.random() / 5
  geometry.faces[i].color.setRGB(color.r + rand, color.g + rand, color.b + rand)
}
geometry.computeCentroids()
const plane = new THREE.Mesh(geometry, material)

plane.rotation.x = -Math.PI / 2
plane.position.set(0, -20, 0)
plane.receiveShadow = true
plane.name = 'land'

t.scene.add(plane)

const waterGeom = new THREE.PlaneGeometry(1200, 1200, 10, 10)
for (let i = 0; i < waterGeom.faces.length; i++) {
  const {color} = waterGeom.faces[i]
  const rand = Math.random() / 5
  waterGeom.faces[i].color.setRGB(color.r + rand, color.g + rand, color.b + rand)
}
const waterMesh = new THREE.Mesh(waterGeom, new THREE.MeshLambertMaterial({color: 0x6699ff, transparent: true, opacity: 0.85, vertexColors: THREE.FaceColors, shading: THREE.FlatShading}))
waterMesh.rotation.x = -90 * Math.PI / 180
waterMesh.position.y -= 50
waterMesh.name = 'water'

t.scene.add(waterMesh)

const cube = new THREE.Mesh(new THREE.CubeGeometry(10, 10, 10), new THREE.MeshBasicMaterial({color:0xff0000}))
cube.position.set(50, 100, 0)
t.scene.add(cube)

t.initLighting()

Terrain.prototype.go = function() {
  const that = this;
  (function gameLoop() {
    requestAnimationFrame(gameLoop)
    that.renderer.render(that.scene, that.camera)
    that.controls.update()
  })()
}

t.go()

for (let i = 0; i < 100; i++) {
  const caster = new THREE.Raycaster()
  const ray = new THREE.Vector3(0, -1, 0)

  caster.set(new THREE.Vector3(Math.random() * 250 | 0, 100, Math.random() * 250 | 0), ray)
  const collisions = caster.intersectObject(plane)

  const cube2 = new THREE.Mesh(new THREE.CubeGeometry(10, 10, 10), new THREE.MeshBasicMaterial({color:0x00ff00}))
  t.scene.add(cube2)

  cube2.position = collisions[0].point
}