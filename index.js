import * as THREE from './three.js-master/build/three.module.js'
import {OrbitControls} from './three.js-master/examples/jsm/controls/OrbitControls.js'
import vShader from './shaders/vertexShader.glsl.js'
import fShader from './shaders/fragmentShader.glsl.js'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

// Boilerplate code
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
camera.position.z = 3
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
scene.add(cubeMesh)



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