function Terrain() {
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
    this.camera.position.y = 500;
    this.camera.position.z = 500;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({antialias: true, maxLights: 100, alpha: true});
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.gammaInput             = true;
    this.renderer.gammaOutput            = true;
    this.renderer.physicallyBasedShading = true;
    this.renderer.shadowMapEnabled       = true;
    this.renderer.shadowMapCullFace      = THREE.CullFaceBack;
    this.renderer.shadowMapAutoUpdate    = true;
    this.renderer.shadowMapType          = THREE.PCFSoftShadowMap;
    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    document.body.appendChild( this.renderer.domElement );
}


Terrain.prototype.initLighting = function () {

    var d = 500;
    var ambient = new THREE.AmbientLight(0x111111);
    var dirLight = new THREE.DirectionalLight(0xffffff, 0.5, 500);
    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);

    // light for shadows
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(100);
    dirLight.position = this.camera.position;
    dirLight.castShadow = true;
    dirLight.shadowMapWidth = 2048;
    dirLight.shadowMapHeight = 2048;
    dirLight.shadowCameraLeft = -d;
    dirLight.shadowCameraRight = d;
    dirLight.shadowCameraTop = d;
    dirLight.shadowCameraBottom = -d;
    dirLight.shadowCameraFar = 3500;
    dirLight.shadowBias = -0.0001;
    dirLight.shadowDarkness = 0.35;

    this.scene.add(dirLight);
    this.scene.add(ambient);

    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 500, 0);
    this.scene.add(hemiLight);


};


var t = new Terrain();

var geometry = new THREE.PlaneGeometry(500, 500, 10, 10);
var material = new THREE.MeshLambertMaterial({color:0xff6633, vertexColors: THREE.FaceColors, shading: THREE.FlatShading});

for (var i = 0; i < geometry.vertices.length; i++) {
    geometry.vertices[i].x += Math.random() * 15 | 0;
    geometry.vertices[i].y += Math.random() * 15 | 0;
    geometry.vertices[i].z += Math.random() * 5 | 0;
}

for (var i = 0; i < geometry.faces.length; i++) {
    var color = geometry.faces[i].color;
    var rand = Math.random();
    geometry.faces[i].color.setRGB(color.r + rand, color.g + rand, color.b + rand);
}

var plane = new THREE.Mesh(geometry, material);

plane.rotation.x = -Math.PI / 2;
plane.position.set(0, -20, 0);
plane.receiveShadow = true;

t.scene.add(plane);

t.initLighting();

Terrain.prototype.go = function() {
    var that = this;
    (function gameLoop() {
        requestAnimationFrame(gameLoop);
        that.renderer.render( that.scene, that.camera );
        that.controls.update();
    })();
};

t.go();