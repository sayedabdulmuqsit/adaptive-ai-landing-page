// ===== CREATE FLOATING PARTICLES =====
function createParticles() {
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    document.body.appendChild(particle);
  }
}

// ===== STATE MANAGEMENT =====
let state = {
  startTime: Date.now(),
  scrollCount: 0,
  clicked: false,
  lastScrollTime: 0,
  agentStopped: false,
  engagedCount: parseInt(localStorage.getItem("engagedCount")) || 0,
  mildConfusionCount: parseInt(localStorage.getItem("mildConfusionCount")) || 0,
  highConfusionCount: parseInt(localStorage.getItem("highConfusionCount")) || 0
};

// ===== DOM ELEMENTS =====
const statusBox = document.getElementById("aiStatus");
const enrollBtn = document.getElementById("enrollBtn");
const allCTAs = document.querySelectorAll(".cta");

// ===== AI-GENERATED CONTENT VARIATIONS =====
const contentVariations = {
  headlines: [
    "Start AI Easily – No Coding Required",
    "AI Made Simple for Complete Beginners",
    "Learn AI Step-by-Step Without Fear"
  ],
  reassurance: [
    "✨ No coding, no math — just clear, simple concepts",
    "✨ Learn AI like a story, not a textbook",
    "✨ Designed specifically for beginners who find AI intimidating"
  ],
  cta: [
    "Begin Your AI Journey (Free Preview)",
    "Start Learning Today – Risk Free",
    "Try AI Basics – Beginner Friendly"
  ]
};

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight - 100) {
      el.classList.add('active');
    }
  });
}

// ===== OPTIMIZED SCROLL TRACKING =====
let scrollTimeout;

function trackScroll() {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const now = Date.now();
    if (now - state.lastScrollTime > 1000) {
      state.scrollCount++;
      state.lastScrollTime = now;
    }
  }, 100);
}

// ===== HANDLE USER ENGAGEMENT =====
function handleEngagement() {
  state.clicked = true;
  state.agentStopped = true;
  state.engagedCount++;
  localStorage.setItem("engagedCount", state.engagedCount);

  statusBox.style.display = "block";
  statusBox.style.background = "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)";
  statusBox.style.color = "#000";
  statusBox.innerText = "🟢 Great! You're engaged and ready to learn. Welcome aboard!";
  
  updateDashboard();

  setTimeout(() => {
    statusBox.style.display = "none";
  }, 5000);
}

// ===== UPDATE DASHBOARD =====
function updateDashboard() {
  const total = state.engagedCount + state.mildConfusionCount + state.highConfusionCount;
  document.getElementById("totalUsers").innerText = total;
  document.getElementById("engagedUsers").innerText = state.engagedCount;
  document.getElementById("mildUsers").innerText = state.mildConfusionCount;
  document.getElementById("highUsers").innerText = state.highConfusionCount;
}

// ===== HANDLE MILD CONFUSION =====
function handleMildConfusion() {
  state.mildConfusionCount++;
  localStorage.setItem("mildConfusionCount", state.mildConfusionCount);

  statusBox.style.display = "block";
  statusBox.style.background = "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)";
  statusBox.style.color = "#000";
  statusBox.innerText = "🟡 Need help deciding? We've highlighted the key benefits for you!";

  const cards = document.querySelectorAll(".card");
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.style.border = "2px solid #ffd700";
      card.style.boxShadow = "0 0 30px rgba(255, 215, 0, 0.5)";
    }, i * 200);
  });

  updateDashboard();
}

// ===== HANDLE HIGH CONFUSION =====
function handleHighConfusion() {
  state.highConfusionCount++;
  localStorage.setItem("highConfusionCount", state.highConfusionCount);

  statusBox.style.display = "block";
  statusBox.style.background = "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)";
  statusBox.style.color = "#fff";
  statusBox.innerText = "🔴 We've simplified this page to make your decision easier!";

  // Apply AI-generated headline
  const randomHeadline = contentVariations.headlines[Math.floor(Math.random() * contentVariations.headlines.length)];
  document.querySelector("h1").innerText = randomHeadline;

  // Apply AI-generated CTA
  const randomCTA = contentVariations.cta[Math.floor(Math.random() * contentVariations.cta.length)];
  allCTAs.forEach(btn => {
    btn.innerText = randomCTA;
    btn.style.animation = "pulse 2s infinite";
  });

  // Add AI-generated reassurance message
  const randomReassurance = contentVariations.reassurance[Math.floor(Math.random() * contentVariations.reassurance.length)];
  const msg = document.createElement("p");
  msg.innerText = randomReassurance;
  msg.style.cssText = "color: #00f2fe; font-size: 20px; text-align: center; margin-top: 30px; padding: 20px; background: rgba(0, 242, 254, 0.1); border-radius: 12px; animation: fadeInUp 0.5s ease;";
  document.querySelector(".hero").appendChild(msg);

  updateDashboard();
}

// ===== INTELLIGENT ASSISTANCE TIMER =====
function startIntelligentAssistance() {
  setTimeout(() => {
    if (state.agentStopped) return;

    const timeSpent = (Date.now() - state.startTime) / 1000;

    // Mild confusion: User is browsing but hesitant
    if (!state.clicked && timeSpent > 20 && state.scrollCount >= 2 && state.scrollCount <= 4) {
      handleMildConfusion();
      return;
    }

    // High confusion: User is struggling
    if (!state.clicked && timeSpent > 30 && state.scrollCount > 4) {
      handleHighConfusion();
    }
  }, 30000);
}

// ===== EVENT LISTENERS =====
function initializeEventListeners() {
  // Scroll reveal
  window.addEventListener('scroll', revealOnScroll);
  
  // Scroll tracking
  window.addEventListener("scroll", trackScroll);
  
  // CTA button clicks
  allCTAs.forEach(btn => btn.addEventListener("click", handleEngagement));
}

// ===== INITIALIZATION =====
function init() {
  createParticles();
  revealOnScroll();
  updateDashboard();
  initializeEventListeners();
  startIntelligentAssistance();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}