/**
 * Mob is going to a target.
 * @param mob
 * @constructor
 */
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
        if (tree.units === 0) {

            this.mob.game.removeEntity(tree);

        }

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