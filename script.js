// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    createParticles();
    setupLockSystem();
    initAnimations();
});

// ===== COUNTDOWN WITH LOCK =====
function initCountdown() {
    const targetDate = new Date('2026-02-21T00:00:00').getTime();
    const unlockBtn = document.getElementById('unlockBtn');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            unlockPage();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = String(days).padStart(3, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== UNLOCK PAGE =====
function unlockPage() {
    const unlockBtn = document.getElementById('unlockBtn');
    if (!unlockBtn) return;

    unlockBtn.classList.remove('locked-btn');
    unlockBtn.classList.add('unlocked-btn');
    unlockBtn.innerHTML = `
        <span class="btn-icon">🎉</span>
        <span class="btn-text">BEGIN YOUR JOURNEY!</span>
    `;
    unlockBtn.style.pointerEvents = 'auto';
    createCelebration();
}

// ===== CELEBRATION EFFECT =====
function createCelebration() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['🎉', '✨', '💝', '🌟', '💫'][Math.floor(Math.random() * 5)];
        confetti.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}vw;
            top: -50px;
            font-size: 2rem;
            pointer-events: none;
            z-index: 9999;
            animation: confetti-fall ${2 + Math.random() * 2}s linear forwards;
        `;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }
}

// ===== LOCK SYSTEM =====
function setupLockSystem() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a.locked-btn');
        if (link) {
            e.preventDefault();
            e.stopPropagation();
            showLockedNotification();
            return false;
        }
    }, true);
}

// ===== LOCKED NOTIFICATION =====
function showLockedNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(26, 26, 62, 0.95);
        border: 2px solid #ff006e;
        border-radius: 15px;
        padding: 2rem;
        text-align: center;
        z-index: 10000;
        backdrop-filter: blur(20px);
        animation: popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        box-shadow: 0 0 60px rgba(255, 0, 110, 0.6);
    `;

    notification.innerHTML = `
        <p style="font-size: 2rem; margin-bottom: 1rem;">🔐</p>
        <p style="color: #00d4ff; font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem;">Almost There!</p>
        <p style="color: #e0e0ff; font-size: 0.95rem;">Your surprise unlocks on February 21st!</p>
    `;

    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}

// ===== CREATE PARTICLES =====
function createParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-float {
            0% {
                opacity: 0;
                transform: translateY(0) translateX(0);
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
            }
        }
        
        @keyframes confetti-fall {
            to {
                transform: translateY(100vh) rotateZ(360deg);
                opacity: 0;
            }
        }
        
        @keyframes popIn {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.7);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }

        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

    document.head.appendChild(style);

    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        const colors = ['#ff006e', '#a855f7', '#00d4ff', '#ffd700'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: ${color};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            z-index: 1;
            box-shadow: 0 0 ${Math.random() * 10 + 5}px ${color};
            animation: particle-float ${Math.random() * 15 + 10}s infinite linear ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
}

// ===== SCROLL ANIMATIONS =====
function initAnimations() {
    window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / document.documentElement.scrollHeight;
        const aurora = document.querySelector('.aurora');
        if (aurora) {
            aurora.style.opacity = 0.5 + scrollPercent * 0.5;
        }
    });

    // Observe elements for fade-in animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add animation to memory cards, quality cards, timeline items, wishes
    document.querySelectorAll(
        '.memory-card-enhanced, .quality-hover, .timeline-item, .wish-hover, .info-card'
    ).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        observer.observe(el);
    });
}

// ===== PREVENT RIGHT CLICK ON COUNTDOWN PAGE =====
document.addEventListener('contextmenu', (e) => {
    if (document.querySelector('.countdown-wrapper')) {
        e.preventDefault();
    }
});

// ===== CONSOLE MESSAGE =====
console.log('%c🎂 HAPPY BIRTHDAY RABBIA! 🎂', 'font-size: 20px; color: #ff006e; font-weight: bold;');
console.log('%cYour surprise is loading... ✨', 'font-size: 14px; color: #00d4ff;');
