function Cloud(game) {

    this.name = 'cloud';
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

    if (objects['cloud']) {
        objects['cloud'].scale.set(roll(50) + 10, 15, roll(10)+ 10);
        objects['cloud'].castShadow = true;
        this.mesh = objects['cloud'].clone();
        this.mesh.castShadow = true;

        this.mesh.name = this.name;
    }

};


