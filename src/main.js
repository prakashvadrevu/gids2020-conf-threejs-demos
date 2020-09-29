function init() {
    let renderer = initRenderer();
    let camera;
    let scene = new THREE.Scene();
    var clock = new THREE.Clock();
    let trackballControls;
    let controls = addControls();
    let enableTrackballControls = true;
    
    let loader = new THREE.GLTFLoader();
    loader.load('../models/house.gltf',
    // called when the resource is loaded
    function ( gltf ) {
        let camFromScene = gltf.scene.children.filter(c => c.name === "Camera")[0];
        camera = initCamera(camFromScene.position);
        trackballControls = initTrackballControls(camera, renderer);
        camera.position.copy(camFromScene.position);
        
        loadScene(gltf, scene);
        let customizationCamFromScene = gltf.scene.children.filter(c => c.name === "customization-camera")[0];
        scene.add(camFromScene);
        scene.add(customizationCamFromScene);
        
        addPlaneAndLights(scene);

        initRayCast(scene, camera);

        render();        
    },
    ( xhr ) => console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ),
    ( error ) => console.log( 'Error: ' + error )
    );

    function render() {
      if (enableTrackballControls) {
        trackballControls.update(clock.getDelta());
      }
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }

    function addControls() {
        var controls = new function () {
          this.addTrees = false;
          this.replaceCouch = false;
          this.highlight = false;
          this.addMemoryIntensiveTrees = false;
          this.switchToCustomizationCamera = false;
          this.crossSectionalView = false;
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

        gui.add(controls, "switchToCustomizationCamera").onChange(
          function(s) {
            if (s) {
              switchToCustomizationCamera();
            } else {
              switchToMainCamera();
            }
          }
        );

        gui.add(controls, "crossSectionalView").onChange(
          function(s) {
            if (s) {
              showCrossSectionalView(scene);
            } else {
              showFullView(scene);
            }
          }
        );

        return controls;
    }

    function switchToCustomizationCamera() {
      enableTrackballControls = false;
      hideFirstFloorWindows(false);
      let customizationCamera = scene.children.filter(c => c.name === "customization-camera")[0];
      camera.position.copy(customizationCamera.position);
    }

    function switchToMainCamera() {
      enableTrackballControls = true;
      hideFirstFloorWindows(true);
      let mainCamera = scene.children.filter(c => c.name === "Camera")[0];
      camera.position.copy(mainCamera.position);
    }

    function hideFirstFloorWindows(value) {
      let topFloor = scene.children.filter(c => c.name === "first_floor_window--first_floor_window_0")[0];
      topFloor.visible = value;
  
      topFloor = scene.children.filter(c => c.name === "first_floor_window--first_floor_window_1")[0];
      topFloor.visible = value;
  
      topFloor = scene.children.filter(c => c.name === "first_floor_window--first_floor_window_2")[0];
      topFloor.visible = value;
  
      topFloor = scene.children.filter(c => c.name === "first_floor_window--first_floor_window_3")[0];
      topFloor.visible = value;
  }

}