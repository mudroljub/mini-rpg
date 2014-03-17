function Arrow(game, pos, dest) {
    var randomOffset = new THREE.Vector3(rndInt(10), 0, rndInt(10));

    this.name = 'arrow';
    Entity.call(this, game, 0x966f33);
    this.pos = pos;
    this.destination = dest.add(randomOffset);;
    this.speed = 300;
    this.lifeSpan = 150;
}

Arrow.prototype = new Entity();
Arrow.prototype.constructor = Arrow;


Arrow.prototype.update = function () {

    var deltaX, deltaY, deltaZ;

    if (this.lifeSpan > 0) {
        this.lifeSpan--;
    } else {
        this.remove = true;
        this.pos.y = 1;
        this.game.removeEntity(this);
    }

    // rotation to target location
    deltaX = this.destination.x - this.pos.x;
    deltaY = this.destination.y - this.pos.y;
    deltaZ = this.destination.z - this.pos.z;

    var dv = new THREE.Vector3();
    dv.subVectors(this.destination, this.pos);
    dv.setLength(this.speed);
    this.vel = dv;

    this.rotation.y = (Math.atan2(deltaX, deltaZ));

    Entity.prototype.update.call(this);

};


Arrow.prototype.create = function () {

    var geometry = new THREE.BoxGeometry(0.5, 0.5, 5);
    var material = new THREE.MeshLambertMaterial({ color: this.color, shading: THREE.SmoothShading });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;

};