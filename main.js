import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/dist/vite.svg'
// import { setupCounter } from './counter.js'

//rcc:THIS DIDN'T WORK AT ALL UNLESS I SPECIFICALLY COMMENTED OUT THIS document.querySelctor and setUpCounter, NO IDEA WHY.
// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `
//
// setupCounter(document.querySelector('#counter'))

// Setup
//window.alert("HI")
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

const geometry = new THREE.BoxGeometry(10, 10, 10);

//set the color of the basic material in the object parameters `{}`

//const material = new THREE.MeshBasicMaterial( { color: 0xFF6347 } );
const material = new THREE.MeshStandardMaterial({
    color: 0xff6347, // Tomato color
    metalness: 0.3,  // Adds reflectivity
    roughness: 0.5,  // Controls shininess
});
const cube = new THREE.Mesh( geometry, material );

scene.add( cube );

cube.position.z = -15;
cube.position.x = -15;

cube.rotation.x = 2;
cube.rotation.y = .5;

const ico = new THREE.IcosahedronGeometry(10);
const icoMaterial = new THREE.MeshPhongMaterial({ color: 0xF8FF00 });
const icoMesh = new THREE.Mesh(ico, icoMaterial);

scene.add(icoMesh);

icoMesh.position.z= -15;
icoMesh.position.x= 45;

const pointLight = new THREE.PointLight(0xffffff, 1500);
pointLight.position.set(5, 10, 10);
scene.add(pointLight);
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper)

const ambientLight = new THREE.AmbientLight(0x404040, 50);
scene.add(ambientLight);

const gridHelper = new THREE.GridHelper(200,50);
scene.add(gridHelper)

const spaceTexture = new THREE.TextureLoader().load('./images/rainyForest.jpg')
scene.background = spaceTexture;

const thumbsTexture = new THREE.TextureLoader().load('./images/guyThumbsUp.jpg')
const sphereGeometry = new THREE.SphereGeometry( 8, 11, 5 );
const thumbsMaterial = new THREE.MeshBasicMaterial({map: thumbsTexture})
const thumbsMesh = new THREE.Mesh(sphereGeometry, thumbsMaterial);
thumbsMesh.position.set(5, 15, 0);
scene.add(thumbsMesh);

const normalTexture = new THREE.TextureLoader().load('./images/normals/purpleNormal.png');
const torusGeo = new THREE.TorusKnotGeometry( 5, 1, 250, 5, 9, 15 );
const torusMaterial = new THREE.MeshStandardMaterial( {
    color: 0x00fff9,
    normalMap: normalTexture,
    roughness: 0,
    metalness: .8
} );
const torusKnot = new THREE.Mesh( torusGeo, torusMaterial );

scene.add( torusKnot );
torusKnot.position.y = -20

const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
    requestAnimationFrame( animate );
    // slowly rotate the cube:
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // rotate the icosahedron in the opposite direction:
    icoMesh.rotation.z += -0.01
    icoMesh.rotation.y += -0.01
    // rotate the thumbs up sphere on the Y axis:
    thumbsMesh.rotation.y += 0.01
    //rotate torus knot
    torusKnot.rotation.z += 0.01

    controls.update()

    renderer.render( scene, camera );
}
animate();