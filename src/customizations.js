
function replaceCouch(scene) {
    let topFloor = scene.children.filter(c => c.name === "first_floor--first_floor")[0];
    topFloor.visible = false;
    let couch = scene.children.filter(c => c.name === "couch")[0];
    couch.visible = false;

    let secondCouch = scene.children.filter(c => c.name === "second-couch");
    if (secondCouch.length > 0) {
        secondCouch[0].visible = true;
        return;
    }

    var loader = new THREE.GLTFLoader();
    loader.load('../models/second-couch.gltf',
        ( gltf ) => {
            let secondCouch = gltf.scene.children[0];
            secondCouch.position.x = couch.position.x;
            secondCouch.position.y = couch.position.y;
            secondCouch.position.z = couch.position.z;

            scene.add(secondCouch);
        },
        ( xhr ) => console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ),
        ( error ) => console.log( 'Error: ' + error )
    );
}

function switchToOriginalCouch(scene) {
    let couch = scene.children.filter(c => c.name === "couch")[0];
    couch.visible = true;

    let secondCouch = scene.children.filter(c => c.name === "second-couch");
    if (secondCouch.length > 0) {
      secondCouch[0].visible = false;
    }
}