function Rabbit(game) {

    this.name = 'rabbit';
    Entity.call(this, game, 0xff0000);
    this.pos = new THREE.Vector3(rndInt(128) * 5, 0, rndInt(128) * 5);
    this.destination = this.pos.clone();

    this.health = 5;
    this.speed = 50 + rndInt(40);

    this.exploringState  = new RabbitStateExploring(this);
    this.brain.addState(this.exploringState);
}


Rabbit.prototype = new Entity();
Rabbit.prototype.constructor = Rabbit;


Rabbit.prototype.update = function() {

    var deltaX, deltaY, deltaZ;

    // rotation to target location
    deltaX = this.destination.x - this.pos.x;
    deltaY = this.destination.y - this.pos.y;
    deltaZ = this.destination.z - this.pos.z;

    var dv = new THREE.Vector3();
    dv.subVectors(this.destination, this.pos);
    dv.setLength(this.speed);
    this.vel = dv;

    this.pos.y = Math.sin((Math.PI * (Date.now() / 10) / 20));
    this.rotation.y = (Math.atan2(deltaX, deltaZ));

    Entity.prototype.update.call(this);

};


Rabbit.prototype.create = function() {

    var geometry = new THREE.BoxGeometry(2, 2, 5);
    var material = new THREE.MeshLambertMaterial({ color: 0x777777, shading: THREE.SmoothShading, vertexColors: THREE.FaceColors });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    for (var i = 0; i < this.mesh.geometry.vertices.length; i++) {
        this.mesh.geometry.vertices[i].y += 5;
    }

};

Rabbit.prototype.attacked = function() {
    this.health -= 1;
    if (this.health <= 0) {
        this.speed = 0;
        this.remove = true;
//        this.game.removeEntity(this);
    }
    this.speed = 140;
}
