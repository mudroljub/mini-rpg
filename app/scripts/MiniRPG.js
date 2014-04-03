var MiniRPG = new GameEngine();
var loader = new THREE.JSONLoader();
var objects   = {};

var TREES = 50;
var BIRDS = 5;
var RABBITS = 5;
var CLOUDS = 10;
var MOBS = 5;


window.onload = function () {
    var assets = new AssetManager();
    assets.loadMeshes(MESHES, function () {
        MiniRPG.init();
        MiniRPG.start();
        MiniRPG.plantTrees();

        for (var i = 0; i < MOBS; i++) {
            MiniRPG.addEntity(new Mob(MiniRPG));
        }

        for (var i = 0; i < 1; i++) {
            var rndPoint = new THREE.Vector3(rndInt(1100), 100, rndInt(1100));
            var collision = MiniRPG.place(rndPoint);
            collision.y += 10;
            MiniRPG.addEntity(new Mine(MiniRPG, {pos: collision}));

            var rndPoint = new THREE.Vector3(rndInt(1100), 100, rndInt(1100));
            var collision = MiniRPG.place(rndPoint);
            collision.y += 20;
            MiniRPG.addEntity(new Village(MiniRPG, {pos: collision}));
        }
    });
};