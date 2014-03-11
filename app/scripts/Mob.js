function Mob(game) {

    this.name = 'mob';
    Entity.call(this, game, 0xecc2a7);
    this.pos = new THREE.Vector3(rndInt(128) * 5, 5, rndInt(128) * 5);
    this.destination = this.pos.clone();
    this.target = null;
    this.speed = 40;
    this.brain = new StateMachine();

    this.exploringState  = new MobStateExploring(this);
    this.seekingState    = new MobStateSeeking(this);
    this.deliveringState = new MobStateDelivering(this);
    this.huntingState    = new MobStateHunting(this);

    this.brain.addState(this.exploringState);
    this.brain.addState(this.seekingState);
    this.brain.addState(this.deliveringState);
    this.brain.addState(this.huntingState);

    this.carryEntity = undefined;

}


Mob.prototype = new Entity();
Mob.prototype.constructor = Mob;


Mob.prototype.update = function () {

    var deltaX, deltaY, deltaZ, vecToDestination,
        distanceToDestination, heading, travelDistance,
        oldPos, newPos, distance;

    this.brain.think();

    // rotation to target location
    deltaX = this.destination.x - this.pos.x;
    deltaY = this.destination.y - this.pos.y;
    deltaZ = this.destination.z - this.pos.z;

    vecToDestination = this.destination.clone().sub(this.pos);
    distanceToDestination = vecToDestination.length();
    heading = vecToDestination.normalize();
    travelDistance = Array.min([distanceToDestination, (this.game.delta * this.speed)]);
    oldPos = this.pos;
    newPos = oldPos.add(heading.multiplyScalar(travelDistance));

    this.pos.x = newPos.x;
    this.pos.z = newPos.z;
    this.pos.y = Math.sin((Math.PI * (Date.now() / 10) / 20));

    this.rotation.y = (Math.atan2(deltaX, deltaZ));



    if (this.carryEntity) {
        this.carryEntity.pos.x = this.pos.x + 10;
        this.carryEntity.pos.y = this.pos.y;
        this.carryEntity.pos.z = this.pos.z;
    }

    Entity.prototype.update.call(this);

};


Mob.prototype.create = function () {

    var geometry = new THREE.BoxGeometry(5, 5, 5);
    this.solidMat = new THREE.MeshLambertMaterial({ color: this.color, shading: THREE.SmoothShading });
    this.mesh = new THREE.Mesh(geometry, this.solidMat);
    this.mesh.castShadow = true;

};


Mob.prototype.carry = function ( entity ) {

    this.carryEntity = entity;

};


Mob.prototype.drop = function ( entity ) {
    var x, y;
    if (this.carryEntity) {
        x = this.pos.x;
        y = this.pos.y;
        this.carryEntity.pos = new THREE.Vector3(x , 5, y);
        this.carryEntity = undefined;
    }
}
