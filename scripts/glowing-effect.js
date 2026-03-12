/**
 * Glowing Effect - Vanilla JS port of the React GlowingEffect component
 * Injects the glow directly inside each card so it follows all CSS animations.
 */
(function () {
  'use strict';

  var SPREAD = 60;
  var PROXIMITY = 64;
  var INACTIVE_ZONE = 0.01;
  var BORDER_WIDTH = 2;

  /* ---- easing / animation ---- */

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateValue(from, to, duration, onUpdate) {
    var start = null;
    function tick(now) {
      if (!start) start = now;
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      onUpdate(from + (to - from) * easeOutCubic(progress));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---- per-card state ---- */

  function GlowCard(card, glowEl) {
    this.card   = card;
    this.glowEl = glowEl;
    this.animating = false;
  }

  GlowCard.prototype.update = function (mx, my) {
    var rect = this.card.getBoundingClientRect();
    var cx = rect.left + rect.width  * 0.5;
    var cy = rect.top  + rect.height * 0.5;

    var dist          = Math.sqrt(Math.pow(mx - cx, 2) + Math.pow(my - cy, 2));
    var inactiveRadius = 0.5 * Math.min(rect.width, rect.height) * INACTIVE_ZONE;

    if (dist < inactiveRadius) {
      this.glowEl.style.setProperty('--active', '0');
      return;
    }

    var isActive =
      mx > rect.left   - PROXIMITY &&
      mx < rect.right  + PROXIMITY &&
      my > rect.top    - PROXIMITY &&
      my < rect.bottom + PROXIMITY;

    this.glowEl.style.setProperty('--active', isActive ? '1' : '0');
    if (!isActive) return;

    var targetAngle = (180 * Math.atan2(my - cy, mx - cx)) / Math.PI + 90;
    var from   = parseFloat(this.glowEl.style.getPropertyValue('--start')) || 0;
    var diff   = ((targetAngle - from + 180) % 360) - 180;
    var to     = from + diff;
    var glowEl = this.glowEl;

    if (!this.animating) {
      this.animating = true;
      var self = this;
      animateValue(from, to, 400, function (v) {
        glowEl.style.setProperty('--start', String(v));
      });
      setTimeout(function () { self.animating = false; }, 420);
    }
  };

  /* ---- manager ---- */

  var cards  = [];
  var mouseX = 0;
  var mouseY = 0;
  var rafId  = null;

  function flush() {
    for (var i = 0; i < cards.length; i++) cards[i].update(mouseX, mouseY);
    rafId = null;
  }

  function scheduleUpdate() {
    if (!rafId) rafId = requestAnimationFrame(flush);
  }

  function createGlowCard(element) {
    /* The glow's ::after extends 2 px outside the element border.
       Allow that bleed — none of these info-cards have content that overflows. */
    element.style.overflow = 'visible';

    var glowEl = document.createElement('div');
    glowEl.className = 'glowing-effect';
    glowEl.style.setProperty('--spread',       String(SPREAD));
    glowEl.style.setProperty('--border-width', BORDER_WIDTH + 'px');
    glowEl.style.setProperty('--active',       '0');
    glowEl.style.setProperty('--start',        '0');

    /* Insert as the very first child so z-index works predictably */
    element.insertBefore(glowEl, element.firstChild);
    cards.push(new GlowCard(element, glowEl));
  }

  /* All card types across every page of the site */
  var CARD_SELECTOR = [
    /* index */
    '.feature-item', '.about-column',
    /* purchase */
    '.pricing-card-v2',
    /* download */
    '.download-card',
    /* faq */
    '.faq-item',
    /* how-it-works / affiliate */
    '.step',
    /* documentation */
    '.card', '.tool-card',
    /* bios-tweaker */
    '.bios-step-card', '.bios-cap-card', '.bios-stat-card',
    '.bios-audience-card', '.bios-spec-card'
  ].join(', ');

  function init() {
    var targets = document.querySelectorAll(CARD_SELECTOR);
    for (var i = 0; i < targets.length; i++) createGlowCard(targets[i]);

    document.addEventListener('pointermove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      scheduleUpdate();
    }, { passive: true });

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
