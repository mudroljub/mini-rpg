var IMAGES = [];
var MESHES = ['tree', 'mine', 'cloud', 'village'];
var ITEMS = ['tree', 'mine', 'cloud', 'village'];

function AssetManager() {
    this.TEXTURES  = {};
    this.MATERIALS = {};
    this.MESHES    = {};
    this.ITEMS     = {};
}


AssetManager.prototype.loadMaterials = function (callback) {
    for (var i = 0; i < IMAGES.length; i++) {
        var texture = THREE.ImageUtils.loadTexture('assets/textures/' + IMAGES[i] + '.jpg');
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.LinearMipMapLinearFilter;
        this.TEXTURES[IMAGES[i]] = texture;
        this.MATERIALS[IMAGES[i]] = new THREE.MeshLambertMaterial({map: texture });
        this.MATERIALS[IMAGES[i]].dynamic = true;
    }
    return callback();
};


AssetManager.prototype.loadMeshes = function (meshes, callback) {
    var i = 0;
    meshes.forEach(function (mesh) {
        loader.load('assets/' + mesh + '.json', function (geometry, materials) {
            var material = new THREE.MeshFaceMaterial(materials);
            objects[mesh] = new THREE.Mesh(geometry, material);
            i++;
            if (i === meshes.length) {
                callback(objects);
            }
        });
    });
};
