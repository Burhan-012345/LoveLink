// Shayri page specific animations and functionality
class ShayriManager {
  constructor() {
    this.currentIndex = 0;
    this.shayris = [];
    this.filteredShayris = [];
    this.init();
  }

  async init() {
    await this.loadShayris();
    this.setupEventListeners();
    this.startAutoAdvance();
  }

  async loadShayris() {
    try {
      const response = await fetch("/api/shayris");
      this.shayris = await response.json();
      this.filteredShayris = [...this.shayris];
      this.updateCounter();
      this.displayCurrentShayri();
    } catch (error) {
      console.error("Error loading shayris:", error);
    }
  }

  displayCurrentShayri() {
    if (this.filteredShayris.length === 0) return;

    const shayri = this.filteredShayris[this.currentIndex];
    const card = document.getElementById("shayriCard");
    const textElement = document.getElementById("shayriText");
    const moodElement = document.getElementById("shayriMood");

    // Exit animation
    anime({
      targets: card,
      opacity: 0,
      translateY: 30,
      duration: 400,
      easing: "easeOutQuad",
      complete: () => {
        // Update content
        textElement.innerHTML = shayri.content.replace(/\n/g, "<br>");
        moodElement.textContent = shayri.mood ? `Mood: ${shayri.mood}` : "";

        // Enter animation
        anime({
          targets: card,
          opacity: 1,
          translateY: 0,
          duration: 600,
          easing: "easeOutQuad",
        });

        // Typing effect
        this.typeShayriText(textElement, shayri.content);
      },
    });
  }

  typeShayriText(element, text) {
    element.textContent = "";
    let i = 0;

    const typing = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, 30);
  }

  navigate(direction) {
    const newIndex = this.currentIndex + direction;

    if (newIndex >= 0 && newIndex < this.filteredShayris.length) {
      this.currentIndex = newIndex;
    } else if (this.filteredShayris.length > 0) {
      // Loop around
      this.currentIndex = direction > 0 ? 0 : this.filteredShayris.length - 1;
    }

    this.updateCounter();
    this.displayCurrentShayri();
  }

  updateCounter() {
    document.getElementById("currentShayri").textContent =
      this.currentIndex + 1;
    document.getElementById("totalShayris").textContent =
      this.filteredShayris.length;
  }

  filterByCategory(category) {
    if (category === "all") {
      this.filteredShayris = [...this.shayris];
    } else {
      this.filteredShayris = this.shayris.filter(
        (shayri) => shayri.category === category
      );
    }

    this.currentIndex = 0;
    this.updateCounter();
    this.displayCurrentShayri();
  }

  setupEventListeners() {
    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.navigate(-1);
      if (e.key === "ArrowRight") this.navigate(1);
    });

    // Category filtering
    document.querySelectorAll(".category-tag").forEach((tag) => {
      tag.addEventListener("click", () => {
        document
          .querySelectorAll(".category-tag")
          .forEach((t) => t.classList.remove("active"));
        tag.classList.add("active");
        this.filterByCategory(tag.dataset.category);
      });
    });

    // Touch swipe for mobile
    this.setupSwipe();
  }

  setupSwipe() {
    let startX = 0;
    const container = document.querySelector(".shayri-content-container");

    container.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    container.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        // Minimum swipe distance
        if (diff > 0) {
          this.navigate(1); // Swipe left - next
        } else {
          this.navigate(-1); // Swipe right - previous
        }
      }
    });
  }

  startAutoAdvance() {
    // Auto-advance every 45 seconds
    setInterval(() => {
      this.navigate(1);
    }, 45000);
  }

  shareCurrentShayri() {
    const shayri = this.filteredShayris[this.currentIndex];

    if (navigator.share) {
      navigator.share({
        title: "LoveLock Shayri",
        text: shayri.content,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shayri.content).then(() => {
        this.showNotification("Shayri copied to clipboard! ❤️");
      });
    }
  }

  markFavorite() {
    const shayri = this.filteredShayris[this.currentIndex];
    const favorites = JSON.parse(
      localStorage.getItem("favoriteShayris") || "[]"
    );

    if (!favorites.includes(shayri.id)) {
      favorites.push(shayri.id);
      localStorage.setItem("favoriteShayris", JSON.stringify(favorites));

      // Animation feedback
      anime({
        targets: ".action-btn:nth-child(2)",
        scale: [1, 1.3, 1],
        duration: 600,
        easing: "elastic.out(1, 0.5)",
      });

      this.showNotification("Added to favorites! ⭐");
    } else {
      this.showNotification("Already in favorites! 💫");
    }
  }

  showNotification(message) {
    const notification = document.createElement("div");
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            padding: 15px 25px;
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            font-family: 'Playfair Display', serif;
            color: #7a5c7c;
        `;
    notification.textContent = message;

    document.body.appendChild(notification);

    anime({
      targets: notification,
      opacity: [0, 1],
      translateX: [50, 0],
      duration: 500,
      easing: "easeOutQuad",
      complete: () => {
        setTimeout(() => {
          anime({
            targets: notification,
            opacity: 0,
            translateX: 50,
            duration: 500,
            easing: "easeInQuad",
            complete: () => {
              document.body.removeChild(notification);
            },
          });
        }, 2000);
      },
    });
  }
}

// Initialize Shayri Manager when page loads
document.addEventListener("DOMContentLoaded", () => {
  window.shayriManager = new ShayriManager();
});
