function Bird(game) {
    this.name = 'bird';
    Entity.call(this, game, 0xff6666);
    this.pos = new THREE.Vector3(rndInt(2400), roll(150), rndInt(2400));
    this.destination = this.pos.clone();
    this.health = 5;
    this.speed = 50 + rndInt(40);
    this.state = this.game.machine.generate(birdJson, this, Bird.states)
}


Bird.prototype = new Entity();
Bird.prototype.constructor = Bird;


Bird.prototype.update = function() {
    this.state = this.state.tick();
    Entity.prototype.update.call(this);
};


Bird.prototype.create = function() {
    var geometry = new THREE.BoxGeometry(2, 2, 5);
    var material = new THREE.MeshLambertMaterial({ color: 0xff6666, shading: THREE.SmoothShading, vertexColors: THREE.FaceColors });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
};


Bird.prototype.attacked = function() {
    this.health -= 1;
    if (this.health <= 0) {
        this.speed = 0;
        this.remove = true;
    }
    this.speed = 140;
};


Bird.states = {
    idle: function() {console.log('idle')},
    getRandomDestination: function() {
        var rndPoint = new THREE.Vector3(rndInt(1100), 10, rndInt(1100));
        this.destination = rndPoint;

    },
    canExplore: function() {
        return Math.random() > 0.99;
    },
    sleep: function() {}
};


var birdJson = {
    id: "idle", strategy: "prioritised",
    children: [
        { id: "explore", strategy: "sequential",
            children: [
                {id: "getRandomDestination"},
            ]
        }
    ]
};
