function Mine(game) {

    this.name = 'mine';
    Entity.call(this, game, 0x3e414e);
    this.pos = new THREE.Vector3((Math.random() * 128 - 64) * 5, 5, (Math.random() * 128 - 64) * 5);

}


Mine.prototype = new Entity();
Mine.prototype.constructor = Mine;


Mine.prototype.update = function() {

    Entity.prototype.update.call(this);

};


Mine.prototype.create = function() {

    var geometry = new THREE.BoxGeometry(20, 20, 20);
    this.solidMat = new THREE.MeshLambertMaterial({ color: this.color, shading: THREE.SmoothShading });
    this.mesh = new THREE.Mesh(geometry, this.solidMat);
    this.mesh.castShadow = true;
};


