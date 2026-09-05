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
  // High-Performance Interactive Particle Canvas
  // =========================================================================
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const maxParticles = 60;
    const maxDistance = 120;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.vx += (Math.random() - 0.5) * 0.01;
        this.vy += (Math.random() - 0.5) * 0.01;
        
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 0.5) {
          this.vx = (this.vx / speed) * 0.5;
          this.vy = (this.vy / speed) * 0.5;
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

    function animateParticles() {
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
      }

      requestAnimationFrame(animateParticles);
    }
    animateParticles();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
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
        <span class="variable">self</span>.<span class="property">frameworks</span> = [<span class="string">"TensorFlow"</span>, <span class="string">"Keras"</span>, <span class="string">"OpenCV"</span>, <span class="string">"Spring Boot"</span>]

    <span class="keyword">def</span> <span class="function-name">get_core_focus</span>(<span class="variable">self</span>):
        <span class="keyword">return</span> <span class="string">"Deep Learning & Full Stack Applications"</span>`,
    json: `{
  <span class="property">"projects"</span>: [
    <span class="string">"Real-Time Facial Emotion Recognition System"</span>,
    <span class="string">"Blog Management System"</span>
  ],
  <span class="property">"status"</span>: <span class="string">"Active & Deployed"</span>
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
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    if (progressBar) {
      progressBar.style.width = `${scrolled}%`;
    }

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
  setTimeout(animateRadials, 500);

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
    } catch (e) {}
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
        playSynthSound(500, 0.06, 'sine', 0.06, 1000);
      }
    });
  }

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

    voiceUtterance = new SpeechSynthesisUtterance("Hello! I am Madhumidha. Welcome to my portfolio. I am a B.Tech Information Technology student and aspiring Full Stack Developer & AI Enthusiast. I enjoy building modern web applications and AI-powered solutions that solve real-world problems. Feel free to explore my projects including my Facial Emotion Recognition System and Blog Management System!");
    
    const voices = synth.getVoices();
    const targetVoice = voices.find(voice => 
      voice.name.includes("Google US English Female") || 
      voice.name.includes("Zira") || 
      voice.lang.startsWith("en")
    );
    if (targetVoice) {
      voiceUtterance.voice = targetVoice;
    }
    
    voiceUtterance.rate = 0.98;
    voiceUtterance.pitch = 1.05;
    
    voiceUtterance.onend = () => { stopSpeaking(); };
    voiceUtterance.onerror = () => { stopSpeaking(); };

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

  // =========================================================================
  // Welcome Intro Screen Controller
  // =========================================================================
  const introScreen = document.getElementById('intro-screen');

  if (introScreen) {
    introScreen.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudio();
      
      introScreen.classList.add('fade-out');
      introScreen.style.opacity = '0';
      introScreen.style.pointerEvents = 'none';

      setTimeout(() => {
        introScreen.style.display = 'none';
      }, 850);
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
      chatbotWindow.classList.toggle('active');
    });
  }

  if (chatbotCloseBtn && chatbotWindow) {
    chatbotCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      chatbotWindow.classList.remove('active');
    });
  }

  const botResponses = {
    skills: "Madhumidha specializes in Full Stack Web Development (HTML, CSS, JavaScript, React, Java, Spring Boot, MySQL) and Artificial Intelligence / Deep Learning (Python, TensorFlow, Keras, OpenCV, CNN).",
    projects: "Her featured projects are:<br>1. <strong>Real-Time Facial Emotion Recognition System</strong> (CNN + OpenCV)<br>2. <strong>Blog Management System</strong> (Full-Stack Java / Spring Boot + MySQL)",
    contact: "You can reach Madhumidha at:<br>• 📧 Email: <a href='mailto:madhumidha0717@gmail.com'>madhumidha0717@gmail.com</a><br>• 📞 Phone: <a href='tel:+918438268844'>+91 8438268844</a><br>• 📍 Location: Coimbatore, India",
    certification: "She holds a 30 Days MasterClass Certification in Full Stack Development from NoviTech R&D (January 08 - February 17, 2026)."
  };

  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    msgDiv.innerHTML = text;
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  if (chatbotForm) {
    chatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const messageText = chatbotInput.value.trim();
      if (messageText) {
        appendMessage('user', messageText);
        chatbotInput.value = '';
        setTimeout(() => {
          appendMessage('bot', botResponses.projects);
        }, 600);
      }
    });
  }

  suggestionChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      const queryType = chip.getAttribute('data-query');
      appendMessage('user', chip.textContent);
      setTimeout(() => {
        appendMessage('bot', botResponses[queryType] || botResponses.skills);
      }, 600);
    });
  });

  // =========================================================================
  // GitHub Activity Contribution Grid Generator
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
      square.setAttribute('title', `${commitsCount} contributions on this day`);
      
      contribGrid.appendChild(square);
    }
  }

});
