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
        
        addPlaneAndLights(scene)
        
        render();
        
    },
    ( xhr ) => console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ),
    ( error ) => console.log( 'Error: ' + error )
    );

    function render() {
        trackballControls.update(clock.getDelta());
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

}