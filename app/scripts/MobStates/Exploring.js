var MobStateExploring = function( mob ) {

    State.call(this, "exploring");
    this.mob = mob;

};

MobStateExploring.prototype = new State();
MobStateExploring.prototype.constructor = MobStateExploring;


MobStateExploring.prototype.randomDestination = function () {

    this.mob.destination = new THREE.Vector3(rndInt(1000), 0, rndInt(1000));

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

    var rabbit = this.mob.game.getCloseEntity("rabbit", this.mob.pos, 100);

    if (rabbit) {

        if (this.mob.pos.distanceTo(rabbit.pos) < 75) {

            this.mob.rabbitId = rabbit.id;
            return "hunting";

        }

    }

    var mine = this.mob.game.getCloseEntity("mine", this.mob.pos, 100);

    if (mine) {

            this.mob.mineId = mine.id;
            return "mining";

    }

    return;

};

MobStateExploring.prototype.entryActions = function () {

    if (this.mob) {

        this.mob.speed = 120 + rndInt(30);
        this.randomDestination();

    }

};