function Tree(game) {

    this.name = 'tree';
    Entity.call(this, game, 0x00aa00);
    this.pos = new THREE.Vector3((Math.random() * 128 - 64) * 5, 10, (Math.random() * 128 - 64) * 5);

}


Tree.prototype = new Entity();
Tree.prototype.constructor = Tree;


Tree.prototype.update = function() {

    Entity.prototype.update.call(this);

};


Tree.prototype.create = function() {

    var geometry = new THREE.CylinderGeometry( 0, 20, 40, 4, 1 );
    this.solidMat = new THREE.MeshLambertMaterial({ color: this.color, shading: THREE.SmoothShading });
    this.mesh = new THREE.Mesh(geometry, this.solidMat);
    this.mesh.castShadow = true;

};


