import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';

// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// create a new renderer by instating the canvas element in our HTML // file
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-3);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 10, 10);
scene.add(pointLight);
// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper)

const ambientLight = new THREE.AmbientLight(0x404040, 5);
scene.add(ambientLight);

// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(gridHelper)

const rainyTexture = new THREE.TextureLoader().load('./images/rainyForest.jpg')
scene.background = rainyTexture;

const thumbsTexture2 = new THREE.TextureLoader().load('./images/guyThumbsUp.jpg');
const cubeGeometry2 = new THREE.BoxGeometry(10, 10, 10);
const thumbsMaterial2 = new THREE.MeshBasicMaterial({map: thumbsTexture2});
const thumbsMesh2 = new THREE.Mesh(cubeGeometry2, thumbsMaterial2);
thumbsMesh2.position.set(-55,-22,0);
scene.add(thumbsMesh2);

const thumbsTexture3 = new THREE.TextureLoader().load('./images/guyThumbsUp.jpg');
const cubeGeometry3 = new THREE.BoxGeometry(10, 10, 10);
const thumbsMaterial3 = new THREE.MeshBasicMaterial({map: thumbsTexture3});
const thumbsMesh3 = new THREE.Mesh(cubeGeometry3, thumbsMaterial3);
thumbsMesh3.position.set(53,-22,0);
scene.add(thumbsMesh3);

function animate() {
    requestAnimationFrame( animate );

    thumbsMesh2.rotation.x += 0.01;
    thumbsMesh2.rotation.y += 0.01;

    thumbsMesh3.rotation.x += 0.01;
    thumbsMesh3.rotation.y += 0.01;

    //controls.update()

    renderer.render( scene, camera );
}
animate();