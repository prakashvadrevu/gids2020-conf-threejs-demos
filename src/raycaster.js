
var mouse = new THREE.Vector2();

var enableCast = false;

var cameraForRayCasting;

function enableCasting(enable, camera) {
    cameraForRayCasting = camera;
    enableCast = enable;
}

function initRayCast(scene) {
    function onMouseMove( event ) {
        mouse.x = ( event.clientX / document.documentElement.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / document.documentElement.clientWidth ) * 2 + 1;

        if (enableCast) {
            performRayCast(scene);
        }
    }

    window.addEventListener( 'click', onMouseMove, false );
}

function performRayCast(scene) {
    let raycaster = new THREE.Raycaster();
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, cameraForRayCasting );

    // drawLine(scene, raycaster);

    // calculate objects intersecting the picking ray
    let intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        highlightObject(scene, intersects[0].object);
    }
}

// For debugging
function drawLine(scene, raycaster) {
    var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    var points = [];
    points.push( raycaster.ray.origin );
    points.push( raycaster.ray.direction );

    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var line = new THREE.Line( geometry, material );
    line.position
    scene.add( line );
  }