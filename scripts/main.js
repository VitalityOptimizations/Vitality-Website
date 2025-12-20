/**
 * VITALITY OPTIMIZATION - MAIN JAVASCRIPT
 * Core functionality and essential features for the website
 * ============================================================ */

// ============================================================
// DOM READY HANDLER
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  console.log('Vitality Optimization - Main script loaded');
  
  try {
    // Initialize all core functionality
    initCoreFeatures();
    initSmoothScrolling();
    initPerformanceStats();
    initMobileMenu();
    initScrollEffects();
    
    // Initialize AOS animations if available
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
      });
    }
  } catch (error) {
    console.error('Main script error:', error);
    // Don't add loaded class here - let preloader handle it
  }
});

// ============================================================
// CORE FEATURES INITIALIZATION
// ============================================================
function initCoreFeatures() {
  // URL cleanup for .html extensions
  var url = window.location.pathname;
  if (url.endsWith('.html')) {
    var newUrl = url.replace('.html', '');
    window.history.replaceState(null, '', newUrl);
  }
  
  // Don't add loaded class here - let preloader handle it
  // The preloader will add 'loaded' class when ready
  
  // Initialize any lazy loading
  initLazyLoading();
}

// ============================================================
// SMOOTH SCROLLING FUNCTIONALITY
// ============================================================
function initSmoothScrolling() {
  // Handle all navigation links
  document.querySelectorAll('nav ul li a, .cta-button[href^="#"], a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Apply smooth scroll only for internal links
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }
      // Allow external links to work normally
    });
  });
  
  // Smooth scroll for footer links
  document.querySelectorAll('.footer-column a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }
    });
  });
}

// ============================================================
// PERFORMANCE STATS FUNCTIONALITY
// ============================================================
function initPerformanceStats() {
  const gameSelect = document.getElementById('games');
  const boostPercentage = document.querySelector('.boost-percentage');
  const withVitalityBar = document.querySelector('.with-vitality');
  const withoutVitalityBar = document.querySelector('.without-vitality');
  
  if (gameSelect && boostPercentage) {
    // Game performance data
    const gameData = {
      fortnite: {
        boost: '55.36%',
        withVitality: '710 Average',
        withoutVitality: '457 Average',
        withVitalityWidth: '80%',
        withoutVitalityWidth: '60%'
      },
      valorant: {
        boost: '48.92%',
        withVitality: '890 Average',
        withoutVitality: '598 Average',
        withVitalityWidth: '85%',
        withoutVitalityWidth: '57%'
      },
      csgo: {
        boost: '62.15%',
        withVitality: '1200 Average',
        withoutVitality: '740 Average',
        withVitalityWidth: '90%',
        withoutVitalityWidth: '55%'
      },
      apex: {
        boost: '51.78%',
        withVitality: '165 Average',
        withoutVitality: '109 Average',
        withVitalityWidth: '82%',
        withoutVitalityWidth: '54%'
      }
    };
    
    // Update game selection options
    Object.keys(gameData).forEach(game => {
      const option = document.createElement('option');
      option.value = game;
      option.textContent = game.charAt(0).toUpperCase() + game.slice(1);
      gameSelect.appendChild(option);
    });
    
    // Handle game selection change
    gameSelect.addEventListener('change', function() {
      const selectedGame = this.value;
      const data = gameData[selectedGame];
      
      if (data) {
        // Update boost percentage
        boostPercentage.textContent = data.boost;
        
        // Update FPS bars
        withVitalityBar.textContent = `WITH VITALITY ${data.withVitality}`;
        withVitalityBar.style.width = data.withVitalityWidth;
        
        withoutVitalityBar.textContent = `WITHOUT VITALITY ${data.withoutVitality}`;
        withoutVitalityBar.style.width = data.withoutVitalityWidth;
        
        // Animate the change
        animatePerformanceUpdate();
      }
    });
  }
}

// ============================================================
// PERFORMANCE UPDATE ANIMATION
// ============================================================
function animatePerformanceUpdate() {
  const bars = document.querySelectorAll('.fps-bar > div');
  
  bars.forEach(bar => {
    bar.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Trigger reflow for smooth animation
    bar.offsetHeight;
    
    // Add a subtle scale effect
    bar.style.transform = 'scale(1.02)';
    setTimeout(() => {
      bar.style.transform = 'scale(1)';
    }, 200);
  });
}

// ============================================================
// MOBILE MENU FUNCTIONALITY
// ============================================================
function initMobileMenu() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.createElement('button');
  const navMenu = document.querySelector('nav ul');
  
  if (navbar && navMenu) {
    // Create mobile menu toggle
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = `
      <span class="nav-toggle-line"></span>
      <span class="nav-toggle-line"></span>
      <span class="nav-toggle-line"></span>
    `;
    
    // Add toggle button to navbar
    navbar.appendChild(navToggle);
    
    // Add mobile styles
    navMenu.classList.add('nav-menu');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('nav-menu-active');
      navToggle.classList.toggle('nav-toggle-active');
      document.body.classList.toggle('nav-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navbar.contains(e.target)) {
        navMenu.classList.remove('nav-menu-active');
        navToggle.classList.remove('nav-toggle-active');
        document.body.classList.remove('nav-open');
      }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        navMenu.classList.remove('nav-menu-active');
        navToggle.classList.remove('nav-toggle-active');
        document.body.classList.remove('nav-open');
      }
    });
  }
}

// ============================================================
// SCROLL EFFECTS AND ANIMATIONS
// ============================================================
function initScrollEffects() {
  // Parallax effect for hero section
  const heroSection = document.querySelector('.main-hero');
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      if (heroSection) {
        heroSection.style.transform = `translateY(${rate}px)`;
      }
    });
  }
  
  // Fade in elements on scroll
  const fadeElements = document.querySelectorAll('.feature-item, .performance-image, .performance-stats');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  fadeElements.forEach(element => {
    fadeObserver.observe(element);
  });
  
  // Sticky navigation
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        navbar.classList.add('navbar-sticky');
      } else {
        navbar.classList.remove('navbar-sticky');
      }
    });
  }
}

// ============================================================
// LAZY LOADING FUNCTIONALITY
// ============================================================
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ============================================================
// ERROR HANDLING
// ============================================================
window.addEventListener('error', function(e) {
  console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
});

// ============================================================
// PERFORMANCE MONITORING
// ============================================================
if ('performance' in window) {
  window.addEventListener('load', function() {
    setTimeout(function() {
      const perfData = performance.getEntriesByType('navigation')[0];
      if (perfData) {
        console.log('Page load time:', Math.round(perfData.loadEventEnd - perfData.loadEventStart), 'ms');
      }
    }, 0);
  });
}

// ============================================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================================
function initAccessibility() {
  // Add skip to content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add focus indicators
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
  });
}

// ============================================================
// ANALYTICS AND TRACKING
// ============================================================
function initAnalytics() {
  // Track CTA button clicks
  document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function() {
      const action = this.textContent.toLowerCase();
      const href = this.getAttribute('href');
      
      // Track button click
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          'event_category': 'CTA',
          'event_label': action,
          'value': href
        });
      }
      
      // Track with Clarity if available
      if (typeof clarity !== 'undefined') {
        clarity('event', 'cta_click', {
          action: action,
          href: href
        });
      }
    });
  });
  
  // Track scroll depth
  let maxScroll = 0;
  window.addEventListener('scroll', throttle(function() {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      // Track scroll milestones
      if (maxScroll >= 25 && maxScroll < 50) {
        trackScrollDepth('25%');
      } else if (maxScroll >= 50 && maxScroll < 75) {
        trackScrollDepth('50%');
      } else if (maxScroll >= 75 && maxScroll < 100) {
        trackScrollDepth('75%');
      } else if (maxScroll >= 100) {
        trackScrollDepth('100%');
      }
    }
  }, 100));
}

function trackScrollDepth(depth) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'scroll', {
      'event_category': 'Engagement',
      'event_label': `Scroll Depth: ${depth}`,
      'value': depth
    });
  }
}

// ============================================================
// INITIALIZE ADDITIONAL FEATURES
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  // Initialize accessibility features
  initAccessibility();
  
  // Initialize analytics
  initAnalytics();
  
  // Add CSS classes for enhanced styling
  document.documentElement.classList.add('js-enabled');
  
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduced-motion');
  }
});

// ============================================================
// EXPORT FOR MODULE USAGE (if needed)
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initCoreFeatures,
    initSmoothScrolling,
    initPerformanceStats,
    initMobileMenu,
    initScrollEffects,
    debounce,
    throttle
  };
}
