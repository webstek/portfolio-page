import * as THREE from 'three';

import WebGL from 'three/addons/capabilities/WebGL.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// declarations for rendering and animation
let camera, scene, renderer, clock;
let icosahedron;


// projects list and raycaster for mouse interactions
const projects = [];
let raycaster, mouse, intersected, storedMaterial;


// Check if WebGL is available in the web browser
if (WebGL.isWebGL2Available()) {
	init();
	renderAnimation();
} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById('center-container').appendChild(warning);
}


function init() {

	// Initialize components
	initScene();
	initInteraction();


	// Add to the webpage with an ID and resizing
	document.body.appendChild(renderer.domElement);
	renderer.domElement.setAttribute('id', 'gallery-renderer');
	window.addEventListener('resize', onWindowResize);
	window.addEventListener('mousemove', onMouseMove, false);;
}


function initInteraction() {

	// WebGLRenderer instance with antialiasing and transparency enabled
	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);


	// Camera control with the mouse
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.target.set(0, 0, 0);
	controls.enablePan = false;
	controls.enableZoom = false;
	controls.update();


	// Clock for animating independent of framerate
	clock = new THREE.Clock();


	// Raycaster for mouse interaction and vec2 for 
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();
	storedMaterial = new THREE.Material();
}


function initScene() {

	// Perspective camera to view scene, y-dir is up
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.set(0, 15, 15);


	// Data structure to place the scene in
	scene = new THREE.Scene();


	// Lighting the scene

	// ambient light to illuminate shadows slightly
	scene.add(new THREE.AmbientLight(0x404040, 3));


	// directional light to show geometry and material
	const dirLight = new THREE.DirectionalLight(0xffffff, 3);
	dirLight.position.set(5, 10, 1);
	scene.add(dirLight);


	// Adding Geometry

	// floor to place interesting gallery geometry on
	let geometry = new THREE.BoxGeometry(10, 0.1, 10);
	let material = new THREE.MeshPhongMaterial({
		color: 0x909090,
		shininess: 10,
		specular: 0xa0a0a0
	});
	const floor = new THREE.Mesh(geometry, material);
	scene.add(floor);


	// icosahedron test geometry
	geometry = new THREE.SphereGeometry(2, 5, 5);
	material = new THREE.MeshPhongMaterial({
		color: 0xfab330,
		shininess: 80,
		specular: 0xffd050,
		flatShading: true
	})
	icosahedron = new THREE.Mesh(geometry, material);
	icosahedron.position.set(0, 2, 0);
	scene.add(icosahedron);
	projects.push(icosahedron);
}


function renderAnimation() {

	// render state from last frame and tell window to call this again once its done
	render();
	requestAnimationFrame(renderAnimation);


	// get time since last frame and update state
	const delta = clock.getDelta();
	update(delta);
}


function render() {

	// get the renderer to draw the scene
	renderer.render(scene, camera);
}


function update(t) {

	// spin the icosahedron at 1 Hz about the y-axis
	icosahedron.rotation.y += t;


	// check for mousing over project objects and update materials

	// update the raycaster with the camera and mouse positions
	raycaster.setFromCamera(mouse, camera);


	// handle intersections
	const intersects = raycaster.intersectObjects( projects );
	if (intersects.length > 0) {

		// if the first intersected object is new
		if (intersects[0].object != intersected ) {

			// revert color of previous object
			if (intersected) intersected.material.setValues( intersected.savedValues );


			// record new object, save old values, set new values
			intersected = intersects[0].object;
			intersected.savedValues = {color: intersected.material.color.getHex(), specular: intersected.material.specular.getHex() };
			intersected.material.setValues( {color: 0x1758cf, specular: 0x3778ef} );
		}
	} else {

		// revert color of previous object
		if (intersected) intersected.material.setValues( intersected.savedValues );


		// no intersections
		intersected = null;
	}
}


function onWindowResize() {

	// Update the size of the renderer to match the window size
	renderer.setSize(window.innerWidth, window.innerHeight);


	// Update camera to maintain perspective
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}


function onMouseMove(event) {

	// update mouse position
	// convert from browser coordinates to camera coordinates [-1,1] x and y
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}