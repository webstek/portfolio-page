import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// init the renderer
const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( Math.min(window.innerWidth / 2, 300), Math.min(window.innerWidth / 2, 300) );
document.body.appendChild( renderer.domElement );
renderer.domElement.setAttribute('id','landing-renderer')

const camera = new THREE.PerspectiveCamera( 70, 1, 0.01, 1000 );
const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set(0, 3, 15);
camera.lookAt(0, 0, 0)
controls.update();

const scene = new THREE.Scene();

// Rotating rainbow cube to test threejs
const geometry = new THREE.BoxGeometry( 10, 10, 10 );
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );


// adaptively size the renderer
window.addEventListener( 'resize', () => {
	renderer.setSize( Math.min(window.innerWidth / 2, 300), Math.min(window.innerWidth / 2, 300) );
} );

// animation
function animate( time ) {
	mesh.rotation.y = time / 2000;
	mesh.rotation.x = time / 2000;
	mesh.rotation.z = time / 2000;

	controls.update();
	renderer.render( scene, camera );
}

renderer.setAnimationLoop(animate);







// // Example 3d font
// import { FontLoader } from 'three/addons/loaders/FontLoader';
// import { TextGeometry } from 'three/addons/geometries/TextGeometry';
// // Portfolio Text
// const fontsize = 10;
// const fontLoader = new FontLoader();
// fontLoader.load('node_modules/three/examples/fonts/helvetiker_bold.typeface.json', 
// 	function ( font ) {
// 		const portfolioText = new TextGeometry('webstek', {
// 			font: font,
// 			depth: 0.3*fontsize,
// 			size: fontsize,
// 			bevelEnabled: true,
// 			bevelThickness: fontsize*0.05,
// 			bevelSize: fontsize*0.05,
// 			bevelSegments: fontsize*3
// 			});
// 		const fontMesh = new THREE.Mesh( portfolioText, material );
// 		fontMesh.position.set(-26, 40, 0);
// 		fontMesh.quaternion.setFromAxisAngle(new THREE.Vector3( 1, 0, 0 ), Math.PI / 6);
// 		scene.add( fontMesh );
// 	}
// );