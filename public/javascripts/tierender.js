var container, stats;

var camera, cameraTarget, scene, renderer;

var mouseX = 0, mouseY = 0;

var mouseState = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {


	container = document.getElementById( "tie-render" );
  document.body.appendChild( container );
	camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 15 );
	camera.position.set( -.5, .15, 2);

	cameraTarget = new THREE.Vector3( 1, -0.25, -1 );

	scene = new THREE.Scene();

  var manager = new THREE.LoadingManager();
  var textureLoader = new THREE.ImageLoader(manager);
  var texture = new THREE.Texture();

	textureLoader.load( '/textures/polka.jpg', function ( image ) {
		texture.image = image;
		texture.needsUpdate = true;
	} );

  var modelLoader = new THREE.OBJLoader();
	modelLoader.load( "/models/BowTie2.obj", function ( object ) {
    object.traverse(function(child) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = texture;
			}

    });
		object.position.x = .2;
		scene.add( object );
	});
	// Lights

  var light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
  scene.add( light );

	// renderer
	renderer = new THREE.WebGLRenderer( { antialias: true, alpha:true } );

	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.cullFace = THREE.CullFaceBack;
	container.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function onDocumentMouseMove( event ) {
	mouseX = ( event.clientX - windowHalfX ) / 2;
	mouseY = ( event.clientY - windowHalfY ) / 2;
}

function render() {
	document.body.onmousedown = function() {
		mouseState = 1;
	}
	document.body.onmouseup = function() {
		mouseState = 0;
	}

	if(camera.position.x > 2) {
		camera.position.x = 2;
	} else if(camera.position.x < -.5) {
		camera.position.x = -.5;
	}

	if(camera.position.y < -.5) {
		camera.position.y = -.5;
	} else if (camera.position.y > .5) {
		camera.position.y = .5;
	}

	if (mouseState == 1) {
	camera.position.x -= (mouseX - camera.position.x) * 0.0005;
	camera.position.y -= ( - mouseY - camera.position.y ) * 0.0005;
	};

	camera.lookAt( cameraTarget );
	renderer.render( scene, camera );
}
