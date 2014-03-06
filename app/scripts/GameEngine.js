function GameEngine() {
    this.paused = false;
    this.entities = [];
    this.clock = new THREE.Clock();
    this.delta = 0;
    this.elapsed = 0;
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
    this.camera.position.y = 500;
    this.camera.position.z = 500;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({antialias: true, maxLights: 100});
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
    this.entities.push(entity);
    this.scene.add(entity.mesh);
};


GameEngine.prototype.loop = function() {
    this.delta = this.clock.getDelta();
    this.update();
};


GameEngine.prototype.update = function() {
    var entitiesCount = this.entities.length;
    var i;

    for (i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];
        if (!entity.remove) {
            entity.update();
        }
    }

    this.controls.update();
};


GameEngine.prototype.init = function() {

    this.level = new Level( { size : 48 } );
    var ground = this.level.generate();

    console.log('MiniRPG init!');

    for (var i = 0; i < 10; i++) {
        this.addEntity(new Farm(this));
        this.addEntity(new Cloud(this));
    }

    for (var i = 0; i < 200; i++) {
        this.addEntity(new Tree(this));

    }

    for (var i = 0; i < 4; i++) {
        this.addEntity(new Mine(this));
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

GameEngine.prototype.initLighting = function() {

    var d = 500;
    var ambient = new THREE.AmbientLight( 0x444444 );
    var gen = new THREE.PointLight( 0xfee5ac, 1, 1000);
    var dirLight = new THREE.DirectionalLight( 0xffffff, 0.5 ,500);

    gen.position.set(new THREE.Vector3(50, 50, 50));

    // light for shadows
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( -1, 1.75, 1 );
    dirLight.position.multiplyScalar( 100 );
    dirLight.position              = this.camera.position;
    dirLight.castShadow            = true;
    dirLight.shadowMapWidth        = 2048;
    dirLight.shadowMapHeight       = 2048;
    dirLight.shadowCameraLeft      = -d;
    dirLight.shadowCameraRight     = d;
    dirLight.shadowCameraTop       = d;
    dirLight.shadowCameraBottom    = -d;
    dirLight.shadowCameraFar       = 3500;
    dirLight.shadowBias            = -0.0001;
    dirLight.shadowDarkness        = 0.35;

    this.scene.add( dirLight );
    this.scene.add( ambient );
    this.scene.add( gen );

}


GameEngine.prototype.pause = function () {
    this.paused = this.paused ? false : true;
};
