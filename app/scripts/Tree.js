function Tree(game) {
    this.type = 'tree';
    Entity.call(this, game, 0x00ff00);
    this.pos = new THREE.Vector3((Math.random() * 128 - 64) * 5, 10, (Math.random() * 128 - 64) * 5);
}


Tree.prototype = new Entity();
Tree.prototype.constructor = Tree;


Tree.prototype.update = function() {

    Entity.prototype.update.call(this);

};


Tree.prototype.create = function() {

    Entity.prototype.create.call(this);

};


