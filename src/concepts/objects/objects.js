function init() {
    var renderer = initRenderer();
    var camera = initCamera();
  
    var trackballControls = initTrackballControls(camera, renderer);
    var clock = new THREE.Clock();
  
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();
  
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
  
    // create a cube
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0xff3333,
      wireframe: true
    });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = false;
  
    // position the cube
    cube.position.x = -10;
    cube.position.y = 3;
    cube.position.z = -30;
  
    // add the cube to the scene
    scene.add(cube);
  
    addBasicMaterialCube(scene);
    addLambertMaterialCube(scene);
  
    var sphereGeometry = new THREE.SphereGeometry(4, 25, 25);
    var sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x7777ff,
      wireframe: true
    });
    
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  
    // position the sphere
    sphere.position.x = -20;
    sphere.position.y = 5;
    sphere.position.z = -10;
    sphere.castShadow = false;
  
    // add the sphere to the scene
    scene.add(sphere);
  
    addBasicMaterialSphere(scene);
    addLambertMaterialSphere(scene);
  
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
  
    render();
  
    function render() {
      trackballControls.update(clock.getDelta());
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }
  
    function addBasicMaterialCube(scene) {
      var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
      var cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xff3333
      });
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = false;
  
      // position the cube
      cube.position.x = 0;
      cube.position.y = 3;
      cube.position.z = -20;
  
      // add the cube to the scene
      scene.add(cube);
    }
  
    function addLambertMaterialCube(scene) {
      var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
      var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff3333
      });
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = true;
  
      // position the cube
      cube.position.x = 10;
      cube.position.y = 3;
      cube.position.z = -10;
  
      // add the cube to the scene
      scene.add(cube);
    }
  
    function addBasicMaterialSphere() {
      var sphereGeometry = new THREE.SphereGeometry(4, 25, 25);
      var sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x7777ff
      });
      
      var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  
      // position the sphere
      sphere.position.x = -10;
      sphere.position.y = 5;
      sphere.position.z = 0;
      sphere.castShadow = false;
  
      // add the sphere to the scene
      scene.add(sphere);
    }
  
    function addLambertMaterialSphere() {
      var sphereGeometry = new THREE.SphereGeometry(4, 25, 25);
      var sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x7777ff
      });
      
      var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  
      // position the sphere
      sphere.position.x = 0;
      sphere.position.y = 5;
      sphere.position.z = 10;
      sphere.castShadow = true;
  
      // add the sphere to the scene
      scene.add(sphere);
    }
  }