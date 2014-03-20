
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

        for (var i = 0; i < 1; i++) {
            var rndPoint = new THREE.Vector3(rndInt(1100), 100, rndInt(1100));
            var collision = MiniRPG.place(rndPoint);
            var mine = new Mine(MiniRPG);
            MiniRPG.addEntity(mine);
            mine.pos = collision;
            mine.pos.y += 10;
        }

        for (var i = 0; i < 1; i++) {
            var rndPoint = new THREE.Vector3(rndInt(1100), 100, rndInt(1100));
            var collision = MiniRPG.place(rndPoint);
            var village = new Village(MiniRPG);
            MiniRPG.addEntity(village);
            village.pos = collision;
            village.pos.y += 20;
        }
    });
};