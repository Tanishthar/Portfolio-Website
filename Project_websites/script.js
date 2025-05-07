{ // <!-- Add a animation for scroll -->
  document.addEventListener("DOMContentLoaded", function () {
    const scrollIndicator = document.querySelector(".scroll-down");
    const detailsSection = document.getElementById("details");
  
    scrollIndicator.addEventListener("click", function () {
        detailsSection.classList.add("visible");
        window.scrollTo({
            top: detailsSection.offsetTop,
            behavior: "smooth"
        });
    });
  
    // Ensure the section becomes visible after scrolling
    window.addEventListener("scroll", function () {
        const sectionPos = detailsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.5;
  
        if (sectionPos < screenPos) {
            detailsSection.classList.add("visible");
        }
    });
  });
}

{ //<!-- Starfield Background -->
  window.onload = function () {
    const canvas = document.createElement("canvas"); // Create canvas dynamically
    document.body.prepend(canvas); // Add it at the top
    const ctx = canvas.getContext("2d");

    // Set canvas size
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let stars = [];
    const numStars = 450;
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

{//<!-- Sticky Header -->

}


document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");
  const header = document.getElementById("sticky-header");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("show");
      });
    });
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50 && window.innerWidth > 768) {
      header.classList.add("collapsed");
    } else {
      header.classList.remove("collapsed");
    }
  });
});