let gomPosition = new THREE.Vector2(0,0);

document.addEventListener("keydown", function(event) {
    if (event.key === "w" || event.key === "W") {
        // console.log("move up");
        gomPosition.y += 0.05;
    }
    if (event.key === "a" || event.key === "A") {
        // console.log("move left");
        gomPosition.x -= 0.05;
    }
    if (event.key === "d" || event.key === "D") {
        // console.log("move right");
        gomPosition.x += 0.05;
    }
    if (event.key === "s" || event.key === "S") {
        // console.log("move down");
        gomPosition.y -= 0.05;
    }
})

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// adding sprite render

let gomTexture = new THREE.TextureLoader().load('./gomslife/assets/gom.png');
gomTexture.magFilter = THREE.NearestFilter;
let gomMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, map: gomTexture, side: THREE.DoubleSide});
const gomGeometry = new THREE.PlaneGeometry(1.2, 1.2);
const gom = new THREE.Mesh( gomGeometry, gomMaterial);
scene.add(gom);

camera.position.z = 5;

function animate() {
    gom.position.set(gomPosition.x, gomPosition.y);
    console.log(gom.position);
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
};

animate();