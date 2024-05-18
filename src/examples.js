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