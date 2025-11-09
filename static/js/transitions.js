// Enhanced Page transition system with romantic features
class PageTransitions {
  constructor() {
    this.isTransitioning = false;
    this.init();
  }

  init() {
    // Add enhanced transition styles
    this.addTransitionStyles();

    // Handle page transitions
    this.handleNavigation();

    // Initialize romantic features
    this.initializeRomanticFeatures();

    // Handle browser navigation
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  addTransitionStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .page-transition-enter {
        opacity: 0;
        transform: scale(0.9) translateY(20px);
        filter: blur(10px);
      }
      
      .page-transition-enter-active {
        opacity: 1;
        transform: scale(1) translateY(0);
        filter: blur(0px);
        transition: all 800ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .page-transition-exit {
        opacity: 1;
        transform: scale(1);
        filter: blur(0px);
      }
      
      .page-transition-exit-active {
        opacity: 0;
        transform: scale(1.1) translateY(-20px);
        filter: blur(10px);
        transition: all 800ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Heartbeat loader styles */
      .heartbeat-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #ffafbd, #ffc3a0, #a8edea);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        font-family: 'Dancing Script', cursive;
        color: white;
      }

      .heartbeat-loader .heart-pulse {
        font-size: 4em;
        animation: heartbeat 1.5s ease-in-out infinite;
        filter: drop-shadow(0 0 20px rgba(255, 107, 107, 0.5));
        margin-bottom: 20px;
      }

      .heartbeat-loader p {
        font-size: 1.5em;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      }

      @keyframes heartbeat {
        0%, 100% { 
          transform: scale(1); 
        }
        25% { 
          transform: scale(1.1); 
        }
        50% { 
          transform: scale(1.2); 
        }
        75% { 
          transform: scale(1.1); 
        }
      }

      /* Romantic notification styles */
      .romantic-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        padding: 15px 25px;
        border-radius: 15px;
        border: 1px solid rgba(255, 182, 193, 0.3);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        font-family: 'Dancing Script', cursive;
        font-size: 1.3em;
        color: #7a5c7c;
        max-width: 300px;
        z-index: 1001;
        transform: translateX(100px);
        opacity: 0;
      }

      /* Custom cursor styles */
      .custom-cursor {
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #ff6b6b, #ff8e8e);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
      }

      .cursor-trail-heart {
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        font-size: 14px;
        opacity: 0;
        filter: drop-shadow(0 0 10px rgba(255, 107, 107, 0.5));
      }
    `;
    document.head.appendChild(style);
  }

  initializeRomanticFeatures() {
    this.createHeartbeatLoader();
    this.initializeCustomCursor();
    this.startRomanticNotifications();
    this.initializeButtonAnimations();
    this.startFloatingHearts();
  }

  createHeartbeatLoader() {
    const loader = document.createElement("div");
    loader.className = "heartbeat-loader";
    loader.id = "heartbeatLoader";
    loader.innerHTML = `
      <div class="heart-pulse">💖</div>
      <p>Loading Love...</p>
    `;
    document.body.appendChild(loader);

    // Hide loader after page load
    window.addEventListener("load", () => {
      setTimeout(() => {
        anime({
          targets: loader,
          opacity: 0,
          duration: 1000,
          easing: "easeOutQuad",
          complete: () => (loader.style.display = "none"),
        });
      }, 1000);
    });
  }

  initializeCustomCursor() {
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    cursor.id = "customCursor";
    document.body.appendChild(cursor);

    let mouseX = 0,
      mouseY = 0;
    let cursorX = 0,
      cursorY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Create heart trail occasionally
      if (Math.random() > 0.7) {
        this.createHeartTrail(e.clientX, e.clientY);
      }
    });

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      cursor.style.left = cursorX + "px";
      cursor.style.top = cursorY + "px";

      requestAnimationFrame(animateCursor);
    };

    // Interactive element effects
    document
      .querySelectorAll("button, a, .nav-link, .letter-card, .shayri-card")
      .forEach((element) => {
        element.addEventListener("mouseenter", () => {
          anime({
            targets: cursor,
            scale: 1.5,
            background: "radial-gradient(circle, #ff8e8e, #ff6b6b)",
            duration: 300,
            easing: "easeOutQuad",
          });
        });

        element.addEventListener("mouseleave", () => {
          anime({
            targets: cursor,
            scale: 1,
            background: "radial-gradient(circle, #ff6b6b, #ff8e8e)",
            duration: 300,
            easing: "easeOutQuad",
          });
        });
      });

    animateCursor();
  }

  createHeartTrail(x, y) {
    const heart = document.createElement("div");
    heart.className = "cursor-trail-heart";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    heart.innerHTML = "💖";

    document.body.appendChild(heart);

    anime({
      targets: heart,
      translateY: [0, -30],
      translateX: [0, (Math.random() - 0.5) * 20],
      scale: [1, 0.5],
      opacity: [0.7, 0],
      duration: 1000,
      easing: "easeOutQuad",
      complete: () => heart.remove(),
    });
  }

  startRomanticNotifications() {
    const notifications = [
      "Aap meri duniya hain 💗",
      "Har din aapke bina adhoora lagta hai 🌙",
      "Aapki yaadon ne mere dil ko ghar bana liya hai 🏠",
      "Meri khushiyon ka raaz sirf aap hain 🤫",
      "Aapki muskurahat meri sabse khoobsurat tasveer hai 📸",
      "Har pal aapke saath bitana chahta hoon ⏳",
      "Aap ho to sab kuch hai, aap na ho to kuch bhi nahi ❤️",
      "Pyaar ek aisi feeling hai jo shabdon mein bayaan nahi ho sakti 💫",
    ];

    const showRandomNotification = () => {
      const message =
        notifications[Math.floor(Math.random() * notifications.length)];
      this.showRomanticNotification(message);

      // Next notification in 30-60 seconds
      setTimeout(showRandomNotification, Math.random() * 30000 + 30000);
    };

    // Start after 10 seconds
    setTimeout(showRandomNotification, 10000);
  }

  showRomanticNotification(message) {
    const notification = document.createElement("div");
    notification.className = "romantic-notification";
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    anime({
      targets: notification,
      translateX: [100, 0],
      opacity: [0, 1],
      duration: 500,
      easing: "easeOutQuad",
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      anime({
        targets: notification,
        translateX: [0, 100],
        opacity: [1, 0],
        duration: 500,
        easing: "easeInQuad",
        complete: () => notification.remove(),
      });
    }, 5000);
  }

  initializeButtonAnimations() {
    document.querySelectorAll("button").forEach((button) => {
      button.addEventListener("mouseenter", function () {
        anime({
          targets: this,
          scale: 1.05,
          boxShadow: "0 10px 25px rgba(255, 107, 107, 0.3)",
          duration: 300,
          easing: "easeOutQuad",
        });
      });

      button.addEventListener("mouseleave", function () {
        anime({
          targets: this,
          scale: 1,
          boxShadow: "0 5px 15px rgba(255, 107, 107, 0.2)",
          duration: 300,
          easing: "easeOutQuad",
        });
      });
    });
  }

  startFloatingHearts() {
    setInterval(() => {
      this.createFloatingHeart();
    }, 2000);
  }

  createFloatingHeart() {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.innerHTML = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";

    document.querySelector(".hearts-container").appendChild(heart);

    anime({
      targets: heart,
      translateY: [-100, window.innerHeight + 100],
      translateX: [0, anime.random(-50, 50)],
      rotate: [0, anime.random(-180, 180)],
      opacity: [0.7, 0],
      duration: anime.random(8000, 12000),
      easing: "easeInOutQuad",
      complete: () => heart.remove(),
    });
  }

  handleNavigation() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (
        link &&
        link.href &&
        link.href.startsWith(window.location.origin) &&
        !link.hasAttribute("data-barba-prevent")
      ) {
        e.preventDefault();
        this.navigateTo(link.href);
      }
    });
  }

  handlePopState() {
    // Handle browser back/forward buttons
    this.performPageTransition(() => {
      window.location.reload();
    });
  }

  navigateTo(url) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    this.performPageTransition(() => {
      window.location.href = url;
    });
  }

  performPageTransition(callback) {
    const main = document.querySelector("main");

    if (!main) {
      callback();
      return;
    }

    // Exit animation with romantic effects
    anime({
      targets: main,
      opacity: 0,
      scale: 0.9,
      translateY: -20,
      filter: "blur(10px)",
      duration: 800,
      easing: "easeInOutQuad",
      complete: () => {
        // Create transition hearts
        this.createTransitionHearts();

        setTimeout(() => {
          callback();
        }, 400);
      },
    });
  }

  createTransitionHearts() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const heart = document.createElement("div");
        heart.className = "transition-heart";
        heart.innerHTML = "💖";
        heart.style.position = "fixed";
        heart.style.left = "50%";
        heart.style.top = "50%";
        heart.style.fontSize = "2em";
        heart.style.zIndex = "9998";
        heart.style.opacity = "0";

        document.body.appendChild(heart);

        anime({
          targets: heart,
          translateX: anime.random(-100, 100),
          translateY: anime.random(-100, 100),
          scale: [0, 2],
          opacity: [0, 1, 0],
          duration: 1000,
          easing: "easeOutQuad",
          complete: () => heart.remove(),
        });
      }, i * 100);
    }
  }
}

// Enhanced smooth scrolling and parallax
document.addEventListener("DOMContentLoaded", function () {
  // Initialize page transitions
  new PageTransitions();

  // Smooth scrolling behavior
  document.documentElement.style.scrollBehavior = "smooth";

  // Enhanced parallax effect
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector(".background-gradient");
    if (parallax) {
      parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    // Parallax for other elements
    document.querySelectorAll(".parallax-element").forEach((el, index) => {
      const speed = 0.3 + index * 0.1;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Music state preservation
  const music = document.getElementById("backgroundMusic");
  if (music) {
    // Restore music state
    const savedTime = localStorage.getItem("musicTime");
    const savedState = localStorage.getItem("musicPlaying");

    if (savedState === "true" && savedTime) {
      music.currentTime = parseFloat(savedTime);
      music.play().catch((e) => console.log("Auto-play prevented"));
    }

    // Save music state periodically
    setInterval(() => {
      localStorage.setItem("musicTime", music.currentTime);
      localStorage.setItem("musicPlaying", !music.paused);
    }, 1000);
  }

  // Add parallax class to elements
  document.querySelectorAll(".love-note, .floating-heart").forEach((el) => {
    el.classList.add("parallax-element");
  });
});

// Global navigation functions
function transitionToPage(url) {
  const transitions = new PageTransitions();
  transitions.navigateTo(url);
}

function goToHome() {
  transitionToPage("/");
}

function goToLetters() {
  transitionToPage("/letters");
}

function goToShayri() {
  transitionToPage("/shayri");
}

function goToSecret() {
  transitionToPage("/secret");
}
