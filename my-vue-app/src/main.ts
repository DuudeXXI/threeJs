import './style.scss'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/Addons';

const scene =  new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({

    canvas: document.querySelector("#bg"),
    gammaOutput: true,
})

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10,3,16,100)
// const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe:true}); // this one is used for prototyping figure
const material = new THREE.MeshPhongMaterial({color: 0x42e285});
const torus = new THREE.Mesh (geometry,material);

scene.add(torus);
// lighting
//ambient
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
//pointlights
const pointLightCenter = new THREE.PointLight(0xffffff, 200);
pointLightCenter.position.set(0,0,0);

const pointLight= new THREE.PointLight(0xffffff, 800);
pointLight.position.set(0,0,20);

scene.add(pointLightCenter,ambientLight, pointLight);

// helpers
const lightHelper = new THREE.PointLightHelper(pointLightCenter);
const lightHelper_2 = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,10);
scene.add(lightHelper,gridHelper, lightHelper_2)

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
}
animate();