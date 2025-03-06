// Scroll Animations Class
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