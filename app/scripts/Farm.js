function Farm(game) {
    this.type = 'farm';
    Entity.call(this, game, 0xff0000);
    this.pos = new THREE.Vector3(0, 20, 0);
}


Farm.prototype = new Entity();
Farm.prototype.constructor = Farm;


Farm.prototype.update = function() {

    Entity.prototype.update.call(this);

};


Farm.prototype.create = function() {

    Entity.prototype.create.call(this);

};


