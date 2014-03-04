var camera, scene, renderer;
var geometry, material, mesh;

var MiniRPG = new GameEngine();

window.onload = function() {
    MiniRPG.init();
    MiniRPG.start();
}