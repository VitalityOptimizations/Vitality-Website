// Page Transitions Class
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