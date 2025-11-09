// Background animations
document.addEventListener("DOMContentLoaded", function () {
  createPetals();
  createHearts();
  startBackgroundMusic();
});

function createPetals() {
  const container = document.querySelector(".petals-container");
  const petalCount = 15;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";

    // Random properties
    const size = Math.random() * 15 + 5;
    const left = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = Math.random() * 10 + 10;

    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${left}vw`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.background = `rgba(255, ${182 + Math.random() * 50}, ${
      193 + Math.random() * 50
    }, ${0.3 + Math.random() * 0.4})`;

    container.appendChild(petal);
  }
}

function createHearts() {
  const container = document.querySelector(".hearts-container");
  const heartCount = 8;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "💖";

    const left = Math.random() * 100;
    const delay = Math.random() * 6;
    const size = Math.random() * 10 + 10;

    heart.style.left = `${left}vw`;
    heart.style.animationDelay = `${delay}s`;
    heart.style.fontSize = `${size}px`;

    container.appendChild(heart);
  }
}

function startBackgroundMusic() {
  const music = document.getElementById("backgroundMusic");
  const toggleBtn = document.getElementById("musicToggle");

  // Try to play music with user interaction
  document.addEventListener("click", function initMusic() {
    if (music.paused) {
      music.volume = 0.3;
      music.play().catch((e) => console.log("Auto-play prevented"));
    }
    document.removeEventListener("click", initMusic);
  });

  toggleBtn.addEventListener("click", function () {
    if (music.paused) {
      music.play();
      toggleBtn.textContent = "🎵";
    } else {
      music.pause();
      toggleBtn.textContent = "🔇";
    }
  });
}

// Text highlight for emotional words
function highlightEmotionalWords() {
  const emotionalWords = [
    "aap",
    "dil",
    "dua",
    "rooh",
    "pyaar",
    "muskurate",
    "khoobsurat",
    "hamesha",
  ];
  const letterTexts = document.querySelectorAll(".letter-text");

  letterTexts.forEach((textElement) => {
    let content = textElement.innerHTML;
    emotionalWords.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      content = content.replace(
        regex,
        `<span class="highlight">${word}</span>`
      );
    });
    textElement.innerHTML = content;
  });
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", highlightEmotionalWords);
