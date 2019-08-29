/**
 * Small items to be carried by mobs.
 * @param game
 * @param name
 * @param pos
 * @constructor
 */
function Resource(game, name, pos) {

    switch(name) {
        case 'tree':
            this.name = 'wood';
            this.color = 0x966f33;

            break;
        case 'mine':
            this.name = 'gold';
            this.color = 0xfdd017;
            break;
    }
    Entity.call(this, game, this.color);
    this.pos = pos;
}


Resource.prototype = new Entity();
Resource.prototype.constructor = Resource;


Resource.prototype.create = function() {

    var geometry = new THREE.BoxGeometry(4, 4, 4);
    var material = new THREE.MeshLambertMaterial({ color: this.color, shading: THREE.SmoothShading });
    this.mesh = new THREE.Mesh(geometry, material);
    for (var i = 0; i < this.mesh.geometry.vertices.length; i++) {
        this.mesh.geometry.vertices[i].y += 5;
    }
    this.mesh.castShadow = true;

};


