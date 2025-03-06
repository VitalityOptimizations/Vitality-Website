// Create a three.js WebGL background effect
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

class WebGLBackground {
  constructor() {
    this.container = document.querySelector('.main-hero');
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.createParticles();
    this.addListeners();
    this.animate();
  }

  createScene() {
    this.scene = new THREE.Scene();
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.prepend(this.renderer.domElement);
    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.style.top = 0;
    this.renderer.domElement.style.left = 0;
    this.renderer.domElement.style.zIndex = 1;
  }

  createParticles() {
    const particleCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      // Color - purple/blue theme
      colors[i] = Math.random() * 0.5 + 0.5; // R (0.5-1.0)
      colors[i + 1] = Math.random() * 0.2; // G (0.0-0.2)
      colors[i + 2] = Math.random() * 0.5 + 0.5; // B (0.5-1.0)
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  addListeners() {
    window.addEventListener('resize', this.onResize.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
    gsap.to(this.particles.rotation, {
      x: mouseY * 0.1,
      y: mouseX * 0.1,
      duration: 2
    });
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    
    this.particles.rotation.x += 0.0005;
    this.particles.rotation.y += 0.0005;
    
    this.renderer.render(this.scene, this.camera);
  }
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', () => {
  const webglBackground = new WebGLBackground();
});