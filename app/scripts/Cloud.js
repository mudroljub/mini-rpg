function Cloud(game) {
    this.type = 'cloud';
    Entity.call(this, game, 0xff0000);
    this.pos = new THREE.Vector3((Math.random() * 128 - 64) * 5, 100, (Math.random() * 128 - 64) * 5);
}


Cloud.prototype = new Entity();
Cloud.prototype.constructor = Cloud;


Cloud.prototype.update = function() {

    this.vel.x = 10;

    if (this.pos.x > this.game.level.size/2 * this.game.level.tile.width) {
        this.pos.x = -this.game.level.size/2 * this.game.level.tile.width;
    }

    Entity.prototype.update.call(this);

};


Cloud.prototype.create = function() {

    var geometry;
    geometry = new THREE.BoxGeometry(Math.random() * 60 + 10, 10, Math.random() * 60 + 10);
    this.solidMat = new THREE.MeshLambertMaterial({ color: 0xffffff, shading: THREE.SmoothShading, transparent: true, opacity: 0.75 });
    this.mesh = new THREE.Mesh(geometry, this.solidMat);
    this.mesh.castShadow = true;

};


