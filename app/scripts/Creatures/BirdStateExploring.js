var BirdStateExploring = function( mob ) {

    State.call(this, "exploring");
    this.mob = mob;

};

BirdStateExploring.prototype = new State();
BirdStateExploring.prototype.constructor = BirdStateExploring;


BirdStateExploring.prototype.randomDestination = function () {
        var rndPoint = new THREE.Vector3(rndInt(2400), roll(150), rndInt(2400));
        this.mob.destination = rndPoint;
};


BirdStateExploring.prototype.doActions = function () {

    if (roll(20) === 1) {

        this.randomDestination();

    }
};


BirdStateExploring.prototype.checkConditions = function () {

//    var tree = this.mob.game.getCloseEntity("tree", this.mob.pos, 100);
//
//    if (tree) {
//
//        this.mob.treeId = tree.id;
//        return "seeking";
//
//    }

    return;

};

BirdStateExploring.prototype.entryActions = function () {

    if (this.mob) {

        this.mob.speed = 120 + rndInt(30);
        this.randomDestination();

    }

};