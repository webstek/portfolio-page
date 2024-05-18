import * as THREE from 'three';

import WebGL from 'three/addons/capabilities/WebGL.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// declarations for rendering and animation
let camera, scene, renderer, clock;
let icosahedron;


// Check if WebGL is available in the web browser
if ( WebGL.isWebGL2Available() ) {
	init();
	renderAnimation();
} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'center-container' ).appendChild( warning );
}


function init() {

	// Initialize components
	initScene();
	initInteraction();


	// Add to the webpage with an ID and resizing
	document.body.appendChild( renderer.domElement );
	renderer.domElement.setAttribute( 'id', 'gallery-renderer' );
	window.addEventListener( 'resize', onWindowResize );
}


function initInteraction() {

	// WebGLRenderer instance with antialiasing and transparency enabled
	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	

	// Camera control with the mouse
	const controls = new OrbitControls( camera, renderer.domElement );
	controls.target.set( 0, 0, 0 );
	controls.enablePan = false;
	controls.enableZoom = false;
	controls.update();


	// Clock for animating independent of framerate
	clock = new THREE.Clock();
}


function initScene() {

	// Perspective camera to view scene, y-dir is up
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set(0, 15, 15);


	// Data structure to place the scene in
	scene = new THREE.Scene();

	
	// Lighting the scene
	
	// ambient light to illuminate shadows slightly
	scene.add( new THREE.AmbientLight(0x404040, 3) );


	// directional light to show geometry and material
	const dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
	dirLight.position.set( 5, 10, 1 );
	scene.add( dirLight );


	// Adding Geometry

	// floor to place interesting gallery geometry on
	let geometry = new THREE.BoxGeometry( 10, 0.1, 10 );
	let material = new THREE.MeshPhongMaterial( {
		color: 0x909090,
		shininess: 10,
		specular: 0xa0a0a0
	} );
	const floor = new THREE.Mesh( geometry, material );
	scene.add( floor );


	// icosahedron test geometry
	geometry = new THREE.IcosahedronGeometry( 2, 0 );
	material = new THREE.MeshPhongMaterial( {
		color: 0xfab330,
		shininess: 80,
		specular: 0xffd050
	})
	icosahedron = new THREE.Mesh( geometry, material );
	icosahedron.position.set( 0, 2, 0 );
	scene.add( icosahedron );
}


function onWindowResize() {

	// Update the size of the renderer to match the window size
	renderer.setSize( window.innerWidth, window.innerHeight );


	// Update camera to maintain perspective
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionmatrix();
}


function renderAnimation() {
	
	// render state from last frame and tell window to call this again once its done
	render();
	requestAnimationFrame(renderAnimation);


	// get time since last frame and update state
	const delta = clock.getDelta();
	update( delta );
}


function render() {

	// get the renderer to draw the scene
	renderer.render( scene, camera );
}


function update( t ) {
	
	// spin the icosahedron at 1 Hz about the y-axis
	icosahedron.rotation.y += t;
}