/**
 * Mob seeking animal.
 * @param mob
 * @constructor
 */
var MobStateHunting = function( mob ) {

    State.call(this, "hunting");
    this.mob = mob;
    this.gotKill = false;

};


MobStateHunting.prototype = new State();
MobStateHunting.prototype.constructor = MobStateHunting;


MobStateHunting.prototype.doActions = function () {
    var rabbit = this.mob.game.getEntity(this.mob.rabbitId);

    if (!rabbit) {

        return;

    }

    this.mob.destination = rabbit.pos.clone();

    if (this.mob.pos.distanceTo(rabbit.pos) < 15) {

        if (roll(5) === 1) {

            rabbit.attacked();

            if (rabbit.health <= 0) {

                this.mob.carry(rabbit);
                //this.mob.game.removeEntity(rabbit);
                this.gotKill = true;

            }

        }

    }

};


MobStateHunting.prototype.checkConditions = function () {

    if (this.gotKill) {

        return "delivering";

    }

    var rabbit = this.mob.game.getEntity(this.mob.rabbitId);

    if (!rabbit) {

        return "exploring";

    }

    if (rabbit.pos.distanceTo(new THREE.Vector3(-256, 0, -256)) > 100) {

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