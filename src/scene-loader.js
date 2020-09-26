
function loadScene(gltf, scene) {

  let excludeList = [
    "tree",
    "couch",
    "table",
    "top_floor_csg_cut_cube"
  ]

  gltf.scene.children
  .map(c => {
    if (excludeList.includes(c.name)) {
      scene.add(c);
    } else if (c instanceof THREE.Mesh) {
      convertToGeometry(c, c, scene);
    } else {
      c.children.map(o => {
        convertToGeometryAndLoadChildrenToScene(o, c, scene);
      })
    }
  });
}

function convertToGeometryAndLoadChildrenToScene(object, parentObject, scene) {
  if (object instanceof THREE.Mesh) {
    convertToGeometry(object, parentObject, scene);
    console.log("end of computing Geometry for: " + object.name)

  } else {
    object.children.map(o => convertToGeometryAndLoadChildrenToScene(o, parentObject, scene))
    console.log("end of computing Geometry for: " + object.name)

  }
}

function convertToGeometry(mesh, parentObject, scene) {
  let geometry = new THREE.Geometry().fromBufferGeometry( mesh.geometry );
  let newMesh = new THREE.Mesh( geometry, mesh.material );
  newMesh.name = parentObject.name + "--" + mesh.name;
  newMesh.position.set(parentObject.position.x, parentObject.position.y, parentObject.position.z);
  scene.add(newMesh)
}

