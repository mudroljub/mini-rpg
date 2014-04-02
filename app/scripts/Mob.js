function Mob(game) {

    this.name = 'mob';
    Entity.call(this, game, 0xecc2a7);
    this.pos = new THREE.Vector3(rndInt(128) * 5, 100, rndInt(128) * 5);
    this.destination = this.pos.clone();
    this.target = null;
    this.speed = 40;
    this.log = false;
    this.fps = false;
    this.state = this.game.machine.generate(mobJson, this, Mob.states)

    this.carryEntity = undefined;

}


Mob.prototype = new Entity();
Mob.prototype.constructor = Mob;


Mob.prototype.update = function () {

    var collision = this.game.place(this.pos);
    this.pos.y = collision.y + 1.5; //Math.sin((Math.PI * (Date.now() / 10) / 20)) + 5;
    this.state = this.state.tick();


    // Mob is carrying a resource.
    if (this.carryEntity) {
        this.carryEntity.pos.x = this.pos.x - 4;
        this.carryEntity.pos.y = this.pos.y;
        this.carryEntity.pos.z = this.pos.z - 4;
    }

    Entity.prototype.update.call(this);

    if (this.fps) {
        this.game.cameraFPS.lookAt(this.destination);
    }
};


Mob.prototype.create = function () {

    var geometry = new THREE.BoxGeometry(5, 10, 5);
    var material = new THREE.MeshLambertMaterial({ color: this.color, shading: THREE.SmoothShading });
    this.mesh = new THREE.Mesh(geometry, material);
    for (var i = 0; i < this.mesh.geometry.vertices.length; i++) {
        this.mesh.geometry.vertices[i].y += 5;
    }
    this.mesh.castShadow = true;
    this.mesh.name = this.name;

};


Mob.prototype.carry = function ( entity ) {
    if (entity.name !== 'rabbit') {
        if (entity.units > 0) {

            entity.units -= 1;
            var resource = new Resource(this.game, entity.name, this.pos.clone());
            this.game.addEntity(resource);
            this.carryEntity = resource;

        }
    } else {
        this.carryEntity = entity;
    }
};


Mob.prototype.drop = function () {
    var x, y, z;

    if (this.carryEntity) {

        x = this.pos.x;
        z = this.pos.z;
        this.carryEntity.pos = new THREE.Vector3(x, 0, z);
        this.carryEntity = undefined;

    }
};

var mobJson = {
    id: "idle", strategy: "prioritised",
    children: [
        { id: "explore", strategy: "sequential",
            children: [
                {id: "getRandomDestination"},
            ]
        }
    ]
};


Mob.states = {
    idle: function() { console.log('idle'); },
    getRandomDestination: function() {
        var rndPoint = new THREE.Vector3(rndInt(1100), 10, rndInt(1100));
        var collision = this.game.place(rndPoint);
        if (collision.y > 5) {
            this.destination = collision;
        }
    },
    canExplore: function() {
        return Math.random() > 0.99;
    },
    sleep: function() {}
};
