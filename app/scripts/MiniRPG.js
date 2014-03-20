
var MiniRPG = new GameEngine();
var loader = new THREE.JSONLoader();
var objects   = {};




window.onload = function () {
    var assets = new AssetManager();
    assets.loadMeshes(MESHES, function () {
        MiniRPG.init();
        MiniRPG.start();
        MiniRPG.plantTrees();

        for (var i = 0; i < 20; i++) {
            mob = new Mob(MiniRPG);
            mob.brain.setState("exploring");
            MiniRPG.addEntity(mob);
        }
    });
};