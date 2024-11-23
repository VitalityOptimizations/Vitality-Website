import * as THREE from 'three';

// THREE.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();

// Scroll-triggered animations example
document.querySelectorAll('.animated').forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(1.05)';
        element.style.transition = 'transform 0.3s ease-in-out';
    });
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1)';
    });
});

// Smooth Scroll for Internal Links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Apply smooth scroll only for internal links (e.g., #about-vitality)
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        // Allow external links (e.g., /purchase, /faq) to work normally
    });
});

// Remove ".html" from URLs
document.addEventListener('DOMContentLoaded', function () {
    var url = window.location.pathname;
    if (url.endsWith('.html')) {
        var newUrl = url.replace('.html', '');
        window.history.replaceState(null, '', newUrl);
    }
});

// AOS Initialization (Animation on Scroll)
document.addEventListener('DOMContentLoaded', function () {
    AOS.init();
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const navbarLinks = document.getElementById('navbar-links');

    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        navbarLinks.classList.toggle('active');
    });
});

// JavaScript to handle navbar sticky behavior
document.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) { // Once the user scrolls 50px from the top
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});
