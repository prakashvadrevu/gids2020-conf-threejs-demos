function init() {

  var clock = new THREE.Clock();
  var renderer = initRenderer();
  var camera = initCamera(new THREE.Vector3(00, 80, -60));
  let trackballControls;

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  let loader = new THREE.GLTFLoader();
    loader.load('../../../models/intro-to-threejs.gltf', ( gltf ) => {
      trackballControls = initTrackballControls(camera, renderer);

      addCamera(scene, gltf);
      drawLine(scene);
      addLambertMaterialSphere(scene);
      addLambertMaterialCube(scene);
      let plane = addGroundPlane(scene);

      addLight(scene, plane);

      render();

      function render() {
        trackballControls.update(clock.getDelta());
        requestAnimationFrame(render);
        renderer.render(scene, camera);
      }
    },
    ( xhr ) => console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ),
    ( error ) => console.log( 'Error: ' + error )
    );

  function addLight(scene, plane) {   
    var spotLight = new THREE.SpotLight("#ffffff");
    spotLight.position.set(0.312385116370123, 50, 50.124013305595888);
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 100;
    spotLight.target = plane;
    spotLight.distance = 0;
    spotLight.angle = 1;
    spotLight.shadow.camera.fov = 120;
    scene.add(spotLight);

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

  function addCamera(scene, gltf) {
    let camera = gltf.scene.children.filter(c => c.name === 'camera')[0];

    camera.position.x = 5;
    camera.position.y = 10;
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

  function drawLine(scene) {
    var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    var points = [];
    points.push( new THREE.Vector3( 5, 10, 0 ) );
    points.push( new THREE.Vector3( 100, 5, 2 ) );

    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var line = new THREE.Line( geometry, material );
    line.position
    scene.add( line );
  }

  function addLambertMaterialSphere() {
    var sphereGeometry = new THREE.SphereGeometry(4, 25, 25);
    var sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x7777ff
    });
    
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // position the sphere
    sphere.position.x = 40;
    sphere.position.y = 7;
    sphere.position.z = 2;
    sphere.castShadow = false;

    // add the sphere to the scene
    scene.add(sphere);
  }

  function addLambertMaterialCube(scene) {
    var cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
    var cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0xff3333
    });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = false;

    // position the cube
    cube.position.x = 50;
    cube.position.y = 6;
    cube.position.z = 2;

    // add the cube to the scene
    scene.add(cube);
  }

}