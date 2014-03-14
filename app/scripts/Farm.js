function Farm(game) {

    this.name = 'farm';
    Entity.call(this, game, 0xff0000);
    this.pos = new THREE.Vector3(rndInt(128) * 5, 5, rndInt(128) * 5);

}


Farm.prototype = new Entity();
Farm.prototype.constructor = Farm;


Farm.prototype.update = function() {

    Entity.prototype.update.call(this);

};


Farm.prototype.create = function() {

    Entity.prototype.create.call(this);

};


