
function GameEngine() {
    this.entityId = 0;
    this.fps = false;
    this.paused = false;
    this.entities = {};
    this.clock = new THREE.Clock();
    this.delta = 0;
    this.elapsed = 0;
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
    this.camera.position.y = 500;
    this.camera.position.z = 500;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.cameraFPS = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 5000 );
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


GameEngine.prototype.addEntity = function(entity) {
    this.entities[this.entityId] = entity;
    entity.id = this.entityId;
    this.entityId++;
    this.scene.add(entity.mesh);
};


GameEngine.prototype.removeEntity = function(entity) {
    this.entities[entity.id].remove = true;
    this.scene.remove(entity.mesh);
};


GameEngine.prototype.getCloseEntity = function(name, position, range) {
    var i, distance, entity;
    for (i in this.entities) {
        entity = this.entities[i];
        if (entity.name === name && !entity.remove) {
            distance = position.distanceTo(entity.pos);
            if (distance < range) {
                return entity;
            }
        }
    }
    return false;
};


GameEngine.prototype.loop = function() {
    this.delta = this.clock.getDelta();
    this.update();
};


GameEngine.prototype.update = function() {
    var i, entity;
    for (i in this.entities) {
        entity = this.entities[i];
        if (!entity.remove) {
            entity.update();
        }
    }
    this.controls.update();
};


GameEngine.prototype.init = function() {
    console.log('MiniRPG init!');

    this.machine = new Machine();
    this.terrain = new Level();
    this.scene.add(this.terrain.generate());

    for (var i = 0; i < RABBITS; i++) {
        this.addEntity(new Rabbit(this));
    }
    for (var i = 0; i < CLOUDS; i++) {
        this.addEntity(new Cloud(this));
    }

    for (var i = 0; i < BIRDS; i++) {
        this.addEntity(new Bird(this));
    }

    this.initLighting();
};


GameEngine.prototype.start = function() {
    console.log('MiniRPG is go!');
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimationFrame(gameLoop);
        if (!that.fps) {
            that.renderer.render( that.scene, that.camera );
        } else {
            that.renderer.render( that.scene, that.cameraFPS );

        }
        that.elapsed = that.clock.getElapsedTime();
    })();
};

GameEngine.prototype.initLighting = function () {
    var d = 500;
//    var ambient = new THREE.AmbientLight(0x111111);
    var dirLight = new THREE.DirectionalLight(0xffffcc, 0.5, 500);
    var hemiLight = new THREE.HemisphereLight(0xffffcc, 0xffffcc, 0.6);
    var pointLight = new THREE.PointLight(0xffffcc);

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

    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 500, 0);

    pointLight.intensity = 0.75;
    pointLight.position = new THREE.Vector3(1000, 800, -1000);

    this.scene.add(dirLight);
    //this.scene.add(ambient);
    this.scene.add(hemiLight);
    this.scene.add(pointLight);
};


GameEngine.prototype.pause = function () {
    this.paused = this.paused ? false : true;
};


GameEngine.prototype.getEntity = function (id) {
    return this.entities[id] || false;
};


GameEngine.prototype.plantTrees = function() {
    for (var i = 0; i < TREES; i++) {
        var rndPoint = new THREE.Vector3(rndInt(1100), 100, rndInt(1100));
        var collision = this.place(rndPoint);
        if (collision.y > 0) {
            collision.y -= 10;
            this.addEntity(new Tree(MiniRPG, {pos: collision}));
        }
    }
};


GameEngine.prototype.place = function(position) {
    var caster = new THREE.Raycaster();
    var ray = new THREE.Vector3(0, -1, 0);

    caster.set(position, ray);

    var collisions = caster.intersectObject(MiniRPG.scene.getObjectByName('terrain').children[0]);

    if (collisions.length > 0) {
        return collisions[0].point ;
    }
    return position;
};


GameEngine.prototype.switchCam = function() {
    if (this.fps) {
        this.fps = false;
    } else {
        var mob = this.getCloseEntity('mob', new THREE.Vector3(0, 0, 0), 2000);
        mob.fps = true;
        mob.log = true;
        this.fps = true;
        this.cameraFPS.position = mob.pos;
        this.cameraFPS.position.y += 10;
    }
};