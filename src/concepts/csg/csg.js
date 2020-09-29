function init() {
    var renderer = initRenderer();
    var camera = initCamera();
  
    var trackballControls = initTrackballControls(camera, renderer);
    var clock = new THREE.Clock();
  
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();
  
    addPlaneAndLights(scene);
    
    var cube = addMainCube(scene);
    var sphere = addSphereInsideCube(scene);
    var csgCutCube = addCsgCube(scene);
    var resultMesh;
  
    render();
  
    function render() {
      trackballControls.update(clock.getDelta());
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }

    function csgCut() {
      var cubeBsp = new ThreeBSP(cube);
      var csgCutCubeBsp = new ThreeBSP(csgCutCube);

      var resultBSP = cubeBsp.subtract(csgCutCubeBsp);
      result = resultBSP.toMesh();
      // result.geometry.computeFaceNormals();
      // result.geometry.computeVertexNormals();
      addResult(result);

      scene.remove(cube);
      scene.remove(csgCutCube);
    }

    // setup the control gui
    var controls = new function () {
      this.showCsgCube = false;
      this.csgCut = false;
    };

    var gui = new dat.GUI();

    gui.add(controls, "showCsgCube").onChange(function (show) {
      if (show) {
        csgCutCube.visible = true;
      } else {
        csgCutCube.visible = false;
      }
    });

    gui.add(controls, "csgCut").onChange(function (cut) {
      if (cut) {
        csgCut();
      } else {
        scene.remove(resultMesh);
        scene.add(cube);
        scene.add(csgCutCube);
      }
    });

    function addResult(result) {
      var cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0x7777ff,
        wireframe: true
      });

      resultMesh = new THREE.Mesh(result.geometry, cubeMaterial);
      resultMesh.position.x = cube.position.x;
      resultMesh.position.y = cube.position.y;
      resultMesh.position.z = cube.position.z;
      scene.add(resultMesh);
    }

    function addMainCube(scene) {
      // create a cube
      var cubeGeometry = new THREE.BoxGeometry(20, 15, 15);
      var cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0x7777ff,
        wireframe: true
      });
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    
      // position the cube
      cube.position.x = 0;
      cube.position.y = 7.6;
      cube.position.z = 0;
    
      // add the cube to the scene
      scene.add(cube);

      return cube;
    }

    function addCsgCube(scene) {
      // create a cube
      var cubeGeometry = new THREE.BoxGeometry(30, 15, 20);
      var cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xff00ff,
      });
      var cube = createMesh(cubeGeometry);
    
      // position the cube
      cube.position.x = 0;
      cube.position.y = 18;
      cube.position.z = 0;

      cube.visible = false;
    
      // add the cube to the scene
      scene.add(cube);

      return cube;
    }

    function addSphereInsideCube(scene) {
      var sphereGeometry = new THREE.SphereGeometry(4, 25, 25);
      var sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0xff3333,
      });
      
      var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    
      // position the sphere
      sphere.position.x = 0;
      sphere.position.y = 4;
      sphere.position.z = 0;
      sphere.castShadow = false;
    
      // add the sphere to the scene
      scene.add(sphere);

      return sphere;
    }

    function createMesh(geom) {
      // assign two materials
      var meshMaterial = new THREE.MeshNormalMaterial();
      meshMaterial.side = THREE.DoubleSide;
      var wireFrameMat = new THREE.MeshBasicMaterial({
        transparency: true,
        opacity: 0.5,
        wireframeLinewidth: 0.5
      });
      wireFrameMat.wireframe = true;
  
      // create a multimaterial
      var mesh = new THREE.Mesh(geom, wireFrameMat);
  
      return mesh;
    }

    function addPlaneAndLights() {
      var planeGeometry = new THREE.PlaneGeometry(1000, 1000, 20, 20);
      var planeMaterial = new THREE.MeshLambertMaterial();
    
      var plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.receiveShadow = true;
    
      // rotate and position the plane
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.x = 15;
      plane.position.y = 0;
      plane.position.z = 0;
    
      // add the plane to the scene
      scene.add(plane);
    
      // add spotlight for a bit of light
      var spotLight0 = new THREE.SpotLight(0xcccccc);
      spotLight0.position.set(-40, 60, -10);
      spotLight0.lookAt(plane);
      scene.add(spotLight0);
    
      var target = new THREE.Object3D();
      target.position = new THREE.Vector3(5, 0, 0);
    
      var pointColor = "#ffffff";
      var dirLight = new THREE.DirectionalLight(pointColor);
      dirLight.position.set(0, 10, -50);
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
}