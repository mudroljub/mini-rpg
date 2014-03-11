var camera, scene, renderer, geometry, material, mesh1, mesh2, mesh;

init();
animate();



function init() {
    var tree = {

        "metadata" :
        {
            "formatVersion" : 3.1,
            "sourceFile"    : "tree.obj",
            "generatedBy"   : "OBJConverter",
            "vertices"      : 24,
            "faces"         : 18,
            "normals"       : 0,
            "colors"        : 0,
            "uvs"           : 0,
            "materials"     : 1
        },

        "scale" : 1.000000,

        "materials": [	{
            "DbgColor" : 15658734,
            "DbgIndex" : 0,
            "DbgName" : "Material",
            "colorAmbient" : [0.0, 0.0, 0.0],
            "colorDiffuse" : [0.64, 0.64, 0.64],
            "colorSpecular" : [0.5, 0.5, 0.5],
            "illumination" : 2,
            "opticalDensity" : 1.0,
            "specularCoef" : 96.078431,
            "transparency" : 1.0
        }],

        "vertices": [1.000000,-1.000000,-1.000000,1.000000,-1.000000,1.000000,-1.000000,-1.000000,1.000000,-1.000000,-1.000000,-1.000000,0.590806,-0.802478,-0.590806,0.590806,-0.802478,0.590807,-0.590806,-0.802478,0.590806,-0.590806,-0.802478,-0.590806,0.406036,0.737103,-0.406036,0.406036,0.737103,0.406036,-0.406036,0.737103,0.406036,-0.406036,0.737103,-0.406036,0.406036,-0.810673,-0.406036,0.406036,-0.810673,0.406036,-0.406036,-0.810673,0.406036,-0.406036,-0.810673,-0.406036,-0.703524,0.091037,0.703524,-0.703524,0.091037,-0.703524,0.703524,0.091037,-0.703524,0.703524,0.091037,0.703524,-0.703524,1.498086,0.703524,-0.703524,1.498086,-0.703524,0.703524,1.498086,-0.703524,0.703524,1.498086,0.703524],

        "morphTargets": [],

        "morphColors": [],

        "normals": [],

        "colors": [],

        "uvs": [[]],

        "faces": [3,0,1,2,3,0,3,4,7,6,5,0,3,0,4,5,1,0,3,1,5,6,2,0,3,2,6,7,3,0,3,4,0,3,7,0,3,12,8,9,13,0,3,13,9,10,14,0,3,14,10,11,15,0,3,15,11,8,12,0,3,8,9,10,11,0,3,15,14,13,12,0,3,20,21,17,16,0,3,21,22,18,17,0,3,22,23,19,18,0,3,23,20,16,19,0,3,16,17,18,19,0,3,23,22,21,20,0]

    };

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 500;
    scene.add(camera);

    geometry = new THREE.CubeGeometry(200, 200, 200);
    material = new THREE.MeshNormalMaterial();

    var loader = new THREE.JSONLoader();
    var tree_obj = loader.parse(tree, null);
    var tree_materials = tree_obj.materials;
    var tree_face_materials = new THREE.MeshFaceMaterial(tree_materials);
    var tree_geo = tree_obj.geometry;
    var tree_mesh = new THREE.Mesh(tree_geo, tree_face_materials);
    tree_mesh.scale.x = tree_mesh.scale.y = tree_mesh.scale.z = 100;

    mesh2 = new THREE.Mesh(geometry, material);
    mesh2.position.y = 200;
    console.log(tree_obj);
    //scene.add(tree_mesh);
    //scene.add(mesh2);

    materials = [];

    THREE.GeometryUtils.setMaterialIndex(tree_mesh.geometry, 0);
    THREE.GeometryUtils.setMaterialIndex(mesh2.geometry, 1);
    materials.push(tree_obj.materials[0]);
    materials.push(material);
    var new_geo = new THREE.Geometry();
    THREE.GeometryUtils.merge(new_geo, tree_mesh);
    THREE.GeometryUtils.merge(new_geo, mesh2);
    mesh = new THREE.Mesh(new_geo, new THREE.MeshFaceMaterial(materials));

    scene.add(mesh);

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

}

function animate() {

    requestAnimationFrame(animate);
    render();

}

function render() {

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;


    renderer.render(scene, camera);
}