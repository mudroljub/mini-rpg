function Level(data) {
    this.size = data.size || 64;
    this.tile_size = data.tile_size || 16;
}

Level.prototype.constructor = Level;

Level.prototype.generate = function() {
    var x, y;

    for (y = 0; y < this.size; y++) {
        for (x = 0; x < this.size; x++) {
            // build tiles
        }
    }
}