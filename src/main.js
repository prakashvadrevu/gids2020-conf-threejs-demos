function init() {
    let renderer = initRenderer();
    let camera;
    let scene = new THREE.Scene();
    var clock = new THREE.Clock();
    let trackballControls;
    
    let loader = new THREE.GLTFLoader();
    loader.load('../models/house.gltf',
    // called when the resource is loaded
    function ( gltf ) {
        let camPositionFromScene = gltf.scene.children.filter(c => c.name === "Camera")[0].position;
        camera = initCamera(new THREE.Vector3(camPositionFromScene.x, camPositionFromScene.y, camPositionFromScene.z));
        trackballControls = initTrackballControls(camera, renderer);
        
        loadScene(gltf, scene);
        
        addPlane(scene)
        
        render();
        
    },
    ( xhr ) => console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ),
    ( error ) => console.log( 'Error: ' + error )
    );
    
    function addPlane(scene) {
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
        
        addLights(plane);
        
        // add the plane to the scene
        scene.add(plane);
    }
    
    function addLights(plane) {
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
    
    function render() {
        trackballControls.update(clock.getDelta());
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

}