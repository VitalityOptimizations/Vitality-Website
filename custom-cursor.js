// Custom Cursor Class
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