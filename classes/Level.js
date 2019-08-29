function Level() {
  this.resolution = 20
}

Level.prototype.constructor = Level

Level.prototype.generate = function() {

  const material = new THREE.MeshLambertMaterial({ color: 0x33aa33, shading: THREE.FlatShading, vertexColors: THREE.FaceColors, overdraw: true})
  const geometry = new THREE.PlaneGeometry(1200, 1200, this.resolution, this.resolution)
  geometry.dynamic = true
  geometry.verticesNeedUpdate = true
  geometry.computeCentroids()

  const noise = new SimplexNoise()
  let n

  const factorX = 50
  const factorY = 25
  const factorZ = 60

  for (var i = 0; i < geometry.vertices.length; i++) {
    n = noise.noise(geometry.vertices[i].x / this.resolution / factorX, geometry.vertices[i].y / this.resolution / factorY)
    n -= 0.25
    geometry.vertices[i].z = n * factorZ
  }

  for (let f = 0; f < geometry.faces.length; f++) {
    var {color} = geometry.faces[f]
    var rand = Math.random() / 5
    geometry.faces[f].color.setRGB(color.r + rand, color.g + rand, color.b + rand)
  }
  // THREE.GeometryUtils.triangulateQuads( geometry );

  const land = new THREE.Mesh(geometry, material)
  land.receiveShadow = true
  land.name = 'land'
  land.rotateX(-Math.PI / 2)
  land.position.set(0, 30, 0)

  const water_material = new THREE.MeshLambertMaterial({color: 0x6699ff, transparent: true, opacity: 0.75, vertexColors: THREE.FaceColors, shading: THREE.FlatShading})
  const water_geometry = new THREE.PlaneGeometry(1200, 1200, this.resolution, this.resolution)
  water_geometry.dynamic = true
  water_geometry.verticesNeedUpdate = true
  for (var i = 0; i < water_geometry.faces.length; i++) {
    var {color} = water_geometry.faces[i]
    var rand = Math.random()
    water_geometry.faces[i].color.setRGB(color.r + rand, color.g + rand, color.b + rand)
  }

  const water = new THREE.Mesh(water_geometry, water_material)
  water.receiveShadow = true
  water.name = 'water'
  water.rotateX(-Math.PI / 2)

  const terrain = new THREE.Object3D()
  terrain.name = 'terrain'

  terrain.add(land)
  terrain.add(water)

  // terrain.rotation.x = -Math.PI / 2;
  terrain.receiveShadow = true

  return terrain
}
