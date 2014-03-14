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


Resource.prototype.update = function() {

    Entity.prototype.update.call(this);

};


Resource.prototype.create = function() {

    var geometry;
    geometry = new THREE.BoxGeometry(4, 4, 4);
    this.solidMat = new THREE.MeshLambertMaterial({ color: this.color, shading: THREE.SmoothShading });
    this.mesh = new THREE.Mesh(geometry, this.solidMat);
    this.mesh.castShadow = true;

};


