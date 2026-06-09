// ==================== CACHE BUSTER FOR PROFILE IMAGE ==================== //
const cacheProfile = () => {
    const profileImg = document.getElementById('profileimg');
    if (profileImg) {
        const currentSrc = profileImg.src;
        // Tambahkan timestamp untuk bypass cache browser
        profileImg.src = currentSrc + '?t=' + new Date().getTime();
    }
};

// ==================== SMOOTH SCROLL ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== NAVBAR ACTIVE LINK ==================== //
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#00d4ff';
            link.style.borderBottom = '2px solid #00d4ff';
        } else {
            link.style.color = 'var(--text-light)';
            link.style.borderBottom = 'none';
        }
    });
});

// ==================== SCROLL REVEAL ANIMATION ==================== //
const revealElements = document.querySelectorAll('.about-card, .skill-item');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight * 0.85 && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        }
    });
};

// Set initial state
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px) scale(0.95)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ==================== PARALLAX EFFECT ==================== //
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
    
    // Parallax untuk elemen lain
    const profilePhoto = document.querySelector('.profile-photo img');
    if (profilePhoto && scrollPosition < 1000) {
        profilePhoto.style.transform = `translateY(${scrollPosition * 0.3}px) scale(${1 - scrollPosition * 0.0001})`;
    }
});

// ==================== MOUSE FOLLOW EFFECT ==================== //
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroRect = hero.getBoundingClientRect();
        if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
            const x = (mouseX / window.innerWidth - 0.5) * 30;
            const y = (mouseY / window.innerHeight - 0.5) * 30;
            hero.style.backgroundPosition = `calc(center + ${x}px) calc(center + ${y}px)`;
        }
    }
});

// ==================== MOBILE MENU TOGGLE ==================== //
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navLink = document.querySelector('.nav-link');
    const container = navbar.querySelector('.container');
    
    if (document.querySelector('.hamburger')) return;
    
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    hamburger.addEventListener('click', () => {
        navLink.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Close menu when link is clicked
        document.querySelectorAll('.nav-link a').forEach(link => {
            link.addEventListener('click', () => {
                navLink.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    });
    
    container.appendChild(hamburger);
};

// ==================== SCROLL TO TOP BUTTON ==================== //
const createScrollToTopBtn = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #00d4ff 0%, #ff006e 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 20px rgba(0, 212, 255, 0.3);
        font-weight: bold;
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
            scrollBtn.style.animation = 'slideUp 0.3s ease';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseover', () => {
        scrollBtn.style.transform = 'scale(1.15) rotate(10deg)';
        scrollBtn.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.5)';
    });
    
    scrollBtn.addEventListener('mouseout', () => {
        scrollBtn.style.transform = 'scale(1)';
        scrollBtn.style.boxShadow = '0 5px 20px rgba(0, 212, 255, 0.3)';
    });
};

// ==================== TYPEWRITER EFFECT ==================== //
const typewriterEffect = () => {
    const bio = document.querySelector('.bio');
    if (!bio) return;
    
    const text = bio.textContent;
    const originalText = text;
    bio.textContent = '';
    let index = 0;
    
    const type = () => {
        if (index < text.length) {
            if (text.charAt(index) === ' ') {
                bio.textContent += '&nbsp;';
            } else {
                bio.textContent += text.charAt(index);
            }
            index++;
            setTimeout(type, 50);
        } else {
            // Restore original HTML after typing
            bio.textContent = originalText;
        }
    };
    
    setTimeout(type, 800);
};

// ==================== PARTICLES EFFECT ==================== //
const createParticles = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleCount = 80;
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    hero.appendChild(particlesContainer);
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4;
        const duration = 5 + Math.random() * 10;
        const delay = Math.random() * 2;
        const opacity = Math.random() * 0.6 + 0.2;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(0, 212, 255, ${opacity}), rgba(255, 0, 110, ${opacity * 0.5}));
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            filter: blur(0.5px);
            animation: float-particle ${duration}s linear infinite;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size * 2}px rgba(0, 212, 255, ${opacity});
        `;
        
        particlesContainer.appendChild(particle);
    }
};

// ==================== NOTIFICATION ==================== //
const showNotification = (message, type = 'success', duration = 3000) => {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? '#00d4ff' : '#ff006e';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 28px;
        background: linear-gradient(135deg, ${bgColor}, ${type === 'success' ? '#00b8cc' : '#e600ff'});
        color: white;
        border-radius: 12px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        font-weight: 600;
        border-left: 4px solid white;
        backdrop-filter: blur(10px);
    `;
    notification.innerHTML = `<span style="font-size: 1.2rem; margin-right: 10px;">${type === 'success' ? '✓' : '⚠'}</span>${message}`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
};

// ==================== INTERSECTION OBSERVER ==================== //
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.about-card, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px) scale(0.95)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// ==================== RIPPLE EFFECT ON BUTTONS ==================== //
const addRippleEffect = () => {
    const buttons = document.querySelectorAll('.cta-btn, .contact-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
};

// ==================== CURSOR EFFECT ==================== //
const createCustomCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #00d4ff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        display: none;
        mix-blend-mode: screen;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorDot.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: #ff006e;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10001;
        display: none;
        mix-blend-mode: screen;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursorDot);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
    });
    
    // Change cursor on hover elements
    const interactiveElements = document.querySelectorAll('a, button, .cta-btn, .contact-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.borderColor = '#ff006e';
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursorDot.style.background = '#00d4ff';
            cursorDot.style.width = '12px';
            cursorDot.style.height = '12px';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.borderColor = '#00d4ff';
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursorDot.style.background = '#ff006e';
            cursorDot.style.width = '8px';
            cursorDot.style.height = '8px';
        });
    });
};

// ==================== BACKGROUND ANIMATION ==================== //
const createBackgroundAnimation = () => {
    const bgElements = document.querySelectorAll('.hero::before, .hero::after');
    const hero = document.querySelector('.hero');
    
    if (hero) {
        let angle = 0;
        setInterval(() => {
            angle += 0.5;
            hero.style.backgroundImage = `
                radial-gradient(circle at ${Math.sin(angle * Math.PI / 180) * 50 + 50}% ${Math.cos(angle * Math.PI / 180) * 50 + 50}%, 
                rgba(0, 212, 255, 0.1) 0%, transparent 70%)
            `;
        }, 30);
    }
};

// ==================== SKILL PROGRESS ANIMATION ==================== //
const animateSkillCards = () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
};

// ==================== INIT FUNCTIONS ==================== //
document.addEventListener('DOMContentLoaded', () => {
    // Cache buster for profile image
    cacheProfile();
    
    // Create animations and effects
    typewriterEffect();
    createScrollToTopBtn();
    createMobileMenu();
    createParticles();
    addRippleEffect();
    createCustomCursor();
    animateSkillCards();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(100px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.7);
            }
            50% {
                box-shadow: 0 0 0 10px rgba(0, 212, 255, 0);
            }
        }
        
        .hamburger {
            display: none;
            flex-direction: column;
            cursor: pointer;
            gap: 5px;
        }
        
        .hamburger span {
            width: 25px;
            height: 3px;
            background: linear-gradient(90deg, #00d4ff, #ff006e);
            border-radius: 3px;
            transition: all 0.3s ease;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(10px, 10px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
        
        .nav-link.active {
            display: flex !important;
        }
        
        @media (max-width: 768px) {
            .hamburger {
                display: flex;
            }
            
            .nav-link {
                position: absolute;
                top: 70px;
                left: 0;
                right: 0;
                background: rgba(10, 14, 39, 0.98);
                backdrop-filter: blur(10px);
                flex-direction: column;
                gap: 1rem;
                padding: 2rem;
                display: none;
                border-bottom: 1px solid rgba(0, 212, 255, 0.2);
                animation: slideDown 0.3s ease;
            }
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('✨ Portofolio Khoirul Anam berhasil dimuat!');
    console.log('🎨 Fitur animasi dan efek visual siap!');
    console.log('📸 Cache buster untuk foto profile aktif!');
});

// ==================== CONTACT BUTTON CLICK ==================== //
document.querySelectorAll('.contact-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const platform = this.getAttribute('class').split(' ')[1] || 'contact';
        const platformNames = {
            'whatsapp': 'WhatsApp 💬',
            'instagram': 'Instagram 📸',
            'tiktok': 'TikTok 🎵',
        };
        
        showNotification(`Membuka ${platformNames[platform] || platform}...`, 'success', 2000);
        console.log(`📱 Terhubung via ${platform}`);
    });
});

// ==================== PERFORMANCE MONITORING ==================== //
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`⚡ Halaman dimuat dalam ${pageLoadTime}ms`);
    
    // Show notification
    showNotification('Selamat datang di portofolio Khoirul Anam! 🚀', 'success', 2500);
});

// ==================== SMOOTH PAGE EXIT ==================== //
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0.7';
    document.body.style.transition = 'opacity 0.3s ease';
});

// ==================== KEYBOARD SHORTCUTS ==================== //
document.addEventListener('keydown', (e) => {
    // Press 'H' untuk scroll ke home
    if (e.key.toLowerCase() === 'h') {
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'S' untuk scroll ke skills
    if (e.key.toLowerCase() === 's') {
        document.querySelector('#skills').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'C' untuk scroll ke contact
    if (e.key.toLowerCase() === 'c') {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
});
