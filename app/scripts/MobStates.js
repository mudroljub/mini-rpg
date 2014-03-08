var MobStateExploring = function( mob ) {

    State.call(this, "exploring");
    this.mob = mob;

};

MobStateExploring.prototype = new State();
MobStateExploring.prototype.constructor = MobStateExploring;


MobStateExploring.prototype.randomDestination = function () {

    this.mob.destination = new THREE.Vector3(rndInt(128), 5, rndInt(128));

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

//    var spider = this.mob.game.getCloseEntity("spider", this.mob.pos, 10);
//
//    if (spider) {
//
//        if (this.mob.pos.distanceTo(spider.pos) < 100) {
//
//            this.mob.spiderId = spider.id;
//            return "hunting";
//
//        }
//
//    }

    return;

};

MobStateExploring.prototype.entryActions = function () {

    if (this.mob) {

        this.mob.speed = 120 + rndInt(30);
        this.randomDestination();

    }

};

var MobStateSeeking = function( mob ) {

    State.call(this, "seeking");
    this.mob = mob;
    this.treeId = undefined;

};

MobStateSeeking.prototype = new State();
MobStateSeeking.prototype.constructor = MobStateSeeking;


MobStateSeeking.prototype.checkConditions = function () {

    var tree = this.mob.game.getEntity(this.mob.treeId);

    if (!tree) {

        return "exploring";

    }

    if (this.mob.pos.distanceTo(tree.pos) < 10) {

        this.mob.carry(tree);
        this.mob.game.removeEntity(tree);
        return "delivering";

    }

    return "seeking";
};


MobStateSeeking.prototype.entryActions = function () {

    var tree = this.mob.game.getEntity(this.mob.treeId);

    if (tree) {

        this.mob.destination = tree.pos.clone();
        this.mob.speed = 120 + rndInt(20);

    }

};


var MobStateDelivering = function( mob ) {

    State.call(this, "delivering");
    this.mob = mob;

};

MobStateDelivering.prototype = new State();
MobStateDelivering.prototype.constructor = MobStateDelivering;


MobStateDelivering.prototype.checkConditions = function () {

    var nestPosition = new THREE.Vector3(0, 5, 0);

    if (nestPosition.distanceTo(this.mob.pos) < 10) {

        if (roll(10) === 1) {

            this.mob.drop();
            return "exploring";

        }

    }

};


MobStateDelivering.prototype.entryActions = function () {

    this.mob.speed = 60;
    var randomOffset = new THREE.Vector3(rndInt(20), 5, rndInt(20));
    this.mob.destination = new THREE.Vector3(0, 5, 0).add(randomOffset);

};


var MobStateHunting = function( mob ) {

    State.call(this, "hunting");
    this.mob = mob;
    this.gotKill = false;

};

MobStateHunting.prototype = new State();
MobStateHunting.prototype.constructor = MobStateHunting;


MobStateHunting.prototype.doActions = function () {

    var spider = this.mob.game.getEntity(this.mob.spiderId);

    if (!spider) {

        return;

    }

    this.mob.destination = spider.pos;

    if (this.mob.pos.distanceTo(spider.pos) < 15) {

        if (roll(5) === 1) {

            spider.bitten();

            if (spider.health <= 0) {

                this.mob.carry(spider);
                this.mob.game.removeEntity(spider);
                this.gotKill = true;

            }

        }

    }

};


MobStateHunting.prototype.checkConditions = function () {

    if (this.gotKill) {

        return "delivering";

    }

    spider = this.mob.game.getEntity(this.mob.spiderId);

    if (!spider) {

        return "exploring";

    }

    if (spider.pos.distanceTo(new THREE.Vector3(0, 0, 0)) > 10 * 3) {

        return "exploring";

    }

    return;

};


MobStateHunting.prototype.entryActions = function () {

    this.speed = 10 + roll(50);

};


MobStateHunting.prototype.exitActions = function () {

    this.gotKill = false;

};