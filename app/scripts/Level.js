function Level(data) {
    this.size = data.size || 64;
    this.tile  = { width: 16, depth: 16 };
}

Level.prototype.constructor = Level;

Level.prototype.generate = function() {
    var offsetX = -(this.size * this.tile.width) / 2;
    var offsetY = -(this.size * this.tile.width) / 2;
    var x, y, floor;
    var _floor = new THREE.PlaneGeometry(this.tile.width, this.tile.depth);
    var floor_geometry = new THREE.Geometry();
    var material = new THREE.MeshLambertMaterial({ color: 0x2d3250, shading: THREE.FlatShading });
    var offsetXX = 0;
    var offsetYY = 0;

    for (y = 0; y < this.size; y++) {
        for (x = 0; x < this.size; x++) {
            // build tiles
            offsetXX = offsetX + (x * this.tile.width);
            offsetYY = offsetY + (y * this.tile.width);
            floor = new THREE.Mesh(_floor, material);
            floor.rotation.x = -Math.PI / 2;
            floor.position.set(offsetXX, -1, offsetYY);
            THREE.GeometryUtils.merge(floor_geometry, floor);

            floor = new THREE.Mesh(floor_geometry, material);
            floor.receiveShadow = true;
            floor.castShadow = false;
        }
    }

    return floor;
}