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

    var leaf = this.mob.game.getCloseEntity("leaf", this.mob.position, 10);

    if (leaf) {

        this.mob.leafId = leaf.id;
        return "seeking";

    }

    var spider = this.mob.game.getCloseEntity("spider", this.mob.position, 10);

    if (spider) {

        if (this.mob.position.getDistanceTo(spider.position) < 100) {

            this.mob.spiderId = spider.id;
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

var MobStateSeeking = function( mob ) {

    State.call(this, "seeking");
    this.mob = mob;
    this.leafId = undefined;

};

MobStateSeeking.prototype = new State();
MobStateSeeking.prototype.constructor = MobStateSeeking;


MobStateSeeking.prototype.checkConditions = function () {

    var leaf = this.mob.game.getEntity(this.mob.leafId);

    if (!leaf) {

        return "exploring";

    }

    if (this.mob.position.getDistanceTo(leaf.position) < 5) {

        this.mob.carry(leaf);
        this.mob.game.removeEntity(leaf);
        return "delivering";

    }

    return "seeking";
};


MobStateSeeking.prototype.entryActions = function () {

    var leaf = this.mob.game.getEntity(this.mob.leafId);

    if (leaf) {

        this.mob.destination = leaf.position;
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

    var nestPosition = new THREE.Vector3(NEST_POSITION[0], 5, NEST_POSITION[1]);

    if (nestPosition.getDistanceTo(this.mob.position) < NEST_SIZE) {

        if (roll(10) === 1) {

            this.mob.drop();
            return "exploring";

        }

    }

};


MobStateDelivering.prototype.entryActions = function () {

    this.mob.speed = 60;
    var randomOffset = new THREE.Vector3(rndInt(20), 5, rndInt(20));
    this.mob.destination = new THREE.Vector3(NEST_POSITION[0], 5, NEST_POSITION[1]).add(randomOffset);

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

    this.mob.destination = spider.position;

    if (this.mob.position.getDistanceTo(spider.position) < 15) {

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

    if (spider.position.getDistanceTo([NEST_POSITION[0], NEST_POSITION[1]]) > NEST_SIZE * 3) {

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