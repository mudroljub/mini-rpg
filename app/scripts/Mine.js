function Mine(game) {
    this.type = 'mine';
    Entity.call(this, game, 0x3e414e);
    this.pos = new THREE.Vector3((Math.random() * 128 - 64) * 5, 5, (Math.random() * 128 - 64) * 5);
}


Mine.prototype = new Entity();
Mine.prototype.constructor = Mine;


Mine.prototype.update = function() {

    Entity.prototype.update.call(this);

};


Mine.prototype.create = function() {

    Entity.prototype.create.call(this);

};


