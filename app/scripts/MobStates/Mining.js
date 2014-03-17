var MobStateMining = function( mob ) {

    State.call(this, "mining");
    this.mob = mob;
    this.mineId = undefined;

};

MobStateMining.prototype = new State();
MobStateMining.prototype.constructor = MobStateMining;


MobStateMining.prototype.checkConditions = function () {

    var mine = this.mob.game.getEntity(this.mob.mineId);

    if (!mine || mine.units < 1) {

        return "exploring";

    }

    if (this.mob.pos.distanceTo(mine.pos) < 10) {

        this.mob.carry(mine);
        if (mine.units === 0) {
            this.mob.game.removeEntity(mine);
        }
        return "delivering";

    }

    return "seeking";
};


MobStateMining.prototype.entryActions = function () {

    var mine = this.mob.game.getEntity(this.mob.mineId);

    if (mine && mine.units > 0) {

        this.mob.destination = mine.pos.clone();
        this.mob.speed = 120 + rndInt(20);

    } else {
        return "exploring";
    }

};