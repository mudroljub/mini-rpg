function Rabbit(game) {

    this.name = 'rabbit';
    Entity.call(this, game, 0xff0000);
    this.pos = new THREE.Vector3(rndInt(1200), 0, rndInt(1200));
    this.destination = this.pos.clone();

    this.health = 5;
    this.speed = 50 + rndInt(40);

    this.exploringState  = new RabbitStateExploring(this);
    this.brain.addState(this.exploringState);
}


Rabbit.prototype = new Entity();
Rabbit.prototype.constructor = Rabbit;


Rabbit.prototype.update = function() {

    var collision = this.game.place(this.pos);
    this.pos.y = collision.y + 5;
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
