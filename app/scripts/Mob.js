function Mob(game) {
    this.name = 'mob';
    Entity.call(this, game);
    this.pos = new THREE.Vector3(rndInt(1100), 100, rndInt(1100));
    this.destination = this.pos.clone();
    this.target = null;
    this.speed = 40;
    this.log = false;
    this.fps = false;
    this.state = this.game.machine.generate(mobJson, this, Mob.states);
    this.carryEntity = undefined;
    this.shootCooldown = 5;
    this.vision = 50;
}


Mob.prototype = new Entity();
Mob.prototype.constructor = Mob;


Mob.prototype.update = function () {
    var collision = this.game.place(this.pos);
    this.pos.y = collision.y + 1.5;
    this.shootCooldown--;

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
    var material = new THREE.MeshLambertMaterial({ color: 0xecc2a7, shading: THREE.SmoothShading });
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
    if (this.carryEntity) {
        this.carryEntity.pos = new THREE.Vector3(this.pos.x, 0, this.pos.z);
        this.carryEntity = undefined;
    }
};


Mob.prototype.shoot = function(destination) {
    if (this.shootCooldown <= 0) {
        this.game.addEntity(
            new Arrow(
                this.game,
                {
                    pos: this.pos.clone(),
                    destination: destination,
                    lifeSpan: 300,
                    speed: 600,
                    offset: 10
                }
            )
        );
        this.shootCooldown = 5;
    }
};


var mobJson = {
    id: "idle", strategy: "prioritised",
    children: [
        { id: "explore", strategy: "sequential",
            children: [
                { id: "getRandomDestination" },
                { id: "hunt", strategy: "sequential",
                    children: [
                        { id: "checkRangeAnimals" },
                        { id: "shootTarget" },
                        { id: "deliverKill" },
                        { id: "dropKill"}
                    ]
                }
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
        return Math.random() > 0.99 && !this.carryEntity;
    },
    canHunt: function() {
        return Math.random() > 0.5 && !this.carryEntity;
    },
    checkRangeAnimals: function() {
        var rabbit = this.game.getCloseEntity("rabbit", this.pos, 100);
        if (rabbit) {
            this.target = rabbit;
        }
    },
    shootTarget: function() {
        this.shoot(this.target.pos.clone());
        if (roll(5) === 1) {
            this.target.attacked();
        }
    },
    canShootTarget: function() {
        return this.target != undefined;
    },
    deliverKill: function() {
        this.carry(this.target);
        this.target = undefined;
        this.destination = this.game.getCloseEntity("village", this.pos, 2000).pos.clone();
    },
    canDeliverKill: function() {
        return this.target && this.target.health === 0;
    },
    dropKill: function() {
        this.drop();
    },
    canDropKill: function() {
        var village = this.game.getCloseEntity("village", this.pos, 1500);
        return village && village.pos.distanceTo(this.pos) < 50;
    }
};