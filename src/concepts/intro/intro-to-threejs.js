function init() {

  var clock = new THREE.Clock();
  var renderer = initRenderer();
  var camera = initCamera(new THREE.Vector3(00, 80, -60));
  var ambiColor = "#1c1c1c";
  let trackballControls;

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  let loader = new THREE.GLTFLoader();
    loader.load('../../../models/intro-to-threejs.gltf', ( gltf ) => {
      trackballControls = initTrackballControls(camera, renderer);

      addDogAndCamera(scene, gltf);
      let plane = addGroundPlane(scene);
      
      // add subtle ambient lighting
      let ambientLight = new THREE.AmbientLight(ambiColor);
      scene.add(ambientLight);
    
      // add target and light
      var target = new THREE.Object3D();
      target.position = new THREE.Vector3(5, 0, 0);
    
      var spotLight = new THREE.SpotLight("#ffffff");
      spotLight.position.set(0.312385116370123, 30, 20.124013305595888);
      spotLight.castShadow = true;
      spotLight.shadow.camera.near = 1;
      spotLight.shadow.camera.far = 100;
      spotLight.target = plane;
      spotLight.distance = 0;
      spotLight.angle = 1;
      spotLight.shadow.camera.fov = 120;
      scene.add(spotLight);
      var debugCamera = new THREE.CameraHelper(spotLight.shadow.camera);
    
      var pp = new THREE.SpotLightHelper(spotLight);
      scene.add(pp);

      // add a small sphere simulating the pointlight
      var sphereLight = new THREE.SphereGeometry(1);
      var sphereLightMaterial = new THREE.MeshBasicMaterial({
        color: 0xac6c25
      });
      var sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
      sphereLightMesh.castShadow = true;
    
      sphereLightMesh.position.set(0.312385116370123, 30, 20.124013305595888);
      scene.add(sphereLightMesh);

      render();

      function render() {
        trackballControls.update(clock.getDelta());
        pp.update();
        requestAnimationFrame(render);
        renderer.render(scene, camera);
      }
    },
    ( xhr ) => console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ),
    ( error ) => console.log( 'Error: ' + error )
    );

  function addDogAndCamera(scene, gltf) {
    var dog = gltf.scene.children.filter(c => c.name === 'dog')[0];

    dog.position.x = 40;
    dog.position.y = 6;
    dog.position.z = 2;
    dog.castShadow = true;
    dog.scale.set(5, 5, 5);

    scene.add(dog);

    let camera = gltf.scene.children.filter(c => c.name === 'camera')[0];

    camera.position.x = 5;
    camera.position.y = 15;
    camera.position.z = 0;
    camera.rotation.z = 0.2;
    camera.scale.set(2, 2, 2);
    camera.castShadow = false;
    doNotCastShadow(camera);

    scene.add(camera);
  }

  function addGroundPlane(scene) {
    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(200, 200, 200, 200);
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

  function doNotCastShadow(object) {
    object.children.map(c => {
      if (c instanceof THREE.Mesh) {
        c.castShadow = false
      } else {
        doNotCastShadow(c);
      }
    });
  }

}