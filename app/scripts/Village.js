/**
 *
 * @param game
 * @constructor
 */
function Village(game) {

    this.name = 'village';
    Entity.call(this, game);

}


Village.prototype = new Entity();
Village.prototype.constructor = Village;


Village.prototype.create = function() {

    if (objects['village']) {
        objects['village'].scale.set(15, 15, 15);
        objects['village'].castShadow = true;
        this.mesh = objects['village'].clone();
        for (var i = 0; i < this.mesh.geometry.vertices.length; i++) {
            this.mesh.geometry.vertices[i].y += 1.25;
        }
    }

};


