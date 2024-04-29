import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")});

//setting pixel ratio and size 
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const ekTexture = new THREE.TextureLoader().load('/public/me.jpg');
const fireTexture = new THREE.TextureLoader().load('/public/fire.jpg');

const ek = new THREE.Mesh(
  new THREE.SphereGeometry( 1, 32, 16 ),
  new THREE.MeshBasicMaterial({map: ekTexture} )
);

const torusGeometry = new THREE.TorusGeometry(3, 0.4, 12,  48 );


const torus = new THREE.Mesh(torusGeometry, new THREE.MeshStandardMaterial( {map: fireTexture} ))

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);

scene.add( ek );
scene.add(torus);
scene.add(pointLight, ambientLight);
scene.add(lightHelper);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

  ek.rotation.y += 0.03;

	torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01
  controls.update();
	renderer.render( scene, camera );
}

animate();