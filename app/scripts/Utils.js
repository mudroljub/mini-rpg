Array.max = function (array) {

    return Math.max.apply(Math, array);

};


Array.min = function (array) {

    return Math.min.apply(Math, array);

};


/**
 * roll a random positive integer <= n
 * @param n
 * @returns {number}
 */
function roll(n) {

    return Math.random() * n | 0;

}


/**
 * roll a random integer between -n and n
 * @param n
 * @returns {number}
 */
function rndInt(n) {

    return (Math.random() * n | 0) - n / 2;

}


THREE.Vector3.getDistanceTo = function(p) {

    var xx, yy, dx, dy, x, y;
    var that = this;

    if (typeof p.length === "undefined") {

        xx = p.x;
        yy = p.y;

    } else {

        xx = p[0];
        yy = p[1];

    }

    x = that.x;
    y = that.y;
    dx = xx - x;
    dy = yy - y;

    return Math.sqrt(dx * dx + dy * dy);

};