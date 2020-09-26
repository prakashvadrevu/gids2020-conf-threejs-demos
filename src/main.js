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
        
        addControls();

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
        };
    
        var gui = new dat.GUI();
    
        gui.add(controls, "addTrees").onChange(function(replace) {
          if (replace) {
            addTrees();
          } else {
            deleteTrees();
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

      function addTrees() {
        let tree = scene.children.filter(c => c.name === "tree")[0];
    
        let trees = [
          {
            "name": "tree-2",
            "x": 4.685654640197754,
            "y": 0.012202128767967224,
            "z": 0.4551215171813965
          },
          {
            "name": "tree-3",
            "x": 4.685654640197754,
            "y": 0.012202128767967224,
            "z": -2.183415651321411
          },
          {
            "name": "tree-4",
            "x": 2.124016761779785,
            "y": 0.012202128767967224,
            "z": -3.447300434112549
          },
          {
            "name": "tree-5",
            "x": -0.6848946809768677,
            "y": 0.012202128767967224,
            "z": -3.447300434112549
          }
        ];
    
        trees.map(t => {
          let treeGroup = tree.children[0].clone();
          treeGroup.name = t.name;
          treeGroup.position.set(t.x, t.y, t.z)
          tree.add(treeGroup);
        })
      }
    
      function deleteTrees() {
        let treeGroup = scene.children.filter(c => c.name === "tree")[0];
        let tree = treeGroup.children[0];
        treeGroup.children = [];
        treeGroup.children.push(tree);
      }

}