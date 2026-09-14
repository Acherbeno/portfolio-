// ===== PARTICLES =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouseX = 0;
let mouseY = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(37, 99, 235, ${Math.random() * 0.3 + 0.1})`;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
            const force = (100 - dist) / 100;
            this.x += (dx / dist) * force * 0.5;
            this.y += (dy / dist) * force * 0.5;
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
}

function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(37, 99, 235, ${0.05 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animateParticles);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

animateParticles();

// ===== TYPING EFFECT =====
const typingTexts = ['Systèmes & Réseaux', 'Infrastructure IT', 'Cybersécurité', 'Solutions Robustes'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeEffect() {
    const currentText = typingTexts[textIndex];
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        setTimeout(typeEffect, 500);
        return;
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

setTimeout(typeEffect, 1000);

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            if (target === 100) {
                counter.textContent = current + '%';
            } else {
                counter.textContent = current;
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                if (target === 100) {
                    counter.textContent = '100%';
                } else {
                    counter.textContent = target;
                }
            }
        }
        requestAnimationFrame(updateCounter);
    });
}

// ===== SCROLL FUNCTIONS =====
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

const scrollButtons = document.getElementById('scrollButtons');

window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        scrollButtons.classList.add('visible');
    } else {
        scrollButtons.classList.remove('visible');
    }
});

function observeFadeElements() {
    const faders = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    faders.forEach(el => observer.observe(el));
}

let countersAnimated = false;
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            animateCounters();
        }
    });
}, { threshold: 0.3 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) statsObserver.observe(statsGrid);

// ===== OPEN / CLOSE PDF =====
function openPDF(url) {
    const modal = document.getElementById('pdfModal');
    const frame = document.getElementById('pdfFrame');
    const error = document.getElementById('pdfError');
    error.classList.remove('show');
    frame.style.display = 'block';
    frame.src = url;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    frame.onerror = function() {
        frame.style.display = 'none';
        error.classList.add('show');
    };
    setTimeout(function() {
        try {
            if (frame.contentDocument && frame.contentDocument.body.innerHTML === '') {
                frame.style.display = 'none';
                error.classList.add('show');
            }
        } catch(e) {}
    }, 3000);
}

function closePDF() {
    const modal = document.getElementById('pdfModal');
    const frame = document.getElementById('pdfFrame');
    const error = document.getElementById('pdfError');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    error.classList.remove('show');
    frame.style.display = 'block';
    setTimeout(() => { frame.src = ''; }, 300);
}

document.getElementById('pdfModalClose').addEventListener('click', closePDF);
document.getElementById('pdfModal').addEventListener('click', function(e) {
    if (e.target === this) closePDF();
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closePDF();
});

// ===== NAVIGATION ENTRE LES VUES =====
const viewHistory = [];
let currentView = 'view-root';

function hideAllViews() {
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
}

function showView(viewId) {
    hideAllViews();
    const view = document.getElementById(viewId);
    if (view) {
        view.style.display = 'block';
        view.classList.add('active');
        currentView = viewId;
        // Scroll en haut de l'explorateur
        const explorer = document.getElementById('explorerContent');
        if (explorer) explorer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    updateBreadcrumbFromView(viewId);
    updateBackButtonState();
    updatePathFromView(viewId);
}

function showFolder(folderId) {
    viewHistory.push(currentView);
    const viewId = 'view-' + folderId;
    showView(viewId);
}

function showProject(projectId) {
    viewHistory.push(currentView);
    const viewId = 'view-' + projectId;
    showView(viewId);
}

function goBack() {
    if (viewHistory.length > 0) {
        const previousView = viewHistory.pop();
        showView(previousView);
    }
}

function goHome() {
    viewHistory.length = 0;
    showView('view-root');
}

function updateBackButtonState() {
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.disabled = (viewHistory.length === 0);
    }
}

// ===== BREADCRUMB =====
const viewNames = {
    'view-root': '📁 Racine',
    'view-reseaux': '🌐 Réseaux',
    'view-systemes': '🖥️ Systèmes',
    'view-cyber': '🔐 Cybersécurité',
    'view-support': '🛠️ Support IT',
    'view-stage': '📁 Stage',
    'view-stage1': '📁 1ère année',
    'view-stage2': '📁 2ème année',
    'view-certifications': '📁 Certifications'
};

function updateBreadcrumbFromView(viewId) {
    const breadcrumb = document.getElementById('breadcrumb');
    if (!breadcrumb) return;
    breadcrumb.innerHTML = '';

    const path = [];
    // Chemin de base
    path.push({ id: 'view-root', name: '📁 Racine' });

    // Si on est dans un sous-dossier ou projet
    if (viewId.startsWith('view-projet-')) {
        // Trouver le dossier parent
        if (viewId.includes('hsrp') || viewId.includes('vlan') || viewId.includes('nat')) {
            path.push({ id: 'view-reseaux', name: '🌐 Réseaux' });
        } else if (viewId.includes('winserver') || viewId.includes('debian')) {
            path.push({ id: 'view-systemes', name: '🖥️ Systèmes' });
        } else if (viewId.includes('firewall') || viewId.includes('audit') || viewId.includes('hardening')) {
            path.push({ id: 'view-cyber', name: '🔐 Cybersécurité' });
        } else if (viewId.includes('win11') || viewId.includes('maintenance')) {
            path.push({ id: 'view-support', name: '🛠️ Support IT' });
        } else if (viewId.includes('stage1') || viewId.includes('install-poste')) {
            path.push({ id: 'view-stage', name: '📁 Stage' });
            path.push({ id: 'view-stage1', name: '📁 1ère année' });
        } else if (viewId.includes('stage2') || viewId.includes('migration') || viewId.includes('backup')) {
            path.push({ id: 'view-stage', name: '📁 Stage' });
            path.push({ id: 'view-stage2', name: '📁 2ème année' });
        } else if (viewId.includes('rgpd')) {
            path.push({ id: 'view-certifications', name: '📁 Certifications' });
        }
    } else if (viewId.startsWith('view-') && viewId !== 'view-root') {
        // Dossier simple
        const folderName = viewNames[viewId];
        if (folderName) {
            // Si c'est un sous-dossier de stage
            if (viewId === 'view-stage1' || viewId === 'view-stage2') {
                path.push({ id: 'view-stage', name: '📁 Stage' });
            }
            path.push({ id: viewId, name: folderName });
        }
    }

    // Construire le breadcrumb
    path.forEach((item, index) => {
        if (index > 0) {
            const sep = document.createElement('span');
            sep.className = 'separator';
            sep.textContent = '/';
            breadcrumb.appendChild(sep);
        }
        const crumb = document.createElement('span');
        crumb.className = 'crumb';
        if (index === path.length - 1) crumb.classList.add('active');
        crumb.innerHTML = item.name;
        crumb.onclick = () => {
            goToView(item.id);
        };
        breadcrumb.appendChild(crumb);
    });
}

function goToView(viewId) {
    // Trouver l'index de cette vue dans l'historique
    const index = viewHistory.indexOf(viewId);
    if (index !== -1) {
        viewHistory.splice(index);
    } else {
        viewHistory.length = 0;
    }
    showView(viewId);
}

function updatePathFromView(viewId) {
    const pathEl = document.getElementById('currentPath');
    if (pathEl) {
        const name = viewNames[viewId] || '📁 Racine';
        pathEl.textContent = name;
    }
}

// ===== VIEW OPTIONS =====
function setView(view) {
    document.getElementById('viewGrid').classList.toggle('active', view === 'grid');
    document.getElementById('viewList').classList.toggle('active', view === 'list');
    // Optionnel : gérer une classe sur le conteneur
}

// ===== DARK MODE =====
const themeBtn = document.getElementById('themeToggle');
const prefersDark = localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
if(prefersDark) document.body.classList.add('dark');
updateThemeIcon();

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
});

function updateThemeIcon() {
    const isDark = document.body.classList.contains('dark');
    themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// ===== MOBILE MENU =====
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinksEl = document.getElementById('navLinks');
if(mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navLinksEl.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if(icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksEl.classList.remove('active');
        const icon = mobileBtn?.querySelector('i');
        if(icon && icon.classList.contains('fa-times')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== INITIALISATION =====
showView('view-root');
observeFadeElements();

window.addEventListener('load', () => {
    observeFadeElements();
    if (window.scrollY > 100) {
        scrollButtons.classList.add('visible');
    }
});