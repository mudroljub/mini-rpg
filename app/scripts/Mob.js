function Mob(game) {

    this.name = 'mob';
    Entity.call(this, game, 0xecc2a7);
    this.pos = new THREE.Vector3(rndInt(128) * 5, 5, rndInt(128) * 5);
    this.destination = this.pos.clone();
    this.target = null;
    this.speed = 40;

    // setup the brain for the mob
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
        oldPos, newPos;

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

    // Mob is carrying a resource.
    if (this.carryEntity) {
        this.carryEntity.pos.x = this.pos.x - 4;
        this.carryEntity.pos.y = this.pos.y;
        this.carryEntity.pos.z = this.pos.z - 4;
    }

    Entity.prototype.update.call(this);

};


Mob.prototype.create = function () {

    var geometry = new THREE.BoxGeometry(5, 10, 5);
    var material = new THREE.MeshLambertMaterial({ color: this.color, shading: THREE.SmoothShading });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;

};


Mob.prototype.carry = function ( entity ) {
    if (entity.units > 0) {

        entity.units -= 1;
        var resource = new Resource(this.game, entity.name, this.pos.clone());
        this.game.addEntity(resource);
        this.carryEntity = resource;

    }

};


Mob.prototype.drop = function () {

    var x, y, z;

    if (this.carryEntity) {

        x = this.pos.x;
        y = this.pos.y;
        z = this.pos.z;
        this.carryEntity.pos = new THREE.Vector3(x, y, z);
        this.carryEntity = undefined;

    }

};
