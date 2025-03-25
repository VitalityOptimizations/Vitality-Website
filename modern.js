/**
 * VITALITY OPTIMIZATION - Enhanced Modern JavaScript
 * Improved animations and WebGL effects for a Lusion-inspired experience
 */

// Initialize all components when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize core components
  window.App = new AppController();
});

// ============================================================
// Main App Controller
// ============================================================
class AppController {
  constructor() {
    // Initialize components
    this.preloader = new ImprovedPreloader(() => {
      this.initializeCore();
    });
  }

  initializeCore() {
    // Initialize core components after preloader
    this.cursor = new AdvancedCursor();
    this.navigation = new ImmersiveNavigation();
    this.scrollAnimations = new EnhancedScrollAnimations();
    
    // Check if WebGL is supported
    if (this.isWebGLSupported()) {
      this.webglBackground = new PurpleParticleEffect();
    }
    
    this.magneticElements = new MagneticElements();
    this.pageTransitions = new SmoothPageTransitions();
    
    // Initialize scroll indicator
    this.scrollIndicator = new ScrollProgressIndicator();
    
    // Initialize documentation-specific enhancements if on documentation page
    if (document.querySelector('.documentation-container')) {
      this.documentationEnhancements = new DocumentationEnhancements();
    }
    
    // Add event listeners
    this.addEventListeners();
    
    // Animate hero section
    this.animateHeroSection();
    
    // Mark as loaded
    document.body.classList.add('loaded');
  }
  
  isWebGLSupported() {
    try {
      const canvas = document.createElement('canvas');
      return !!window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch(e) {
      return false;
    }
  }
  
  addEventListeners() {
    // Resize handler
    window.addEventListener('resize', this.handleResize.bind(this));
    
    // Visibility change handler for performance
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }
  
  handleResize() {
    // Notify all components about resize
    if (this.webglBackground) this.webglBackground.onResize();
    if (this.cursor) this.cursor.onResize();
    if (this.navigation) this.navigation.onResize();
  }
  
  handleVisibilityChange() {
    // Pause/resume animations based on page visibility
    if (document.hidden) {
      // Pause heavy animations when tab is not visible
      if (this.webglBackground) this.webglBackground.pause();
    } else {
      // Resume animations when tab becomes visible
      if (this.webglBackground) this.webglBackground.resume();
    }
  }
  
  animateHeroSection() {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroCta = document.querySelector('.hero-cta');
    
    if (!heroTitle) return;
    
    // Animate with GSAP if available, otherwise use CSS transitions
    if (window.gsap) {
      const tl = gsap.timeline();
      
      tl.to(heroTitle, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
      })
      .to(heroDescription, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.8")
      .to(heroCta, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.8");
    } else {
      // Fallback to CSS animations
      heroTitle.style.transition = "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
      heroDescription.style.transition = "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s";
      heroCta.style.transition = "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s";
      
      setTimeout(() => {
        heroTitle.style.transform = "translateY(0)";
        heroTitle.style.opacity = "1";
        
        setTimeout(() => {
          heroDescription.style.transform = "translateY(0)";
          heroDescription.style.opacity = "1";
          
          setTimeout(() => {
            heroCta.style.transform = "translateY(0)";
            heroCta.style.opacity = "1";
          }, 200);
        }, 200);
      }, 100);
    }

    // Animate feature sections
    const featureSections = document.querySelectorAll('.feature-item, .about-column');
    if (featureSections.length && window.gsap) {
      // Set initial state
      gsap.set(featureSections, { y: 30, opacity: 0 });
      
      // Create a delayed animation
      setTimeout(() => {
        gsap.to(featureSections, {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out"
        });
      }, 800); // Delay after hero animation
    }
  }
}

// ============================================================
// Advanced Preloader with 3D Animation - FIXED VERSION
// ============================================================
class ImprovedPreloader {
  constructor(onComplete) {
    this.onComplete = onComplete;
    this.progressLimit = 100;
    this.currentProgress = 0;
    this.loadingSpeed = 1;
    this.assetsLoaded = false;
    this.loadTimeout = null;
    this.maxLoadTime = 8000; // Maximum loading time (8 seconds) before force complete
    
    this.setupPreloader();
    this.addSkipButton(); // Add manual skip button
    this.loadAssets();
    
    // Safety timeout - force complete after max time
    this.loadTimeout = setTimeout(() => {
      this.forceComplete();
    }, this.maxLoadTime);
  }
  
  setupPreloader() {
    // Get existing preloader or create one
    this.preloader = document.querySelector('.preloader');
    
    if (!this.preloader) {
      this.preloader = document.createElement('div');
      this.preloader.className = 'preloader';
      
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
    }
    
    // Get elements
    this.progressBar = this.preloader.querySelector('.preloader-progress-bar');
    this.progressCounter = this.preloader.querySelector('.preloader-counter');
    this.preloaderLogo = this.preloader.querySelector('.preloader-logo');
    
    // Apply 3D floating animation to logo
    if (window.gsap) {
      gsap.to(this.preloaderLogo, {
        rotationY: 10,
        rotationX: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    // Prevent scrolling during preload
    document.body.style.overflow = 'hidden';
  }
  
  addSkipButton() {
    // Create skip button for users to manually continue if loading gets stuck
    this.skipButton = document.createElement('button');
    this.skipButton.className = 'preloader-skip-button';
    this.skipButton.textContent = 'Click to Continue';
    this.skipButton.style.position = 'absolute';
    this.skipButton.style.bottom = '30px';
    this.skipButton.style.left = '50%';
    this.skipButton.style.transform = 'translateX(-50%)';
    this.skipButton.style.padding = '10px 20px';
    this.skipButton.style.backgroundColor = '#7534b3';
    this.skipButton.style.color = '#fff';
    this.skipButton.style.border = 'none';
    this.skipButton.style.borderRadius = '5px';
    this.skipButton.style.cursor = 'pointer';
    this.skipButton.style.fontFamily = 'var(--font-body, sans-serif)';
    this.skipButton.style.opacity = '0';
    this.skipButton.style.transition = 'opacity 0.3s ease';
    
    // Show skip button after 4 seconds
    setTimeout(() => {
      this.skipButton.style.opacity = '1';
    }, 4000);
    
    this.skipButton.addEventListener('click', () => {
      this.forceComplete();
    });
    
    this.preloader.appendChild(this.skipButton);
  }
  
  loadAssets() {
    // Start counting images and other assets
    this.countAssets();
    
    // Simulate minimum loading time with a backup timer
    setTimeout(() => {
      this.assetsLoaded = true;
      this.checkCompletion();
    }, 1500); // Reduced time for faster loading
    
    // Start progress animation
    this.animateProgress();
  }
  
  countAssets() {
    // Get all images, videos, and other assets
    const images = document.querySelectorAll('img');
    const videos = document.querySelectorAll('video');
    const iframes = document.querySelectorAll('iframe');
    
    this.totalAssets = images.length + videos.length + iframes.length;
    this.loadedAssets = 0;
    
    if (this.totalAssets === 0) {
      // If no assets, complete after a minimum time
      setTimeout(() => {
        this.progressTo(100, 1);
      }, 500);
      return;
    }
    
    // Track image loading
    images.forEach(img => {
      if (img.complete) {
        this.assetLoaded();
      } else {
        img.addEventListener('load', () => this.assetLoaded());
        img.addEventListener('error', () => this.assetLoaded()); // Count errors as loaded too
      }
    });
    
    // Track video loading
    videos.forEach(video => {
      if (video.readyState >= 3) {
        this.assetLoaded();
      } else {
        video.addEventListener('canplay', () => this.assetLoaded());
        video.addEventListener('error', () => this.assetLoaded());
      }
    });
    
    // Track iframe loading
    iframes.forEach(iframe => {
      iframe.addEventListener('load', () => this.assetLoaded());
      iframe.addEventListener('error', () => this.assetLoaded());
      
      // Fallback for iframes that never trigger load
      setTimeout(() => {
        this.assetLoaded();
      }, 1500);
    });
  }
  
  assetLoaded() {
    this.loadedAssets++;
    const progress = Math.min(100, Math.floor((this.loadedAssets / this.totalAssets) * 100));
    this.progressTo(progress, 0.5);
    
    if (this.loadedAssets >= this.totalAssets) {
      this.assetsLoaded = true;
      this.checkCompletion();
    }
  }
  
  animateProgress() {
    // Animate progress smoothly
    const incrementProgress = () => {
      if (this.currentProgress < this.progressLimit) {
        // Calculate new progress
        const increment = (this.progressLimit - this.currentProgress) * 0.05 * this.loadingSpeed;
        this.currentProgress += Math.max(0.1, increment);
        
        if (this.currentProgress > this.progressLimit) {
          this.currentProgress = this.progressLimit;
        }
        
        // Update UI
        this.updateProgress(this.currentProgress);
        
        // Continue animation
        if (!this.completed) {
          requestAnimationFrame(incrementProgress);
        }
      } else {
        this.checkCompletion();
      }
    };
    
    // Start animation
    requestAnimationFrame(incrementProgress);
  }
  
  progressTo(target, speed) {
    this.progressLimit = target;
    this.loadingSpeed = speed;
  }
  
  updateProgress(progress) {
    // Update progress bar and counter
    const rounded = Math.floor(progress);
    this.progressBar.style.width = `${progress}%`;
    this.progressCounter.textContent = `${rounded}%`;
    
    // If progress is at 100% for more than 2 seconds, force complete
    if (rounded >= 100) {
      setTimeout(() => {
        this.forceComplete();
      }, 2000);
    }
  }
  
  checkCompletion() {
    // Check if loading is complete
    if (this.currentProgress >= 100 && this.assetsLoaded) {
      this.completeLoading();
    }
  }
  
  forceComplete() {
    // Force completion regardless of actual loading status
    clearTimeout(this.loadTimeout);
    this.progressTo(100, 10); // Speed up to 100% quickly
    this.currentProgress = 100;
    this.updateProgress(100);
    this.completeLoading();
  }
  
  completeLoading() {
    // Mark as complete to prevent multiple calls
    if (this.completed) return;
    this.completed = true;
    
    // Add class for CSS transition
    this.preloader.classList.add('preloader-hidden');
    
    // Enable scrolling
    document.body.style.overflow = '';
    
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Clean up timeout
    clearTimeout(this.loadTimeout);
    
    // Remove preloader after transition
    setTimeout(() => {
      if (this.preloader && this.preloader.parentNode) {
        this.preloader.remove();
      }
      
      // Call onComplete callback
      if (this.onComplete) this.onComplete();
    }, 1000);
  }
}

// ============================================================
// Advanced Cursor with Effects
// ============================================================
class AdvancedCursor {
  constructor() {
    this.createCursor();
    this.position = { x: 0, y: 0 };
    this.targetPosition = { x: 0, y: 0 };
    this.cursorSize = { normal: 8, active: 18 };
    this.followerSize = { normal: 40, active: 60 };
    this.isActive = false;
    this.isDragging = false;
    this.isHidden = false;
    this.isTouch = 'ontouchstart' in window;
    
    // Don't initialize on touch devices
    if (this.isTouch) {
      this.disableCursor();
      return;
    }
    
    this.addEventListeners();
    this.animate();
  }
  
  createCursor() {
    // Create main cursor
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    
    // Create cursor follower
    this.cursorFollower = document.createElement('div');
    this.cursorFollower.className = 'cursor-follower';
    
    // Create text container
    this.cursorText = document.createElement('div');
    this.cursorText.className = 'cursor-text';
    this.cursorFollower.appendChild(this.cursorText);
    
    // Add to DOM
    document.body.appendChild(this.cursor);
    document.body.appendChild(this.cursorFollower);
    
    // Add class to body
    document.body.classList.add('has-custom-cursor');
  }
  
  disableCursor() {
    // Hide custom cursor on touch devices
    document.body.classList.remove('has-custom-cursor');
    
    if (this.cursor) this.cursor.remove();
    if (this.cursorFollower) this.cursorFollower.remove();
  }
  
  addEventListeners() {
    // Mouse movement
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    
    // Mouse events
    document.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
    
    // Mouse enter/leave window
    document.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    document.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    
    // Button and link hovers
    this.setupElementInteractions();
    
    // Add resize event
    window.addEventListener('resize', this.onResize.bind(this));
  }
  
  setupElementInteractions() {
    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .cta-button, .menu-toggle, .feature-item, .magnetic-button, .step, .doc-section, .tool-card, .requirement, .utility');
    
    interactiveElements.forEach(element => {
      // Mouse enter (hover start)
      element.addEventListener('mouseenter', () => {
        this.isActive = true;
        this.setCursorState('hover');
        
        // Check if element has data-cursor attribute
        if (element.dataset.cursor) {
          this.setCursorText(element.dataset.cursor);
        }
        
        // Special states
        if (element.classList.contains('view-project')) {
          this.setCursorState('view');
          this.setCursorText('View');
        }
      });
      
      // Mouse leave (hover end)
      element.addEventListener('mouseleave', () => {
        this.isActive = false;
        this.setCursorState('');
        this.setCursorText('');
      });
    });
    
    // Draggable elements
    const draggableElements = document.querySelectorAll('[data-draggable]');
    
    draggableElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.isDragging = true;
        this.setCursorState('drag');
        this.setCursorText('Drag');
      });
      
      element.addEventListener('mouseleave', () => {
        this.isDragging = false;
        this.setCursorState('');
        this.setCursorText('');
      });
    });
  }
  
  onMouseMove(e) {
    // Update target position
    this.targetPosition.x = e.clientX;
    this.targetPosition.y = e.clientY;
  }
  
  onMouseDown() {
    // Scale down cursor on click
    this.cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    this.cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
  }
  
  onMouseUp() {
    // Scale back cursor after click
    this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    this.cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
  }
  
  onMouseEnter() {
    // Show cursor when mouse enters window
    this.isHidden = false;
    this.cursor.style.opacity = '1';
    this.cursorFollower.style.opacity = '1';
  }
  
  onMouseLeave() {
    // Hide cursor when mouse leaves window
    this.isHidden = true;
    this.cursor.style.opacity = '0';
    this.cursorFollower.style.opacity = '0';
  }
  
  onResize() {
    // Handle any necessary adjustments on resize
  }
  
  setCursorState(state) {
    // Reset all states
    this.cursor.classList.remove('cursor-hover', 'cursor-drag', 'cursor-view');
    this.cursorFollower.classList.remove('follower-hover', 'follower-drag', 'follower-view');
    
    // Apply new state if provided
    if (state) {
      this.cursor.classList.add(`cursor-${state}`);
      this.cursorFollower.classList.add(`follower-${state}`);
    }
  }
  
  setCursorText(text) {
    this.cursorText.textContent = text;
    
    if (text) {
      this.cursorText.classList.add('active');
    } else {
      this.cursorText.classList.remove('active');
    }
  }
  
  animate() {
    // Skip animation if on touch device
    if (this.isTouch) return;
    
    // Smooth position interpolation
    this.position.x += (this.targetPosition.x - this.position.x) * 0.1;
    this.position.y += (this.targetPosition.y - this.position.y) * 0.1;
    
    // Calculate rounded position to avoid sub-pixel rendering
    const x = Math.round(this.position.x);
    const y = Math.round(this.position.y);
    
    // Update cursor positions
    this.cursor.style.left = `${x}px`;
    this.cursor.style.top = `${y}px`;
    
    // Follow with slight delay
    this.cursorFollower.style.left = `${x}px`;
    this.cursorFollower.style.top = `${y}px`;
    
    // Continue animation loop
    requestAnimationFrame(this.animate.bind(this));
  }
}

// ============================================================
// Immersive Navigation with Animation - IMPROVED FOR LUSION STYLE
// ============================================================
class ImmersiveNavigation {
  constructor() {
    this.createNav();
    this.isOpen = false;
    this.links = [];
    this.letters = [];
    this.init();
  }
  
  createNav() {
    // Create menu toggle button
    this.menuBtn = document.querySelector('.menu-toggle');
    
    if (!this.menuBtn) {
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
    
    // Create sidebar
    this.sidebar = document.querySelector('.modern-sidebar');
    
    if (!this.sidebar) {
      this.sidebar = document.createElement('div');
      this.sidebar.className = 'modern-sidebar';
      this.sidebar.innerHTML = `
        <div class="sidebar-backdrop"></div>
        <div class="sidebar-content">
          <div class="sidebar-header">
            <div class="logo">VITALITY</div>
          </div>
          <nav class="sidebar-nav">
            <ul>
              <li><a href="/" data-text="Home">Home</a></li>
              <li><a href="/#about-vitality" data-text="About">About</a></li>
              <li><a href="/download" data-text="Download">Download</a></li>
              <li><a href="/documentation" data-text="Documentation">Documentation</a></li>
              <li><a href="/how-it-works" data-text="How It Works">How It Works</a></li>
              <li><a href="/purchase" data-text="Purchase">Purchase</a></li>
              <li><a href="/affiliate" data-text="Affiliate">Affiliate</a></li>
              <li><a href="/faq" data-text="FAQ">FAQ</a></li>
              <li><a href="/tos" data-text="TOS">TOS</a></li>
            </ul>
          </nav>
          <div class="sidebar-footer">
            <div class="social-links">
              <a href="https://discord.gg/vitalityoptimizations" target="_blank" class="social-link">
                <img src="https://raw.githubusercontent.com/VitalityOptimizations/Vitality-Website/2115598177940dab0c0b82e5a5b6d8a0bc0b26aa/icons/logo-discord.svg" alt="Discord" width="24" height="24">
              </a>
            </div>
            <div class="copyright">© 2024 Vitality Optimization</div>
          </div>
        </div>
      `;
      document.body.appendChild(this.sidebar);
    }
  }
  
  init() {
    // Add event listeners
    if (this.menuBtn) {
      this.menuBtn.addEventListener('click', this.toggleMenu.bind(this));
    }
    
    if (this.sidebar) {
      const backdrop = this.sidebar.querySelector('.sidebar-backdrop');
      if (backdrop) {
        backdrop.addEventListener('click', this.closeMenu.bind(this));
      }
      
      // Store all nav links
      this.links = Array.from(this.sidebar.querySelectorAll('.sidebar-nav a'));
      
      // Set up links with animation
      this.links.forEach(link => {
        // Store original text
        const text = link.getAttribute('data-text') || link.textContent;
        link.setAttribute('data-text', text);
        
        // Add event listeners
        link.addEventListener('mouseenter', this.animateLink.bind(this));
        link.addEventListener('mouseleave', this.resetLink.bind(this));
        link.addEventListener('click', this.handleLinkClick.bind(this));
      });
    }
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
    
    if (this.menuBtn) {
      this.menuBtn.classList.add('active');
    }
    
    if (this.sidebar) {
      this.sidebar.classList.add('active');
      
      // No need for GSAP animation here - CSS transitions will handle it
      // The animations are now directly in the CSS with staggered delays
    }
  }
  
  closeMenu() {
    if (!this.isOpen) return;
    
    this.isOpen = false;
    document.body.classList.remove('menu-open');
    
    if (this.menuBtn) {
      this.menuBtn.classList.remove('active');
    }
    
    if (this.sidebar) {
      this.sidebar.classList.remove('active');
    }
  }
  
  animateLink(e) {
    const link = e.currentTarget;
    const text = link.getAttribute('data-text');
    
    // Skip if already animated
    if (link.querySelector('span')) return;
    
    // Create hover effect with letter split animation (Lusion style)
    link.innerHTML = '';
    
    // Split text into spans
    for (let i = 0; i < text.length; i++) {
      const letterSpan = document.createElement('span');
      letterSpan.textContent = text[i];
      letterSpan.style.display = 'inline-block';
      letterSpan.style.transform = 'translateY(0)';
      letterSpan.style.opacity = '1';
      letterSpan.style.transition = `transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.03}s, 
                                    opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.03}s`;
      
      // Add hover animation
      setTimeout(() => {
        letterSpan.style.transform = 'translateY(-8px)';
      }, 10);
      
      link.appendChild(letterSpan);
      this.letters.push(letterSpan);
    }
  }
  
  resetLink(e) {
    const link = e.currentTarget;
    const text = link.getAttribute('data-text');
    
    // Reset to original text
    link.innerHTML = text;
    this.letters = [];
  }
  
  handleLinkClick(e) {
    const link = e.currentTarget;
    const href = link.getAttribute('href');
    
    // Close menu
    this.closeMenu();
    
    // Handle internal links with smooth scroll
    if (href.startsWith('#') || (href.includes('#') && href.startsWith('/'))) {
      e.preventDefault();
      
      // Extract the ID
      const id = href.includes('#') ? href.split('#')[1] : href.substring(1);
      const target = document.getElementById(id);
      
      if (target) {
        // Perform smooth scroll
        if (window.gsap && window.ScrollToPlugin) {
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: target, offsetY: 80 },
            ease: "power3.inOut"
          });
        } else {
          // Fallback smooth scroll
          target.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
        
        // Update URL without scrolling
        if (window.history && window.history.pushState) {
          history.pushState(null, null, href);
        }
      } else if (href.startsWith('/')) {
        // Navigate to the page then the anchor
        window.location.href = href;
      }
    }
  }
  
  onResize() {
    // Handle responsive adjustments
  }
}

// ============================================================
// Enhanced Scroll Animations with IntersectionObserver
// ============================================================
class EnhancedScrollAnimations {
  constructor() {
    this.elements = [];
    this.observer = null;
    this.setupAnimations();
  }
  
  setupAnimations() {
    // Initialize animations
    this.initGSAPAnimations();
    this.initIntersectionObserver();
    this.detectAnimationElements();
  }
  
  initGSAPAnimations() {
    // Check if GSAP is available
    if (typeof gsap !== 'undefined') {
      // Initialize GSAP plugins if available
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        this.setupScrollTriggers();
      }
      
      if (typeof ScrollToPlugin !== 'undefined') {
        gsap.registerPlugin(ScrollToPlugin);
      }
    }
  }
  
  setupScrollTriggers() {
    // Hero parallax effect
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
      const heroContent = heroSection.querySelector('.hero-content');
      
      if (heroContent) {
        ScrollTrigger.create({
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            // Parallax effect
            const progress = self.progress;
            gsap.set(heroContent, {
              y: progress * 150,
              opacity: 1 - progress * 0.8
            });
          }
        });
      }
    }
    
    // Performance section animations
    const fpsBars = document.querySelectorAll('.fps-bar');
    
    if (fpsBars.length) {
      fpsBars.forEach(bar => {
        // Get width values from data attributes
        const withVitality = bar.querySelector('.with-vitality');
        const withoutVitality = bar.querySelector('.without-vitality');
        
        if (withVitality && withoutVitality) {
          ScrollTrigger.create({
            trigger: bar,
            start: 'top 80%',
            onEnter: () => {
              bar.classList.add('animate');
            },
            onLeaveBack: () => {
              bar.classList.remove('animate');
            }
          });
        }
      });
    }
    
    // Documentation specific animations
    const docSections = document.querySelectorAll('.doc-section');
    if (docSections.length) {
      docSections.forEach(section => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(section, 
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );
          },
          once: true
        });
      });
    }
    
    // Step animations
    const steps = document.querySelectorAll('.step');
    if (steps.length) {
      steps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(step, 
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, delay: index * 0.1, ease: "power3.out" }
            );
          },
          once: true
        });
      });
    }

    // Feature items staggered animation
    const featureItems = document.querySelectorAll('.feature-item, .about-column');
    if (featureItems.length) {
      ScrollTrigger.create({
        trigger: '.features, .about-section',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(featureItems, 
            { y: 50, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              stagger: 0.1, 
              duration: 0.8, 
              ease: "power3.out" 
            }
          );
        },
        once: false // Make false to animate every time it comes into view
      });
    }

    // Performance bar animations - Restore the animation for the FPS bars
    const performanceSection = document.querySelector('.performance-section, .fps-comparison');
    if (performanceSection) {
      // Find all with/without Vitality bars
      const withVitalityBars = document.querySelectorAll('.with-vitality');
      const withoutVitalityBars = document.querySelectorAll('.without-vitality');
      
      if (withVitalityBars.length || withoutVitalityBars.length) {
        ScrollTrigger.create({
          trigger: performanceSection,
          start: 'top 80%',
          onEnter: () => {
            // Reset to 0 first
            gsap.set(withVitalityBars, { width: '0%' });
            gsap.set(withoutVitalityBars, { width: '0%' });
            
            // Animate "with vitality" bars
            gsap.to(withVitalityBars, {
              width: '80%',
              duration: 1.5,
              ease: "power3.out"
            });
            
            // Animate "without vitality" bars with a slight delay
            gsap.to(withoutVitalityBars, {
              width: '60%',
              duration: 1.5,
              delay: 0.3,
              ease: "power3.out"
            });
          },
          once: false
        });
      }
    }
  }
  
  initIntersectionObserver() {
    // Create observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Unobserve after animation (one-time effect)
          if (entry.target.dataset.once !== 'false') {
            this.observer.unobserve(entry.target);
          }
        } else if (entry.target.dataset.once === 'false') {
          // Remove if should animate every time
          entry.target.classList.remove('visible');
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });
  }
  
  detectAnimationElements() {
    // Find all elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .scale-in'
    );
    
    // Store elements and observe them
    this.elements = Array.from(animatedElements);
    this.elements.forEach(el => this.observer.observe(el));
    
    // Set up FPS bar animations
    const fpsBars = document.querySelectorAll('.fps-bar');
    fpsBars.forEach(bar => {
      const withVitality = bar.querySelector('.with-vitality');
      const withoutVitality = bar.querySelector('.without-vitality');
      
      // Store the target width in data attributes but set actual width to 0
      if (withVitality) {
        const targetWidth = bar.dataset.withVitality || '80%';
        withVitality.dataset.targetWidth = targetWidth;
        withVitality.style.width = '0%';
      }
      
      if (withoutVitality) {
        const targetWidth = bar.dataset.withoutVitality || '60%';
        withoutVitality.dataset.targetWidth = targetWidth;
        withoutVitality.style.width = '0%';
      }
    });
  }
}

// ============================================================
// Purple Particle WebGL Effect (Lusion Style)
// ============================================================
/**
 * LusionBackground - Ultra-premium interactive WebGL background
 * Enhanced for maximum visual impact and professional aesthetic
 */
class LusionBackground {
  constructor() {
    this.container = document.querySelector('.webgl-background');
    this.mouse = { x: 0, y: 0, prevX: 0, prevY: 0 };
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.clock = new THREE.Clock();
    this.animationActive = true;
    this.particles = null;
    this.uniforms = null;
    
    // Create container if it doesn't exist
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'webgl-background';
      document.body.prepend(this.container);
    }
    
    // Initialize if THREE.js is available
    if (typeof THREE !== 'undefined') {
      this.init();
    } else {
      console.warn('THREE.js not available. WebGL effects disabled.');
    }
  }
  
  init() {
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.createParticleSystem();
    this.createGlowLayer();
    this.createPostProcessing();
    this.addEventListeners();
    
    // Start animation loop
    this.animate();
  }
  
  createScene() {
    this.scene = new THREE.Scene();
    
    // Use a gradient background color for more depth
    const gradientTexture = this.createGradientTexture();
    const backgroundMaterial = new THREE.MeshBasicMaterial({ map: gradientTexture });
    const backgroundGeometry = new THREE.PlaneGeometry(2, 2);
    const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
    
    // Create a special background scene
    this.backgroundScene = new THREE.Scene();
    this.backgroundCamera = new THREE.Camera();
    background.position.z = -1000; // Behind everything
    this.backgroundCamera.add(background);
    this.backgroundScene.add(this.backgroundCamera);
    
    // Add subtle fog for depth
    this.scene.fog = new THREE.FogExp2(0x050511, 0.0008);
  }
  
  createGradientTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    
    const context = canvas.getContext('2d');
    
    // Create a sophisticated radial gradient in dark blue/purple tones
    const gradient = context.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    
    // Premium dark-to-darker gradient (Lusion style)
    gradient.addColorStop(0, '#0b0718'); // Dark purple at center
    gradient.addColorStop(0.5, '#080611'); // Very dark purple
    gradient.addColorStop(1, '#03030a'); // Almost black at edges
    
    // Fill with gradient
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Create texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    return texture;
  }
  
  createCamera() {
    const fov = 75;
    const aspect = this.width / this.height;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, 1, 1000);
    this.camera.position.z = 300;
    this.camera.lookAt(0, 0, 0);
  }
  
  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.autoClear = false; // Important for rendering multiple scenes
    
    if (this.renderer.outputEncoding !== undefined) {
      this.renderer.outputEncoding = THREE.sRGBEncoding;
    }
    
    this.container.appendChild(this.renderer.domElement);
    this.renderer.domElement.classList.add('webgl-canvas');
    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.style.top = '0';
    this.renderer.domElement.style.left = '0';
    this.renderer.domElement.style.zIndex = '-1';
  }
  
  createParticleSystem() {
    // Create a much richer, denser particle system
    const particleCount = 4000; // Significantly increased for premium look
    const particleGeometry = new THREE.BufferGeometry();
    
    // Create custom particle positions
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const lifeSpans = new Float32Array(particleCount);
    const opacities = new Float32Array(particleCount);
    
    // More sophisticated distribution with layering
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Determine layer (foreground, midground, background)
      const layer = Math.floor(Math.random() * 3);
      
      // Create a spherical distribution with randomization
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(1 - 2 * Math.random());
      
      // Different radius ranges for each layer
      let radius;
      if (layer === 0) { // Foreground
        radius = 80 + (Math.random() * 70);
      } else if (layer === 1) { // Midground
        radius = 150 + (Math.random() * 100);
      } else { // Background
        radius = 250 + (Math.random() * 150);
      }
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Layer-based velocity for more organic movement
      const velScale = layer === 0 ? 0.08 : (layer === 1 ? 0.05 : 0.02);
      velocities[i3] = (Math.random() - 0.5) * velScale;
      velocities[i3 + 1] = (Math.random() - 0.5) * velScale;
      velocities[i3 + 2] = (Math.random() - 0.5) * velScale;
      
      // Enhanced color palette with more variation
      if (layer === 0) { // Foreground - brightest
        colors[i3] = 0.8 + Math.random() * 0.2;      // R (bright purple)
        colors[i3 + 1] = 0.2 + Math.random() * 0.2;  // G (minimal green)
        colors[i3 + 2] = 0.9 + Math.random() * 0.1;  // B (vibrant blue/purple)
      } else if (layer === 1) { // Midground
        colors[i3] = 0.6 + Math.random() * 0.3;      // R (medium purple)
        colors[i3 + 1] = 0.1 + Math.random() * 0.2;  // G (very little green)
        colors[i3 + 2] = 0.8 + Math.random() * 0.2;  // B (strong blue/purple)
      } else { // Background - subtle
        colors[i3] = 0.3 + Math.random() * 0.3;      // R (darker purple)
        colors[i3 + 1] = 0.05 + Math.random() * 0.1; // G (minimal green)
        colors[i3 + 2] = 0.6 + Math.random() * 0.2;  // B (deeper blue/purple)
      }
      
      // Layer-based sizes for parallax effect
      if (layer === 0) { // Foreground - largest
        sizes[i] = 3 + Math.random() * 5;
      } else if (layer === 1) { // Midground
        sizes[i] = 2 + Math.random() * 3;
      } else { // Background - smallest
        sizes[i] = 1 + Math.random() * 2;
      }
      
      // Different lifespans for organic movement
      lifeSpans[i] = 1.0 + Math.random() * 4.0;
      
      // Varying opacities
      opacities[i] = 0.2 + Math.random() * 0.8;
    }
    
    // Add attributes to geometry
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particleGeometry.setAttribute('lifeSpan', new THREE.BufferAttribute(lifeSpans, 1));
    particleGeometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));
    
    // Create ultra-premium shader material
    this.uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(this.width, this.height) },
      mousePosition: { value: new THREE.Vector2(0, 0) },
      mouseVelocity: { value: new THREE.Vector2(0, 0) },
      pixelRatio: { value: window.devicePixelRatio },
      pulseFactor: { value: 0 } // For pulsing effect
    };
    
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        attribute vec3 velocity;
        attribute float size;
        attribute float lifeSpan;
        attribute float opacity;
        
        uniform float time;
        uniform vec2 mousePosition;
        uniform vec2 mouseVelocity;
        uniform float pixelRatio;
        uniform float pulseFactor;
        
        varying vec3 vColor;
        varying float vAlpha;
        
        // Improved noise functions for more organic movement
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          
          // First corner
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          
          // Other corners
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          
          // Permutations
          i = mod289(i);
          vec4 p = permute(permute(permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
                
          // Gradients: 7x7 points over a square, mapped onto an octahedron.
          // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
          float n_ = 0.142857142857; // 1.0/7.0
          vec3 ns = n_ * D.wyz - D.xzx;
          
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          
          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          
          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
          
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          
          // Normalise gradients
          vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          
          // Mix final noise value
          vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
        }
        
        void main() {
          // Create a copy of the position
          vec3 pos = position;
          
          // More complex organic movement with multiple noise functions
          float t = time * 0.2;
          float uniqueOffset = float(gl_VertexID) * 0.01;
          
          // Primary movement
          float noiseFreq1 = 0.4;
          float noiseAmp1 = 1.8;
          vec3 noisePos1 = vec3(pos.x * noiseFreq1, pos.y * noiseFreq1, pos.z * noiseFreq1 + t * 0.3);
          float noise1 = snoise(noisePos1) * noiseAmp1;
          
          // Secondary movement (higher frequency)
          float noiseFreq2 = 0.8;
          float noiseAmp2 = 0.8;
          vec3 noisePos2 = vec3(pos.y * noiseFreq2, pos.z * noiseFreq2, pos.x * noiseFreq2 + t * 0.5 + uniqueOffset);
          float noise2 = snoise(noisePos2) * noiseAmp2;
          
          // Subtle tertiary movement
          float noiseFreq3 = 2.0;
          float noiseAmp3 = 0.4;
          vec3 noisePos3 = vec3(pos.z * noiseFreq3, pos.x * noiseFreq3, pos.y * noiseFreq3 - t * 0.7 + uniqueOffset * 2.0);
          float noise3 = snoise(noisePos3) * noiseAmp3;
          
          // Combine noise values
          float combinedNoise = noise1 + noise2 + noise3;
          
          // Enhanced time-based motion with layered sine waves
          float timeScale = t;
          pos.x += sin(timeScale + pos.y * 0.02) * 3.0 + sin(timeScale * 0.7 + pos.z * 0.01) * 2.0;
          pos.y += cos(timeScale + pos.x * 0.02) * 3.0 + cos(timeScale * 1.3) * 1.5;
          pos.z += combinedNoise + sin(timeScale * 0.5) * 2.0;
          
          // Subtle pulsation based on distance from center
          float dist = length(pos) * 0.01;
          float pulse = sin(t * 0.5 + dist * 2.0) * 0.5 + 0.5;
          pulse *= pulseFactor; // Control the strength with uniform
          
          // Calculate distance to mouse position (in normalized device coordinates)
          vec4 viewPosition = modelViewMatrix * vec4(pos, 1.0);
          vec4 projectedPosition = projectionMatrix * viewPosition;
          vec2 normalizedDeviceCoord = projectedPosition.xy / projectedPosition.w;
          
          // Enhanced mouse interaction
          float distToMouse = length(normalizedDeviceCoord - mousePosition) * 2.0;
          float mouseInfluence = smoothstep(1.5, 0.0, distToMouse) * 0.8; // Stronger influence
          
          // Apply mouse influence with momentum
          vec2 mouseEffect = mouseVelocity * (mouseInfluence * 60.0); // Increased effect strength
          pos.x += mouseEffect.x;
          pos.y += mouseEffect.y;
          
          // Apply subtle attraction to mouse
          vec3 mouseDir = normalize(vec3(mouseEffect.x, mouseEffect.y, 0.0));
          pos += mouseDir * mouseInfluence * 5.0;
          
          // Modulate size based on pulsation and mouse influence
          float sizeMultiplier = 1.0 + mouseInfluence * 2.0 + pulse * 0.3;
          
          // Final position
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          
          // Adjust point size with more factors
          float computedSize = size * sizeMultiplier;
          
          // Dynamic size based on z-position for depth
          float depthFactor = clamp((500.0 - abs(viewPosition.z)) / 500.0, 0.3, 1.0);
          
          gl_PointSize = computedSize * (380.0 / -viewPosition.z) * depthFactor * pixelRatio;
          
          // Pass color and alpha to fragment shader
          vColor = color;
          
          // More sophisticated alpha calculation with multiple factors
          float distanceAlpha = clamp((500.0 - length(viewPosition.xyz)) / 500.0, 0.0, 1.0);
          float pulseAlpha = 0.7 + pulse * 0.3;
          float mouseAlpha = 1.0 + mouseInfluence * 0.5;
          
          // Combine all alpha factors with base opacity
          vAlpha = opacity * distanceAlpha * pulseAlpha * mouseAlpha;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          // Enhanced soft circle with sophisticated falloff
          float distanceFromCenter = length(gl_PointCoord - vec2(0.5));
          if (distanceFromCenter > 0.5) discard;
          
          // Multi-step smoothing for more sophisticated edge
          float smoothedAlpha = smoothstep(0.5, 0.35, distanceFromCenter);
          smoothedAlpha *= smoothedAlpha; // Square for softer falloff
          
          // Create a subtle glow effect at the center
          float innerGlow = smoothstep(0.125, 0.0, distanceFromCenter) * 0.5;
          vec3 glowColor = vColor + innerGlow;
          
          // Set the color with proper opacity and glow
          gl_FragColor = vec4(glowColor, vAlpha * smoothedAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });
    
    // Create particle system
    this.particles = new THREE.Points(particleGeometry, shaderMaterial);
    this.scene.add(this.particles);
    
    // Add smaller, more numerous background particles for depth
    this.createBackgroundParticles();
  }
  
  createBackgroundParticles() {
    // Create many small background particles for depth
    const bgParticleCount = 2000;
    const bgGeometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(bgParticleCount * 3);
    const colors = new Float32Array(bgParticleCount * 3);
    const sizes = new Float32Array(bgParticleCount);
    
    // Distant background distribution
    for (let i = 0; i < bgParticleCount; i++) {
      const i3 = i * 3;
      
      // Spherical distribution but much larger radius
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(1 - 2 * Math.random());
      const radius = 400 + (Math.random() * 300); // Much further away
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Subtle color variations - mostly dark purples and blues
      colors[i3] = 0.1 + Math.random() * 0.2;     // R (subtle)
      colors[i3 + 1] = 0.0 + Math.random() * 0.1; // G (minimal)
      colors[i3 + 2] = 0.3 + Math.random() * 0.2; // B (subtle)
      
      // Very small sizes for background effect
      sizes[i] = 0.5 + Math.random() * 1.0;
    }
    
    bgGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    bgGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    bgGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Simple material for background particles
    const bgMaterial = new THREE.PointsMaterial({
      size: 1.0,
      sizeAttenuation: true,
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    this.backgroundParticles = new THREE.Points(bgGeometry, bgMaterial);
    this.scene.add(this.backgroundParticles);
  }
  
  createGlowLayer() {
    // Add a subtle glow layer for enhanced depth
    const glowGeometry = new THREE.PlaneGeometry(this.width * 1.5, this.height * 1.5);
    
    // Create a radial gradient texture for the glow
    const glowTexture = this.createGlowTexture();
    
    const glowMaterial = new THREE.MeshBasicMaterial({
      map: glowTexture,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    this.glowLayer = new THREE.Mesh(glowGeometry, glowMaterial);
    this.glowLayer.position.z = -50;
    this.scene.add(this.glowLayer);
  }
  
  createGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    
    const context = canvas.getContext('2d');
    
    // Create a radial gradient
    const gradient = context.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    
    // Purple glow
    gradient.addColorStop(0, 'rgba(145, 71, 255, 0.4)');
    gradient.addColorStop(0.5, 'rgba(95, 41, 175, 0.1)');
    gradient.addColorStop(1, 'rgba(45, 21, 95, 0)');
    
    // Fill with gradient
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Create texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    return texture;
  }
  
  createPostProcessing() {
    // If EffectComposer is available, we can add advanced post-processing
    if (typeof THREE.EffectComposer !== 'undefined') {
      this.composer = new THREE.EffectComposer(this.renderer);
      
      // Render pass for main scene
      const renderPass = new THREE.RenderPass(this.scene, this.camera);
      this.composer.addPass(renderPass);
      
      // Add enhanced bloom for premium glow effect
      if (typeof THREE.UnrealBloomPass !== 'undefined') {
        const bloomPass = new THREE.UnrealBloomPass(
          new THREE.Vector2(this.width, this.height),
          0.4,  // strength
          0.4,  // radius
          0.85  // threshold
        );
        this.composer.addPass(bloomPass);
      }
      
      // Add subtle chromatic aberration if ShaderPass is available
      if (typeof THREE.ShaderPass !== 'undefined') {
        const chromaticAberrationShader = {
          uniforms: {
            "tDiffuse": { value: null },
            "resolution": { value: new THREE.Vector2(this.width, this.height) },
            "aberrationAmount": { value: 0.003 }
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D tDiffuse;
            uniform vec2 resolution;
            uniform float aberrationAmount;
            varying vec2 vUv;
            
            void main() {
              vec2 uv = vUv;
              vec2 direction = normalize(uv - 0.5);
              vec2 aberration = direction * aberrationAmount;
              
              vec4 color;
              color.r = texture2D(tDiffuse, uv + aberration).r;
              color.g = texture2D(tDiffuse, uv).g;
              color.b = texture2D(tDiffuse, uv - aberration).b;
              color.a = 1.0;
              
              gl_FragColor = color;
            }
          `
        };
        
        const chromaticAberrationPass = new THREE.ShaderPass(chromaticAberrationShader);
        this.composer.addPass(chromaticAberrationPass);
      }
    }
  }
  
  addEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }
  
  onResize() {
    // Update sizes
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    // Update camera
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    
    // Update renderer
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Update uniforms
    if (this.uniforms) {
      this.uniforms.resolution.value.set(this.width, this.height);
      this.uniforms.pixelRatio.value = Math.min(window.devicePixelRatio, 2);
    }
    
    // Update composer if exists
    if (this.composer) {
      this.composer.setSize(this.width, this.height);
    }
    
    // Update glow layer
    if (this.glowLayer) {
      this.glowLayer.scale.set(this.width / 800, this.height / 800, 1);
    }
  }
  
  onMouseMove(event) {
    // Convert mouse position to normalized device coordinates (-1 to +1)
    this.mouse.prevX = this.mouse.x;
    this.mouse.prevY = this.mouse.y;
    
    this.mouse.x = (event.clientX / this.width) * 2 - 1;
    this.mouse.y = -(event.clientY / this.height) * 2 + 1;
    
    // Update uniforms
    if (this.uniforms) {
      this.uniforms.mousePosition.value.set(this.mouse.x, this.mouse.y);
      
      // Calculate mouse velocity with enhanced smoothing
      const velX = this.mouse.x - this.mouse.prevX;
      const velY = this.mouse.y - this.mouse.prevY;
      
      // More responsive but still smooth velocity
      this.uniforms.mouseVelocity.value.x = this.uniforms.mouseVelocity.value.x * 0.85 + velX * 0.15;
      this.uniforms.mouseVelocity.value.y = this.uniforms.mouseVelocity.value.y * 0.85 + velY * 0.15;
    }
  }
  
  handleVisibilityChange() {
    if (document.hidden) {
      this.pause();
    } else {
      this.resume();
    }
  }
  
  animate() {
    if (!this.animationActive) return;
    
    requestAnimationFrame(this.animate.bind(this));
    
    // Update time
    const elapsedTime = this.clock.getElapsedTime();
    
    // Update uniforms with animated values
    if (this.uniforms) {
      this.uniforms.time.value = elapsedTime;
      
      // Add subtle pulsing effect
      this.uniforms.pulseFactor.value = (Math.sin(elapsedTime * 0.5) * 0.5 + 0.5) * 0.3;
    }
    
    // Rotate background particles very slowly
    if (this.backgroundParticles) {
      this.backgroundParticles.rotation.y = elapsedTime * 0.02;
      this.backgroundParticles.rotation.x = Math.sin(elapsedTime * 0.01) * 0.1;
    }
    
    // Subtle camera movement for parallax effect
    if (this.camera) {
      // Enhanced smooth camera movement
      this.camera.position.x += (this.mouse.x * 12 - this.camera.position.x) * 0.01;
      this.camera.position.y += (this.mouse.y * 12 - this.camera.position.y) * 0.01;
      
      // Add subtle breathing motion
      const breathAmt = Math.sin(elapsedTime * 0.3) * 1.5;
      this.camera.position.z = 300 + breathAmt;
      
      this.camera.lookAt(0, 0, 0);
    }
    
    // Rotate glow layer subtly
    if (this.glowLayer) {
      this.glowLayer.rotation.z = Math.sin(elapsedTime * 0.1) * 0.05;
    }
    
    // Two-step rendering for multiple scenes
    this.renderer.clear();
    
    // Render background first if it exists
    if (this.backgroundScene && this.backgroundCamera) {
      this.renderer.render(this.backgroundScene, this.backgroundCamera);
    }
    
    // Render main scene
    if (this.composer) {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }
  
  pause() {
    this.animationActive = false;
  }
  
  resume() {
    if (!this.animationActive) {
      this.animationActive = true;
      this.clock.start();
      this.animate();
    }
  }
}

// Initialize the background immediately with improved visibility handling
document.addEventListener('DOMContentLoaded', () => {
  // Make background visible immediately
  const bgElement = document.querySelector('.webgl-background');
  if (bgElement) {
    bgElement.classList.add('visible');
  } else {
    // Create if not exists
    const newBgElement = document.createElement('div');
    newBgElement.className = 'webgl-background visible';
    document.body.prepend(newBgElement);
  }
  
  // Initialize with premium effects
  window.lusionBackground = new LusionBackground();
  
  // Add to App controller if it exists
  if (window.App && window.App.webglBackground === undefined) {
    window.App.webglBackground = window.lusionBackground;
  }
});

// Add this code to your modern.js file and update your initializeCore method to use LusionBackground

// ============================================================
// Magnetic Button Effects
// ============================================================
class MagneticElements {
  constructor() {
    this.magneticElements = [];
    this.init();
  }
  
  init() {
    // Find all elements with magnetic class
    const elements = document.querySelectorAll('.magnetic-button');
    
    elements.forEach(element => {
      // Create button content wrapper if not present
      if (!element.querySelector('.button-content')) {
        const content = element.innerHTML;
        element.innerHTML = `<span class="button-content">${content}</span>`;
      }
      
      // Store element
      this.magneticElements.push({
        element: element,
        content: element.querySelector('.button-content'),
        bounds: element.getBoundingClientRect(),
        active: false
      });
      
      // Add event listeners
      element.addEventListener('mouseenter', this.onMouseEnter.bind(this, element));
      element.addEventListener('mouseleave', this.onMouseLeave.bind(this, element));
      element.addEventListener('mousemove', this.onMouseMove.bind(this, element));
    });
    
    // Add resize listener
    window.addEventListener('resize', this.updateBounds.bind(this));
    
    // Start animation if GSAP available
    if (typeof gsap !== 'undefined') {
      this.animateMagneticElements();
    }
  }
  
  updateBounds() {
    // Update element bounds on resize
    this.magneticElements.forEach(item => {
      item.bounds = item.element.getBoundingClientRect();
    });
  }
  
  onMouseEnter(element) {
    // Find corresponding element
    const item = this.magneticElements.find(item => item.element === element);
    if (!item) return;
    
    // Activate
    item.active = true;
    
    // Add active class
    element.classList.add('magnetic-active');
  }
  
  onMouseLeave(element) {
    // Find corresponding element
    const item = this.magneticElements.find(item => item.element === element);
    if (!item) return;
    
    // Deactivate
    item.active = false;
    
    // Remove active class
    element.classList.remove('magnetic-active');
    
    // Reset position
    if (typeof gsap !== 'undefined') {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)'
      });
      
      gsap.to(item.content, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)'
      });
    } else {
      element.style.transform = '';
      item.content.style.transform = '';
    }
  }
  
  onMouseMove(element, e) {
    // Find corresponding element
    const item = this.magneticElements.find(item => item.element === element);
    if (!item || !item.active) return;
    
    // Calculate relative mouse position
    const bounds = item.bounds;
    const x = e.clientX - bounds.left - bounds.width / 2;
    const y = e.clientY - bounds.top - bounds.height / 2;
    
    // Apply magnetic effect
    const strength = 0.3;
    const contentStrength = 0.8;
    
    if (typeof gsap !== 'undefined') {
      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: true
      });
      
      gsap.to(item.content, {
        x: x * contentStrength,
        y: y * contentStrength,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: true
      });
    } else {
      element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      item.content.style.transform = `translate(${x * contentStrength}px, ${y * contentStrength}px)`;
    }
  }
  
  animateMagneticElements() {
    // Set initial state
    gsap.set('.magnetic-button .button-content', {
      x: 0,
      y: 0
    });
  }
}

// ============================================================
// Smooth Page Transitions
// ============================================================
class SmoothPageTransitions {
  constructor() {
    this.isActive = false;
    this.overlay = null;
    this.init();
  }
  
  init() {
    // Create transition overlay
    this.createTransitionOverlay();
    
    // Handle link clicks for internal navigation
    this.setupLinkInterception();
  }
  
  createTransitionOverlay() {
    // Create overlay element
    this.overlay = document.createElement('div');
    this.overlay.className = 'page-transition';
    this.overlay.style.position = 'fixed';
    this.overlay.style.top = '0';
    this.overlay.style.left = '0';
    this.overlay.style.width = '100%';
    this.overlay.style.height = '100%';
    this.overlay.style.backgroundColor = 'rgba(5, 5, 5, 0.95)';
    this.overlay.style.zIndex = '9998';
    this.overlay.style.transform = 'translateY(-100%)';
    this.overlay.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    document.body.appendChild(this.overlay);
  }
  
  setupLinkInterception() {
    // Intercept link clicks
    document.addEventListener('click', e => {
      // Find closest link element
      const link = e.target.closest('a');
      
      // Skip if no link or if it's external/anchor
      if (!link) return;
      
      const href = link.getAttribute('href');
      const target = link.getAttribute('target');
      
      // Skip external links, anchors, or targets
      if (!href || 
          href.startsWith('#') || 
          href.startsWith('mailto:') || 
          href.startsWith('tel:') || 
          href.includes('://') || 
          target === '_blank') {
        return;
      }
      
      // Skip navigation and sidebar links
      if (link.closest('.sidebar-nav') || link.closest('.nav-links')) {
        return;
      }
      
      // Prevent default behavior
      e.preventDefault();
      
      // Transition to the new page
      this.transitionToPage(href);
    });
  }
  
  transitionToPage(href) {
    // Don't transition if already active
    if (this.isActive) return;
    
    this.isActive = true;
    
    // Animate overlay in
    if (typeof gsap !== 'undefined') {
      gsap.to(this.overlay, {
        y: '0%',
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: () => {
          // Navigate to new page
          window.location.href = href;
        }
      });
    } else {
      // Fallback without GSAP
      this.overlay.style.transform = 'translateY(0%)';
      
      // Navigate after transition
      this.overlay.addEventListener('transitionend', () => {
        window.location.href = href;
      }, { once: true });
    }
  }
}

// ============================================================
// Scroll Progress Indicator
// ============================================================
class ScrollProgressIndicator {
  constructor() {
    this.createIndicator();
    this.addEventListeners();
  }
  
  createIndicator() {
    // Create indicator element
    this.indicator = document.createElement('div');
    this.indicator.className = 'scroll-indicator';
    this.indicator.innerHTML = '<div class="scroll-indicator-progress"></div>';
    
    // Add to DOM
    document.body.appendChild(this.indicator);
    
    // Store progress element
    this.progress = this.indicator.querySelector('.scroll-indicator-progress');
  }
  
  addEventListeners() {
    // Update on scroll
    window.addEventListener('scroll', this.updateProgress.bind(this));
    
    // Initial update
    this.updateProgress();
  }
  
  updateProgress() {
    // Calculate scroll percentage
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    // Update progress bar
    this.progress.style.width = `${scrollPercent}%`;
  }
}

// ============================================================
// Documentation Page Specific Enhancements
// ============================================================
class DocumentationEnhancements {
  constructor() {
    this.initSidebar();
    this.initStickyBehavior();
    this.initSectionHighlight();
    this.initSearchFunctionality();
    this.animateDocumentationElements();
  }
  
  initSidebar() {
    const sidebar = document.querySelector('.documentation-sidebar');
    const links = sidebar ? sidebar.querySelectorAll('a') : [];
    
    // Add active class to current section link
    const currentHash = window.location.hash;
    
    if (currentHash && links.length) {
      links.forEach(link => {
        if (link.getAttribute('href') === currentHash) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    } else if (links.length) {
      // Activate first link by default
      links[0].classList.add('active');
    }
    
    // Add click handling for smooth scrolling
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
          e.preventDefault();
          
          const targetElement = document.querySelector(href);
          
          if (targetElement) {
            // Update active class
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Scroll to target
            if (window.gsap && window.ScrollToPlugin) {
              gsap.to(window, {
                duration: 0.8,
                scrollTo: { y: targetElement, offsetY: 80 },
                ease: "power3.inOut"
              });
              
              // Update URL hash without scrolling
              history.pushState(null, null, href);
            } else {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }
        }
      });
    });
  }
  
  initStickyBehavior() {
    const sidebar = document.querySelector('.documentation-sidebar');
    
    if (!sidebar) return;
    
    // Make the sidebar stick when scrolling
    const stickyTop = sidebar.offsetTop;
    
    window.addEventListener('scroll', () => {
      if (window.innerWidth < 1200) return; // Skip on mobile
      
      if (window.pageYOffset > stickyTop - 20) {
        sidebar.style.position = 'fixed';
        sidebar.style.top = '20px';
      } else {
        sidebar.style.position = 'sticky';
        sidebar.style.top = 'initial';
      }
    });
  }
  
  initSectionHighlight() {
    const sections = document.querySelectorAll('.doc-section');
    const sidebarLinks = document.querySelectorAll('.documentation-sidebar a');
    
    if (!sections.length || !sidebarLinks.length) return;
    
    // Track which section is currently in view
    window.addEventListener('scroll', () => {
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition >= sectionTop - 100 && 
            scrollPosition < sectionTop + sectionHeight - 100) {
          currentSection = '#' + section.getAttribute('id');
        }
      });
      
      // Update active link
      if (currentSection) {
        sidebarLinks.forEach(link => {
          if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
        
        // Update URL hash without scrolling
        if (window.history && window.history.replaceState) {
          history.replaceState(null, null, currentSection);
        }
      }
    });
  }
  
  initSearchFunctionality() {
    const searchInput = document.querySelector('.search-container input');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const sections = document.querySelectorAll('.doc-section');
      
      // Search in sections and highlight matches
      sections.forEach(section => {
        const title = section.querySelector('h2');
        const content = section.textContent;
        
        if (content.toLowerCase().includes(query) || 
            (title && title.textContent.toLowerCase().includes(query))) {
          section.style.display = 'block';
          
          // Highlight if using query
          if (query.length > 2) {
            this.highlightMatches(section, query);
          } else {
            this.removeHighlights(section);
          }
        } else {
          section.style.display = 'none';
        }
      });
    });
  }
  
  highlightMatches(element, query) {
    // Remove existing highlights
    this.removeHighlights(element);
    
    // Skip if query is too short
    if (query.length < 3) return;
    
    const textNodes = this.getTextNodes(element);
    
    textNodes.forEach(node => {
      const text = node.textContent;
      const lowerText = text.toLowerCase();
      let position = lowerText.indexOf(query);
      
      if (position !== -1) {
        const spanNode = document.createElement('span');
        spanNode.className = 'search-highlight';
        spanNode.style.backgroundColor = 'rgba(145, 71, 255, 0.2)';
        spanNode.style.borderRadius = '2px';
        spanNode.style.padding = '0 2px';
        
        const before = text.substring(0, position);
        const match = text.substring(position, position + query.length);
        const after = text.substring(position + query.length);
        
        const beforeTextNode = document.createTextNode(before);
        const matchTextNode = document.createTextNode(match);
        const afterTextNode = document.createTextNode(after);
        
        spanNode.appendChild(matchTextNode);
        
        const fragment = document.createDocumentFragment();
        fragment.appendChild(beforeTextNode);
        fragment.appendChild(spanNode);
        fragment.appendChild(afterTextNode);
        
        node.parentNode.replaceChild(fragment, node);
      }
    });
  }
  
  removeHighlights(element) {
    const highlights = element.querySelectorAll('.search-highlight');
    
    highlights.forEach(highlight => {
      const parent = highlight.parentNode;
      const textNode = document.createTextNode(highlight.textContent);
      parent.replaceChild(textNode, highlight);
      parent.normalize();
    });
  }
  
  getTextNodes(element) {
    const textNodes = [];
    
    // Skip certain elements
    const skipTags = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT', 'SELECT', 'OPTION'];
    
    function getNodes(node) {
      if (node.nodeType === 3) { // Text node
        if (node.textContent.trim()) {
          textNodes.push(node);
        }
      } else if (node.nodeType === 1 && !skipTags.includes(node.tagName)) { // Element node
        for (let i = 0; i < node.childNodes.length; i++) {
          getNodes(node.childNodes[i]);
        }
      }
    }
    
    getNodes(element);
    return textNodes;
  }
  
  animateDocumentationElements() {
    // Animate documentation page elements on load
    const elements = [
      '.documentation-header',
      '.documentation-sidebar',
      '.documentation-content'
    ];
    
    elements.forEach((selector, index) => {
      const element = document.querySelector(selector);
      
      if (element) {
        if (window.gsap) {
          gsap.fromTo(
            element,
            { y: 30, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.8, 
              delay: index * 0.2,
              ease: "power3.out" 
            }
          );
        } else {
          setTimeout(() => {
            element.style.transition = `opacity 0.8s ease, transform 0.8s ease`;
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }, index * 200);
        }
      }
    });
    
    // Animate content sections sequentially
    const sections = document.querySelectorAll('.doc-section');
    
    if (sections.length && window.gsap) {
      gsap.fromTo(
        sections,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.15,
          duration: 0.8,
          delay: 0.6,
          ease: "power3.out" 
        }
      );
    }
  }
}

/**
 * LusionSidebar - Elegant, minimal sidebar that appears in the center
 * Auto-fades when inactive and reappears on scroll
 */
class LusionSidebar {
  constructor(options = {}) {
    this.options = {
      fadeDelay: 5000, // 5 seconds before fading
      fadeSpeed: 800,  // 800ms fade animation
      initiallyVisible: true,
      items: [
        { label: 'Home', link: '/' },
        { label: 'About', link: '/#about-vitality' },
        { label: 'Download', link: '/download' },
        { label: 'Documentation', link: '/documentation' }
      ],
      ...options
    };
    
    this.isVisible = this.options.initiallyVisible;
    this.fadeTimeout = null;
    this.scrolling = false;
    this.scrollTimeout = null;
    
    this.init();
  }
  
  init() {
    this.createSidebar();
    this.initEventListeners();
    
    // Start fade timer if initially visible
    if (this.isVisible) {
      this.resetFadeTimer();
    }
  }
  
  createSidebar() {
    // Create sidebar container
    this.sidebar = document.createElement('div');
    this.sidebar.className = 'lusion-sidebar';
    
    // Create dots container
    this.dotsContainer = document.createElement('div');
    this.dotsContainer.className = 'lusion-sidebar-dots';
    
    // Create label container (shows on hover)
    this.labelContainer = document.createElement('div');
    this.labelContainer.className = 'lusion-sidebar-label';
    
    // Create progress indicator
    this.progressIndicator = document.createElement('div');
    this.progressIndicator.className = 'lusion-sidebar-progress';
    
    // Add items
    this.options.items.forEach((item, index) => {
      // Create dot
      const dot = document.createElement('a');
      dot.className = 'lusion-sidebar-dot';
      dot.href = item.link;
      dot.setAttribute('data-index', index);
      dot.setAttribute('data-label', item.label);
      
      // Add event listeners for hover
      dot.addEventListener('mouseenter', this.onDotHover.bind(this, item.label, dot));
      dot.addEventListener('mouseleave', this.onDotLeave.bind(this));
      
      // Add click handler for smooth scrolling to sections
      dot.addEventListener('click', this.onDotClick.bind(this, item));
      
      // Set first dot as active
      if (index === 0) {
        dot.classList.add('active');
      }
      
      // Add to container
      this.dotsContainer.appendChild(dot);
    });
    
    // Add containers to sidebar
    this.sidebar.appendChild(this.progressIndicator);
    this.sidebar.appendChild(this.dotsContainer);
    this.sidebar.appendChild(this.labelContainer);
    
    // Add to DOM
    document.body.appendChild(this.sidebar);
    
    // Initially update current dot based on scroll position
    this.updateCurrentDot();
  }
  
  initEventListeners() {
    // Scroll events
    window.addEventListener('scroll', this.onScroll.bind(this));
    
    // Sidebar hover events
    this.sidebar.addEventListener('mouseenter', this.onSidebarHover.bind(this));
    this.sidebar.addEventListener('mouseleave', this.onSidebarLeave.bind(this));
    
    // Page visibility change
    document.addEventListener('visibilitychange', this.onVisibilityChange.bind(this));
  }
  
  onScroll() {
    // Make sidebar visible on scroll
    this.showSidebar();
    
    // Update active dot
    this.updateCurrentDot();
    
    // Update progress indicator
    this.updateProgressIndicator();
    
    // Reset fade timer
    this.resetFadeTimer();
    
    // Track scrolling state with debounce
    this.scrolling = true;
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.scrolling = false;
    }, 200);
  }
  
  onDotHover(label, dot) {
    // Show label
    this.labelContainer.textContent = label;
    this.labelContainer.style.opacity = '1';
    
    // Position label next to dot
    const dotRect = dot.getBoundingClientRect();
    const sidebarRect = this.sidebar.getBoundingClientRect();
    this.labelContainer.style.top = `${dotRect.top - sidebarRect.top + dotRect.height/2 - 10}px`;
  }
  
  onDotLeave() {
    // Hide label
    this.labelContainer.style.opacity = '0';
  }
  
  onDotClick(item, e) {
    // Prevent default link behavior
    e.preventDefault();
    
    // If it's an anchor link
    if (item.link.includes('#')) {
      const id = item.link.includes('#') ? item.link.split('#')[1] : '';
      const targetElement = document.getElementById(id);
      
      if (targetElement) {
        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without page reload
        if (window.history && window.history.pushState) {
          window.history.pushState(null, null, item.link);
        }
      } else {
        // If anchor not found, navigate normally
        window.location.href = item.link;
      }
    } else {
      // Regular navigation
      window.location.href = item.link;
    }
  }
  
  onSidebarHover() {
    // Cancel fade when hovering sidebar
    clearTimeout(this.fadeTimeout);
    this.showSidebar();
  }
  
  onSidebarLeave() {
    // Resume fade timer when leaving sidebar
    if (!this.scrolling) {
      this.resetFadeTimer();
    }
  }
  
  onVisibilityChange() {
    // Handle tab visibility changes
    if (document.hidden) {
      // Clear timeout when tab is not visible
      clearTimeout(this.fadeTimeout);
    } else {
      // Reset timer when tab becomes visible again
      if (this.isVisible) {
        this.resetFadeTimer();
      }
    }
  }
  
  updateCurrentDot() {
    // Get all sections by IDs referenced in sidebar items
    const sections = this.options.items
      .map(item => {
        if (item.link.includes('#')) {
          const id = item.link.split('#').pop();
          return document.getElementById(id);
        }
        return null;
      })
      .filter(Boolean);
    
    // Determine which section is in view
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    // Find the current section in view
    let currentSectionIndex = 0;
    
    sections.forEach((section, index) => {
      if (!section) return;
      
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSectionIndex = index;
      }
    });
    
    // Special case for top of page
    if (window.scrollY < 100) {
      currentSectionIndex = 0;
    }
    
    // Get all dots and update active state
    const dots = this.dotsContainer.querySelectorAll('.lusion-sidebar-dot');
    
    dots.forEach((dot, index) => {
      if (index === currentSectionIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  updateProgressIndicator() {
    // Calculate scroll progress
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Update progress indicator height
    this.progressIndicator.style.height = `${scrollPercent}%`;
  }
  
  resetFadeTimer() {
    // Clear existing timeout
    clearTimeout(this.fadeTimeout);
    
    // Set new timeout
    this.fadeTimeout = setTimeout(() => {
      this.hideSidebar();
    }, this.options.fadeDelay);
  }
  
  showSidebar() {
    // Make sidebar visible
    if (!this.isVisible) {
      this.sidebar.style.opacity = '1';
      this.isVisible = true;
    }
  }
  
  hideSidebar() {
    // Hide sidebar
    if (this.isVisible) {
      this.sidebar.style.opacity = '0';
      this.isVisible = false;
    }
  }
}

// Add the CSS for the Lusion-style sidebar
const addLusionSidebarStyles = () => {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    /* Lusion-style sidebar */
    .lusion-sidebar {
      position: fixed;
      top: 50%;
      right: 40px;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 100;
      transition: opacity ${800}ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .lusion-sidebar-progress {
      position: absolute;
      top: 0;
      left: 50%;
      width: 1px;
      height: 0%;
      background-color: rgba(145, 71, 255, 0.8);
      transform: translateX(-50%);
      z-index: 1;
      transition: height 0.3s ease;
    }
    
    .lusion-sidebar-dots {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 25px;
      padding: 15px 0;
    }
    
    .lusion-sidebar-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.3);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
      position: relative;
      z-index: 2;
    }
    
    .lusion-sidebar-dot:hover,
    .lusion-sidebar-dot.active {
      background-color: rgba(145, 71, 255, 0.9);
      transform: scale(1.3);
    }
    
    .lusion-sidebar-label {
      position: absolute;
      right: 30px;
      padding: 5px 10px;
      background-color: rgba(10, 10, 15, 0.8);
      color: white;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      text-transform: uppercase;
      letter-spacing: 1px;
      white-space: nowrap;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .lusion-sidebar {
        right: 15px;
      }
      
      .lusion-sidebar-dot {
        width: 8px;
        height: 8px;
      }
      
      .lusion-sidebar-dots {
        gap: 20px;
      }
    }
  `;
  
  document.head.appendChild(styleElement);
};

/**
 * VITALITY OPTIMIZATION - MODERN SIDEBAR IMPLEMENTATION
 * This script completely replaces the old sidebar with the modern Lusion-style sidebar
 * This version includes section configurations for ALL website pages
 */

// Execute this immediately when the script loads
(function() {
  // Remove any existing .modern-sidebar elements
  const oldSidebars = document.querySelectorAll('.modern-sidebar');
  oldSidebars.forEach(el => el.remove());
  
  // Remove any existing .menu-toggle buttons
  const oldToggles = document.querySelectorAll('.menu-toggle');
  oldToggles.forEach(el => el.remove());
  
  // Disable the ImmersiveNavigation class by overriding it
  class ImmersiveNavigation {
    constructor() {
      console.log('ImmersiveNavigation disabled');
    }
    
    // Empty methods to prevent errors if they're called
    createNav() {}
    init() {}
    toggleMenu() {}
    openMenu() {}
    closeMenu() {}
    animateLink() {}
    resetLink() {}
    handleLinkClick() {}
    onResize() {}
  }
  
  // Override the original class
  window.ImmersiveNavigation = ImmersiveNavigation;
  
  // Override AppController to prevent navigation initialization
  if (typeof AppController !== 'undefined') {
    const originalInitializeCore = AppController.prototype.initializeCore;
    AppController.prototype.initializeCore = function() {
      // Call original but replace navigation initialization
      const result = originalInitializeCore.apply(this, arguments);
      
      // Replace navigation with null
      this.navigation = null;
      
      return result;
    };
  }
  
  // Create Lusion sidebar styles
  addLusionSidebarStyles();
  
  // Initialize Lusion sidebar with page-specific sections
  initializeLusionSidebar();
  
  // Function to create Lusion sidebar CSS
  function addLusionSidebarStyles() {
    // Check if styles already exist
    if (document.querySelector('#lusion-sidebar-styles')) return;
    
    const styleElement = document.createElement('style');
    styleElement.id = 'lusion-sidebar-styles';
    styleElement.textContent = `
      /* Lusion-style sidebar */
      .lusion-sidebar {
        position: fixed;
        top: 50%;
        right: 40px;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 100;
        transition: opacity 800ms cubic-bezier(0.16, 1, 0.3, 1);
      }
      
      .lusion-sidebar-progress {
        position: absolute;
        top: 0;
        left: 50%;
        width: 1px;
        height: 0%;
        background-color: rgba(145, 71, 255, 0.8);
        transform: translateX(-50%);
        z-index: 1;
        transition: height 0.3s ease;
      }
      
      .lusion-sidebar-dots {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 25px;
        padding: 15px 0;
      }
      
      .lusion-sidebar-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        cursor: pointer;
        position: relative;
        z-index: 2;
      }
      
      .lusion-sidebar-dot:hover,
      .lusion-sidebar-dot.active {
        background-color: rgba(145, 71, 255, 0.9);
        transform: scale(1.3);
      }
      
      .lusion-sidebar-label {
        position: absolute;
        right: 30px;
        padding: 5px 10px;
        background-color: rgba(10, 10, 15, 0.8);
        color: white;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        text-transform: uppercase;
        letter-spacing: 1px;
        white-space: nowrap;
      }
      
      /* Responsive adjustments */
      @media (max-width: 768px) {
        .lusion-sidebar {
          right: 15px;
        }
        
        .lusion-sidebar-dot {
          width: 8px;
          height: 8px;
        }
        
        .lusion-sidebar-dots {
          gap: 20px;
        }
      }
    `;
    
    document.head.appendChild(styleElement);
  }
  
  // Function to initialize the LusionSidebar
  function initializeLusionSidebar() {
    // Define LusionSidebar class if not already defined
    if (typeof window.LusionSidebar !== 'function') {
      window.LusionSidebar = class LusionSidebar {
        constructor(options = {}) {
          this.options = {
            fadeDelay: 5000,
            fadeSpeed: 800,
            initiallyVisible: true,
            items: [],
            ...options
          };
          
          this.isVisible = this.options.initiallyVisible;
          this.fadeTimeout = null;
          this.scrolling = false;
          this.scrollTimeout = null;
          
          // Initialize immediately
          this.init();
        }
        
        init() {
          this.createSidebar();
          this.initEventListeners();
          
          if (this.isVisible) {
            this.resetFadeTimer();
          }
        }
        
        createSidebar() {
          // Create sidebar container
          this.sidebar = document.createElement('div');
          this.sidebar.className = 'lusion-sidebar';
          
          // Create dots container
          this.dotsContainer = document.createElement('div');
          this.dotsContainer.className = 'lusion-sidebar-dots';
          
          // Create label container
          this.labelContainer = document.createElement('div');
          this.labelContainer.className = 'lusion-sidebar-label';
          
          // Create progress indicator
          this.progressIndicator = document.createElement('div');
          this.progressIndicator.className = 'lusion-sidebar-progress';
          
          // Add items
          this.options.items.forEach((item, index) => {
            const dot = document.createElement('a');
            dot.className = 'lusion-sidebar-dot';
            dot.href = item.link;
            dot.setAttribute('data-index', index);
            dot.setAttribute('data-label', item.label);
            
            dot.addEventListener('mouseenter', () => this.onDotHover(item.label, dot));
            dot.addEventListener('mouseleave', () => this.onDotLeave());
            dot.addEventListener('click', (e) => this.onDotClick(item, e));
            
            if (index === 0) {
              dot.classList.add('active');
            }
            
            this.dotsContainer.appendChild(dot);
          });
          
          // Add containers to sidebar
          this.sidebar.appendChild(this.progressIndicator);
          this.sidebar.appendChild(this.dotsContainer);
          this.sidebar.appendChild(this.labelContainer);
          
          // Add to DOM
          document.body.appendChild(this.sidebar);
          
          // Update current dot based on scroll position
          this.updateCurrentDot();
        }
        
        // Basic event listeners
        initEventListeners() {
          window.addEventListener('scroll', () => this.onScroll());
          document.addEventListener('visibilitychange', () => this.onVisibilityChange());
        }
        
        // Handle dot hover
        onDotHover(label, dot) {
          this.labelContainer.textContent = label;
          this.labelContainer.style.opacity = '1';
          
          const dotRect = dot.getBoundingClientRect();
          const sidebarRect = this.sidebar.getBoundingClientRect();
          this.labelContainer.style.top = `${dotRect.top - sidebarRect.top + dotRect.height/2 - 10}px`;
        }
        
        onDotLeave() {
          this.labelContainer.style.opacity = '0';
        }
        
        onDotClick(item, e) {
          e.preventDefault();
          
          if (item.link.includes('#')) {
            const id = item.link.includes('#') ? item.link.split('#')[1] : '';
            const targetElement = document.getElementById(id);
            
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
              
              if (window.history && window.history.pushState) {
                window.history.pushState(null, null, item.link);
              }
            } else if (item.link.startsWith('#')) {
              // If it's just an anchor but no matching element, try using querySelector instead
              const selector = item.link;
              const element = document.querySelector(selector);
              if (element) {
                element.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              } else {
                window.location.href = item.link;
              }
            } else {
              window.location.href = item.link;
            }
          } else if (item.link.startsWith('.')) {
            // For class selectors
            const selector = item.link;
            const element = document.querySelector(selector);
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            } else {
              window.location.href = item.link;
            }
          } else {
            window.location.href = item.link;
          }
        }
        
        // Handle scroll events
        onScroll() {
          this.showSidebar();
          this.updateCurrentDot();
          this.updateProgressIndicator();
          this.resetFadeTimer();
          
          this.scrolling = true;
          clearTimeout(this.scrollTimeout);
          this.scrollTimeout = setTimeout(() => {
            this.scrolling = false;
          }, 200);
        }
        
        // Handle visibility changes
        onVisibilityChange() {
          if (document.hidden) {
            clearTimeout(this.fadeTimeout);
          } else if (this.isVisible) {
            this.resetFadeTimer();
          }
        }
        
        // Update which dot is active based on scroll position
        updateCurrentDot() {
          // First check for elements with IDs
          const sections = this.options.items
            .map(item => {
              if (item.link.includes('#')) {
                const id = item.link.split('#').pop();
                return document.getElementById(id);
              } else if (item.link.startsWith('.')) {
                // For class selectors
                return document.querySelector(item.link);
              }
              return null;
            })
            .filter(Boolean);
          
          const scrollPosition = window.scrollY + window.innerHeight / 3;
          let currentSectionIndex = 0;
          
          sections.forEach((section, index) => {
            if (!section) return;
            
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
              currentSectionIndex = index;
            }
          });
          
          if (window.scrollY < 100) {
            currentSectionIndex = 0;
          }
          
          const dots = this.dotsContainer.querySelectorAll('.lusion-sidebar-dot');
          
          dots.forEach((dot, index) => {
            if (index === currentSectionIndex) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });
        }
        
        // Update the progress indicator based on scroll position
        updateProgressIndicator() {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = (scrollTop / docHeight) * 100;
          
          this.progressIndicator.style.height = `${scrollPercent}%`;
        }
        
        // Reset the fade timer
        resetFadeTimer() {
          clearTimeout(this.fadeTimeout);
          
          this.fadeTimeout = setTimeout(() => {
            this.hideSidebar();
          }, this.options.fadeDelay);
        }
        
        // Show the sidebar
        showSidebar() {
          if (!this.isVisible) {
            this.sidebar.style.opacity = '1';
            this.isVisible = true;
          }
        }
        
        // Hide the sidebar
        hideSidebar() {
          if (this.isVisible) {
            this.sidebar.style.opacity = '0';
            this.isVisible = false;
          }
        }
      };
    }
    
    // Get current page path
    const path = window.location.pathname;
    
    // Default to empty array
    let sections = [];
    
    // Define sections for each page
    if (path === '/' || path === '' || path.includes('index')) {
      // Homepage
      sections = [
        { label: 'Features', link: '#features' },
        { label: 'About', link: '#about-vitality' },
        { label: 'Performance', link: '#performance-comparison' }
      ];
    } 
    else if (path.includes('how-it-works')) {
      // How It Works page
      sections = [
        { label: 'Process', link: '#process' },
        { label: 'Video Tutorial', link: '#video-tutorial' },
        { label: 'Use Cases', link: '#use-cases' },
        { label: 'Key Features', link: '#key-features' },
        { label: 'FAQ', link: '#faq-mini' },
        { label: 'Get Started', link: '#cta' }
      ];
    }
    else if (path.includes('documentation')) {
      // Documentation page
      sections = [
        { label: 'Installation', link: '#installation' },
        { label: 'Requirements', link: '#system-requirements' },
        { label: 'Activation', link: '#license-activation' },
        { label: 'Interface', link: '#user-interface' },
        { label: 'Tweaks', link: '#performance-tweaks' },
        { label: 'Misc', link: '#miscellaneous-tweaks' },
        { label: 'Tools', link: '#tools' },
        { label: 'Utilities', link: '#utilities' },
        { label: 'Settings', link: '#settings' },
        { label: 'Backup', link: '#backup-restore' },
        { label: 'Games', link: '#optimizing-games' },
        { label: 'Issues', link: '#common-issues' },
        { label: 'Support', link: '#support' }
      ];
    }
    else if (path.includes('download')) {
      // Download page
      sections = [
        { label: 'Options', link: '.download-options' },
        { label: 'Installation', link: '.installation-guide' },
        { label: 'What\'s New', link: '.changelog' }
      ];
    }
    else if (path.includes('faq')) {
      // FAQ page sections
      sections = [
        { label: 'What Is Vitality', link: '.faq-content' },
        { label: 'Installation', link: '.faq-item:nth-child(2)' },
        { label: 'Game Compatibility', link: '.faq-item:nth-child(3)' },
        { label: 'Premium Features', link: '.faq-item:nth-child(4)' },
        { label: 'Updates', link: '.faq-item:nth-child(5)' },
        { label: 'Support', link: '.faq-item:nth-child(6)' },
        { label: 'Safety', link: '.faq-item:nth-child(7)' },
        { label: 'Contact Us', link: '.faq-cta' }
      ];
    }
    else if (path.includes('purchase')) {
      // Purchase page
      sections = [
        { label: 'Lifetime', link: '.pricing-grid' },
        { label: 'Game Mode', link: '.pricing-grid-single' },
        { label: 'FAQ', link: '/faq' }
      ];
    }
    else if (path.includes('tos')) {
      // Terms of Service page
      sections = [
        { label: 'Introduction', link: '.tos-section:nth-child(1)' },
        { label: 'User Accounts', link: '.tos-section:nth-child(2)' },
        { label: 'Acceptable Use', link: '.tos-section:nth-child(3)' },
        { label: 'Intellectual Property', link: '.tos-section:nth-child(4)' },
        { label: 'Termination', link: '.tos-section:nth-child(5)' },
        { label: 'Disclaimers', link: '.tos-section:nth-child(6)' },
        { label: 'Liability', link: '.tos-section:nth-child(7)' },
        { label: 'Changes', link: '.tos-section:nth-child(8)' },
        { label: 'Contact', link: '.tos-footer' }
      ];
    }
    else if (path.includes('affiliate')) {
      // Affiliate page
      sections = [
        { label: 'Introduction', link: '.affiliate-header' },
        { label: 'Benefits', link: '.affiliate-section:nth-child(1)' },
        { label: 'How It Works', link: '.affiliate-section:nth-child(2)' },
        { label: 'Get Started', link: '.affiliate-section:nth-child(3)' }
      ];
    }
    
    // Only create sidebar if we have sections
    if (sections.length > 0) {
      window.lusionSidebar = new LusionSidebar({
        items: sections,
        fadeDelay: 5000 // 5 seconds
      });
    }
  }
})();