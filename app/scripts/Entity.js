function Entity(game, color) {

    this.game     = game;
    this.pos      = new THREE.Vector3(0, 0, 0);
    this.vel      = new THREE.Vector3(0, 0, 0);
    this.rotation = new THREE.Euler(0, 0, 0);
    this.timeMult = 1;
    this.remove   = false;
    this.shadow   = false;
    this.color = color ? color : 0xffffff;
    this.light = new THREE.PointLight(0xffffff, 1, 100);
    this.create();

}

Entity.prototype.constructor = Entity;

Entity.prototype.update = function () {

    this.light.position = this.pos;

    this.pos.x += this.vel.x * this.game.delta * this.timeMult;
    this.pos.y += this.vel.y * this.game.delta * this.timeMult;
    this.pos.z += this.vel.z * this.game.delta * this.timeMult;

    this.mesh.position = this.pos;
    this.mesh.rotation.x = this.rotation.x;
    this.mesh.rotation.y = this.rotation.y;
    this.mesh.rotation.z = this.rotation.z;

    //this.mesh.rotation.x += 0.01;
    //this.mesh.rotation.y += 0.02;

};


Entity.prototype.create = function () {

    var geometry;
    geometry = new THREE.BoxGeometry(10, 10, 10);
    this.solidMat = new THREE.MeshLambertMaterial({ color: this.color, shading: THREE.SmoothShading });
    this.mesh = new THREE.Mesh(geometry, this.solidMat);

};