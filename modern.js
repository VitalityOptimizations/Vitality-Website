/**
 * Modern.js - Main JavaScript file for Vitality Optimization Website
 * This file combines all modern components into a single file
 */

/**
 * Modern.js - Main JavaScript file for Vitality Optimization Website
 * This file combines all modern components into a single file
 */

// Simple preloader with guaranteed progress
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector('.preloader') || createSimplePreloader();
  const progressBar = preloader.querySelector('.preloader-progress-bar');
  const progressCounter = preloader.querySelector('.preloader-counter');
  
  // Force the preloader to show progress quickly
  let progress = 0;
  const interval = setInterval(() => {
    progress += 5;
    if (progress > 100) {
      progress = 100;
      clearInterval(interval);
      
      // Hide preloader
      setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        document.body.classList.remove('no-scroll');
        
        // Remove preloader after animation
        setTimeout(() => {
          preloader.remove();
          
          // Initialize rest of the site
          initializeComponents();
        }, 600);
      }, 200);
    }
    
    // Update UI
    progressBar.style.width = `${progress}%`;
    progressCounter.textContent = `${Math.floor(progress)}%`;
  }, 50);
});

// Create a simple preloader if none exists
function createSimplePreloader() {
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  
  preloader.innerHTML = `
    <div class="preloader-content">
      <h1 class="preloader-logo">VITALITY</h1>
      <div class="preloader-progress-container">
        <div class="preloader-progress-bar"></div>
      </div>
      <div class="preloader-counter">0%</div>
    </div>
  `;
  
  document.body.appendChild(preloader);
  document.body.classList.add('no-scroll');
  
  return preloader;
}

// Initialize all the modern website components
function initializeComponents() {
  window.customCursor = new CustomCursor();
  window.modernNavigation = new ModernNavigation();
  window.webglBackground = new WebGLBackground();
  window.scrollAnimations = new ScrollAnimations();
  window.pageTransitions = new PageTransitions();
}



// ============================================================================
// WebGL Background Effect Class
// ============================================================================
class WebGLBackground {
  constructor() {
    this.container = document.querySelector('.main-hero');
    if (!this.container) return;
    
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
    this.renderer.domElement.classList.add('webgl-background');
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
    
    if (window.gsap) {
      gsap.to(this.particles.rotation, {
        x: mouseY * 0.1,
        y: mouseX * 0.1,
        duration: 2
      });
    } else {
      this.particles.rotation.x = mouseY * 0.1;
      this.particles.rotation.y = mouseX * 0.1;
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    
    this.particles.rotation.x += 0.0005;
    this.particles.rotation.y += 0.0005;
    
    this.renderer.render(this.scene, this.camera);
  }
}

// ============================================================================
// Custom Cursor Class
// ============================================================================
class CustomCursor {
  constructor() {
    this.createCursor();
    this.addEventListeners();
  }

  createCursor() {
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    
    this.cursorFollower = document.createElement('div');
    this.cursorFollower.className = 'cursor-follower';
    
    document.body.appendChild(this.cursor);
    document.body.appendChild(this.cursorFollower);
  }

  addEventListeners() {
    // Mouse move event
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    
    // Mouse enter/leave events for links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .cta-button, .menu-toggle, .feature-item');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', this.onMouseEnter.bind(this));
      element.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    });
    
    // Mouse down/up events
    document.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onMouseMove(e) {
    // Update cursor position
    this.cursor.style.left = `${e.clientX}px`;
    this.cursor.style.top = `${e.clientY}px`;
    
    // Update follower with a delay
    if (window.gsap) {
      gsap.to(this.cursorFollower, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.15
      });
    } else {
      this.cursorFollower.style.left = `${e.clientX}px`;
      this.cursorFollower.style.top = `${e.clientY}px`;
    }
  }

  onMouseEnter() {
    this.cursor.classList.add('cursor-hover');
    this.cursorFollower.classList.add('follower-hover');
  }

  onMouseLeave() {
    this.cursor.classList.remove('cursor-hover');
    this.cursorFollower.classList.remove('follower-hover');
  }

  onMouseDown() {
    this.cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    this.cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
  }

  onMouseUp() {
    this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    this.cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
  }
}

// ============================================================================
// Modern Sidebar Navigation Class
// ============================================================================
class ModernNavigation {
  constructor() {
    this.createMenuButton();
    this.createSidebar();
    this.isOpen = false;
    this.init();
  }

  createMenuButton() {
    this.menuBtn = document.createElement('div');
    this.menuBtn.className = 'menu-toggle';
    this.menuBtn.innerHTML = `
      <div class="menu-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    document.body.appendChild(this.menuBtn);
  }

  createSidebar() {
    this.sidebar = document.createElement('div');
    this.sidebar.className = 'modern-sidebar';
    this.sidebar.innerHTML = `
      <div class="sidebar-content">
        <div class="sidebar-header">
          <div class="logo">VITALITY</div>
        </div>
        <nav class="sidebar-nav">
          <ul>
            <li><a href="/" data-text="Home">Home</a></li>
            <li><a href="/#about-vitality" data-text="About">About</a></li>
            <li><a href="/purchase" data-text="Purchase">Purchase</a></li>
            <li><a href="/faq" data-text="FAQ">FAQ</a></li>
            <li><a href="/Affiliate" data-text="Affiliate">Affiliate</a></li>
          </ul>
        </nav>
        <div class="sidebar-footer">
          <div class="social-links">
            <a href="https://discord.gg/vitalityoptimizations" target="_blank" class="social-link">
              <img src="logo-discord.svg" alt="Discord" width="24" height="24">
            </a>
          </div>
          <div class="copyright">© 2024 Vitality Optimization</div>
        </div>
      </div>
      <div class="sidebar-backdrop"></div>
    `;
    document.body.appendChild(this.sidebar);
  }

  init() {
    this.menuBtn.addEventListener('click', this.toggleMenu.bind(this));
    this.sidebar.querySelector('.sidebar-backdrop').addEventListener('click', this.closeMenu.bind(this));
    
    // Add animation for links
    this.sidebar.querySelectorAll('.sidebar-nav a').forEach(link => {
      link.addEventListener('mouseenter', this.animateLink.bind(this));
      link.addEventListener('mouseleave', this.resetLink.bind(this));
      link.addEventListener('click', this.handleLinkClick.bind(this));
    });
  }

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isOpen = true;
    document.body.classList.add('menu-open');
    this.menuBtn.classList.add('active');
    this.sidebar.classList.add('active');
    
    // Animate links appearance
    if (window.gsap) {
      gsap.fromTo(
        this.sidebar.querySelectorAll('.sidebar-nav li'), 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, delay: 0.2 }
      );
    }
  }

  closeMenu() {
    this.isOpen = false;
    document.body.classList.remove('menu-open');
    this.menuBtn.classList.remove('active');
    this.sidebar.classList.remove('active');
  }

  animateLink(e) {
    const link = e.currentTarget;
    const text = link.getAttribute('data-text');
    
    // Create hover effect
    link.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.style.animationDelay = `${i * 0.05}s`;
      span.textContent = text[i];
      link.appendChild(span);
    }
  }

  resetLink(e) {
    const link = e.currentTarget;
    link.textContent = link.getAttribute('data-text');
  }

  handleLinkClick(e) {
    const link = e.currentTarget;
    const href = link.getAttribute('href');
    
    // Close menu
    this.closeMenu();
    
    // Handle internal links with smooth scroll
    if (href.startsWith('#') || href.includes('#')) {
      e.preventDefault();
      
      // Extract the ID
      const id = href.includes('#') ? href.split('#')[1] : href.substring(1);
      const target = document.getElementById(id);
      
      if (target) {
        // Smooth scroll to target
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}

// ============================================================================
// Preloader Animation System
// ============================================================================
class Preloader {
  constructor() {
    this.createPreloader();
    this.loadingProgress = 0;
    this.loadingStep = 1;
    this.loadingInterval = null;
    this.imageCount = 0;
    this.imagesLoaded = 0;
  }

  createPreloader() {
    this.preloader = document.createElement('div');
    this.preloader.className = 'preloader';
    
    // Create preloader content
    this.preloader.innerHTML = `
      <div class="preloader-content">
        <h1 class="preloader-logo">VITALITY</h1>
        <div class="preloader-progress-container">
          <div class="preloader-progress-bar"></div>
        </div>
        <div class="preloader-counter">0%</div>
      </div>
    `;
    
    document.body.appendChild(this.preloader);
    
    // Get elements
    this.progressBar = document.querySelector('.preloader-progress-bar');
    this.progressCounter = document.querySelector('.preloader-counter');
    
    // Start counting images
    this.countImages();
  }

  countImages() {
    // Count all images on the page
    const images = document.querySelectorAll('img');
    this.imageCount = images.length;
    
    // If no images, simulate loading
    if (this.imageCount === 0) {
      this.simulateLoading();
      return;
    }
    
    // Listen for image load events
    images.forEach(img => {
      // Check if image is already loaded
      if (img.complete) {
        this.imageLoaded();
      } else {
        img.addEventListener('load', () => this.imageLoaded());
        img.addEventListener('error', () => this.imageLoaded()); // Count errors as loaded to avoid hanging
      }
    });
  }

  imageLoaded() {
    this.imagesLoaded++;
    
    // Calculate progress percentage
    const progress = Math.floor((this.imagesLoaded / this.imageCount) * 100);
    this.updateProgress(progress);
    
    // Check if all images are loaded
    if (this.imagesLoaded >= this.imageCount) {
      // Ensure we reach 100%
      this.updateProgress(100);
      
      // Hide preloader after a small delay
      setTimeout(() => this.hidePreloader(), 800);
    }
  }

  simulateLoading() {
    // Simulate loading progress
    this.loadingInterval = setInterval(() => {
      this.loadingProgress += this.loadingStep;
      
      // Slow down as we approach 100%
      if (this.loadingProgress > 80) {
        this.loadingStep = 0.5;
      }
      
      if (this.loadingProgress >= 100) {
        this.loadingProgress = 100;
        clearInterval(this.loadingInterval);
        setTimeout(() => this.hidePreloader(), 800);
      }
      
      this.updateProgress(this.loadingProgress);
    }, 30);
  }

  updateProgress(progress) {
  if (isNaN(progress)) progress = 0; // Fix for NaN
  this.progressBar.style.width = `${progress}%`;
  this.progressCounter.textContent = `${Math.floor(progress)}%`;
}

  hidePreloader() {
    // Add class to animate out
    this.preloader.classList.add('preloader-hidden');
    
    // Enable scroll
    document.body.classList.remove('no-scroll');
    
    // Remove preloader after animation
    setTimeout(() => {
      this.preloader.remove();
      
      // Trigger entrance animations for the content
      this.animateContent();
    }, 600);
  }

  animateContent() {
    // Animate hero section elements
    const heroElements = document.querySelectorAll('.main-hero *');
    
    if (window.gsap) {
      gsap.fromTo(
        heroElements,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.08, 
          duration: 0.8, 
          ease: "power3.out" 
        }
      );
    }
  }
}

// ============================================================================
// Scroll Animations Class
// ============================================================================
class ScrollAnimations {
  constructor() {
    this.initialized = false;
    this.init();
  }

  init() {
    // Wait for GSAP and ScrollTrigger to be loaded
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);
      
      // Initialize animations
      this.initScrollAnimations();
      this.initialized = true;
    } else {
      // Retry after a delay if libraries aren't loaded yet
      setTimeout(() => {
        if (!this.initialized) this.init();
      }, 100);
    }
  }

  initScrollAnimations() {
    // Hero section parallax effect
    const heroSection = document.querySelector('.main-hero');
    const heroBanner = document.querySelector('.hero-banner');
    
    if (heroSection && heroBanner) {
      gsap.to('.hero-banner', {
        scrollTrigger: {
          trigger: '.main-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: 200,
        scale: 1.1,
        opacity: 0.5
      });
    }
    
    // Feature items staggered animation
    const featureItems = document.querySelectorAll('.feature-item');
    if (featureItems.length) {
      gsap.from('.feature-item', {
        scrollTrigger: {
          trigger: '.features',
          start: 'top 80%',
          end: 'bottom 80%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
      });
    }
    
    // About section animations
    const aboutColumns = document.querySelectorAll('.about-column');
    if (aboutColumns.length) {
      aboutColumns.forEach((column, index) => {
        gsap.from(column, {
          scrollTrigger: {
            trigger: column,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          x: index % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out'
        });
      });
    }
    
    // Performance section split animation
    const perfSection = document.querySelector('.performance-section');
    if (perfSection) {
      // Animate image
      gsap.from('.performance-image img', {
        scrollTrigger: {
          trigger: perfSection,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
      
      // Animate stats
      gsap.from('.performance-stats', {
        scrollTrigger: {
          trigger: perfSection,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
      
      // Animate FPS bars
      const fpsComparison = document.querySelector('.fps-comparison');
      if (fpsComparison) {
        gsap.from('.fps-bar .with-vitality', {
          scrollTrigger: {
            trigger: '.fps-comparison',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          width: '0%',
          duration: 1.5,
          ease: 'power3.out'
        });
        
        gsap.from('.fps-bar .without-vitality', {
          scrollTrigger: {
            trigger: '.fps-comparison',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          width: '0%',
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.3
        });
      }
    }
    
    // FAQ items reveal animation
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length) {
      faqItems.forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out'
        });
      });
    }
    
    // Footer animation
    const footer = document.querySelector('footer');
    if (footer) {
      gsap.from('footer > div > div', {
        scrollTrigger: {
          trigger: 'footer',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
      });
    }
    
    // Create scroll indicator
    this.createScrollIndicator();
  }

  createScrollIndicator() {
    // Create scroll progress indicator
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = '<div class="scroll-indicator-progress"></div>';
    document.body.appendChild(indicator);
    
    // Update progress on scroll
    const progress = indicator.querySelector('.scroll-indicator-progress');
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      
      progress.style.width = `${scrollPercentage}%`;
    });
  }
}

// ============================================================================
// Page Transitions Class
// ============================================================================
class PageTransitions {
  constructor() {
    this.initialized = false;
    this.init();
  }

  init() {
    // Check if Barba.js is loaded
    if (typeof barba !== 'undefined') {
      this.initBarba();
      this.initialized = true;
    } else {
      // Use fallback if Barba.js is not available
      this.setupFallbackTransitions();
      this.initialized = true;
    }
  }

  initBarba() {
    // Initialize Barba.js transitions
    barba.init({
      transitions: [{
        name: 'opacity-transition',
        leave(data) {
          // Create animation for leaving the current page
          return gsap.to(data.current.container, {
            opacity: 0,
            duration: 0.5
          });
        },
        enter(data) {
          // Scroll to top of the page
          window.scrollTo(0, 0);
          
          // Create animation for entering the new page
          return gsap.from(data.next.container, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              // Re-initialize components on the new page
              this.reinitializeComponents();
            }
          });
        }
      }]
    });
  }

  setupFallbackTransitions() {
    // Manual link click handling for page transitions
    document.addEventListener('click', (e) => {
      // Only handle internal links
      const target = e.target.closest('a');
      if (!target) return;
      
      const href = target.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
      
      // Prevent default link behavior
      e.preventDefault();
      
      // Create transition effect
      this.createTransitionEffect(href);
    });
  }

  createTransitionEffect(href) {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    document.body.appendChild(overlay);
    
    // Animate overlay
    if (window.gsap) {
      gsap.to(overlay, {
        y: 0,
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => {
          // Navigate to new page
          window.location.href = href;
        }
      });
    } else {
      // Fallback without GSAP
      overlay.style.transform = 'translateY(0)';
      overlay.addEventListener('transitionend', () => {
        window.location.href = href;
      });
    }
  }

  reinitializeComponents() {
    // Re-initialize all the components on page change
    if (window.customCursor) window.customCursor = new CustomCursor();
    if (window.modernNavigation) window.modernNavigation = new ModernNavigation();
    if (window.webglBackground) window.webglBackground = new WebGLBackground();
    if (window.scrollAnimations) window.scrollAnimations = new ScrollAnimations();
  }
}