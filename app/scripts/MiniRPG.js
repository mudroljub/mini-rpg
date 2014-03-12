
var MiniRPG = new GameEngine();
var loader = new THREE.JSONLoader();
var objects   = {};


window.onload = function() {
    assets = new AssetManager();
    assets.loadMeshes(MESHES, function() {
        MiniRPG.init();
        MiniRPG.start();
    });
}