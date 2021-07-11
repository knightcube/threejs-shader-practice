import * as THREE from './three.js-master/build/three.module.js'
import {OrbitControls} from './three.js-master/examples/jsm/controls/OrbitControls.js'
import vShader from './shaders/vertexShader.glsl.js'
import fShader from './shaders/fragmentShader.glsl.js'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1,1,1)
const customShaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vShader,
    fragmentShader: fShader
})
const material = new THREE.MeshBasicMaterial({
    color: 'blue'
})
const cubeMesh = new THREE.Mesh(geometry,customShaderMaterial)
scene.add(cubeMesh)

// Boilerplate code
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableZoom = false;
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const tick = ()=>{
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick)
    controls.update()
}

tick()