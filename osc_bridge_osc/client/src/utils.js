function addPointsToScene(geo, color) {

    let material = new THREE.PointsMaterial({
        color: color,
        size: 0.4,
        opacity: 0.6,
        transparent: true,
        blending: THREE.AdditiveBlending
    });

    let points  = new THREE.Points(geo, material);
    points.sortParticles = true;

    return points;
}


module.exports = {
    addPointsToScene: addPointsToScene
}