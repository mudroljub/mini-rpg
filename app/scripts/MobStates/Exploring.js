/**
 * Mob exploring the map.
 * @param mob
 * @constructor
 */
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