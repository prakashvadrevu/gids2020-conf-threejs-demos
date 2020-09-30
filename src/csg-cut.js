
let list = [
    "side_floor_top--side_floor_top",
    "first_floor_rear_wall_top--first_floor_rear_wall_top",
    "first_floor_top--first_floor_top",
    "first_floor_filler_top--first_floor_filler_top"
];

function showCrossSectionalView(scene) {
    showTopElements(scene, false);
}

function showFullView(scene) {
    showTopElements(scene, true);
}

function showTopElements(scene, toggle) {
    list.map(name => {
        let child = scene.children.filter(c => c.name === name)[0];
        child.visible = toggle;
    });
}