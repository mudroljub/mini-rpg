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

    var deltaX, deltaY, deltaZ, vecToDestination,
        distanceToDestination, heading, travelDistance,
        oldPos, newPos;

    // rotation to target location
    deltaX = this.destination.x - this.pos.x;
    deltaY = this.destination.y - this.pos.y;
    deltaZ = this.destination.z - this.pos.z;

    vecToDestination = this.destination.clone().sub(this.pos);
    distanceToDestination = vecToDestination.length();
    heading = vecToDestination.normalize();
    travelDistance = Array.min([distanceToDestination, (this.game.delta * this.speed)]);
    oldPos = this.pos;
    newPos = oldPos.add(heading.multiplyScalar(travelDistance));

    this.pos.x = newPos.x;
    this.pos.z = newPos.z;
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
//        this.mesh.scale.x = 5;
//        this.mesh.scale.y = 5;
//        this.mesh.scale.z = 5;
    }
    this.speed = 140;
}
