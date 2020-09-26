
function initRenderer(additionalProperties) {
    var props = (typeof additionalProperties !== 'undefined' && additionalProperties) ? additionalProperties : {};
    var renderer = new THREE.WebGLRenderer(props);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    return renderer;
}

function initCamera(initialPosition) {
    var position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(-30, 40, 30);

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.copy(position);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    return camera;
}

function addGroundPlane(scene) {
    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(60, 60, 120, 120);
    var planeMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    scene.add(plane);

    return plane;
}

function addPlaneAndLights(scene) {
    let planeGeometry = new THREE.PlaneGeometry(1000, 1000, 20, 20);
    let planeMaterial = new THREE.MeshLambertMaterial();
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    plane.name = "ground";

    addLights(plane, scene);

    // add the plane to the scene
    scene.add(plane);
}

function addLights(plane, scene) {
    // add spotlight for a bit of light
    let spotLight0 = new THREE.SpotLight(0xcccccc);
    spotLight0.position.set(-40, 60, -10);
    spotLight0.lookAt(plane);
    scene.add(spotLight0);

    let target = new THREE.Object3D();
    target.position = new THREE.Vector3(5, 0, 0);

    let hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6);
    hemiLight.position.set(0, 500, 0);
    scene.add(hemiLight);

    let pointColor = "#ffffff";
    let dirLight = new THREE.DirectionalLight(pointColor);
    dirLight.position.set(30, 10, 50);
    dirLight.castShadow = true;
    dirLight.target = plane;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 200;
    dirLight.shadow.camera.left = -50;
    dirLight.shadow.camera.right = 50;
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.camera.bottom = -50;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);
}

function initTrackballControls(camera, renderer) {
    console.log("initTrackballControls");

    var trackballControls = new THREE.TrackballControls(camera, renderer.domElement);
    trackballControls.rotateSpeed = 1.0;
    trackballControls.zoomSpeed = 1.2;
    trackballControls.panSpeed = 0.8;
    trackballControls.noZoom = false;
    trackballControls.noPan = false;
    trackballControls.staticMoving = true;
    trackballControls.dynamicDampingFactor = 0.3;
    trackballControls.keys = [65, 83, 68];

    return trackballControls;
}

function removeObject(scene, name) {
    var selectedObject = scene.getObjectByName(name);
    scene.remove( selectedObject );
}