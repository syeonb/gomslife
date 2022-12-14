let gomPosition = new THREE.Vector2(0,0);

isFlippedSprite = false;
gomStride = 0.08;
moveDown = [12, 13, 12, 14]
moveUp = [10, 11, 10, 4]
moveRightLeft = [15, 8, 15, 9]
laptopAnim = [2, 3, 4, 4, 1, 1, 4, 4, 3, 2]
spriteIndex = 0;
laptopSpriteIndex = 0;
movingUpDownLeftRight = 0;
fps = gomStride * 3000;
let currentTime = fps;
let clock = new THREE.Clock();

function flipSpriteToOriginal() {
    if (isFlippedSprite) {
        gom.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
        isFlippedSprite = false;
    }
}

function flipSpriteToFlipped() {
    if (!isFlippedSprite) {
        gom.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
        isFlippedSprite = true;
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === "w" || event.key === "W") {
        if (movingUpDownLeftRight != 1) {
            SelectSprite(10);
        }
        movingUpDownLeftRight = 1;
        flipSpriteToOriginal();
        gomPosition.y += gomStride;
    }
    if (event.key === "a" || event.key === "A") {
        if (movingUpDownLeftRight != 3) {
            SelectSprite(15);
        }
        movingUpDownLeftRight = 3;
        flipSpriteToOriginal();
        gomPosition.x -= gomStride;
    }
    if (event.key === "d" || event.key === "D") {
        if (movingUpDownLeftRight != 4) {
            SelectSprite(15);
        }
        movingUpDownLeftRight = 4;
        flipSpriteToFlipped();
        gomPosition.x += gomStride;
    }
    if (event.key === "s" || event.key === "S") {
        if (movingUpDownLeftRight != 2) {
            SelectSprite(12);
        }
        movingUpDownLeftRight = 2;
        flipSpriteToOriginal()
        gomPosition.y -= gomStride;
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
gomTexture.repeat.set(1/4, 1/4);
SelectSprite(12);
let gomMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, map: gomTexture, side: THREE.DoubleSide, transparent: true});
const spriteGeometry = new THREE.PlaneGeometry(1, 1);
const gom = new THREE.Mesh( spriteGeometry, gomMaterial);
scene.add(gom);

// add laptop
let laptopTexture = new THREE.TextureLoader().load("assets/laptop spritesheet.png");
laptopTexture.magFilter = THREE.NearestFilter;
laptopTexture.wrapS = laptopTexture.wrapT = THREE.RepeatWrapping;
laptopTexture.repeat.set(1/2, 1/2);
let laptopMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, map: laptopTexture, side: THREE.DoubleSide});
const laptop = new THREE.Mesh( spriteGeometry, laptopMaterial);
laptop.position.z = -0.01
scene.add(laptop)

camera.position.z = 5;


function SelectSprite(index) 
{
    let x = index % 4;
    let y = Math.floor(index / 4); 
    gomTexture.offset.x = x/4;
    gomTexture.offset.y = y/4;
}

function SelectLaptopSprite(index) 
{
    let x = index % 2;
    let y = Math.floor(index / 2); 
    laptopTexture.offset.x = x/2;
    laptopTexture.offset.y = y/2;
}

async function ChangeSprite(delta) {
    currentTime -= delta * 1000;
    if (currentTime < 0) {
        if (laptopSpriteIndex == laptopAnim.length) {
            laptopSpriteIndex = 0;
            console.log("laptop sprite out of bounds");
        }
        SelectLaptopSprite(laptopAnim[laptopSpriteIndex]);
        laptopSpriteIndex++;
        console.log(laptopSpriteIndex);
        if (movingUpDownLeftRight == 2) {
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
        currentTime = fps;
    }
}

function animate() {
    let delta = clock.getDelta(); 
    ChangeSprite(delta).then(gom.position.set(gomPosition.x, gomPosition.y));
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
};

animate();