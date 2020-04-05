const WS_PORT = 8080;

//----------------------------------------------------------------
// WebSocket
//----------------------------------------------------------------
// We setup a WebSocket connection
// with the server (see server/osc_bridge.js)
//----------------------------------------------------------------

let socket = new WebSocket(`ws://localhost:${WS_PORT}`);

socket.onopen = function(e) {
    console.log('[WebSocket] Connection established');
    socket.send('Hi my dear server!');
};

socket.onmessage = function(event) {
    // console.log(event);
    let message = JSON.parse(event.data);

    console.log('[WebSocket] on message', message);
    let handshake = {
        'note': 255,
        'velocity': 255,
        'stuff': 255
    };

    if ((message['note'] === handshake['note']) &&
        (message['velocity'] === handshake['velocity']) &&
        (message['stuff'] === handshake['stuff'])) {

        console.log('[WebSocket] handshake successfull!')
    }
};

socket.onclose = function(event) {
    if (event.wasClean) {
        console.log(`[WebSocket] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log(`[WebSocket] Connection died, code=${event.code} reason=${event.reason}`);
    }
};

socket.onerror = function(error) {
    console.error(`[WebSocket] ${error.message}`);
};

//----------------------------------------------------------------
// ThreeJS
//----------------------------------------------------------------
// This is where you can have fun!
//----------------------------------------------------------------

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let geometry = new THREE.BoxGeometry();
let material = new THREE.MeshBasicMaterial({
    color: 0xaaffbb
});
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// This is the main animation loop
function animate() {

    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    render();
};

// This is where you can draw
function render(){

    renderer.render(scene, camera);
}

animate();