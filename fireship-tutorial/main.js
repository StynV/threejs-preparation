import { OrbitControls } from 'three/examples/jsm/Addons.js'
import './style.css'

import * as THREE from 'three'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75, // FIELD OF VIEW
    window.innerWidth / window.innerHeight, // ASPECT RATIO
    0.1, 1000 // VIEW FRUSTUM
)

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

// renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 })
const torus = new THREE.Mesh(geometry, material)
scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20, 20, 20)
// scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)
scene.add(
    lightHelper,
    // gridHelper
)

const controls = new OrbitControls(camera, renderer.domElement)

const addStar = () => {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

    star.position.set(x, y, z)
    scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture

const texture = new THREE.TextureLoader().load('jeff.png')
const jeff = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: texture })
)

scene.add(jeff)

const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({ map: moonTexture })
)
scene.add(moon)

moon.position.z = 30
moon.position.setX(-10)

const moveCamera = () => {
    const t = document.body.getBoundingClientRect().top
    torus.rotation.x += 0.05
    torus.rotation.y += 0.075
    torus.rotation.z += 0.05

    jeff.rotation.y += 0.01
    jeff.rotation.x += 0.01

    camera.position.z = t * -0.01
    camera.position.x = t * -0.0002
    camera.position.y = t * -0.0002
}

document.body.onscroll = moveCamera

const animate = () => {
    requestAnimationFrame(animate)

    torus.rotation.x += 0.005
    torus.rotation.y += 0.005
    torus.rotation.z += 0.005
    
    controls.update()

    renderer.render(scene, camera)
}

animate()