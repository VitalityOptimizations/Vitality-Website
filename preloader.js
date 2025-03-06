// Preloader Animation System
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