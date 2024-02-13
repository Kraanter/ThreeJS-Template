import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(
  90,     // fov - Camera frustum vertical field of view
  window.innerWidth / window.innerHeight, // aspect - Camera frustum aspect ratio
  0.1,   // near - Camera frustum near plane
  6000   // far - Camera frustum far plane
);
// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const materials = [];
materials.push(new THREE.MeshNormalMaterial());
materials.push(new THREE.MeshBasicMaterial({ color: 0xad0000 }));
materials.push(new THREE.MeshPhongMaterial({ color: 0xad0000, shininess: 100 }));
materials.push(new THREE.MeshLambertMaterial({ color: 0xad0000 }));
materials.push(new THREE.MeshBasicMaterial({ color: 0xad0000, transparent: true, opacity: .2 }));
materials.push(new THREE.MeshBasicMaterial({ color: 0xad0000, wireframe: true }));

// Move camera from center
camera.position.x = 0; // move right from center of scene
camera.position.y = 0; // move up from center of scene
camera.position.z = 4; // move camera away from center of scene

const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(0, 0, 1);
scene.add(light);

const cubeLoader = new THREE.CubeTextureLoader();
cubeLoader.setPath('models/');
const directions = ["posx.jpg", "negx.jpg", "posy.jpg", "negy.jpg", "posz.jpg", "negz.jpg"];

const textureCube = cubeLoader.load(directions);

scene.background = textureCube;

const gltfLoader = new GLTFLoader();

gltfLoader.load('/models/teapot.js', (gltf) => {
  scene.add(gltf.scene)
}, () => console.log("loading"), (err) => {
  console.error("Erorr", err)
});

const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 2;
controls.maxDistance = 10;
controls.target.set(0, 0, - 0.2);
controls.update();

let i = 0;
setInterval(() => {
  if (i >= materials.length)
    i = 0;
  // cube.material = materials[i]
  i++;
}, 1000)

const render = function() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

render();
