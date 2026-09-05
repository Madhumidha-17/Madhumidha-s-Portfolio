document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // Sticky Navigation Bar & Menu Interactions
  // =========================================================================
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Change navbar styling on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Toggle mobile navigation menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile navigation menu on menu link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // =========================================================================
  // Typing Carousel Effect
  // =========================================================================
  const typingTextEl = document.getElementById('typing-text');
  const roles = [
    'Full Stack Developer & AI Enthusiast',
    'Full Stack Developer',
    'AI Enthusiast'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    if (!typingTextEl) return;
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      // Remove character
      typingTextEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40; // delete faster
    } else {
      // Add character
      typingTextEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80; // type speed
    }

    // Check if word is fully typed
    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at the end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length; // Move to next word
      typeSpeed = 500; // Pause before typing new word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  // Start the typing effect
  typeEffect();

  // =========================================================================
  // Scroll Reveal Animations (Intersection Observer)
  // =========================================================================
  const scrollElements = document.querySelectorAll('.scroll-reveal');

  const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= 
      (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100)
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add('active');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 85)) {
        displayScrollElement(el);
      }
    });
  };

  // Run scroll reveal check on load and scroll
  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  });
  
  // Initial call to reveal elements already in viewport
  setTimeout(handleScrollAnimation, 100);

  // =========================================================================
  // Active Navigation Link on Scroll Indicator
  // =========================================================================
  const sections = document.querySelectorAll('header, section');

  const highlightNav = () => {
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionId = current.getAttribute('id');
      if (!sectionId) return;
      
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // adjust for sticky header height
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add('active');
      } else {
        document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNav);

  // =========================================================================
  // Contact Form Interactive Logic
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const formSubmitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form submission
      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML = 'Sending Message... <i class="fa-solid fa-spinner fa-spin"></i>';
      
      setTimeout(() => {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. Madhumidha will respond shortly.';
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          formStatus.innerHTML = '';
          formStatus.className = 'form-status';
        }, 5000);
      }, 1500);
    });
  }

  // =========================================================================
  // Custom Magnetic Mouse Cursor Trail
  // =========================================================================
  const cursor = document.getElementById('custom-cursor');
  const cursorDot = document.getElementById('custom-cursor-dot');
  const cursorText = document.getElementById('custom-cursor-text');

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let dotX = 0, dotY = 0;

  // Easing values
  const cursorEase = 0.15;
  const dotEase = 0.8;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * cursorEase;
    cursorY += (mouseY - cursorY) * cursorEase;
    dotX += (mouseX - dotX) * dotEase;
    dotY += (mouseY - dotY) * dotEase;

    if (cursor) {
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
    }
    if (cursorDot) {
      cursorDot.style.left = `${dotX}px`;
      cursorDot.style.top = `${dotY}px`;
    }
    if (cursorText) {
      cursorText.style.left = `${dotX}px`;
      cursorText.style.top = `${dotY}px`;
    }

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover states for links and buttons
  const hoverElements = document.querySelectorAll('a, button, .service-card, .project-card, .photo-wrapper');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
      cursorDot.classList.add('hovering');
      
      // Special labels
      if (el.classList.contains('project-card') || el.classList.contains('project-link')) {
        cursorText.textContent = 'View';
        cursorText.classList.add('active');
      } else if (el.getAttribute('href') && el.getAttribute('href').includes('mailto')) {
        cursorText.textContent = 'Email';
        cursorText.classList.add('active');
      } else if (el.getAttribute('download') !== null) {
        cursorText.textContent = 'Get';
        cursorText.classList.add('active');
      }
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering');
      cursorDot.classList.remove('hovering');
      cursorText.classList.remove('active');
    });
  });

  // =========================================================================
  // High-Performance Interactive Particle & Matrix Canvas
  // =========================================================================
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const maxParticles = 60;
    const maxDistance = 120;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let canvasMode = 'connect'; // 'connect', 'gravity', or 'rain'

    // Code rain variables
    let columns = Math.floor(width / 20);
    let drops = Array(columns).fill(0);
    const chars = "0101010101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$*&";

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        if (canvasMode === 'gravity' && localMouse.x !== null && localMouse.y !== null) {
          const dx = localMouse.x - this.x;
          const dy = localMouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 5) {
            const force = 0.04;
            this.vx += (dx / dist) * force;
            this.vy += (dy / dist) * force;
            this.vx *= 0.98;
            this.vy *= 0.98;
          }
        } else {
          this.vx += (Math.random() - 0.5) * 0.01;
          this.vy += (Math.random() - 0.5) * 0.01;
          
          const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
          if (speed > 0.5) {
            this.vx = (this.vx / speed) * 0.5;
            this.vy = (this.vy / speed) * 0.5;
          }
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
        ctx.fill();
      }
    }

    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    let localMouse = { x: null, y: null };
    window.addEventListener('mousemove', (e) => {
      localMouse.x = e.clientX;
      localMouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
      localMouse.x = null;
      localMouse.y = null;
    });

    // Toggle particle mode or trigger click burst on canvas click
    window.addEventListener('click', (e) => {
      if (e.target.tagName === 'BODY' || e.target.id === 'particles-canvas') {
        if (canvasMode === 'connect') {
          canvasMode = 'gravity';
        } else if (canvasMode === 'gravity') {
          canvasMode = 'rain';
          drops.fill(0);
        } else {
          canvasMode = 'connect';
        }
        
        if (cursor) {
          cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
          setTimeout(() => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
          }, 250);
        }
      }

      for (let i = 0; i < 5; i++) {
        const p = new Particle();
        p.x = e.clientX;
        p.y = e.clientY;
        p.vx = (Math.random() - 0.5) * 2;
        p.vy = (Math.random() - 0.5) * 2;
        particles.push(p);
        if (particles.length > maxParticles + 15) {
          particles.shift();
        }
      }
    });

    function drawDigitalRain() {
      ctx.fillStyle = 'rgba(10, 13, 20, 0.08)';
      ctx.fillRect(0, 0, width, height);

      const activeColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-indigo').trim() || '#6366F1';
      ctx.fillStyle = activeColor;
      ctx.font = '14px Courier New';

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 20;
        const y = drops[i] * 20;

        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    function animateParticles() {
      if (canvasMode === 'rain') {
        drawDigitalRain();
      } else {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();

          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDistance) {
              const alpha = (1 - dist / maxDistance) * 0.15;
              ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }

          if (localMouse.x !== null && localMouse.y !== null) {
            const dx = particles[i].x - localMouse.x;
            const dy = particles[i].y - localMouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDistance + 30) {
              const alpha = (1 - dist / (maxDistance + 30)) * 0.25;
              ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(localMouse.x, localMouse.y);
              ctx.stroke();
            }
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }
    animateParticles();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / 20);
      drops = Array(columns).fill(0);
    });
  }

  // =========================================================================
  // 3D Card Tilt Effect
  // =========================================================================
  const tiltElements = document.querySelectorAll('.hover-tilt');
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((centerY - y) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });

  // =========================================================================
  // Magnetic Buttons & Links Effect
  // =========================================================================
  const magneticEls = document.querySelectorAll('.hover-magnetic');
  magneticEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
    });
  });

  // =========================================================================
  // Interactive Hero Code Tabs
  // =========================================================================
  const codeContentEl = document.getElementById('code-content');
  const codeTabs = document.querySelectorAll('.code-tab');

  const tabContents = {
    js: `<span class="keyword">const</span> <span class="variable">developer</span> = {
  <span class="property">name</span>: <span class="string">"Madhumidha A"</span>,
  <span class="property">education</span>: <span class="string">"B.Tech IT"</span>,
  <span class="property">skills</span>: [<span class="string">"Full-Stack"</span>, <span class="string">"AI"</span>],
  <span class="property">passion</span>: <span class="string">"Intelligent Solutions"</span>
};

<span class="keyword">function</span> <span class="function-name">buildFuture</span>(<span class="variable">idea</span>) {
  <span class="keyword">return</span> <span class="variable">developer</span>.<span class="function-name">code</span>(<span class="variable">idea</span>);
}`,
    py: `<span class="keyword">class</span> <span class="variable">DeveloperProfile</span>:
    <span class="keyword">def</span> <span class="function-name">__init__</span>(<span class="variable">self</span>):
        <span class="variable">self</span>.<span class="property">name</span> = <span class="string">"Madhumidha A"</span>
        <span class="variable">self</span>.<span class="property">languages</span> = [<span class="string">"Python"</span>, <span class="string">"Java"</span>, <span class="string">"JavaScript"</span>, <span class="string">"SQL"</span>]
        <span class="variable">self</span>.<span class="property">frameworks</span> = [<span class="string">"TensorFlow"</span>, <span class="string">"Keras"</span>, <span class="string">"OpenCV"</span>, <span class="string">"React"</span>]

    <span class="keyword">def</span> <span class="function-name">get_core_focus</span>(<span class="variable">self</span>):
        <span class="keyword">return</span> <span class="string">"Deep Learning & Real-time Computer Vision"</span>`,
    json: `{
  <span class="property">"project"</span>: <span class="string">"Real-Time Facial Emotion Recognition"</span>,
  <span class="property">"dataset"</span>: <span class="string">"FER-2013"</span>,
  <span class="property">"model"</span>: <span class="string">"Convolutional Neural Network (CNN)"</span>,
  <span class="property">"accuracy"</span>: <span class="string">"70%+"</span>,
  <span class="property">"features"</span>: [
    <span class="string">"OpenCV real-time face tracking"</span>,
    <span class="string">"7 distinct classifications"</span>,
    <span class="string">"Instant webcam inference feedback"</span>
  ]
}`
  };

  codeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      codeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const fileType = tab.getAttribute('data-tab');
      const textToType = tabContents[fileType];

      if (codeContentEl) {
        codeContentEl.innerHTML = textToType;
        codeContentEl.style.opacity = 0;
        setTimeout(() => {
          codeContentEl.style.opacity = 1;
          codeContentEl.style.transition = 'opacity 0.4s ease';
        }, 50);
      }
    });
  });

  // =========================================================================
  // Matrix Character Scramble Decoder
  // =========================================================================
  function scrambleText(element) {
    if (element.classList.contains('scramble-done')) return;
    element.classList.add('scramble-done');
    
    const originalHTML = element.innerHTML;
    const originalText = element.textContent.trim();
    const chars = "!@#$%^&*()_+{}:<>?[]1234567890abcdefghijklmnopqrstuvwxyz";
    let iterations = 0;
    
    const interval = setInterval(() => {
      element.innerHTML = originalText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < iterations) {
            return originalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
        
      if (iterations >= originalText.length) {
        clearInterval(interval);
        element.innerHTML = originalHTML;
      }
      
      iterations += 1/2;
    }, 30);
  }

  const scrambleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scrambleText(entry.target);
      }
    });
  }, { threshold: 0.15 });

  const headersToScramble = document.querySelectorAll('.section-title, .hero-subtitle, .hero-title');
  headersToScramble.forEach(header => {
    scrambleObserver.observe(header);
  });

  // =========================================================================
  // Theme Accent Customizer Logic
  // =========================================================================
  const themeDots = document.querySelectorAll('.color-dot');
  const themeMap = {
    indigo: { primary: '#6366F1', secondary: '#8B5CF6' },
    cyan: { primary: '#06B6D4', secondary: '#10B981' },
    emerald: { primary: '#10B981', secondary: '#059669' },
    rose: { primary: '#F43F5E', secondary: '#D946EF' }
  };

  themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
      themeDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      const themeName = dot.getAttribute('data-theme');
      const colors = themeMap[themeName];

      document.documentElement.style.setProperty('--accent-indigo', colors.primary);
      document.documentElement.style.setProperty('--accent-violet', colors.secondary);
      document.documentElement.style.setProperty('--accent-cyan', colors.primary);

      const cursorEl = document.getElementById('custom-cursor');
      if (cursorEl) {
        cursorEl.style.transform = 'translate(-50%, -50%) scale(2.2)';
        cursorEl.style.borderColor = colors.primary;
        setTimeout(() => {
          cursorEl.style.transform = 'translate(-50%, -50%) scale(1)';
          cursorEl.style.borderColor = '';
        }, 300);
      }
    });
  });

  // =========================================================================
  // Scroll Tracker & Progress Bar & Mouse Indicator Fade
  // =========================================================================
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
  
  const progressContainer = document.createElement('div');
  progressContainer.className = 'scroll-progress-container';
  progressContainer.appendChild(progressBar);
  
  const navbarEl = document.getElementById('navbar');
  if (navbarEl) {
    navbarEl.appendChild(progressContainer);
  }

  const scrollIndicator = document.getElementById('scroll-down-indicator');

  window.addEventListener('scroll', () => {
    // 1. Scroll Progress Bar
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    if (progressBar) {
      progressBar.style.width = `${scrolled}%`;
    }

    // 2. Fade Out Scroll Chevron
    if (scrollIndicator) {
      if (windowScroll > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'all';
      }
    }
  });

  // =========================================================================
  // Cyberpunk Glitch Text Logo
  // =========================================================================
  const logoEl = document.querySelector('.logo');
  if (logoEl) {
    const originalLogoText = 'MA.';
    const glitchChars = '!@#$%^&*()_+{}:"<>?/.,;[]=-';
    let glitchInterval = null;

    logoEl.addEventListener('mouseenter', () => {
      let iterations = 0;
      clearInterval(glitchInterval);
      
      glitchInterval = setInterval(() => {
        logoEl.innerHTML = originalLogoText
          .split('')
          .map((char, index) => {
            if (index < iterations) {
              return originalLogoText[index];
            }
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join('') + '<span class="dot">.</span>';
          
        if (iterations >= originalLogoText.length) {
          clearInterval(glitchInterval);
          logoEl.innerHTML = `MA<span class="dot">.</span>`;
        }
        iterations += 1/3;
      }, 35);
    });
  }

  // =========================================================================
  // SVG circular skills radial filling
  // =========================================================================
  const radialSkills = document.querySelectorAll('.radial-skill');
  
  const animateRadials = () => {
    radialSkills.forEach(skill => {
      const targetPercent = parseInt(skill.getAttribute('data-percent'));
      const circle = skill.querySelector('.radial-progress');
      const numEl = skill.querySelector('.radial-num');
      
      const circumference = 201;
      
      if (skill.classList.contains('animated')) return;
      
      const rect = skill.getBoundingClientRect();
      const inView = (rect.top >= 0 && rect.bottom <= window.innerHeight + 100);
      
      if (inView) {
        skill.classList.add('animated');
        
        const offset = circumference - (targetPercent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
        
        let count = 0;
        const interval = setInterval(() => {
          count++;
          numEl.textContent = `${count}%`;
          if (count >= targetPercent) {
            clearInterval(interval);
          }
        }, 15);
      }
    });
  };

  window.addEventListener('scroll', animateRadials);
  setTimeout(animateRadials, 500); // Initial check

  // =========================================================================
  // Project Glassmorphic Modal Manager
  // =========================================================================
  const projectModal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');
  
  const projectDetailsMap = {
    emotion: {
      title: "Real-Time Facial Emotion Recognition",
      tag: "Deep Learning & Computer Vision",
      content: `
        <p>A high-performance neural connection model designed to read and classify facial expressions in real-time from webcam video feeds. Ideal for analyzing user sentiment and building adaptive AI interfaces.</p>
        <h4>Technical Architecture</h4>
        <ul>
          <li>Custom Convolutional Neural Network (CNN) trained FER-2013 datasets.</li>
          <li>Achieves 70%+ testing classification accuracy across 7 human emotion metrics.</li>
          <li>Optimized OpenCV tracking paths using Haar cascades.</li>
          <li>Webcam frame buffer processing at 30+ frames-per-second.</li>
        </ul>
        <div class="modal-footer-links">
          <a href="https://github.com/Madhumidha-17/Real-Time-Facial-Emotion-Recognition-Using-Deep-Learning" target="_blank" class="btn btn-primary btn-sm">GitHub Repository <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      `
    },
    ecommerce: {
      title: "Full-Stack E-Commerce Platform",
      tag: "Java MVC Architecture",
      content: `
        <p>A comprehensive B2C shopping platform implementing MVC structural layouts. Built using classic enterprise technology to manage catalog indexes, user authentication, and secure checkouts.</p>
        <h4>Technical Architecture</h4>
        <ul>
          <li>Java Servlets and JSP view rendering layers.</li>
          <li>MySQL database schemas linking products, orders, and secure login hashes.</li>
          <li>Shopping cart item persistence utilizing secure session cookies.</li>
          <li>Relational database indexing and high-speed query search optimization.</li>
        </ul>
        <div class="modal-footer-links">
          <span class="project-link disabled"><i class="fa-solid fa-lock"></i> Proprietary Internal Repository</span>
        </div>
      `
    },
    weather: {
      title: "Weather Dynamics Dashboard",
      tag: "REST API & Dashboard UI",
      content: `
        <p>An interactive, responsive weather dashboard widget utilizing dynamic styling maps to reflect geographic conditions. Fetches weather data using secure API endpoints.</p>
        <h4>Technical Architecture</h4>
        <ul>
          <li>OpenWeatherMap API endpoint request integration.</li>
          <li>Asynchronous Fetch requests and browser cache controls.</li>
          <li>Responsive flex layouts with variable glassmorphic backdrops.</li>
          <li>Weather index parameters including wind speeds, humidity, and barometric indices.</li>
        </ul>
        <div class="modal-footer-links">
          <span class="project-link disabled"><i class="fa-solid fa-check-circle"></i> Production API Live</span>
        </div>
      `
    },
    quiz: {
      title: "Interactive MVC Quiz App",
      tag: "Front-end JS Application",
      content: `
        <p>A visually clean, interactive quiz module with score tallies, countdown timers, and result summaries. Showcases robust DOM manipulation and array manipulation methods.</p>
        <h4>Technical Architecture</h4>
        <ul>
          <li>Vanilla JS state machinery with dynamic card rendering modules.</li>
          <li>Staggered question array sorting for varied iterations.</li>
          <li>Local browser memory buffers to store best attempt records.</li>
          <li>Refined animations for correct/incorrect feedback states.</li>
        </ul>
        <div class="modal-footer-links">
          <span class="project-link disabled"><i class="fa-solid fa-gamepad"></i> Interactive Sandbox Ready</span>
        </div>
      `
    }
  };

  const openDetailsButtons = document.querySelectorAll('.view-details-btn');
  
  openDetailsButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pKey = btn.getAttribute('data-project');
      const details = projectDetailsMap[pKey];
      
      if (details && projectModal) {
        modalTitle.textContent = details.title;
        document.getElementById('modal-tag').textContent = details.tag;
        modalBody.innerHTML = details.content;
        
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    if (projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // =========================================================================
  // Web Audio API UI Sound Synthesis
  // =========================================================================
  let audioCtx = null;
  let isMuted = true;
  const soundToggleBtn = document.getElementById('sound-toggle');

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playSynthSound(freq, duration, type = 'sine', volume = 0.1, sweepFreq = null) {
    if (isMuted || !audioCtx) return;
    
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      if (sweepFreq !== null) {
        osc.frequency.exponentialRampToValueAtTime(sweepFreq, audioCtx.currentTime + duration);
      }

      gain.gain.setValueAtTime(volume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Synthesis Blocked", e);
    }
  }

  function playHoverSound() {
    playSynthSound(1600, 0.03, 'sine', 0.04, 800);
  }

  function playClickSound() {
    playSynthSound(1100, 0.12, 'triangle', 0.08, 120);
  }

  function playModalOpenSound() {
    if (isMuted) return;
    playSynthSound(500, 0.06, 'sine', 0.06, 1000);
    setTimeout(() => playSynthSound(700, 0.06, 'sine', 0.06, 1400), 50);
    setTimeout(() => playSynthSound(900, 0.12, 'triangle', 0.08, 450), 100);
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudio();
      
      isMuted = !isMuted;
      
      if (isMuted) {
        soundToggleBtn.classList.remove('sound-on');
        soundToggleBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      } else {
        soundToggleBtn.classList.add('sound-on');
        soundToggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        playModalOpenSound();
        
        try {
          completedQuests.sound = true;
          updateQuestUI();
        } catch (err) {}
      }
    });
  }

  const audibleElements = document.querySelectorAll('a, button, .code-tab, .color-dot, .project-card, .service-card');
  audibleElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      playHoverSound();
    });
    
    el.addEventListener('click', () => {
      if (el.classList.contains('view-details-btn') || el.id === 'form-submit-btn') {
        playModalOpenSound();
      } else {
        playClickSound();
      }
    });
  });

  // =========================================================================
  // Speech Synthesis UI Voice Assistant
  // =========================================================================
  const synth = window.speechSynthesis;
  let voiceUtterance = null;
  let isSpeaking = false;
  const voiceBtn = document.getElementById('voice-intro-btn');

  function startSpeaking() {
    if (!synth) return;
    
    synth.cancel();
    
    if (isMuted && soundToggleBtn) {
      soundToggleBtn.click();
    }

    voiceUtterance = new SpeechSynthesisUtterance("Hello! I am Madhumidha. Welcome to my digital portfolio. I am a B.Tech Information Technology student and aspiring Full Stack Developer with a strong interest in Artificial Intelligence and Machine Learning. Building Intelligent Solutions, One Line of Code at a Time. Feel free to explore my work, check out my projects, or get in touch! Thank you.");
    
    const voices = synth.getVoices();
    const targetVoice = voices.find(voice => 
      voice.name.includes("Google US English Female") || 
      voice.name.includes("Google UK English Female") ||
      voice.name.includes("Zira") || 
      voice.lang.startsWith("en")
    );
    if (targetVoice) {
      voiceUtterance.voice = targetVoice;
    }
    
    voiceUtterance.rate = 0.98;
    voiceUtterance.pitch = 1.05;
    
    voiceUtterance.onend = () => {
      stopSpeaking();
    };

    voiceUtterance.onerror = () => {
      stopSpeaking();
    };

    isSpeaking = true;
    if (voiceBtn) {
      voiceBtn.classList.add('speaking');
      voiceBtn.innerHTML = 'Stop Intro <i class="fa-solid fa-volume-xmark"></i>';
    }
    
    synth.speak(voiceUtterance);
  }

  function stopSpeaking() {
    if (synth) {
      synth.cancel();
    }
    isSpeaking = false;
    if (voiceBtn) {
      voiceBtn.classList.remove('speaking');
      voiceBtn.innerHTML = 'Listen to Intro <i class="fa-solid fa-volume-high"></i>';
    }
  }

  if (voiceBtn) {
    voiceBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudio();
      
      if (isSpeaking) {
        stopSpeaking();
      } else {
        startSpeaking();
      }
    });
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      if (isMuted) {
        stopSpeaking();
      }
    });
  }

  if (synth && synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = () => {
      synth.getVoices();
    };
  }

  // =========================================================================
  // Welcome Intro Screen Controller
  // =========================================================================
  const introScreen = document.getElementById('intro-screen');
  const introEnterBtn = document.getElementById('intro-enter-btn');

  if (introScreen) {
    introScreen.addEventListener('click', (e) => {
      e.stopPropagation();
      
      try {
        initAudio();
        isMuted = false;
        if (soundToggleBtn) {
          soundToggleBtn.classList.add('sound-on');
          soundToggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        }
        playModalOpenSound();
      } catch (err) {
        console.warn("Audio initialisation failed on intro click", err);
      }

      introScreen.classList.add('fade-out');
      introScreen.style.opacity = '0';
      introScreen.style.pointerEvents = 'none';
      introScreen.style.transform = 'scale(1.1)';
      introScreen.style.filter = 'blur(10px)';

      setTimeout(() => {
        introScreen.style.display = 'none';
      }, 850);

      setTimeout(() => {
        try {
          startSpeaking();
        } catch (err) {
          console.warn("Auto speech failed on intro screen transition", err);
        }
      }, 1200);
    });
  }

  // =========================================================================
  // Floating AI Chatbot Controller
  // =========================================================================
  const chatbotWidget = document.getElementById('chatbot-widget');
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
  const chatbotForm = document.getElementById('chatbot-form');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const suggestionChips = document.querySelectorAll('.suggestion-chip');

  if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudio();
      chatbotWindow.classList.toggle('active');
      playClickSound();
      
      const pulse = chatbotToggle.querySelector('.chat-pulse');
      if (pulse) pulse.style.display = 'none';
      
      if (chatbotWindow.classList.contains('active')) {
        chatbotInput.focus();
      }
    });
  }

  if (chatbotCloseBtn && chatbotWindow) {
    chatbotCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      chatbotWindow.classList.remove('active');
      playClickSound();
    });
  }

  window.addEventListener('click', (e) => {
    if (chatbotWindow && chatbotWindow.classList.contains('active') && !chatbotWidget.contains(e.target)) {
      chatbotWindow.classList.remove('active');
    }
  });

  const botResponses = {
    skills: "Madhumidha specializes in Full Stack Web Development (HTML, CSS, JavaScript, React, JSP, Java Servlets) and Machine Learning (Python, TensorFlow, Keras, OpenCV, CNN).",
    projects: "Her key projects include:<br>• <strong>Real-Time Facial Emotion Recognition</strong> using CNN & OpenCV.<br>• <strong>MVC E-Commerce Store</strong> using Java Servlets & MySQL.<br>• <strong>Weather Dashboard</strong> using REST APIs.<br>• <strong>MVC Quiz Application</strong> in Vanilla JavaScript.",
    contact: "You can reach Madhumidha at:<br>• 📧 Email: <a href='mailto:madhumidha0717@gmail.com'>madhumidha0717@gmail.com</a><br>• 📞 Phone: <a href='tel:+918438268844'>+91 8438268844</a><br>• 📍 Location: Coimbatore, India",
    certification: "She holds a 30 Days MasterClass Certification in Full Stack Development from NoviTech R&D (January 08 - February 17, 2026).",
    education: "She is currently a B.Tech Information Technology student specialized in coding full-stack and AI solutions.",
    resume: "You can download her resume directly by clicking the 'Resume' button in the navigation bar!"
  };

  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    msgDiv.innerHTML = text;
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function showTypingIndicator() {
    const indicatorDiv = document.createElement('div');
    indicatorDiv.className = 'typing-bubble';
    indicatorDiv.id = 'typing-indicator';
    indicatorDiv.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    chatbotMessages.appendChild(indicatorDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
  }

  function getBotReply(userQuery) {
    const query = userQuery.toLowerCase();
    
    if (query.includes('skill') || query.includes('tech') || query.includes('language') || query.includes('framework') || query.includes('code')) {
      return botResponses.skills;
    } else if (query.includes('project') || query.includes('work') || query.includes('portfolio')) {
      return botResponses.projects;
    } else if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('call') || query.includes('hire') || query.includes('reach')) {
      return botResponses.contact;
    } else if (query.includes('certif') || query.includes('masterclass') || query.includes('novitech')) {
      return botResponses.certification;
    } else if (query.includes('education') || query.includes('college') || query.includes('study') || query.includes('degree') || query.includes('b.tech') || query.includes('it')) {
      return botResponses.education;
    } else if (query.includes('resume') || query.includes('cv') || query.includes('download')) {
      return botResponses.resume;
    } else {
      return "I'm not sure about that. Ask me about Madhumidha's skills, projects, certifications, or how to contact her! Or select a prompt below.";
    }
  }

  function handleUserMessage(messageText) {
    appendMessage('user', messageText);
    playClickSound();
    showTypingIndicator();

    try {
      completedQuests.chatbot = true;
      updateQuestUI();
    } catch (err) {}

    setTimeout(() => {
      removeTypingIndicator();
      const reply = getBotReply(messageText);
      appendMessage('bot', reply);
      playSynthSound(700, 0.08, 'sine', 0.05);
    }, 850);
  }

  if (chatbotForm) {
    chatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const messageText = chatbotInput.value.trim();
      if (messageText) {
        handleUserMessage(messageText);
        chatbotInput.value = '';
      }
    });
  }

  suggestionChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      const queryType = chip.getAttribute('data-query');
      const queryText = chip.textContent;
      
      appendMessage('user', queryText);
      playClickSound();
      showTypingIndicator();

      setTimeout(() => {
        removeTypingIndicator();
        appendMessage('bot', botResponses[queryType]);
        playSynthSound(700, 0.08, 'sine', 0.05);
      }, 850);
    });
  });

  // =========================================================================
  // Developer Dashboard Controller
  // =========================================================================
  const contribGrid = document.getElementById('github-contrib-grid');
  
  if (contribGrid) {
    contribGrid.innerHTML = '';
    const totalCells = 84;
    
    for (let i = 0; i < totalCells; i++) {
      const square = document.createElement('div');
      square.className = 'contrib-square';
      
      const rand = Math.random();
      let level = 0;
      if (rand > 0.85) level = 4;
      else if (rand > 0.70) level = 3;
      else if (rand > 0.50) level = 2;
      else if (rand > 0.25) level = 1;
      
      square.classList.add(`lvl-${level}`);
      
      const commitsCount = level === 0 ? 'No' : level * 2 + Math.floor(Math.random() * 2);
      square.setAttribute('title', `${commitsCount} commits on contribution day`);
      
      contribGrid.appendChild(square);
    }
  }

  const leetcodeRadialBar = document.getElementById('leetcode-radial-bar');
  
  if (leetcodeRadialBar) {
    const leetcodeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          leetcodeRadialBar.style.strokeDashoffset = '179.88';
          leetcodeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    leetcodeObserver.observe(leetcodeRadialBar);
  }

  const statusItems = document.querySelectorAll('.status-item');
  if (statusItems.length > 0) {
    setInterval(() => {
      statusItems.forEach(item => {
        const name = item.querySelector('.status-name').textContent;
        const latencyLabel = item.querySelector('.status-metrics span:first-child');
        
        if (latencyLabel) {
          if (name.includes('Emotion')) {
            const newLatency = 115 + Math.floor(Math.random() * 20);
            latencyLabel.textContent = `Latency: ${newLatency}ms`;
          } else if (name.includes('E-Commerce')) {
            const newLatency = 78 + Math.floor(Math.random() * 12);
            latencyLabel.textContent = `Latency: ${newLatency}ms`;
          } else if (name.includes('Portfolio')) {
            const newLatency = 12 + Math.floor(Math.random() * 6);
            latencyLabel.textContent = `Latency: ${newLatency}ms`;
          }
        }
      });
    }, 4000);
  }

  // =========================================================================
  // Three.js Interactive 3D Cyber Globe
  // =========================================================================
  const globeCanvas = document.getElementById('three-globe-canvas');
  if (globeCanvas && typeof THREE !== 'undefined') {
    const wrapper = globeCanvas.parentElement;
    const width = wrapper.clientWidth || 300;
    const height = wrapper.clientHeight || 300;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({
      canvas: globeCanvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const radius = 55;
    const sphereGeom = new THREE.SphereGeometry(radius, 24, 24);
    
    const positions = sphereGeom.attributes.position.array;
    const dotGeom = new THREE.BufferGeometry();
    const dotPositions = [];

    for (let i = 0; i < positions.length; i += 6) {
      dotPositions.push(positions[i], positions[i+1], positions[i+2]);
    }
    
    dotGeom.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));

    const activeColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-indigo').trim() || '#6366F1';
    
    const dotMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(activeColor),
      size: 1.6,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true
    });

    const globePoints = new THREE.Points(dotGeom, dotMaterial);
    scene.add(globePoints);

    const wireframeGeom = new THREE.SphereGeometry(radius - 0.2, 12, 12);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(activeColor),
      wireframe: true,
      transparent: true,
      opacity: 0.06
    });
    const globeWire = new THREE.Mesh(wireframeGeom, wireframeMat);
    scene.add(globeWire);

    const nodeGeom = new THREE.SphereGeometry(2, 6, 6);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x06B6D4,
      transparent: true,
      opacity: 0.8
    });

    const nodeCoords = [
      { x: 0.45, y: 0.55, z: 0.70 },
      { x: -0.2, y: 0.8, z: 0.57 },
      { x: -0.65, y: 0.35, z: -0.67 },
      { x: 0.6, y: 0.1, z: 0.8 }
    ];

    const nodes = [];
    nodeCoords.forEach(c => {
      const mesh = new THREE.Mesh(nodeGeom, nodeMaterial);
      mesh.position.set(c.x * radius, c.y * radius, c.z * radius);
      scene.add(mesh);
      nodes.push(mesh);
      globePoints.add(mesh);
    });

    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(activeColor),
      transparent: true,
      opacity: 0.25
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const p1 = nodes[i].position.clone();
        const p2 = nodes[j].position.clone();
        
        const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
        midPoint.normalize().multiplyScalar(radius * 1.25);

        const curve = new THREE.QuadraticBezierCurve3(p1, midPoint, p2);
        const points = curve.getPoints(15);
        const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeom, lineMat);
        scene.add(line);
        globePoints.add(line);
      }
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    globeCanvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
      try {
        completedQuests.globe = true;
        updateQuestUI();
      } catch (err) {}
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      globePoints.rotation.y += deltaMove.x * 0.005;
      globePoints.rotation.x += deltaMove.y * 0.005;
      globeWire.rotation.y += deltaMove.x * 0.005;
      globeWire.rotation.x += deltaMove.y * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    globeCanvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        try {
          completedQuests.globe = true;
          updateQuestUI();
        } catch (err) {}
      }
    });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;

      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y
      };

      globePoints.rotation.y += deltaMove.x * 0.005;
      globePoints.rotation.x += deltaMove.y * 0.005;
      globeWire.rotation.y += deltaMove.x * 0.005;
      globeWire.rotation.x += deltaMove.y * 0.005;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });

    function animateGlobe() {
      requestAnimationFrame(animateGlobe);

      if (!isDragging) {
        globePoints.rotation.y += 0.002;
        globeWire.rotation.y += 0.002;
      }

      const currentAccentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-indigo').trim() || '#6366F1';
      dotMaterial.color.set(currentAccentColor);
      wireframeMat.color.set(currentAccentColor);
      lineMat.color.set(currentAccentColor);

      renderer.render(scene, camera);
    }
    animateGlobe();

    window.addEventListener('resize', () => {
      const w = wrapper.clientWidth || 300;
      const h = wrapper.clientHeight || 300;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

  // =========================================================================
  // Confetti Particle Engine
  // =========================================================================
  function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#6366F1', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];
    const particles = [];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 5
      });
    }

    let frameCount = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
        ctx.restore();
      });

      frameCount++;
      if (frameCount < 160) {
        requestAnimationFrame(draw);
      } else {
        canvas.style.display = 'none';
      }
    }
    draw();
  }

  // =========================================================================
  // Quest Achievement System
  // =========================================================================
  let completedQuests = {
    intro: true,
    sound: false,
    globe: false,
    chatbot: false,
    puzzle: false
  };

  function updateQuestUI() {
    let completedCount = 0;
    
    if (completedQuests.intro) {
      const qIntro = document.getElementById('quest-intro');
      if (qIntro) qIntro.classList.add('completed');
      completedCount++;
    }
    if (completedQuests.sound) {
      const qSound = document.getElementById('quest-sound');
      if (qSound) qSound.classList.add('completed');
      const icoSound = document.getElementById('ico-sound');
      if (icoSound) icoSound.className = 'fa-solid fa-circle-check';
      completedCount++;
    }
    if (completedQuests.globe) {
      const qGlobe = document.getElementById('quest-globe');
      if (qGlobe) qGlobe.classList.add('completed');
      const icoGlobe = document.getElementById('ico-globe');
      if (icoGlobe) icoGlobe.className = 'fa-solid fa-circle-check';
      completedCount++;
    }
    if (completedQuests.chatbot) {
      const qChatbot = document.getElementById('quest-chatbot');
      if (qChatbot) qChatbot.classList.add('completed');
      const icoChatbot = document.getElementById('ico-chatbot');
      if (icoChatbot) icoChatbot.className = 'fa-solid fa-circle-check';
      completedCount++;
    }
    if (completedQuests.puzzle) {
      const qPuzzle = document.getElementById('quest-puzzle');
      if (qPuzzle) qPuzzle.classList.add('completed');
      const icoPuzzle = document.getElementById('ico-puzzle');
      if (icoPuzzle) icoPuzzle.className = 'fa-solid fa-circle-check';
      completedCount++;
    }

    const badgeCount = document.getElementById('quest-badge-count');
    if (badgeCount) badgeCount.textContent = `${completedCount}/5`;

    if (completedCount === 5) {
      const rewardBadge = document.getElementById('reward-badge');
      if (rewardBadge && rewardBadge.className !== 'reward-badge-unlocked') {
        rewardBadge.className = 'reward-badge-unlocked';
        const badgeLabel = document.getElementById('badge-label');
        if (badgeLabel) badgeLabel.textContent = 'AI Mastermind Unlocked!';
        setTimeout(() => {
          triggerConfetti();
          playModalOpenSound();
        }, 500);
      }
    }
  }

  const questToggleBtn = document.getElementById('quest-toggle-btn');
  const questPanel = document.getElementById('quest-panel');
  const questCloseBtn = document.getElementById('quest-close-btn');

  if (questToggleBtn && questPanel) {
    questToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      questPanel.classList.toggle('active');
      playClickSound();
    });
  }

  if (questCloseBtn && questPanel) {
    questCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      questPanel.classList.remove('active');
      playClickSound();
    });
  }

  // =========================================================================
  // Cryptographic Secret Project Puzzle Lock
  // =========================================================================
  const puzzleSubmitBtn = document.getElementById('puzzle-submit-btn');
  const puzzleInput = document.getElementById('puzzle-answer');
  const puzzleStatus = document.getElementById('puzzle-status');
  const lockOverlay = document.getElementById('puzzle-lock-overlay');
  const unlockedContent = document.getElementById('puzzle-unlocked-content');
  const lockedCard = document.getElementById('locked-project-card');

  if (puzzleSubmitBtn) {
    puzzleSubmitBtn.addEventListener('click', () => {
      const answer = puzzleInput.value.trim();
      if (answer === '32') {
        playModalOpenSound();
        if (puzzleStatus) {
          puzzleStatus.textContent = 'Decryption Successful!';
          puzzleStatus.style.color = '#10B981';
        }
        
        if (lockOverlay) lockOverlay.style.opacity = '0';
        setTimeout(() => {
          if (lockOverlay) lockOverlay.style.display = 'none';
          if (unlockedContent) unlockedContent.style.display = 'block';
          if (lockedCard) lockedCard.classList.remove('locked');
        }, 500);

        completedQuests.puzzle = true;
        updateQuestUI();
        triggerConfetti();
      } else {
        playSynthSound(300, 0.15, 'sawtooth', 0.1);
        if (puzzleStatus) {
          puzzleStatus.textContent = 'Invalid code. Try again!';
          puzzleStatus.style.color = '#EF4444';
        }
        if (puzzleInput) puzzleInput.value = '';
      }
    });
  }

  // =========================================================================
  // Infinite Canvas Controller (Pan & Zoom)
  // =========================================================================
  let isCanvasMode = false;
  let zoom = 1;
  let panX = 0;
  let panY = 0;
  let isCanvasDragging = false;
  let canvasStartMouse = { x: 0, y: 0 };
  const mainWrapper = document.getElementById('main-wrapper');
  const canvasToggleBtn = document.getElementById('canvas-toggle');

  function updateWrapperTransform() {
    if (isCanvasMode && mainWrapper) {
      mainWrapper.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
    }
  }

  window.addEventListener('mousedown', (e) => {
    if (!isCanvasMode) return;
    if (e.target.closest('a, button, input, textarea, select, .chatbot-widget, .quest-hud, #particles-canvas')) return;
    
    isCanvasDragging = true;
    if (mainWrapper) mainWrapper.style.cursor = 'grabbing';
    canvasStartMouse = { x: e.clientX - panX, y: e.clientY - panY };
  });

  window.addEventListener('mousemove', (e) => {
    if (!isCanvasMode || !isCanvasDragging) return;
    panX = e.clientX - canvasStartMouse.x;
    panY = e.clientY - canvasStartMouse.y;
    updateWrapperTransform();
  });

  window.addEventListener('mouseup', () => {
    if (isCanvasMode) {
      isCanvasDragging = false;
      if (mainWrapper) mainWrapper.style.cursor = 'grab';
    }
  });

  window.addEventListener('touchstart', (e) => {
    if (!isCanvasMode || e.touches.length !== 1) return;
    if (e.target.closest('a, button, input, textarea, select, .chatbot-widget, .quest-hud, #particles-canvas')) return;
    
    isCanvasDragging = true;
    canvasStartMouse = { x: e.touches[0].clientX - panX, y: e.touches[0].clientY - panY };
  });

  window.addEventListener('touchmove', (e) => {
    if (!isCanvasMode || !isCanvasDragging || e.touches.length !== 1) return;
    panX = e.touches[0].clientX - canvasStartMouse.x;
    panY = e.touches[0].clientY - canvasStartMouse.y;
    updateWrapperTransform();
  });

  window.addEventListener('touchend', () => {
    isCanvasDragging = false;
  });

  window.addEventListener('wheel', (e) => {
    if (!isCanvasMode) return;
    e.preventDefault();
    
    const zoomFactor = 0.06;
    const oldZoom = zoom;
    if (e.deltaY < 0) {
      zoom = Math.min(zoom + zoomFactor, 1.5);
    } else {
      zoom = Math.max(zoom - zoomFactor, 0.35);
    }
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    panX = mouseX - (mouseX - panX) * (zoom / oldZoom);
    panY = mouseY - (mouseY - panY) * (zoom / oldZoom);
    
    updateWrapperTransform();
  }, { passive: false });

  if (canvasToggleBtn && mainWrapper) {
    canvasToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isCanvasMode = !isCanvasMode;
      playClickSound();
      
      if (isCanvasMode) {
        canvasToggleBtn.classList.add('active');
        document.body.classList.add('infinite-canvas-active');
        mainWrapper.style.cursor = 'grab';
        
        zoom = 0.8;
        panX = window.innerWidth * 0.08;
        panY = window.innerHeight * 0.12;
      } else {
        canvasToggleBtn.classList.remove('active');
        document.body.classList.remove('infinite-canvas-active');
        mainWrapper.style.transform = '';
        mainWrapper.style.cursor = '';
      }
      updateWrapperTransform();
    });
  }

  // Pre-load welcome status
  setTimeout(updateQuestUI, 500);

});
