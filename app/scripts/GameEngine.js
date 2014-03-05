function GameEngine() {
    this.paused = false;
    this.entities = [];
}


GameEngine.prototype.constructor = GameEngine;


GameEngine.prototype.addEntity = function(entity) {
    this.entities.push(entity);
    scene.add(entity.mesh);
}


GameEngine.prototype.loop = function() {
    this.update();
}


GameEngine.prototype.update = function() {
    var entitiesCount = this.entities.length;
    var i;

    for (i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];
        if (!entity.remove) {
            entity.update();
        }
    }


    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

}


GameEngine.prototype.init = function() {
    console.log('MiniRPG init!');
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry( 200, 200, 200 );
    material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );
}


GameEngine.prototype.start = function() {
    console.log('MiniRPG is go!');
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimationFrame(gameLoop);
        renderer.render( scene, camera );
    })();
}


GameEngine.prototype.pause = function () {
    this.paused = this.paused ? false : true;
}
