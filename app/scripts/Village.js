function Village(game) {

    this.name = 'village';
    Entity.call(this, game, 0x0000ff);
    this.pos = new THREE.Vector3((Math.random() * 128 - 64) * 5, 5, (Math.random() * 128 - 64) * 5);

}


Village.prototype = new Entity();
Village.prototype.constructor = Village;


Village.prototype.update = function() {

    Entity.prototype.update.call(this);

};


Village.prototype.create = function() {

    var geometry = new THREE.BoxGeometry(30, 10, 30);
    this.solidMat = new THREE.MeshLambertMaterial({ color: this.color, shading: THREE.SmoothShading });
    this.mesh = new THREE.Mesh(geometry, this.solidMat);
    this.mesh.castShadow = true;

};


