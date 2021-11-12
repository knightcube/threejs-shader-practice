import * as THREE from './three.js-master/build/three.module.js'
import {OrbitControls} from './three.js-master/examples/jsm/controls/OrbitControls.js'
import vShader from './shaders/vertexShader.glsl.js'
import fShader from './shaders/fragmentShader.glsl.js'
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

// Boilerplate code
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
camera.position.z = 2
scene.add(camera)

const geometry = new THREE.BoxGeometry(2,2,2)
//    uniform vec2 charSize;
// uniform float charResolution;
// uniform vec3 color;
// uniform vec4 backgroundColor;
// uniform vec2 resolution;
const uniforms = {
    time: {value:0.0},
    u_resolution: { value:{ x:window.innerWidth, y:window.innerHeight }},
    charSize:  { value:{ x:2.0, y:1.5 }},
    charResolution: {value:5.5},
    color: {value: new THREE.Color('green')},
    resolution: { value:{ x:1.0, y:1.0 }},
    speed: {value: 18.0}
}

const customShaderMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vShader,
    fragmentShader: fShader
})
console.log(uniforms)
const material = new THREE.MeshBasicMaterial({
    color: 'blue'
})
const cubeMesh = new THREE.Mesh(geometry,customShaderMaterial)
// scene.add(cubeMesh)


const loader = new GLTFLoader()
loader.load('./assets/roncho/source/roncho.glb', function(glb){
    console.log(glb);
    const root = glb.scene;
    const rootMaterials = glb.scene.children[0].material
    glb.scene.children[0].material = customShaderMaterial;
    console.log(glb.scene.children[0])
    console.log(glb.scene.children[0])

    // for(let i = 0; i<glb.scene.children[0].children[0].children.length; i++){
    //     let eachMesh = glb.scene.children[0].children[0].children[i];
    //     console.log(glb.scene.children[0].children[0].children[i]);
    //     if(eachMesh instanceof THREE.Mesh){
    //         glb.scene.children[0].children[0].children[i].material = customShaderMaterial;
    //     }else{
    //         console.log("This is not a mesh=>"+eachMesh);
    //     }
    
    // }

    // for (var eachMesh in glb.scene.children[0].children[0].children){
    //     console.log(eachMesh);
    // }
    // glb.scene.children[0].material = customShaderMaterial;
    console.log(rootMaterials);
    scene.add(root);
}, function(xhr){
    console.log((xhr.loaded/xhr.total * 100) +"% loaded");
}, function(error){
    console.log("An error occurred=>",error);
})


const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 1, 5)
scene.add(light)

const controls = new OrbitControls(camera, canvas)
controls.enableZoom = false;
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
const clock = new THREE.Clock()
const tick = ()=>{
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick)
    controls.update()
    uniforms.time.value = clock.getElapsedTime()
}

tick()