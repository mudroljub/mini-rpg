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

    var spider = this.mob.game.getEntity(this.mob.spiderId);

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