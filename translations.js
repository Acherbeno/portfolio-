// ===== TRADUCTIONS =====
const translations = {
    fr: {
        "nav.home": "Accueil",
        "nav.about": "À propos",
        "nav.skills": "Compétences",
        "nav.contact": "Contact",
        "hero.badge": "BTS SIO SISR",
        "hero.title2": "Administrateur",
        "hero.desc": "Passionné par l'infrastructure IT, la virtualisation et la cybersécurité. Je transforme la complexité technique en solutions robustes.",
        "hero.btn.skills": "Voir mes compétences",
        "hero.btn.contact": "Me contacter",
        "hero.term.role": "│   Administrateur systèmes & réseaux",
        "hero.term.networks": "│   📁 Réseaux",
        "hero.term.systems": "│   📁 Systèmes",
        "hero.term.cyber": "│   📁 Cybersécurité",
        "hero.term.support": "│   📁 Support IT",
        "hero.term.stage": "│   📁 Stage",
        "hero.term.certifs": "│   📁 Certifications",
        "hero.term.sheet": "│   📁 Fiche",
        "about.title": "À propos",
        "about.p1": "Étudiant en",
        "about.p1b": ", je transforme mes connaissances en solutions concrètes dans les domaines des réseaux, des systèmes et de la cybersécurité.",
        "about.p2": "Depuis mon plus jeune âge, je suis fasciné par l'informatique et les nouvelles technologies. J'aime comprendre le fonctionnement des systèmes, explorer les réseaux et résoudre des problèmes techniques.",
        "about.stat.years": "Années d'études",
        "about.stat.projects": "Projets réalisés",
        "about.stat.skills": "Compétences maîtrisées",
        "about.stat.passion": "% de passion",
        "about.btn.cv": "Voir mon CV complet",
        "about.btn.report": "📄 Lire mon rapport de stage",
        "about.note": "Les documents s'ouvrent dans un aperçu intégré",
        "skills.title": "Mes compétences",
        "skills.btn.back": "Retour",
        "folder.networks": "🌐 Réseaux",
        "folder.systems": "🖥️ Systèmes",
        "folder.cyber": "🔐 Cybersécurité",
        "folder.support": "🛠️ Support IT",
        "folder.stage": "📁 Stage",
        "folder.certifs": "📁 Certifications",
        "folder.sheet": "📄 Fiche",
        "folder.year1": "📁 1ère année",
        "folder.year2": "📁 2ème année",
        "folder.info.1": "1 élément",
        "folder.info.2": "2 éléments",
        "folder.info.3": "3 éléments",
        "folder.info.2sub": "2 sous-dossiers",
        "project.hsrp.title": "Routage inter-VLAN HSRP",
        "project.hsrp.info": "HSRP • VLAN • Routage",
        "project.vlan.title": "Segmentation VLAN et ACL",
        "project.vlan.info": "VLAN • ACL • Sécurité",
        "project.nat.title": "NAT et PAT - Accès Internet",
        "project.nat.info": "NAT • PAT • Cisco",
        "project.winserver.title": "Infrastructure Windows Server",
        "project.winserver.info": "AD DS • DHCP • DNS",
        "project.debian.title": "Administration Linux Debian",
        "project.debian.info": "Linux • Debian • Apache",
        "project.firewall.title": "Sécurisation Pare-feu",
        "project.firewall.info": "Firewall • Iptables",
        "project.audit.title": "Audit de sécurité",
        "project.audit.info": "Audit • Vulnérabilité",
        "project.hardening.title": "Hardening Linux",
        "project.hardening.info": "Linux • Hardening",
        "project.win11.title": "Déploiement Windows 11",
        "project.win11.info": "Windows 11 • MDT",
        "project.maintenance.title": "Maintenance et Diagnostic",
        "project.maintenance.info": "Maintenance • Diagnostic",
        "project.stage1.title": "Stage 1ère année - Découverte",
        "project.stage1.info": "Migration • Rufus",
        "project.install.title": "Projet - Installation postes",
        "project.install.info": "Windows 11 • Installation",
        "project.stage2.title": "Stage 2ème année - Administration",
        "project.stage2.info": "Administration • Serveurs",
        "project.migration.title": "Projet - Migration serveur",
        "project.migration.info": "Migration • VMware",
        "project.backup.title": "Serveur de sauvegarde",
        "project.backup.info": "Sauvegarde • Veeam",
        "project.rgpd.title": "Certification L'ATELIER RGPD",
        "project.rgpd.info": "RGPD • Cybersécurité",
        "project.fiche.title": "Ma Fiche",
        "project.fiche.info": "PDF • Document",
        "project.hsrp.h2": "📄 Routage inter-VLAN HSRP",
        "project.hsrp.desc": "Mise en place d'un routage inter-VLAN avec HSRP (Hot Standby Router Protocol) pour assurer la redondance et la haute disponibilité du réseau.",
        "project.vlan.h2": "📄 Segmentation VLAN et ACL",
        "project.vlan.desc": "Conception d'une architecture VLAN sécurisée avec des ACL (Access Control Lists) pour contrôler les flux entre les différents services.",
        "project.nat.h2": "📄 NAT et PAT - Accès Internet",
        "project.nat.desc": "Configuration NAT (Network Address Translation) et PAT (Port Address Translation) pour permettre l'accès à Internet depuis un réseau privé.",
        "project.winserver.h2": "📄 Infrastructure Windows Server",
        "project.winserver.desc": "Déploiement complet d'un domaine Active Directory avec services DHCP, DNS et GPO pour une gestion centralisée des utilisateurs.",
        "project.debian.h2": "📄 Administration Linux Debian",
        "project.debian.desc": "Configuration d'un serveur Debian avec services web (Apache/Nginx), base de données (MySQL) et gestion des utilisateurs.",
        "project.firewall.h2": "📄 Sécurisation Pare-feu",
        "project.firewall.desc": "Mise en place de règles de pare-feu pour protéger le réseau contre les attaques extérieures et contrôler les flux entrants/sortants.",
        "project.audit.h2": "📄 Audit de sécurité",
        "project.audit.desc": "Réalisation d'un audit complet pour identifier les vulnérabilités et proposer des solutions de renforcement.",
        "project.hardening.h2": "📄 Hardening Linux",
        "project.hardening.desc": "Durcissement d'un serveur Linux : configuration sécurisée, suppression des services inutiles, gestion des accès.",
        "project.win11.h2": "📄 Déploiement Windows 11",
        "project.win11.desc": "Déploiement automatisé de postes Windows 11 avec configuration des mises à jour, sécurisation et optimisation.",
        "project.maintenance.h2": "📄 Maintenance et Diagnostic",
        "project.maintenance.desc": "Procédures de maintenance préventive et curative, diagnostic matériel et logiciel, résolution de problèmes.",
        "project.stage1.h2": "📄 Stage 1ère année - Découverte",
        "project.stage1.desc": "Migration de postes de travail de Windows 10 vers Windows 11 dans le cadre de mes études. Utilisation de Rufus pour créer une clé USB bootable, installation et configuration des postes pour les besoins pédagogiques du BTS SIO. Optimisation des performances et sécurisation des systèmes.",
        "project.install.h2": "📄 Projet - Installation postes de travail",
        "project.install.desc": "Installation et configuration de postes de travail dans le cadre des travaux pratiques du BTS SIO.",
        "project.stage2.h2": "📄 Stage 2ème année - Administration",
        "project.stage2.desc": "Stage en administration systèmes et réseaux. Gestion des serveurs, déploiement d'infrastructures et mise en place de solutions de sauvegarde.",
        "project.migration.h2": "📄 Projet - Migration serveur",
        "project.migration.desc": "Migration d'un serveur physique vers une infrastructure virtualisée avec VMware ESXi. Planification, exécution et validation.",
        "project.backup.h2": "📄 Mise en place d'un serveur de sauvegarde",
        "project.backup.desc": "Déploiement et configuration d'un serveur de sauvegarde avec Veeam Backup & Replication pour assurer la continuité d'activité.",
        "project.rgpd.h2": "📄 Certification L'ATELIER RGPD",
        "project.rgpd.desc": "Obtention de la certification L'ATELIER RGPD. Cette formation m'a permis d'acquérir les compétences nécessaires pour comprendre et appliquer le Règlement Général sur la Protection des Données (RGPD) au sein d'une organisation. J'ai appris à identifier les données personnelles, à mettre en place des mesures de sécurité adéquates, à gérer les consentements et à assurer la conformité des traitements de données.",
        "project.fiche.h2": "📄 Ma Fiche",
        "project.fiche.desc": "Fiche PDF à consulter directement dans l'aperçu intégré.",
        "project.section.proof": "Preuve / Capture d'écran",
        "project.section.proof2": "Preuve / Certificat",
        "project.section.docs": "Documents & fichiers",
        "project.section.doc": "Document",
        "project.hsrp.file1": "Configuration HSRP",
        "project.hsrp.file2": "Topologie complète",
        "project.vlan.file1": "Configuration VLAN",
        "project.vlan.file2": "Règles ACL",
        "project.nat.file1": "Configuration NAT",
        "project.nat.file2": "Fichier Packet Tracer",
        "project.winserver.file1": "Guide d'installation",
        "project.winserver.file2": "Configuration AD DS",
        "project.debian.file1": "Configuration Debian",
        "project.firewall.file1": "Règles Firewall",
        "project.audit.file1": "Rapport d'audit",
        "project.hardening.file1": "Script de durcissement",
        "project.win11.file1": "Guide de déploiement",
        "project.maintenance.file1": "Script de maintenance",
        "project.stage1.file1": "Rapport de stage 1ère année",
        "project.stage1.file2": "Rapport de stage",
        "project.stage1.file3": "Présentation soutenance",
        "project.stage1.file4": "Installation Windows 11",
        "project.install.file1": "Procédure d'installation",
        "project.install.file2": "Checklist déploiement",
        "project.stage2.file1": "Rapport de stage 2ème année",
        "project.stage2.file2": "Présentation soutenance",
        "project.migration.file1": "Plan de migration",
        "project.migration.file2": "Documentation technique",
        "project.backup.file1": "Configuration Veeam",
        "project.backup.file2": "Plan de reprise d'activité",
        "project.rgpd.file1": "Certificat L'ATELIER RGPD",
        "project.fiche.file1": "Ouvrir la fiche PDF",
        "contact.title": "Discutons de votre <br>infrastructure",
        "contact.desc": "Pour toute prise de contact, utilisez le formulaire ou contactez-moi directement.",
        "contact.form.name": "Votre nom *",
        "contact.form.email": "Votre email *",
        "contact.form.message": "Votre message (demande, collaboration...) *",
        "contact.form.send": "Envoyer le message",
        "footer.text": "© 2025 Acher - Portfolio SISR | Administrateur systèmes & réseaux en devenir <i class=\"fas fa-network-wired\"></i>",
        "tooltip.top": "Haut",
        "tooltip.bottom": "Bas",
        "pdf.error.title": "Document non disponible",
        "pdf.error.desc": "Le fichier PDF n'a pas encore été ajouté. Vérifie que le fichier existe bien dans le dossier image/"
    },
    en: {
        "nav.home": "Home",
        "nav.about": "About",
        "nav.skills": "Skills",
        "nav.contact": "Contact",
        "hero.badge": "BTS SIO SISR",
        "hero.title2": "Administrator",
        "hero.desc": "Passionate about IT infrastructure, virtualization and cybersecurity. I turn technical complexity into robust solutions.",
        "hero.btn.skills": "View my skills",
        "hero.btn.contact": "Contact me",
        "hero.term.role": "│   Systems & Network Administrator",
        "hero.term.networks": "│   📁 Networks",
        "hero.term.systems": "│   📁 Systems",
        "hero.term.cyber": "│   📁 Cybersecurity",
        "hero.term.support": "│   📁 IT Support",
        "hero.term.stage": "│   📁 Internship",
        "hero.term.certifs": "│   📁 Certifications",
        "hero.term.sheet": "│   📁 Sheet",
        "about.title": "About me",
        "about.p1": "Student in",
        "about.p1b": ", I turn my knowledge into concrete solutions in networking, systems and cybersecurity.",
        "about.p2": "Since I was young, I've been fascinated by IT and new technologies. I love understanding how systems work, exploring networks and solving technical problems.",
        "about.stat.years": "Years of study",
        "about.stat.projects": "Projects completed",
        "about.stat.skills": "Skills mastered",
        "about.stat.passion": "% passion",
        "about.btn.cv": "View my full CV",
        "about.btn.report": "📄 Read my internship report",
        "about.note": "Documents open in an integrated preview",
        "skills.title": "My skills",
        "skills.btn.back": "Back",
        "folder.networks": "🌐 Networks",
        "folder.systems": "🖥️ Systems",
        "folder.cyber": "🔐 Cybersecurity",
        "folder.support": "🛠️ IT Support",
        "folder.stage": "📁 Internship",
        "folder.certifs": "📁 Certifications",
        "folder.sheet": "📄 Sheet",
        "folder.year1": "📁 Year 1",
        "folder.year2": "📁 Year 2",
        "folder.info.1": "1 item",
        "folder.info.2": "2 items",
        "folder.info.3": "3 items",
        "folder.info.2sub": "2 subfolders",
        "project.hsrp.title": "Inter-VLAN Routing HSRP",
        "project.hsrp.info": "HSRP • VLAN • Routing",
        "project.vlan.title": "VLAN Segmentation and ACL",
        "project.vlan.info": "VLAN • ACL • Security",
        "project.nat.title": "NAT and PAT - Internet Access",
        "project.nat.info": "NAT • PAT • Cisco",
        "project.winserver.title": "Windows Server Infrastructure",
        "project.winserver.info": "AD DS • DHCP • DNS",
        "project.debian.title": "Linux Debian Administration",
        "project.debian.info": "Linux • Debian • Apache",
        "project.firewall.title": "Firewall Security",
        "project.firewall.info": "Firewall • Iptables",
        "project.audit.title": "Security Audit",
        "project.audit.info": "Audit • Vulnerability",
        "project.hardening.title": "Linux Hardening",
        "project.hardening.info": "Linux • Hardening",
        "project.win11.title": "Windows 11 Deployment",
        "project.win11.info": "Windows 11 • MDT",
        "project.maintenance.title": "Maintenance and Diagnostics",
        "project.maintenance.info": "Maintenance • Diagnostics",
        "project.stage1.title": "Year 1 Internship - Discovery",
        "project.stage1.info": "Migration • Rufus",
        "project.install.title": "Project - Workstation Installation",
        "project.install.info": "Windows 11 • Installation",
        "project.stage2.title": "Year 2 Internship - Administration",
        "project.stage2.info": "Administration • Servers",
        "project.migration.title": "Project - Server Migration",
        "project.migration.info": "Migration • VMware",
        "project.backup.title": "Backup Server",
        "project.backup.info": "Backup • Veeam",
        "project.rgpd.title": "L'ATELIER RGPD Certification",
        "project.rgpd.info": "GDPR • Cybersecurity",
        "project.fiche.title": "My Sheet",
        "project.fiche.info": "PDF • Document",
        "project.hsrp.h2": "📄 Inter-VLAN Routing HSRP",
        "project.hsrp.desc": "Setting up inter-VLAN routing with HSRP (Hot Standby Router Protocol) to ensure network redundancy and high availability.",
        "project.vlan.h2": "📄 VLAN Segmentation and ACL",
        "project.vlan.desc": "Designing a secure VLAN architecture with ACL (Access Control Lists) to control traffic between different services.",
        "project.nat.h2": "📄 NAT and PAT - Internet Access",
        "project.nat.desc": "Configuring NAT (Network Address Translation) and PAT (Port Address Translation) to allow Internet access from a private network.",
        "project.winserver.h2": "📄 Windows Server Infrastructure",
        "project.winserver.desc": "Full deployment of an Active Directory domain with DHCP, DNS and GPO services for centralized user management.",
        "project.debian.h2": "📄 Linux Debian Administration",
        "project.debian.desc": "Configuring a Debian server with web services (Apache/Nginx), database (MySQL) and user management.",
        "project.firewall.h2": "📄 Firewall Security",
        "project.firewall.desc": "Setting up firewall rules to protect the network against external attacks and control incoming/outgoing traffic.",
        "project.audit.h2": "📄 Security Audit",
        "project.audit.desc": "Conducting a full audit to identify vulnerabilities and propose hardening solutions.",
        "project.hardening.h2": "📄 Linux Hardening",
        "project.hardening.desc": "Hardening a Linux server: secure configuration, removal of unnecessary services, access management.",
        "project.win11.h2": "📄 Windows 11 Deployment",
        "project.win11.desc": "Automated deployment of Windows 11 workstations with updates, security and optimization configuration.",
        "project.maintenance.h2": "📄 Maintenance and Diagnostics",
        "project.maintenance.desc": "Preventive and corrective maintenance procedures, hardware and software diagnostics, troubleshooting.",
        "project.stage1.h2": "📄 Year 1 Internship - Discovery",
        "project.stage1.desc": "Migrating workstations from Windows 10 to Windows 11 as part of my studies. Using Rufus to create a bootable USB drive, installing and configuring workstations for the educational needs of the BTS SIO. Performance optimization and system security.",
        "project.install.h2": "📄 Project - Workstation Installation",
        "project.install.desc": "Installation and configuration of workstations as part of the BTS SIO practical work.",
        "project.stage2.h2": "📄 Year 2 Internship - Administration",
        "project.stage2.desc": "Internship in systems and network administration. Server management, infrastructure deployment and backup solution implementation.",
        "project.migration.h2": "📄 Project - Server Migration",
        "project.migration.desc": "Migrating a physical server to a virtualized infrastructure with VMware ESXi. Planning, execution and validation.",
        "project.backup.h2": "📄 Backup Server Setup",
        "project.backup.desc": "Deploying and configuring a backup server with Veeam Backup & Replication to ensure business continuity.",
        "project.rgpd.h2": "📄 L'ATELIER RGPD Certification",
        "project.rgpd.desc": "Obtaining the L'ATELIER RGPD certification. This training allowed me to acquire the skills needed to understand and apply the General Data Protection Regulation (GDPR) within an organization. I learned to identify personal data, implement adequate security measures, manage consents and ensure compliance of data processing.",
        "project.fiche.h2": "📄 My Sheet",
        "project.fiche.desc": "PDF sheet to view directly in the integrated preview.",
        "project.section.proof": "Proof / Screenshot",
        "project.section.proof2": "Proof / Certificate",
        "project.section.docs": "Documents & files",
        "project.section.doc": "Document",
        "project.hsrp.file1": "HSRP Configuration",
        "project.hsrp.file2": "Full Topology",
        "project.vlan.file1": "VLAN Configuration",
        "project.vlan.file2": "ACL Rules",
        "project.nat.file1": "NAT Configuration",
        "project.nat.file2": "Packet Tracer File",
        "project.winserver.file1": "Installation Guide",
        "project.winserver.file2": "AD DS Configuration",
        "project.debian.file1": "Debian Configuration",
        "project.firewall.file1": "Firewall Rules",
        "project.audit.file1": "Audit Report",
        "project.hardening.file1": "Hardening Script",
        "project.win11.file1": "Deployment Guide",
        "project.maintenance.file1": "Maintenance Script",
        "project.stage1.file1": "Year 1 Internship Report",
        "project.stage1.file2": "Internship Report",
        "project.stage1.file3": "Defense Presentation",
        "project.stage1.file4": "Windows 11 Installation",
        "project.install.file1": "Installation Procedure",
        "project.install.file2": "Deployment Checklist",
        "project.stage2.file1": "Year 2 Internship Report",
        "project.stage2.file2": "Defense Presentation",
        "project.migration.file1": "Migration Plan",
        "project.migration.file2": "Technical Documentation",
        "project.backup.file1": "Veeam Configuration",
        "project.backup.file2": "Business Continuity Plan",
        "project.rgpd.file1": "L'ATELIER RGPD Certificate",
        "project.fiche.file1": "Open PDF Sheet",
        "contact.title": "Let's discuss your <br>infrastructure",
        "contact.desc": "To get in touch, use the form or contact me directly.",
        "contact.form.name": "Your name *",
        "contact.form.email": "Your email *",
        "contact.form.message": "Your message (request, collaboration...) *",
        "contact.form.send": "Send message",
        "footer.text": "© 2025 Acher - SISR Portfolio | Future Systems & Network Administrator <i class=\"fas fa-network-wired\"></i>",
        "tooltip.top": "Top",
        "tooltip.bottom": "Bottom",
        "pdf.error.title": "Document not available",
        "pdf.error.desc": "The PDF file has not been added yet. Check that the file exists in the image/ folder."
    }
};

// ===== LANGUE ACTIVE =====
let currentLang = localStorage.getItem('lang') || 'fr';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.setAttribute('placeholder', translations[lang][key]);
        }
    });

    const langLabel = document.getElementById('currentLangLabel');
    if (langLabel) langLabel.textContent = lang.toUpperCase();

    if (typeof updateBreadcrumbFromView === 'function' && typeof currentView !== 'undefined') {
        updateBreadcrumbFromView(currentView);
        updatePathFromView(currentView);
    }

    window.dispatchEvent(new Event('languageChanged'));
}

// ===== INIT LANGUE (avec protection anti-double) =====
let langInitialized = false;

function initLanguage() {
    if (langInitialized) {
        console.log('⚠️ initLanguage déjà appelée, on skip');
        return;
    }
    langInitialized = true;

    setLanguage(currentLang);

    const langBtn = document.getElementById('langBtn');
    const langMenu = document.getElementById('langMenu');

    if (!langBtn || !langMenu) {
        console.warn('⚠️ Sélecteur de langue introuvable');
        return;
    }

    // Toggle ouverture/fermeture
    langBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const isOpen = langMenu.classList.toggle('active');
        console.log('🌐 Menu langue :', isOpen ? 'ouvert' : 'fermé');
    });

    // Choix de langue
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', function(e) {
            e.stopPropagation();
            const lang = this.getAttribute('data-lang');
            console.log('🌐 Changement de langue vers :', lang);
            setLanguage(lang);
            langMenu.classList.remove('active');
        });
    });

    // Fermer si clic ailleurs
    document.addEventListener('click', function(e) {
        if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
            langMenu.classList.remove('active');
        }
    });
}

// ===== LANCEMENT AUTO =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
} else {
    initLanguage();
}