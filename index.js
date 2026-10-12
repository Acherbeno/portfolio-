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
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeEffect() {
    const typingTexts = (typeof currentLang !== 'undefined' && currentLang === 'en')
        ? ['Systems & Networks', 'IT Infrastructure', 'Cybersecurity', 'Robust Solutions']
        : ['Systèmes & Réseaux', 'Infrastructure IT', 'Cybersécurité', 'Solutions Robustes'];

    const currentText = typingTexts[textIndex % typingTexts.length];

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

window.addEventListener('languageChanged', () => {
    charIndex = 0;
    isDeleting = false;
    textIndex = 0;
});

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
    'view-certifications': '📁 Certifications',
    'view-fiche': '📄 Fiche'
};

const viewNamesEN = {
    'view-root': '📁 Root',
    'view-reseaux': '🌐 Networks',
    'view-systemes': '🖥️ Systems',
    'view-cyber': '🔐 Cybersecurity',
    'view-support': '🛠️ IT Support',
    'view-stage': '📁 Internship',
    'view-stage1': '📁 Year 1',
    'view-stage2': '📁 Year 2',
    'view-certifications': '📁 Certifications',
    'view-fiche': '📄 Sheet'
};

function updateBreadcrumbFromView(viewId) {
    const breadcrumb = document.getElementById('breadcrumb');
    if (!breadcrumb) return;
    breadcrumb.innerHTML = '';

    const names = (typeof currentLang !== 'undefined' && currentLang === 'en') ? viewNamesEN : viewNames;
    const path = [];
    path.push({ id: 'view-root', name: names['view-root'] });

    if (viewId.startsWith('view-projet-')) {
        if (viewId.includes('hsrp') || viewId.includes('vlan') || viewId.includes('nat')) {
            path.push({ id: 'view-reseaux', name: names['view-reseaux'] });
        } else if (viewId.includes('winserver') || viewId.includes('debian')) {
            path.push({ id: 'view-systemes', name: names['view-systemes'] });
        } else if (viewId.includes('firewall') || viewId.includes('audit') || viewId.includes('hardening')) {
            path.push({ id: 'view-cyber', name: names['view-cyber'] });
        } else if (viewId.includes('win11') || viewId.includes('maintenance')) {
            path.push({ id: 'view-support', name: names['view-support'] });
        } else if (viewId.includes('stage1') || viewId.includes('install-poste')) {
            path.push({ id: 'view-stage', name: names['view-stage'] });
            path.push({ id: 'view-stage1', name: names['view-stage1'] });
        } else if (viewId.includes('stage2') || viewId.includes('migration') || viewId.includes('backup')) {
            path.push({ id: 'view-stage', name: names['view-stage'] });
            path.push({ id: 'view-stage2', name: names['view-stage2'] });
        } else if (viewId.includes('rgpd') || viewId.includes('hplife') || viewId.includes('cisco') || viewId.includes('ndg')) {
            path.push({ id: 'view-certifications', name: names['view-certifications'] });
        } else if (viewId.includes('fiche')) {
            path.push({ id: 'view-fiche', name: names['view-fiche'] });
        }
    } else if (viewId.startsWith('view-') && viewId !== 'view-root') {
        const folderName = names[viewId];
        if (folderName) {
            if (viewId === 'view-stage1' || viewId === 'view-stage2') {
                path.push({ id: 'view-stage', name: names['view-stage'] });
            }
            path.push({ id: viewId, name: folderName });
        }
    }

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
        const names = (typeof currentLang !== 'undefined' && currentLang === 'en') ? viewNamesEN : viewNames;
        const name = names[viewId] || names['view-root'];
        pathEl.textContent = name;
    }
}

// ===== VIEW OPTIONS =====
function setView(view) {
    document.getElementById('viewGrid').classList.toggle('active', view === 'grid');
    document.getElementById('viewList').classList.toggle('active', view === 'list');
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

// ===== BARRE DE PROGRESSION =====
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress-bar';
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(90deg, #2563eb, #8b5cf6, #ec4899, #2563eb);
    background-size: 300% 100%;
    z-index: 99999;
    transition: width 0.1s ease;
    box-shadow: 0 0 15px rgba(37, 99, 235, 0.6), 0 0 30px rgba(139, 92, 246, 0.4);
    pointer-events: none;
    animation: progressGradient 3s linear infinite;
`;

const progressStyle = document.createElement('style');
progressStyle.textContent = `
    @keyframes progressGradient {
        0% { background-position: 0% 50%; }
        100% { background-position: 300% 50%; }
    }
`;
document.head.appendChild(progressStyle);
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = scrollPercent + '%';
});

// ===== EFFET TILT 3D SUR CARTES =====
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== PARALLAX LÉGER SUR LE HERO =====
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            const heroText = heroSection.querySelector('.hero-text');
            const heroImage = heroSection.querySelector('.hero-image');
            if (heroText) heroText.style.transform = `translateY(${scrolled * 0.15}px)`;
            if (heroImage) heroImage.style.transform = `translateY(${scrolled * 0.25}px)`;
        }
    });
}

// ===== EFFET RIPPLE AU CLIC =====
document.querySelectorAll('.btn, .btn-cv, .btn-rapport, .btn-back, button[type="submit"]').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 8px 40px rgba(37, 99, 235, 0.15)';
            navbar.style.borderBottomColor = 'rgba(37, 99, 235, 0.2)';
        } else {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.05)';
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.3)';
        }
    });
}

// ===== TITRE QUI APPARAÎT =====
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
});

// ============================================
// ===== VEILLE TECHNOLOGIQUE =====
// ============================================

const RSS_SOURCES = [
    { name: '01net', url: 'https://www.01net.com/feed/', color: '#e63946' },
    { name: 'Le Monde Info', url: 'https://www.lemondeinformatique.fr/flux-rss/thematique/toutes-les-actualites/rss.xml', color: '#1d4ed8' },
    { name: 'Korben', url: 'https://korben.info/feed', color: '#f59e0b' },
    { name: 'Next', url: 'https://next.ink/feed/', color: '#8b5cf6' },
    { name: 'ZDNet FR', url: 'https://www.zdnet.fr/feeds/rss/actualites/', color: '#06b6d4' },
    { name: 'Clubic', url: 'https://www.clubic.com/feed/news.rss', color: '#ec4899' }
];

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

const STORAGE_KEY = 'veille_archive_v1';
const CAL_MONTHS_FR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const CAL_MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];

let calCurrentDate = new Date();
let selectedDate = new Date();
let veilleArchive = {};

function dateKey(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function todayKey() { return dateKey(new Date()); }

function loadArchive() {
    try {
        veilleArchive = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (e) {
        veilleArchive = {};
    }
}

function saveArchive() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(veilleArchive));
    } catch (e) {
        console.warn('Archive veille : quota localStorage dépassé');
    }
}

function renderCalendar() {
    const grid = document.getElementById('calGrid');
    const monthEl = document.getElementById('calMonth');
    const yearEl = document.getElementById('calYear');
    if (!grid) return;

    const year = calCurrentDate.getFullYear();
    const month = calCurrentDate.getMonth();
    const months = (typeof currentLang !== 'undefined' && currentLang === 'en') ? CAL_MONTHS_EN : CAL_MONTHS_FR;

    monthEl.textContent = months[month];
    yearEl.textContent = year;

    grid.innerHTML = '';

    const firstDay = new Date(year, month, 1);
    let startOffset = firstDay.getDay() - 1;
    if (startOffset < 0) startOffset = 6;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < startOffset; i++) {
        const empty = document.createElement('div');
        empty.className = 'cal-day empty';
        grid.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const dayDate = new Date(year, month, d);
        dayDate.setHours(0, 0, 0, 0);
        const key = dateKey(dayDate);

        const cell = document.createElement('button');
        cell.className = 'cal-day';
        cell.textContent = d;
        cell.dataset.date = key;

        const isToday = dayDate.getTime() === today.getTime();
        const isSelected = key === dateKey(selectedDate);
        const hasNews = !!veilleArchive[key];

        if (isToday) cell.classList.add('today');
        if (isSelected) cell.classList.add('selected');
        if (hasNews) cell.classList.add('has-news');

        cell.addEventListener('click', () => {
            selectedDate = dayDate;
            renderCalendar();
            loadNewsForSelectedDate();
        });

        grid.appendChild(cell);
    }
}

async function loadNewsForSelectedDate(forceRefresh = false) {
    const key = dateKey(selectedDate);
    const today = todayKey();

    updateNewsDateLabel();

    if (key > today) {
        showNewsEmpty('future');
        return;
    }

    if (veilleArchive[key] && !forceRefresh) {
        showNewsContent(veilleArchive[key]);
        return;
    }

    showNewsLoader();

    try {
        const articles = await fetchAllArticles();
        if (articles.length === 0) {
            showNewsError();
            return;
        }

        let match = findArticleForDate(articles, key);

        if (!match && key === today) {
            match = articles[0];
        }

        if (!match && key < today) {
            const seed = key.split('-').reduce((a, b) => a + parseInt(b), 0);
            match = articles[seed % articles.length];
        }

        if (match) {
            veilleArchive[key] = match;
            saveArchive();
            renderCalendar();
            showNewsContent(match);
        } else {
            showNewsEmpty('none');
        }
    } catch (err) {
        console.error('Erreur veille:', err);
        showNewsError();
    }
}

function findArticleForDate(articles, key) {
    return articles.find(a => {
        if (!a.pubDate) return false;
        const d = new Date(a.pubDate);
        if (isNaN(d.getTime())) return false;
        return dateKey(d) === key;
    });
}

async function fetchAllArticles() {
    const promises = RSS_SOURCES.map(src => fetchOneFeed(src));
    const results = await Promise.allSettled(promises);

    const all = [];
    results.forEach(r => {
        if (r.status === 'fulfilled' && Array.isArray(r.value)) {
            all.push(...r.value);
        }
    });

    all.sort((a, b) => new Date(b.pubDate || 0) - new Date(a.pubDate || 0));
    return all;
}

async function fetchOneFeed(source) {
    const url = CORS_PROXY + encodeURIComponent(source.url);
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const text = await res.text();
    const xml = new DOMParser().parseFromString(text, 'application/xml');

    const items = xml.querySelectorAll('item, entry');
    const articles = [];

    items.forEach(item => {
        const title = item.querySelector('title')?.textContent?.trim();
        const link = item.querySelector('link')?.textContent?.trim()
                  || item.querySelector('link')?.getAttribute('href');
        const descRaw = item.querySelector('description')?.textContent
                     || item.querySelector('summary')?.textContent
                     || item.querySelector('content')?.textContent
                     || '';
        const pubDate = item.querySelector('pubDate')?.textContent
                     || item.querySelector('updated')?.textContent
                     || item.querySelector('published')?.textContent
                     || '';

        if (!title || !link) return;

        const tmp = document.createElement('div');
        tmp.innerHTML = descRaw;
        let desc = (tmp.textContent || '').trim();
        if (desc.length > 280) desc = desc.slice(0, 280) + '…';

        articles.push({
            title,
            desc,
            link,
            pubDate,
            source: source.name,
            color: source.color
        });
    });

    return articles;
}

function updateNewsDateLabel() {
    const label = document.getElementById('newsDateLabel');
    if (!label) return;
    const lang = (typeof currentLang !== 'undefined') ? currentLang : 'fr';
    const opts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    label.textContent = selectedDate.toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR', opts);
}

function hideAllNewsStates() {
    ['newsLoader','newsContent','newsEmpty','newsError'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
}

function showNewsLoader() {
    hideAllNewsStates();
    const el = document.getElementById('newsLoader');
    if (el) el.style.display = 'flex';
}

function showNewsContent(article) {
    hideAllNewsStates();
    const content = document.getElementById('newsContent');
    if (!content) return;

    document.getElementById('newsSource').textContent = article.source || 'Source';
    document.getElementById('newsSource').style.background = article.color || '';
    document.getElementById('newsTitle').textContent = article.title || '—';
    document.getElementById('newsDesc').textContent = article.desc || '';

    const link = document.getElementById('newsLink');
    link.href = article.link || '#';

    const timeEl = document.getElementById('newsTime');
    if (article.pubDate) {
        const d = new Date(article.pubDate);
        if (!isNaN(d.getTime())) {
            const lang = (typeof currentLang !== 'undefined') ? currentLang : 'fr';
            timeEl.innerHTML = `<i class="fas fa-clock"></i> ${d.toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}`;
        } else {
            timeEl.innerHTML = '<i class="fas fa-clock"></i> —';
        }
    } else {
        timeEl.innerHTML = '<i class="fas fa-clock"></i> —';
    }

    content.style.display = 'flex';
}

function showNewsEmpty(type) {
    hideAllNewsStates();
    const empty = document.getElementById('newsEmpty');
    const title = document.getElementById('newsEmptyTitle');
    const desc = document.getElementById('newsEmptyDesc');
    if (!empty) return;

    const lang = (typeof currentLang !== 'undefined') ? currentLang : 'fr';

    if (type === 'future') {
        title.textContent = lang === 'en' ? 'Not yet available' : 'Pas encore disponible';
        desc.textContent = lang === 'en'
            ? 'This date is in the future. Come back on that day to see the daily news!'
            : 'Cette date est dans le futur. Reviens ce jour-là pour découvrir l\'actu du jour !';
    } else {
        title.textContent = lang === 'en' ? 'No news found' : 'Aucune actu trouvée';
        desc.textContent = lang === 'en'
            ? 'No article found for this date. Try another day or refresh.'
            : 'Aucun article trouvé pour cette date. Essaie un autre jour ou rafraîchis.';
    }

    empty.style.display = 'flex';
}

function showNewsError() {
    hideAllNewsStates();
    const el = document.getElementById('newsError');
    if (el) el.style.display = 'flex';
}

function initVeille() {
    const calGrid = document.getElementById('calGrid');
    if (!calGrid) return;

    loadArchive();
    renderCalendar();
    updateNewsDateLabel();

    document.getElementById('calPrev')?.addEventListener('click', () => {
        calCurrentDate.setMonth(calCurrentDate.getMonth() - 1);
        renderCalendar();
    });
    document.getElementById('calNext')?.addEventListener('click', () => {
        calCurrentDate.setMonth(calCurrentDate.getMonth() + 1);
        renderCalendar();
    });

    document.getElementById('calTodayBtn')?.addEventListener('click', () => {
        const t = new Date();
        calCurrentDate = new Date(t.getFullYear(), t.getMonth(), 1);
        selectedDate = t;
        renderCalendar();
        loadNewsForSelectedDate();
    });

    document.getElementById('newsRefresh')?.addEventListener('click', () => {
        loadNewsForSelectedDate(true);
    });
    document.getElementById('newsRetry')?.addEventListener('click', () => {
        loadNewsForSelectedDate(true);
    });

    loadNewsForSelectedDate();
}

window.addEventListener('languageChanged', () => {
    if (document.getElementById('calGrid')) {
        renderCalendar();
        updateNewsDateLabel();
        const key = dateKey(selectedDate);
        if (veilleArchive[key]) {
            showNewsContent(veilleArchive[key]);
        }
    }
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVeille);
} else {
    initVeille();
}