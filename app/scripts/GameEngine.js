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
};


GameEngine.prototype.init = function() {
    var d = 500;
    console.log('MiniRPG init!');

    var ambient = new THREE.AmbientLight( 0x444444 );
    this.scene.add( ambient );

    var gen = new THREE.PointLight( 0xfee5ac, 1, 1000);
    gen.position.set(new THREE.Vector3(50, 50, 50));
    this.scene.add(gen);

    // light for shadows
    dirLight = new THREE.DirectionalLight( 0xffffff, 0.5 ,500);
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( -1, 1.75, 1 );
    dirLight.position.multiplyScalar( 100 );
    this.scene.add( dirLight );
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

    var farm = new Farm(this);
    this.addEntity(farm);

    for (var i = 0; i < 20; i++) {
        this.addEntity(new Tree(this));
    }

    var mine = new Mine(this);
    this.addEntity(mine);

    var level = new Level({size:48});
    var ground = level.generate();
    this.scene.add(ground);

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


GameEngine.prototype.pause = function () {
    this.paused = this.paused ? false : true;
};
