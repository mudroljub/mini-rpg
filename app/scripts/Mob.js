function Mob(game) {

    this.type = 'mob';
    Entity.call(this, game, 0xecc2a7);
    this.pos = new THREE.Vector3(rndInt(128) * 5, 5, rndInt(128) * 5);
    this.destination = this.pos.clone();
    this.target = null;
    this.speed = 40;

}


Mob.prototype = new Entity();
Mob.prototype.constructor = Mob;


Mob.prototype.update = function () {

    var deltaX, deltaY, deltaZ, vecToDestination,
        distanceToDestination, heading, travelDistance,
        oldPos, newPos, distance;

    if (this.target) {

        this.destination = this.target.pos.clone();

    } else {

        distance = this.destination.clone().sub(this.pos).length();

        if (distance < 20) {

            this.destination = new THREE.Vector3(rndInt(200), 18, rndInt(200))

        }
    }

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

    Entity.prototype.update.call(this);

};


Mob.prototype.create = function () {

    var geometry = new THREE.BoxGeometry(5, 5, 5);
    this.solidMat = new THREE.MeshLambertMaterial({ color: this.color, shading: THREE.SmoothShading });
    this.mesh = new THREE.Mesh(geometry, this.solidMat);
    this.mesh.castShadow = true;

};


