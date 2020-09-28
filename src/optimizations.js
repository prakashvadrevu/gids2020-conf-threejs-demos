function addTrees(scene) {
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

    trees.map(t => {
        let treeGroup = tree.children[0].clone();
        treeGroup.name = t.name;
        treeGroup.position.set(t.x+1, t.y, t.z)
        tree.add(treeGroup);
    })

    trees.map(t => {
        let treeGroup = tree.children[0].clone();
        treeGroup.name = t.name;
        treeGroup.position.set(t.x+2, t.y, t.z)
        tree.add(treeGroup);
    })

    trees.map(t => {
        let treeGroup = tree.children[0].clone();
        treeGroup.name = t.name;
        treeGroup.position.set(t.x+3, t.y, t.z)
        tree.add(treeGroup);
    })
}

function deleteTrees(scene) {
    let treeGroup = scene.children.filter(c => c.name === "tree")[0];
    let tree = treeGroup.children[0];
    treeGroup.children = [];
    treeGroup.children.push(tree);
}