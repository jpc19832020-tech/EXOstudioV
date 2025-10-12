// EXO digital studio - Main JavaScript
// Performance optimized with modern APIs

class EXODigitalStudio {
  constructor() {
    this.isLoaded = false;
    this.scrollY = 0;
    this ticking = false;
    this.mobileMenuOpen = false;
    
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.setupLoadingScreen();
    this.setupNavigation();
    this.setupScrollEffects();
    this.setupSmoothScrolling();
    this.setupIntersectionObserver();
    this.setupPerformanceOptimizations();
    this.setupAccessibility();
    
    // Hide loading screen after everything is ready
    setTimeout(() => {
      this.hideLoadingScreen();
    }, 1500);
  }

  // Loading Screen Management
  setupLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      // Animate logo drawing
      const logoPath = loadingScreen.querySelector('.logo-svg path');
      if (logoPath) {
        logoPath.style.strokeDashoffset = '0';
      }
    }
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 300);
    }
    this.isLoaded = true;
  }

  // Navigation Setup
  setupNavigation() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', () => {
        this.toggleMobileMenu();
      });

      // Close mobile menu when clicking on links
      mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
          this.closeMobileMenu();
        });
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
          this.closeMobileMenu();
        }
      });
    }
  }

  toggleMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    this.mobileMenuOpen = !this.mobileMenuOpen;
    
    if (mobileMenuToggle) {
      mobileMenuToggle.classList.toggle('active');
    }
    
    if (mobileMenu) {
      mobileMenu.classList.toggle('active');
    }

    // Prevent body scroll when menu is open
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu() {
    if (this.mobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }

  // Scroll Effects
  setupScrollEffects() {
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
      
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this.updateScrollEffects();
          this.ticking = false;
        });
        
        this.ticking = true;
      }
    }, { passive: true });
  }

  updateScrollEffects() {
    const header = document.getElementById('header');
    
    if (header) {
      if (this.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Parallax effect for hero particles
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      const speed = 0.5 + (index * 0.1);
      particle.style.transform = `translateY(${this.scrollY * speed}px)`;
    });
  }

  // Smooth Scrolling
  setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href !== '#' && href.startsWith('#')) {
          e.preventDefault();
          
          const target = document.querySelector(href);
          if (target) {
            const headerHeight = document.getElementById('header')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  // Intersection Observer for animations
  setupIntersectionObserver() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      return;
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
      '.feature-card, .product-card, .section-title, .section-description'
    );
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }

  animateElement(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    // Force reflow
    element.offsetHeight;
    
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }

  // Performance Optimizations
  setupPerformanceOptimizations() {
    // Lazy load images when they come into viewport
    this.setupLazyLoading();
    
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Optimize animations with will-change
    this.optimizeAnimations();
  }

  setupLazyLoading() {
    if (!('IntersectionObserver' in window)) {
      return;
    }

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  preloadCriticalResources() {
    // Preload fonts
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Display:wght@600;700&display=swap'
    ];

    fontLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.onload = function() { this.rel = 'stylesheet'; };
      document.head.appendChild(link);
    });
  }

  optimizeAnimations() {
    // Add will-change to animated elements for better performance
    const animatedElements = document.querySelectorAll(
      '.hero-title, .particle, .feature-card, .product-card'
    );
    
    animatedElements.forEach(element => {
      element.style.willChange = 'transform, opacity';
    });

    // Remove will-change after animation completes
    setTimeout(() => {
      animatedElements.forEach(element => {
        element.style.willChange = 'auto';
      });
    }, 3000);
  }

  // Accessibility Features
  setupAccessibility() {
    // Keyboard navigation
    this.setupKeyboardNavigation();
    
    // Focus management
    this.setupFocusManagement();
    
    // ARIA live regions for dynamic content
    this.setupAriaLive();
  }

  setupKeyboardNavigation() {
    // ESC key to close mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileMenuOpen) {
        this.closeMobileMenu();
      }
    });

    // Tab navigation for mobile menu
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleMobileMenu();
        }
      });
    }
  }

  setupFocusManagement() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--accent-primary);
      color: var(--bg-primary);
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  setupAriaLive() {
    // Create aria-live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    document.body.appendChild(liveRegion);
  }

  // Utility Functions
  debounce(func, wait) {
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

  throttle(func, limit) {
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

  // Analytics and tracking (placeholder)
  setupAnalytics() {
    // Add your analytics code here
    // Example: Google Analytics, Hotjar, etc.
  }

  // Error handling
  setupErrorHandling() {
    window.addEventListener('error', (e) => {
      console.error('JavaScript error:', e.error);
      // You could send this to an error tracking service
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      // You could send this to an error tracking service
    });
  }
}

// Initialize the application
const exoStudio = new EXODigitalStudio();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EXODigitalStudio;
}

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment the following lines if you want to add a service worker
    /*
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    */
  });
}

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
      console.log(`Page load time: ${loadTime}ms`);
      
      // You could send this data to analytics
      if (loadTime > 3000) {
        console.warn('Page load time is above 3 seconds');
      }
    }, 0);
  });
}