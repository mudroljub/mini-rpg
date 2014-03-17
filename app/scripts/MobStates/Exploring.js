var MobStateExploring = function( mob ) {

    State.call(this, "exploring");
    this.mob = mob;

};

MobStateExploring.prototype = new State();
MobStateExploring.prototype.constructor = MobStateExploring;


MobStateExploring.prototype.randomDestination = function () {

    this.mob.destination = new THREE.Vector3(rndInt(500), 0, rndInt(500));

};


MobStateExploring.prototype.doActions = function () {

    if (roll(20) === 1) {

        this.randomDestination();

    }
};


MobStateExploring.prototype.checkConditions = function () {

    var tree = this.mob.game.getCloseEntity("tree", this.mob.pos, 100);

    if (tree) {

        this.mob.treeId = tree.id;
        return "seeking";

    }

    var rabbit = this.mob.game.getCloseEntity("rabbit", this.mob.pos, 10);

    if (rabbit) {

        if (this.mob.pos.distanceTo(rabbit.pos) < 100) {

            this.mob.rabbitId = rabbit.id;
            return "hunting";

        }

    }

    return;

};

MobStateExploring.prototype.entryActions = function () {

    if (this.mob) {

        this.mob.speed = 120 + rndInt(30);
        this.randomDestination();

    }

};