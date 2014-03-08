function Farm(game) {

    this.name = 'farm';
    Entity.call(this, game, 0xff0000);
    this.pos = new THREE.Vector3((Math.random() * 128 - 64) * 5, 5, (Math.random() * 128 - 64) * 5);

}


Farm.prototype = new Entity();
Farm.prototype.constructor = Farm;


Farm.prototype.update = function() {

    Entity.prototype.update.call(this);

};


Farm.prototype.create = function() {

    Entity.prototype.create.call(this);

};


