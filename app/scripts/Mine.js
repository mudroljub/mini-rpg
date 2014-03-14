function Mine(game) {

    this.name = 'mine';
    Entity.call(this, game, 0x3e414e);
    this.pos = new THREE.Vector3(rndInt(128) * 5, -20, rndInt(128) * 5);
    this.units = 100;

}


Mine.prototype = new Entity();
Mine.prototype.constructor = Mine;


Mine.prototype.update = function() {

    Entity.prototype.update.call(this);

};


Mine.prototype.create = function() {

    if (objects['mine']) {

        objects['mine'].scale.set(10, 10, 10);
        objects['mine'].castShadow = true;
        this.mesh = objects['mine'].clone();
        this.rotation.y = roll(180) * (Math.PI / 180);

    }
};


