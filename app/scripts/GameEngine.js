function GameEngine() {

    this.entityId = 0;
    this.paused = false;
    this.entities = {};
    this.clock = new THREE.Clock();
    this.delta = 0;
    this.elapsed = 0;
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

GameEngine.prototype.constructor = GameEngine;


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
    var i;

    for (i in this.entities) {
        var entity = this.entities[i];
        if (!entity.remove) {
            entity.update();
        }
    }

    this.controls.update();
};


GameEngine.prototype.init = function() {
    var mob, rabbit;

    this.level = new Level( { size : 48 } );
    var ground = this.level.generate();

    console.log('MiniRPG init!');

    for (var i = 0; i < 15; i++) {
        rabbit = new Rabbit(this)
        rabbit.brain.setState("exploring");
        this.addEntity(rabbit);
        this.addEntity(new Cloud(this));
    }

    for (var i = 0; i < 40; i++) {
        this.addEntity(new Tree(this));

    }

    for (var i = 0; i < 1; i++) {
        this.addEntity(new Mine(this));
    }

    for (var i = 0; i < 1; i++) {
        this.addEntity(new Village(this));
    }

    for (var i = 0; i < 20; i++) {
        mob = new Mob(this);
        mob.brain.setState("exploring");
        this.addEntity(mob);
    }

    this.scene.add(ground);

    this.initLighting();

};


GameEngine.prototype.start = function() {
    console.log('MiniRPG is go!');
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimationFrame(gameLoop);
        that.renderer.render( that.scene, that.camera );
        that.elapsed = that.clock.getElapsedTime();
    })();
};

GameEngine.prototype.initLighting = function () {

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


GameEngine.prototype.pause = function () {
    this.paused = this.paused ? false : true;
};


GameEngine.prototype.getEntity = function (id) {
    return this.entities[id] || false;
};