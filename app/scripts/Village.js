function Village(game) {

    this.name = 'village';
    Entity.call(this, game, 0x0000ff);
    this.pos = new THREE.Vector3(-256, 20, -256);

}


Village.prototype = new Entity();
Village.prototype.constructor = Village;


Village.prototype.update = function() {

    Entity.prototype.update.call(this);

};


Village.prototype.create = function() {

    if (objects['village']) {
        objects['village'].scale.set(15, 15, 15);
        objects['village'].castShadow = true;
        this.mesh = objects['village'].clone();
        this.mesh.castShadow = true;

        this.mesh.name = this.name;
    }

};


