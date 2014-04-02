function Bird(game) {

    this.name = 'bird';
    Entity.call(this, game, 0xff6666);
    this.pos = new THREE.Vector3(rndInt(2400), roll(150), rndInt(2400));
    this.destination = this.pos.clone();

    this.health = 5;
    this.speed = 50 + rndInt(40);

    this.exploringState  = new BirdStateExploring(this);
    this.brain.addState(this.exploringState);
}


Bird.prototype = new Entity();
Bird.prototype.constructor = Bird;


Bird.prototype.create = function() {

    var geometry = new THREE.BoxGeometry(2, 2, 5);
    var material = new THREE.MeshLambertMaterial({ color: 0xff6666, shading: THREE.SmoothShading, vertexColors: THREE.FaceColors });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    for (var i = 0; i < this.mesh.geometry.vertices.length; i++) {
        this.mesh.geometry.vertices[i].y += 5;
    }

};

Bird.prototype.attacked = function() {
    this.health -= 1;
    if (this.health <= 0) {
        this.speed = 0;
        this.remove = true;
//        this.game.removeEntity(this);
    }
    this.speed = 140;
}
