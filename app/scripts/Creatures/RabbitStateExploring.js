var RabbitStateExploring = function( mob ) {

    State.call(this, "exploring");
    this.mob = mob;

};

RabbitStateExploring.prototype = new State();
RabbitStateExploring.prototype.constructor = RabbitStateExploring;


RabbitStateExploring.prototype.randomDestination = function () {
    while (1) {
        var rndPoint = new THREE.Vector3(rndInt(1100), 10, rndInt(1100));
        var collision = this.mob.game.place(rndPoint);
        if (collision.y > 5) {
            this.mob.destination = collision;
            break;
        }
    }

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