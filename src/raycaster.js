
var mouse = new THREE.Vector2();

var enableCast = false;

function enableCasting(enable) {
    enableCast = enable;
}

function initRayCast(scene, camera) {
    function onMouseMove( event ) {
        mouse.x = ( event.clientX / document.documentElement.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / document.documentElement.clientWidth ) * 2 + 1;

        if (enableCast) {
            performRayCast(scene, camera);
        }
    }

    window.addEventListener( 'click', onMouseMove, false );
}

function performRayCast(scene, camera) {
    let raycaster = new THREE.Raycaster();
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );

    // calculate objects intersecting the picking ray
    let intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        highlightObject(scene, intersects[0].object);
    }
}