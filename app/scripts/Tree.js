function Tree(game) {

    this.name = 'tree';
    Entity.call(this, game, 0x3EA055);
    this.pos = new THREE.Vector3(rndInt(64) * 8, 10, rndInt(64) * 8);

}


Tree.prototype = new Entity();
Tree.prototype.constructor = Tree;


Tree.prototype.update = function() {

    Entity.prototype.update.call(this);

};


Tree.prototype.create = function() {
    var tree = new THREE.Object3D();
    var leaves = new THREE.CylinderGeometry( 0, 20, 40, 4, 1 );
    for (var i = 0; i < leaves.vertices.length; i++) {
        leaves.vertices[i].y += 20;
    }
    this.solidMat = new THREE.MeshLambertMaterial({ color: this.color, shading: THREE.SmoothShading });
    tree.add(new THREE.Mesh(leaves, this.solidMat));

    var trunk = new THREE.BoxGeometry(5, 40, 5);
    for (var i = 0; i < trunk.vertices.length; i++) {
        trunk.vertices[i].y -= 20;
    }
    this.solidMat = new THREE.MeshLambertMaterial({ color: 0x966F33, shading: THREE.SmoothShading });
    tree.add(new THREE.Mesh(trunk, this.solidMat));



    tree.castShadow = true;

    this.mesh = tree;

};


