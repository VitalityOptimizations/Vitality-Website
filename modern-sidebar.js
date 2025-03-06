// Modern Sidebar Navigation Class
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