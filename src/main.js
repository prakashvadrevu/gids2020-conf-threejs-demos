function init() {
    let renderer = initRenderer();
    let camera;
    let scene = new THREE.Scene();
    var clock = new THREE.Clock();
    let trackballControls;
    let controls = addControls();
    
    let loader = new THREE.GLTFLoader();
    loader.load('../models/house.gltf',
    // called when the resource is loaded
    function ( gltf ) {
        let camPositionFromScene = gltf.scene.children.filter(c => c.name === "Camera")[0].position;
        camera = initCamera(new THREE.Vector3(camPositionFromScene.x, camPositionFromScene.y, camPositionFromScene.z));
        trackballControls = initTrackballControls(camera, renderer);
        
        loadScene(gltf, scene);
        
        addPlaneAndLights(scene);

        initRayCast(scene, camera);

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

    function addControls() {
        var controls = new function () {
          this.addTrees = false;
          this.replaceCouch = false;
          this.highlight = false;
          this.addMemoryIntensiveTrees = false;
        };
    
        var gui = new dat.GUI();

        gui.add(controls, "addMemoryIntensiveTrees").onChange(function(replace) {
          if (replace) {
            addMemoryIntensiveTrees(scene);
          } else {
            deleteTrees(scene);
          }
        });
    
        gui.add(controls, "addTrees").onChange(function(replace) {
          if (replace) {
            addTrees(scene);
          } else {
            deleteTrees(scene);
          }
        });

        gui.add(controls, "replaceCouch").onChange(function(replace) {
            if (replace) {
                replaceCouch(scene); 
            } else {
                switchToOriginalCouch(scene);
            }
        });

        gui.add(controls, "highlight").onChange(function(enable) {
            enableCasting(enable);
        });
 
        return controls;
      }

}