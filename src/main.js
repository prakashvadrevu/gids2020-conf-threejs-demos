const { Vector2, LessStencilFunc } = require("three");

function init() {
    let renderer = initRenderer();
    let camera;
    let trackballControls;

    let mainCamera;
    let mainCameraPosition;
    let mainCameraTrackballControls;    

    let customizationCamera;
    let customizationCameraTrackballControls;

    let scene = new THREE.Scene();
    var clock = new THREE.Clock();

    let controls = addControls();
    let loader = new THREE.GLTFLoader();
    loader.load('../models/house.gltf',
    // called when the resource is loaded
    function ( gltf ) {
        initMainCamera(gltf, scene);
        initCustomizationCamera(gltf, scene);

        loadScene(gltf, scene);

        addPlaneAndLights(scene);

        initRayCast(scene);

        render();        
    },
    ( xhr ) => console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ),
    ( error ) => console.log( 'Error: ' + error )
    );

    function render() {
      trackballControls.update(clock.getDelta());
      requestAnimationFrame(render);
      TWEEN.update();
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
            enableCasting(enable, camera);
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

    function initMainCamera(gltf, scene) {
      let camFromScene = gltf.scene.children.filter(c => c.name === "Camera")[0];
      mainCamera = initCamera(camFromScene.position);
      mainCameraPosition = new THREE.Vector3(camFromScene.position.x, camFromScene.position.y, camFromScene.position.z);
      mainCameraTrackballControls = initTrackballControls(mainCamera, renderer);
      mainCamera.position.copy(camFromScene.position);

      updateCamera(mainCamera, mainCameraTrackballControls);
      scene.add(camFromScene);
    }

    function initCustomizationCamera(gltf, scene) {
      let customizationCamFromScene = gltf.scene.children.filter(c => c.name === "customization-camera")[0];
      customizationCamera = initCamera(customizationCamFromScene.position);
      customizationCameraTrackballControls = initTrackballControls(customizationCamera, renderer);
      customizationCamera.position.copy(customizationCamFromScene.position);
      scene.add(customizationCamFromScene);
    }

    function switchToCustomizationCamera() {
      showFirstFloorWindows(false);

      const toPosition = new THREE.Vector3(customizationCamera.position.x, customizationCamera.position.y, customizationCamera.position.z);
      const destPosition = scene.children.filter(c => c.name === "couch")[0].position;
      let targetToLookAt = new THREE.Vector3(destPosition.x, destPosition.y, destPosition.z);

      tweenToView(toPosition, targetToLookAt);
    }

    function switchToMainCamera() {
      showFirstFloorWindows(true);

      const toPosition = new THREE.Vector3(mainCameraPosition.x, mainCameraPosition.y, mainCameraPosition.z);
      const destPosition = scene.children.filter(c => c.name === "couch")[0].position;
      let targetToLookAt = new THREE.Vector3(destPosition.x, destPosition.y, destPosition.z);

      tweenToView(toPosition, targetToLookAt);      
    }

    function showFirstFloorWindows(value) {
      let topFloor = scene.children.filter(c => c.name === "first_floor_window--first_floor_window_0")[0];
      topFloor.visible = value;
  
      topFloor = scene.children.filter(c => c.name === "first_floor_window--first_floor_window_1")[0];
      topFloor.visible = value;
  
      topFloor = scene.children.filter(c => c.name === "first_floor_window--first_floor_window_2")[0];
      topFloor.visible = value;
  
      topFloor = scene.children.filter(c => c.name === "first_floor_window--first_floor_window_3")[0];
      topFloor.visible = value;
  }

  function updateCamera(cam, trackballCtrls) {
    camera = cam;
    trackballControls = trackballCtrls;
    trackballControls.update(clock.getDelta());
  }

  function tweenToView(toPosition, targetToLookAt) {
    trackballControls.target = targetToLookAt;
    new TWEEN.Tween({...camera.position})
      .to(toPosition, 1000)
      .onUpdate(function() {
        camera.position.copy(this);
        trackballControls.update(clock.getDelta());
      }).start();
  }

}