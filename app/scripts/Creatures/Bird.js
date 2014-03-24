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


Bird.prototype.update = function() {

    var deltaX, deltaY, deltaZ;

    // rotation to target location
    deltaX = this.destination.x - this.pos.x;
    deltaY = this.destination.y - this.pos.y;
    deltaZ = this.destination.z - this.pos.z;

    var dv = new THREE.Vector3();
    dv.subVectors(this.destination, this.pos);
    dv.setLength(this.speed);
    this.vel = dv;
    //var collision = this.game.place(this.pos);

    //this.pos.y = collision.y + roll(50);
    this.rotation.y = (Math.atan2(deltaX, deltaZ));

    Entity.prototype.update.call(this);

};


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
