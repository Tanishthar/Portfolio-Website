{//<!-- Sticky Header -->
  const stickyHeader = document.getElementById('sticky-header');

  window.addEventListener("scroll", function () {
    let header = document.getElementById("sticky-header");
    if (window.scrollY > 50) {
      header.classList.add("collapsed");
    } else {
      header.classList.remove("collapsed");
    }
  });
}

{ //<!-- Dynamically Loading different Projects -->
  const projects = [
    { 
      title: 'Bicep Curl Rep Counter using ComputerVision', 
      description: 'Python program to count the repetions of bicep curl', 
      link: 'Project_websites/dj_cv/index.html',
      image: 'images/projects/bicep.png' },
    { 
      title: 'Portfolio Website', 
      description: 'Portfolio website for myself', 
      link: '',
      image: 'images/projects/portfolio.png'},
    { 
      title: 'DJ Control using ComputerVision', 
      description: 'Using the camera of the PC, detect the hand details to control the functionalities of the song', 
      link: 'Project_websites/dj_cv/index.html',
      image: 'images/projects/dj_cv.jpg' },
    { 
      title: 'AI Web Scraper', 
      description: 'Using Ollama to get required data from a website using scraping', 
      link: '',
      image: 'images/projects/ai_Web_scraper.png' },
    { 
      title: 'AI Chatbot', 
      description: 'Using Agentic AI to make a ai chatbot that is context aware about me ', 
      link: '',
      image: 'images/projects/ai_chatbot.png' },

    { 
      title: 'Jarvis', 
      description: 'JARVIS is a voice-activated personal AI assistant inspired by the iconic system from Iron Man.', 
      link: '',
      image: 'images/projects/jarvis.jpeg' },

    { 
      title: 'Campus Assisstant – AI Powered Department Chatbot', 
      description: 'A chatbot designed for answering student queries related to College. ', 
      link: '',
      image: 'images/projects/mini_proj.jpeg' }
  ];

  const projectGrid = document.querySelector('.project-grid');
  if (projectGrid) {
    projects.forEach(project => {
      const card = document.createElement('div');
      card.classList.add('project-card');

      // Create glass overlay
      const overlay = document.createElement('div');
      overlay.classList.add('glass-overlay');

      // Title and description
      card.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p>`;

      // background image
      card.style.backgroundImage = `url(${project.image})`;
      card.style.backgroundSize = 'cover';
      card.style.backgroundPosition = 'center';

      // Click Event
      card.addEventListener('click', () => {
        window.open(project.link, '_blank');
      });

      projectGrid.appendChild(card);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-btn");

    document.querySelectorAll(".lightbox-trigger").forEach(img => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.classList.remove("hidden");
      });
    });

    closeBtn.addEventListener("click", () => {
      lightbox.classList.add("hidden");
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target !== lightboxImg) {
        lightbox.classList.add("hidden");
      }
    });
  }); 
}

{ //<!-- Starfield Background -->
  window.onload = function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");

    // Set canvas size
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let stars = [];
    const numStars = 600;
    let mouse = { x: null, y: null };

    // Star class
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.originalX = this.x;
        this.originalY = this.y;
        this.radius = Math.random() * 2 + 1;
        this.speed = Math.random() * 0.5 + 0.2;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      }

      update() {
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // If the cursor is close, stars "run away"
        if (distance < 100) {
          this.x += dx * 0.1;
          this.y += dy * 0.1;
        } else {
          // Slowly return to original position
          this.x += (this.originalX - this.x) * 0.02;
          this.y += (this.originalY - this.y) * 0.02;
        }

        this.draw();
      }
    }

    // Initialize stars
    function init() {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => star.update());
      requestAnimationFrame(animate);
    }

    // Capture mouse movement
    window.addEventListener("mousemove", (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    init();
    animate();
  };
}

{ // <-- Waterfall effect -->
  window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.waterfall-element');
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`; // staggered delay
    });
  });
}

{ // Buttons on the contact me page
  document.getElementById("linkedin").addEventListener("click", function () {
    window.open("https://www.linkedin.com/in/tanish-thar/", "_blank");
  });
  document.getElementById("github").addEventListener("click", function () {
    window.open("https://github.com/Tanishthar", "_blank");
  });
  document.getElementById("resume").addEventListener("click", function () {
    window.open("https://drive.google.com/file/d/11wAWYV5Ik6UnTwtmsKU_ewBuoztiOQ7U/view?usp=sharing", "_blank");
  });
}