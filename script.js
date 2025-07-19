<<<<<<< HEAD
// Powerlifting Coach Website Interactivity & Animations

document.addEventListener('DOMContentLoaded', function () {
  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  hamburger.addEventListener('click', function () {
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
  });

  // Smooth scrolling for nav links
  document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu after click
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Mobile detection function - more robust
  function isMobile() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // Statistics count-up animation
  const statSection = document.querySelector('.statistics');
  const statNumbers = document.querySelectorAll('.custom-stat-number');
  let statsAnimated = false;
  
  // Initialize stats based on device type
  function initializeStats() {
    console.log('Initializing stats, isMobile:', isMobile(), 'window width:', window.innerWidth);
    
    if (isMobile()) {
      // On mobile, set final values immediately
      statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        console.log('Setting mobile stat:', target);
        stat.textContent = target.toLocaleString();
      });
      statsAnimated = true;
    } else {
      // On desktop, start with 0
      statNumbers.forEach(stat => {
        stat.textContent = '0';
      });
    }
  }
  
  // Call initialization immediately
  initializeStats();
  
  // Fallback initialization after a short delay to ensure DOM is ready
  setTimeout(function() {
    if (isMobile() && statNumbers.length > 0) {
      console.log('Fallback mobile initialization');
      statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        if (stat.textContent === '0' || stat.textContent === '') {
          console.log('Setting fallback stat:', target);
          stat.textContent = target.toLocaleString();
        }
      });
    }
  }, 100);
  
  // Additional fallback for mobile - force set values after page is fully loaded
  window.addEventListener('load', function() {
    if (isMobile()) {
      console.log('Window load event - setting mobile stats');
      statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        stat.textContent = target.toLocaleString();
      });
    }
  });
  
  function animateStats() {
    if (statsAnimated) return;
    
    // On mobile, set static values immediately without animation
    if (isMobile()) {
      statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        stat.textContent = target.toLocaleString();
      });
      statsAnimated = true;
      return;
    }
    
    // Desktop animation
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      let duration = 6000; // 6 seconds for all
      let start = 0;
      const step = Math.max(1, Math.ceil(target / (duration / 16)));
      stat.textContent = '0'; // Always start from 0
      function update() {
        start += step;
        if (start >= target) {
          stat.textContent = target.toLocaleString();
        } else {
          stat.textContent = start.toLocaleString();
          requestAnimationFrame(update);
        }
      }
      update();
    });
    statsAnimated = true;
  }
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top < window.innerHeight - 80 &&
      rect.bottom > 80
    );
  }

  // Trigger stats animation on mouse hover over the statistics section
  statSection.addEventListener('mouseenter', function () {
    animateStats();
  });

  // Handle window resize to reset animation state
  window.addEventListener('resize', function() {
    // Reset animation state when switching between mobile and desktop
    statsAnimated = false;
    // Re-initialize stats based on new screen size
    initializeStats();
  });

  // Keep scroll for animateCircles only
  window.addEventListener('scroll', function () {
    animateCircles();
  });

  // Circle drawing animation for pagination dots and checkmarks
  function animateCircles() {
    // Pagination dots
    document.querySelectorAll('.pagination-dot').forEach(dot => {
      if (isInViewport(dot) && !dot.classList.contains('drawn')) {
        dot.classList.add('drawn');
        dot.style.boxShadow = '0 0 0 3px #8B0000 inset';
        setTimeout(() => {
          dot.style.boxShadow = '';
        }, 800);
      }
    });
    // Coach checkmarks
    document.querySelectorAll('.coach-check i').forEach(check => {
      if (isInViewport(check) && !check.classList.contains('drawn')) {
        check.classList.add('drawn');
        check.style.color = '#8B0000';
        setTimeout(() => {
          check.style.color = '';
        }, 900);
      }
    });
  }
  animateCircles();

  // Accessibility: keyboard navigation for hamburger and nav
  hamburger.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      hamburger.click();
    }
  });
  // Trap focus in nav when open (mobile)
  document.addEventListener('keydown', function (e) {
    if (navMenu.classList.contains('active')) {
      const focusable = navMenu.querySelectorAll('a');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  // Play button overlays video
  const playButton = document.querySelector('.play-button');
  const video = document.querySelector('.video-player video');
  if (playButton && video) {
    playButton.addEventListener('click', function () {
      video.play();
      playButton.style.display = 'none';
      video.setAttribute('controls', 'controls');
    });
    video.addEventListener('pause', function () {
      playButton.style.display = '';
    });
    video.addEventListener('play', function () {
      playButton.style.display = 'none';
    });
  }


  
      
 
  
=======
// Powerlifting Coach Website Interactivity & Animations

document.addEventListener('DOMContentLoaded', function () {
  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  hamburger.addEventListener('click', function () {
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
  });

  // Smooth scrolling for nav links
  document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu after click
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Statistics count-up animation
  const statSection = document.querySelector('.statistics');
  const statNumbers = document.querySelectorAll('.custom-stat-number');
  let statsAnimated = false;
  function animateStats() {
    if (statsAnimated) return;
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      let duration = 6000; // 6 seconds for all
      let start = 0;
      const step = Math.max(1, Math.ceil(target / (duration / 16)));
      stat.textContent = '0'; // Always start from 0
      function update() {
        start += step;
        if (start >= target) {
          stat.textContent = target.toLocaleString();
        } else {
          stat.textContent = start.toLocaleString();
          requestAnimationFrame(update);
        }
      }
      update();
    });
    statsAnimated = true;
  }
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top < window.innerHeight - 80 &&
      rect.bottom > 80
    );
  }

  // Trigger stats animation on mouse hover over the statistics section
  statSection.addEventListener('mouseenter', function () {
    animateStats();
  });

  // Keep scroll for animateCircles only
  window.addEventListener('scroll', function () {
    animateCircles();
  });

  // Circle drawing animation for pagination dots and checkmarks
  function animateCircles() {
    // Pagination dots
    document.querySelectorAll('.pagination-dot').forEach(dot => {
      if (isInViewport(dot) && !dot.classList.contains('drawn')) {
        dot.classList.add('drawn');
        dot.style.boxShadow = '0 0 0 3px #8B0000 inset';
        setTimeout(() => {
          dot.style.boxShadow = '';
        }, 800);
      }
    });
    // Coach checkmarks
    document.querySelectorAll('.coach-check i').forEach(check => {
      if (isInViewport(check) && !check.classList.contains('drawn')) {
        check.classList.add('drawn');
        check.style.color = '#8B0000';
        setTimeout(() => {
          check.style.color = '';
        }, 900);
      }
    });
  }
  animateCircles();

  // Accessibility: keyboard navigation for hamburger and nav
  hamburger.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      hamburger.click();
    }
  });
  // Trap focus in nav when open (mobile)
  document.addEventListener('keydown', function (e) {
    if (navMenu.classList.contains('active')) {
      const focusable = navMenu.querySelectorAll('a');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  // Play button overlays video
  const playButton = document.querySelector('.play-button');
  const video = document.querySelector('.video-player video');
  if (playButton && video) {
    playButton.addEventListener('click', function () {
      video.play();
      playButton.style.display = 'none';
      video.setAttribute('controls', 'controls');
    });
    video.addEventListener('pause', function () {
      playButton.style.display = '';
    });
    video.addEventListener('play', function () {
      playButton.style.display = 'none';
    });
  }

  // Testimonial flip card interactivity
  const flipCard = document.querySelector('.testimonial-flip-card');
  if (flipCard) {
    flipCard.tabIndex = 0;
    flipCard.setAttribute('role', 'button');
    flipCard.setAttribute('aria-pressed', 'false');
    flipCard.addEventListener('click', function () {
      flipCard.classList.toggle('flipped');
      flipCard.setAttribute('aria-pressed', flipCard.classList.contains('flipped'));
    });
    flipCard.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flipCard.click();
      }
    });
  }
>>>>>>> main
}); 