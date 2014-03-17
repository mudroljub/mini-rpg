var RabbitStateExploring = function( mob ) {

    State.call(this, "exploring");
    this.mob = mob;

};

RabbitStateExploring.prototype = new State();
RabbitStateExploring.prototype.constructor = RabbitStateExploring;


RabbitStateExploring.prototype.randomDestination = function () {

    this.mob.destination = new THREE.Vector3(rndInt(1000), 0, rndInt(1000));

};


RabbitStateExploring.prototype.doActions = function () {

    if (roll(20) === 1) {

        this.randomDestination();

    }
};


RabbitStateExploring.prototype.checkConditions = function () {

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

RabbitStateExploring.prototype.entryActions = function () {

    if (this.mob) {

        this.mob.speed = 120 + rndInt(30);
        this.randomDestination();

    }

};