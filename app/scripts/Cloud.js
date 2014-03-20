/**
 * Clouds!
 * @param game
 * @constructor
 */
function Cloud(game) {

    this.name = 'cloud';
    Entity.call(this, game);
    this.pos = new THREE.Vector3(rndInt(1200), 100 + rndInt(20), rndInt(1200));

}


Cloud.prototype = new Entity();
Cloud.prototype.constructor = Cloud;


Cloud.prototype.update = function() {

    this.vel.x = 10;

    if (this.pos.x > 1200/2 * 20) {
        this.pos.x = -1200/2 * 20;
    }

    Entity.prototype.update.call(this);

};


Cloud.prototype.create = function() {

    if (objects['cloud']) {
        objects['cloud'].scale.set(roll(50) + 10, 15, roll(10)+ 10);
        objects['cloud'].castShadow = true;
        this.mesh = objects['cloud'].clone();
        this.mesh.name = 'cloud';
    }

};


