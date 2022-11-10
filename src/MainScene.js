let gomPosition = new THREE.Vector2(0,0);

isFlippedSprite = false;
moveDown = [12, 13, 12, 14]
moveUp = [10, 11, 10, 4]
moveRightLeft = [15, 8, 15, 9]
spriteIndex = 0;
movingUpDownLeftRight = 0;
let currentTime = 0;
let clock = new THREE.Clock();

document.addEventListener("keydown", function(event) {
    if (event.key === "w" || event.key === "W") {
        movingUpDownLeftRight = 1;
        if (isFlippedSprite) {
            gom.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
            isFlippedSprite = false;
        }
        gomPosition.y += 0.05;
    }
    if (event.key === "a" || event.key === "A") {
        movingUpDownLeftRight = 3;
        if (isFlippedSprite) {
            gom.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
            isFlippedSprite = false;
        }
        gomPosition.x -= 0.05;
    }
    if (event.key === "d" || event.key === "D") {
        movingUpDownLeftRight = 4;
        // console.log("move right");
        if (!isFlippedSprite) {
            gom.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
            isFlippedSprite = true;
        }
        gomPosition.x += 0.05;
    }
    if (event.key === "s" || event.key === "S") {
        movingUpDownLeftRight = 2;
        if (isFlippedSprite) {
            gom.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
            isFlippedSprite = false;
        }
        gomPosition.y -= 0.05;
    }
})

document.addEventListener("keyup", function(event) {
    if (event.key === "s" || event.key === "S" || event.key === "a" || event.key ==="A"
    || event.key == "w" || event.key === "W" || event.key === "d" || event.key === "D") {
        movingUpDownLeftRight = 0;
        spriteIndex = 0;
    }
})

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// adding sprite render

let gomTexture = new THREE.TextureLoader().load("assets/gom spritesheet.png");
gomTexture.magFilter = THREE.NearestFilter;
gomTexture.wrapS = gomTexture.wrapT = THREE.RepeatWrapping; 
gomTexture.repeat.set( 1/4, 1/4);
SelectSprite(12);
let gomMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, map: gomTexture, side: THREE.DoubleSide});
const gomGeometry = new THREE.PlaneGeometry(2, 2);
const gom = new THREE.Mesh( gomGeometry, gomMaterial);
scene.add(gom);

camera.position.z = 5;


function SelectSprite(index) 
{
    let x = index % 4;
    let y = Math.floor(index / 4); 
    gomTexture.offset.x = x/4;
    gomTexture.offset.y = y/4;
}

function animate() {
    gom.position.set(gomPosition.x, gomPosition.y);
    let delta = clock.getDelta(); 
    currentTime -= delta * 1000;
    if (currentTime < 0) {
        if (movingUpDownLeftRight == 2) {
            // console.log("is moving down");
            SelectSprite(moveDown[spriteIndex]);
            spriteIndex++;
            console.log(spriteIndex);
            if (spriteIndex == 4) {
                spriteIndex = 0;
            }
        } else if (movingUpDownLeftRight == 1) {
            SelectSprite(moveUp[spriteIndex]);
            spriteIndex++;
            console.log(spriteIndex);
            if (spriteIndex == 4) {
                spriteIndex = 0;
            }
        } else if (movingUpDownLeftRight == 3 || movingUpDownLeftRight == 4) {
            SelectSprite(moveRightLeft[spriteIndex]);
            spriteIndex++;
            console.log(spriteIndex);
            if (spriteIndex == 4) {
                spriteIndex = 0;
            }
        }
        currentTime = 500;
    }
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
};

animate();