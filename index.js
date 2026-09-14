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

// ===== EXPLORATEUR =====
const viewMode = { current: 'grid' };

const fileSystem = {
    name: 'Racine',
    type: 'folder',
    children: [
        {
            name: '🌐 Réseaux',
            type: 'folder',
            icon: 'fa-folder',
            projects: [
                {
                    title: 'Routage inter-VLAN HSRP',
                    description: 'Mise en place d\'un routage inter-VLAN avec HSRP (Hot Standby Router Protocol) pour assurer la redondance et la haute disponibilité du réseau.',
                    tags: ['HSRP', 'VLAN', 'Routage', 'Cisco'],
                    images: ['image/topologie-vlan.png', 'image/routage-vlan.png'],
                    files: [
                        { name: 'Configuration HSRP', url: 'image/hsrp-config.pdf', icon: 'fa-file-pdf' },
                        { name: 'Topologie complète', url: 'image/topologie-vlan.png', icon: 'fa-file-image' }
                    ]
                },
                {
                    title: 'Segmentation VLAN et ACL',
                    description: 'Conception d\'une architecture VLAN sécurisée avec des ACL (Access Control Lists) pour contrôler les flux entre les différents services.',
                    tags: ['VLAN', 'ACL', 'Sécurité', 'Cisco'],
                    images: ['image/vlan-topologie.png', 'image/acl-config.png'],
                    files: [
                        { name: 'Configuration VLAN', url: 'image/vlan-config.pdf', icon: 'fa-file-pdf' },
                        { name: 'Règles ACL', url: 'image/acl-rules.pdf', icon: 'fa-file-pdf' }
                    ]
                },
                {
                    title: 'NAT et PAT - Accès Internet',
                    description: 'Configuration NAT (Network Address Translation) et PAT (Port Address Translation) pour permettre l\'accès à Internet depuis un réseau privé.',
                    tags: ['NAT', 'PAT', 'Cisco', 'Réseau'],
                    images: ['image/nat-config.png', 'image/pat-config.png'],
                    files: [
                        { name: 'Configuration NAT', url: 'image/nat-config.pdf', icon: 'fa-file-pdf' },
                        { name: 'Fichier Packet Tracer', url: 'image/nat.pkt', icon: 'fa-file-archive' }
                    ]
                }
            ]
        },
        {
            name: '🖥️ Systèmes',
            type: 'folder',
            icon: 'fa-folder',
            projects: [
                {
                    title: 'Infrastructure Windows Server',
                    description: 'Déploiement complet d\'un domaine Active Directory avec services DHCP, DNS et GPO pour une gestion centralisée des utilisateurs.',
                    tags: ['Windows Server', 'AD DS', 'DHCP', 'DNS'],
                    images: ['image/win-server-install.png', 'image/ad-ds-config.png'],
                    files: [
                        { name: 'Guide d\'installation', url: 'image/win-server-guide.pdf', icon: 'fa-file-pdf' },
                        { name: 'Configuration AD DS', url: 'image/ad-ds-config.pdf', icon: 'fa-file-pdf' }
                    ]
                },
                {
                    title: 'Administration Linux Debian',
                    description: 'Configuration d\'un serveur Debian avec services web (Apache/Nginx), base de données (MySQL) et gestion des utilisateurs.',
                    tags: ['Linux', 'Debian', 'Apache', 'MySQL'],
                    images: ['image/debian-server.png'],
                    files: [
                        { name: 'Configuration Debian', url: 'image/debian-config.pdf', icon: 'fa-file-pdf' }
                    ]
                }
            ]
        },
        {
            name: '🔐 Cybersécurité',
            type: 'folder',
            icon: 'fa-folder',
            projects: [
                {
                    title: 'Sécurisation Pare-feu',
                    description: 'Mise en place de règles de pare-feu pour protéger le réseau contre les attaques extérieures et contrôler les flux entrants/sortants.',
                    tags: ['Firewall', 'Iptables', 'Sécurité'],
                    images: ['image/firewall-rules.png'],
                    files: [
                        { name: 'Règles Firewall', url: 'image/firewall-rules.pdf', icon: 'fa-file-pdf' }
                    ]
                },
                {
                    title: 'Audit de sécurité',
                    description: 'Réalisation d\'un audit complet pour identifier les vulnérabilités et proposer des solutions de renforcement.',
                    tags: ['Audit', 'Vulnérabilité', 'Hardening'],
                    images: ['image/security-audit.png'],
                    files: [
                        { name: 'Rapport d\'audit', url: 'image/security-audit.pdf', icon: 'fa-file-pdf' }
                    ]
                },
                {
                    title: 'Hardening Linux',
                    description: 'Durcissement d\'un serveur Linux : configuration sécurisée, suppression des services inutiles, gestion des accès.',
                    tags: ['Linux', 'Hardening', 'Sécurité'],
                    images: ['image/hardening-linux.png'],
                    files: [
                        { name: 'Script de durcissement', url: 'image/hardening-linux.txt', icon: 'fa-file-alt' }
                    ]
                }
            ]
        },
        {
            name: '🛠️ Support IT',
            type: 'folder',
            icon: 'fa-folder',
            projects: [
                {
                    title: 'Déploiement Windows 11',
                    description: 'Déploiement automatisé de postes Windows 11 avec configuration des mises à jour, sécurisation et optimisation.',
                    tags: ['Windows 11', 'Déploiement', 'MDT'],
                    images: ['image/win11-deploy.png'],
                    files: [
                        { name: 'Guide de déploiement', url: 'image/windows11.docx', icon: 'fa-file-word' }
                    ]
                },
                {
                    title: 'Maintenance et Diagnostic',
                    description: 'Procédures de maintenance préventive et curative, diagnostic matériel et logiciel, résolution de problèmes.',
                    tags: ['Maintenance', 'Diagnostic', 'Support'],
                    images: ['image/diagnostic.png'],
                    files: [
                        { name: 'Script de maintenance', url: 'image/maintenance.ps1', icon: 'fa-file-code' }
                    ]
                }
            ]
        },
        {
            name: '📁 Stage',
            type: 'folder',
            icon: 'fa-folder',
            children: [
                {
                    name: '📁 1ère année',
                    type: 'folder',
                    icon: 'fa-folder',
                    projects: [
                        {
                            title: 'Stage 1ère année - Découverte',
                            description: 'Migration de postes de travail de Windows 10 vers Windows 11 dans le cadre de mes études. Utilisation de Rufus pour créer une clé USB bootable, installation et configuration des postes pour les besoins pédagogiques du BTS SIO. Optimisation des performances et sécurisation des systèmes.',
                            tags: ['Découverte', 'Migration', 'Rufus', 'Clé USB'],
                            images: ['image/premiere.jpg', 'image/deuxieme.png'],
                            files: [
                                { name: 'Rapport de stage 1ère année', url: 'image/rapport-stage1.pdf', icon: 'fa-file-pdf' },
                                { name: 'Rapport de stage', url: 'image/rapport.pdf', icon: 'fa-file-pdf' },
                                { name: 'Présentation soutenance', url: 'image/soutenance1.pptx', icon: 'fa-file-powerpoint' },
                                { name: 'Installation Windows 11', url: 'image/windows11.pdf', icon: 'fa-file-pdf' }
                            ]
                        },
                        {
                            title: 'Projet - Installation postes de travail',
                            description: 'Installation et configuration de postes de travail dans le cadre des travaux pratiques du BTS SIO.',
                            tags: ['Windows 11', 'Installation', 'Postes de travail'],
                            images: ['image/install-poste1.png', 'image/install-poste2.png'],
                            files: [
                                { name: 'Procédure d\'installation', url: 'image/windows11.pdf', icon: 'fa-file-pdf' },
                                { name: 'Checklist déploiement', url: 'image/checklist.docx', icon: 'fa-file-word' }
                            ]
                        }
                    ]
                },
                {
                    name: '📁 2ème année',
                    type: 'folder',
                    icon: 'fa-folder',
                    projects: [
                        {
                            title: 'Stage 2ème année - Administration',
                            description: 'Stage en administration systèmes et réseaux. Gestion des serveurs, déploiement d\'infrastructures et mise en place de solutions de sauvegarde.',
                            tags: ['Administration', 'Serveurs', 'Infrastructure'],
                            images: ['image/stage2-1.png', 'image/stage2-2.png'],
                            files: [
                                { name: 'Rapport de stage 2ème année', url: 'image/rapport-stage2.pdf', icon: 'fa-file-pdf' },
                                { name: 'Présentation soutenance', url: 'image/soutenance2.pptx', icon: 'fa-file-powerpoint' }
                            ]
                        },
                        {
                            title: 'Projet - Migration serveur',
                            description: 'Migration d\'un serveur physique vers une infrastructure virtualisée avec VMware ESXi. Planification, exécution et validation.',
                            tags: ['Migration', 'Virtualisation', 'VMware'],
                            images: ['image/migration-server1.png', 'image/migration-server2.png'],
                            files: [
                                { name: 'Plan de migration', url: 'image/plan-migration.pdf', icon: 'fa-file-pdf' },
                                { name: 'Documentation technique', url: 'image/doc-technique.pdf', icon: 'fa-file-pdf' }
                            ]
                        },
                        {
                            title: 'Mise en place d\'un serveur de sauvegarde',
                            description: 'Déploiement et configuration d\'un serveur de sauvegarde avec Veeam Backup & Replication pour assurer la continuité d\'activité.',
                            tags: ['Sauvegarde', 'Veeam', 'Continuité'],
                            images: ['image/backup-server.png'],
                            files: [
                                { name: 'Configuration Veeam', url: 'image/veeam-config.pdf', icon: 'fa-file-pdf' },
                                { name: 'Plan de reprise d\'activité', url: 'image/pra.pdf', icon: 'fa-file-pdf' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: '📁 Certifications',
            type: 'folder',
            icon: 'fa-folder',
            children: [],
            projects: [
                {
                    title: 'Certification L\'ATELIER RGPD',
                    description: 'Obtention de la certification L\'ATELIER RGPD. Cette formation m\'a permis d\'acquérir les compétences nécessaires pour comprendre et appliquer le Règlement Général sur la Protection des Données (RGPD) au sein d\'une organisation. J\'ai appris à identifier les données personnelles, à mettre en place des mesures de sécurité adéquates, à gérer les consentements et à assurer la conformité des traitements de données.',
                    tags: ['RGPD', 'Cybersécurité', 'Données Personnelles', 'Conformité'],
                    thumbnail: 'image/certif.png',
                    images: ['image/certif.png'], 
                    files: [
                        { name: 'Certificat L\'ATELIER RGPD', url: 'image/certification-rgpd.pdf', icon: 'fa-file-pdf' }
                    ]
                }
            ]
        }
    ]
};

let history = [];
let currentIndex = -1;
let currentFolder = fileSystem;

function openFolder(folder) {
    if (history.length > currentIndex + 1) {
        history = history.slice(0, currentIndex + 1);
    }
    history.push(folder);
    currentIndex = history.length - 1;
    currentFolder = folder;
    renderExplorer();
    updateBackButton();
    updateBreadcrumb();
}

function openProject(project) {
    const projectView = document.createElement('div');
    projectView.className = 'project-detail';
    let imagesHtml = '';
    if (project.images && project.images.length > 0) {
        imagesHtml = `
            <div class="project-section">
                <h3><i class="fas fa-image"></i> Preuve / Certificat</h3>
                <div class="project-images">
                    ${project.images.map(img => `<img src="${img}" alt="Capture" onclick="window.open('${img}', '_blank')">`).join('')}
                </div>
            </div>
        `;
    }
    let filesHtml = '';
    if (project.files && project.files.length > 0) {
        filesHtml = `
            <div class="project-section">
                <h3><i class="fas fa-file-download"></i> Documents & fichiers</h3>
                <div class="project-files">
                    ${project.files.map(f => `
                        <a href="#" onclick="openFile('${f.url}', '${f.name}'); return false;">
                            <i class="fas ${f.icon || 'fa-file'}"></i> ${f.name}
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }
    projectView.innerHTML = `
        <div class="project-header">
            <h2>📄 ${project.title}</h2>
            <div class="project-tags">
                ${project.tags.map(t => `<span>${t}</span>`).join('')}
            </div>
        </div>
        <div class="project-desc">${project.description}</div>
        ${imagesHtml}
        ${filesHtml}
        <div class="project-nav">
            <button class="btn-back" onclick="goBack()">
                <i class="fas fa-arrow-left"></i> Retour
            </button>
        </div>
    `;
    const container = document.getElementById('explorerContent');
    container.innerHTML = '';
    container.appendChild(projectView);
    const breadcrumb = document.getElementById('breadcrumb');
    const crumbs = breadcrumb.querySelectorAll('.crumb');
    if (crumbs.length > 0) {
        const lastCrumb = crumbs[crumbs.length - 1];
        const newCrumb = document.createElement('span');
        newCrumb.className = 'crumb active';
        newCrumb.innerHTML = `📄 ${project.title}`;
        breadcrumb.appendChild(newCrumb);
    }
    document.getElementById('currentPath').textContent = `📄 ${project.title}`;
}

function goBack() {
    if (currentIndex > 0) {
        currentIndex--;
        currentFolder = history[currentIndex];
        renderExplorer();
        updateBackButton();
        updateBreadcrumb();
    }
}

function goHome() {
    history = [];
    currentIndex = -1;
    currentFolder = fileSystem;
    renderExplorer();
    updateBackButton();
    updateBreadcrumb();
}

function updateBackButton() {
    document.getElementById('backBtn').disabled = (currentIndex <= 0);
}

function updateBreadcrumb() {
    const breadcrumb = document.getElementById('breadcrumb');
    breadcrumb.innerHTML = '';
    history.forEach((folder, index) => {
        if (index > 0) {
            const sep = document.createElement('span');
            sep.className = 'separator';
            sep.textContent = '/';
            breadcrumb.appendChild(sep);
        }
        const crumb = document.createElement('span');
        crumb.className = 'crumb';
        if (index === currentIndex) crumb.classList.add('active');
        crumb.innerHTML = `<i class="fas fa-folder"></i> ${folder.name}`;
        crumb.onclick = () => {
            currentIndex = index;
            currentFolder = history[index];
            renderExplorer();
            updateBackButton();
            updateBreadcrumb();
        };
        breadcrumb.appendChild(crumb);
    });
    const pathEl = document.getElementById('currentPath');
    if (currentFolder === fileSystem) {
        pathEl.textContent = '📁 Racine';
    } else if (currentFolder.name) {
        pathEl.textContent = `📁 ${currentFolder.name}`;
    }
}

function renderExplorer() {
    const container = document.getElementById('explorerContent');
    const children = currentFolder.children || [];
    const projects = currentFolder.projects || [];

    if (projects && projects.length > 0 && (!children || children.length === 0)) {
        renderProjects(container, projects);
        return;
    }

    if (children.length === 0 && projects.length === 0) {
        container.innerHTML = `
            <div class="empty-folder">
                <i class="fas fa-folder-open"></i>
                <p>Ce dossier est vide</p>
            </div>
        `;
        return;
    }

    if (viewMode.current === 'grid') {
        renderGrid(container, children);
    } else {
        renderList(container, children);
    }
}

function renderProjects(container, projects) {
    let html = '<div class="folder-grid projects-grid">';
    projects.forEach(project => {
        let iconHtml = '';
        if (project.thumbnail) {
            iconHtml = `<img src="${project.thumbnail}" alt="${project.title}" class="project-thumbnail">`;
        } else {
            iconHtml = `<div class="folder-icon" style="color: #3b82f6; font-size: 4rem;">📄</div>`;
        }
        
        html += `
            <div class="folder-item project-item" onclick="openProjectFromName('${project.title}')">
                ${iconHtml}
                <div class="folder-name">${project.title}</div>
                <div class="folder-info">${project.tags.slice(0, 3).join(' • ')}</div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

function openProjectFromName(title) {
    const projects = currentFolder.projects || [];
    const found = projects.find(p => p.title === title);
    if (found) {
        openProject(found);
    }
}

function renderGrid(container, children) {
    let html = '<div class="folder-grid">';
    children.forEach(item => {
        const iconClass = item.name.includes('Réseaux') ? 'folder-yellow' :
                        item.name.includes('Systèmes') ? 'folder-blue' :
                        item.name.includes('Cybersécurité') ? 'folder-green' :
                        item.name.includes('Support') ? 'folder-red' :
                        item.name.includes('Stage') ? 'folder-orange' :
                        item.name.includes('Certifications') ? 'folder-cyan' :
                        item.name.includes('1ère') ? 'folder-purple' :
                        item.name.includes('2ème') ? 'folder-purple' : 'folder-yellow';
        const count = item.projects ? item.projects.length : item.children ? item.children.length : 0;
        html += `
            <div class="folder-item" onclick="openFolderFromName('${item.name}')">
                <div class="folder-icon ${iconClass}"><i class="fas fa-folder"></i></div>
                <div class="folder-name">${item.name}</div>
                <div class="folder-info">${count} élément(s)</div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

function renderList(container, children) {
    let html = '<div class="file-list">';
    children.forEach(item => {
        const count = item.projects ? item.projects.length : item.children ? item.children.length : 0;
        html += `
            <div class="file-item" onclick="openFolderFromName('${item.name}')">
                <div class="file-icon" style="color: #f59e0b;"><i class="fas fa-folder"></i></div>
                <div class="file-name">${item.name}</div>
                <div class="file-type">Dossier</div>
                <div class="file-size">${count} élément(s)</div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

function openFolderFromName(name) {
    const children = currentFolder.children || [];
    const found = children.find(c => c.name === name);
    if (found) {
        openFolder(found);
    }
}

function openFile(url, name) {
    if (!url || url === '#') {
        alert('Fichier non disponible');
        return;
    }
    const ext = url.split('.').pop().toLowerCase();
    if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext)) {
        window.open(url, '_blank');
    } else if (ext === 'pdf') {
        openPDF(url);
    } else {
        window.open(url, '_blank');
    }
}

function setView(view) {
    viewMode.current = view;
    document.getElementById('viewGrid').classList.toggle('active', view === 'grid');
    document.getElementById('viewList').classList.toggle('active', view === 'list');
    renderExplorer();
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

goHome();
observeFadeElements();

window.addEventListener('load', () => {
    observeFadeElements();
    if (window.scrollY > 100) {
        scrollButtons.classList.add('visible');
    }
});