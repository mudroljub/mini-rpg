/**
 * Mob returns resources to village.
 *
 * @param mob
 * @constructor
 */
var MobStateDelivering = function( mob ) {

    State.call(this, "delivering");
    this.mob = mob;

};


MobStateDelivering.prototype = new State();
MobStateDelivering.prototype.constructor = MobStateDelivering;


MobStateDelivering.prototype.checkConditions = function () {

    var village = this.mob.game.getCloseEntity("village", this.mob.pos, 1500);

    if (village.pos.distanceTo(this.mob.pos) < 50) {

        if (roll(10) === 1) {

            this.mob.drop();
            return "exploring";

        }

    }

};


MobStateDelivering.prototype.entryActions = function () {

    var village = this.mob.game.getCloseEntity("village", this.mob.pos, 1500);
    var randomOffset = new THREE.Vector3(rndInt(10), 5, rndInt(10));

    this.mob.speed = 60;
    this.mob.destination = village.pos.clone().add(randomOffset);

};
