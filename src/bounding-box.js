
var hex  = 0xff0000;

function highlightObject(scene, object) {
    if (object instanceof THREE.Mesh) {
        highlight(scene, object);

    } else {
        object.children.map(o => highlightObject(scene, object));

    }
}

function highlight(scene, mesh) {
    let name = "bounding-box_" + mesh.name;
    let existingChild = scene.children.filter(c => c.name === name);
    if (existingChild.length > 0) {
        removeObject(scene, name);
    } else {
        let bbox = new THREE.BoundingBoxHelper( mesh, hex);
        bbox.name = name;
        bbox.position.x = mesh.position.x;
        bbox.position.y = mesh.position.y;
        bbox.position.z = mesh.position.z;
        bbox.update();
        scene.add( bbox );
    }
}