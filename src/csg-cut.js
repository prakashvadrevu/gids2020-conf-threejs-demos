
function showCrossSectionalView(scene) {
    let list = [
        "side_floor_top--side_floor_top",
        "first_floor_rear_wall_top--first_floor_rear_wall_top",
        "first_floor_top--first_floor_top",
        "first_floor_filler_top--first_floor_filler_top"
    ];
    list.map(name => {
        let child = scene.children.filter(c => c.name === name)[0];
        child.visible = false
    });
}

function showFullView(scene) {
    scene.children.map(e => e.visible = true);
}