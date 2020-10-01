
function replaceCouch(scene, couchName) {
    hideFirstFloorWindows(scene)
    const existingCouchArr = scene.children.filter(c => c.name.indexOf('couch') > -1);
    if (existingCouchArr.length > 0) {
        const existingCouch = existingCouchArr.filter(c => c.name === couchName)[0];
        console.log(existingCouch);
        if (existingCouch) {
            existingCouchArr.forEach(c => c.visible = false);
            existingCouch.visible = true;
            return;
        }
    }
    var loader = new THREE.GLTFLoader();
    loader.load(`../models/${couchName}.gltf`,
        ( gltf ) => {
            let couches = scene.children.filter(c => c.name === "couch" || c.name === 'second-couch' || c.name === 'third-couch');
            couches.forEach(couch => couch.visible = false);
            const couch = couches.filter(c => c.name === 'couch')[0];
            

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

function hideFirstFloorWindows(scene) {
    let topFloor = scene.children.filter(c => c.name === "first_floor_window--first_floor_window_0")[0];
    topFloor.visible = false;

    topFloor = scene.children.filter(c => c.name === "first_floor_window--first_floor_window_1")[0];
    topFloor.visible = false;

    topFloor = scene.children.filter(c => c.name === "first_floor_window--first_floor_window_2")[0];
    topFloor.visible = false;

    topFloor = scene.children.filter(c => c.name === "first_floor_window--first_floor_window_3")[0];
    topFloor.visible = false;
}