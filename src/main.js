import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader';
import { TextGeometry } from 'three/addons/geometries/TextGeometry';


// init the renderer
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1000 );
const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set(0, 1, 100);
camera.lookAt(0, 0, 0)
controls.update();

const scene = new THREE.Scene();

// Rotating rainbow cube to test threejs
const geometry = new THREE.BoxGeometry( 10, 10, 10 );
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

// Portfolio Text
const fontsize = 10;
const fontLoader = new FontLoader();
fontLoader.load('node_modules/three/examples/fonts/helvetiker_bold.typeface.json', 
	function ( font ) {
		const portfolioText = new TextGeometry('webstek', {
			font: font,
			depth: 0.3*fontsize,
			size: fontsize,
			bevelEnabled: true,
			bevelThickness: fontsize*0.05,
			bevelSize: fontsize*0.05,
			bevelSegments: fontsize*3
			});
		const fontMesh = new THREE.Mesh( portfolioText, material );
		fontMesh.position.set(-26, 40, 0);
		fontMesh.quaternion.setFromAxisAngle(new THREE.Vector3( 1, 0, 0 ), Math.PI / 6);
		scene.add( fontMesh );
	}
);


// adaptively size the renderer
window.addEventListener( 'resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight);
} );

// animation
function animate( time ) {
	mesh.rotation.y = time / 2000;
	// mesh.rotation.y = time / 1000;

	controls.update();
	renderer.render( scene, camera );
}

renderer.setAnimationLoop(animate);
