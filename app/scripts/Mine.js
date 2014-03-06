function Mine(game) {
    this.type = 'mine';
    Entity.call(this, game, 0x333333);
    this.pos = new THREE.Vector3(100, 10, 100);
}


Mine.prototype = new Entity();
Mine.prototype.constructor = Mine;


Mine.prototype.update = function() {

    Entity.prototype.update.call(this);

};


Mine.prototype.create = function() {

    Entity.prototype.create.call(this);

};


