function Arrow(game, data) {
    var offset = data.offset || 10;
    var randomOffset = new THREE.Vector3(rndInt(offset), roll(offset), rndInt(offset));
    this.name = 'arrow';
    Entity.call(this, game);
    this.pos = data.pos;
    this.destination = data.destination.add(randomOffset);
    this.speed = data.speed || 300;
    this.lifeSpan = data.lifeSpan || 150;
}


Arrow.prototype = new Entity();
Arrow.prototype.constructor = Arrow;


Arrow.prototype.update = function () {

    if (this.lifeSpan > 0) {
        this.lifeSpan--;
    } else {
        this.remove = true;
        this.game.removeEntity(this);
    }

    Entity.prototype.update.call(this);
};


Arrow.prototype.create = function () {

    var geometry = new THREE.BoxGeometry(0.5, 0.5, 5);
    var material = new THREE.MeshLambertMaterial({ color: 0x966f33, shading: THREE.SmoothShading });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;

};