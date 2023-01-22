import './style.css'


// import * as THREE from 'three';
import { Scene,PerspectiveCamera,WebGLRenderer,PointLight,PointLightHelper,GridHelper } from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new Scene();
// const ambientlight= new AmbientLight(0xffffff);
// scene.add(ambientlight);
const pointLight= new PointLight(0xffffff);
pointLight.position.set(40,40,40);
scene.add(pointLight);

const pointLightHelper = new PointLightHelper(pointLight);
const gridHelper = new GridHelper(200,5);
scene.add(pointLightHelper,gridHelper);



const camera = new PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const  renderer = new WebGLRenderer({
  canvas :document.querySelector('#bg'),
});
const controls = new OrbitControls(camera,renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);


// const geometry= new TorusGeometry(10,3,16,100);

// const material = new MeshBasicMaterial({color: 0xFF6347,wireframe:true});

// const torus=new Mesh(geometry,material);

// scene.add(torus);

const loader = new GLTFLoader();

var brain;

loader.load( './brain.glb', function ( gltf ) {

	scene.add( gltf.scene );
  brain=gltf.asset;

}, undefined, function ( error ) {

	console.error( error );

} );

function animate(){
  requestAnimationFrame(animate);
  // brain.rotation.x+=0.01;
  // torus.rotation.x+=0.01;
  // torus.rotation.y+=0.005;
  // torus.rotation.z+=0.01;
  controls.update();

  renderer.render(scene,camera);
}

animate();
