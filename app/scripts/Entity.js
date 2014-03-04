function Entity(game) {
    this.game     = game;
    this.pos      = new THREE.Vector3(0, 0, 0);
    this.vel      = new THREE.Vector3(0, 0, 0);
    this.rotation = new THREE.Euler(0, 0, 0);
    this.timeMult = 1;
    this.remove   = false;
    this.shadow   = false;
    this.light = new THREE.PointLight(0xffffff, 1, 100);
    scene.add(this.light);
}

Entity.prototype.update = function () {
    this.light.position = this.pos;

    this.pos.x += this.vel.x * this.game.clockTick * this.timeMult;
    this.pos.y += this.vel.y * this.game.clockTick * this.timeMult;
    this.pos.z += this.vel.z * this.game.clockTick * this.timeMult;

    this.mesh.position = this.pos;
    this.mesh.rotation.x = this.rotation.x;
    this.mesh.rotation.y = this.rotation.y;
    this.mesh.rotation.z = this.rotation.z;

};

Entity.prototype.loadSkin = function (skin) {
    var texture = THREE.ImageUtils.loadTexture('assets/skins/' + skin + '.png');
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    this.skin = new THREE.MeshLambertMaterial({ map: texture });
};