/* ========================================
   MR HIEP DANG CK — PORTFOLIO
   Interactive Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initCountUp();
    initScrollToTop();
    initSmoothScroll();
    initVideoModal();
});

/* ---------- NAVBAR SCROLL EFFECT ---------- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const scrollIndicator = document.getElementById('scrollIndicator');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide scroll indicator
        if (scrollIndicator && currentScroll > 200) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else if (scrollIndicator) {
            scrollIndicator.style.opacity = '0.6';
            scrollIndicator.style.pointerEvents = 'auto';
        }

        lastScroll = currentScroll;
    });
}

/* ---------- MOBILE MENU ---------- */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function openMenu() {
        toggle.classList.add('active');
        navLinks.classList.add('open');
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener('click', closeMenu);

    // Close menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/* ---------- SCROLL ANIMATIONS ---------- */
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* ---------- COUNT UP ANIMATION ---------- */
function initCountUp() {
    const numbers = document.querySelectorAll('.stat-number[data-count]');

    if (!numbers.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    numbers.forEach(el => observer.observe(el));
}

function animateCount(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out cubic)
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(startValue + (target - startValue) * eased);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* ---------- SCROLL TO TOP ---------- */
function initScrollToTop() {
    const btn = document.getElementById('scrollTopBtn');

    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ---------- SMOOTH SCROLL ---------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ---------- FLOW STEP INTERACTION ---------- */
document.querySelectorAll('.flow-step').forEach((step, index) => {
    step.addEventListener('mouseenter', () => {
        // Highlight corresponding method card
        const cards = document.querySelectorAll('.method-card');
        if (cards[index]) {
            cards[index].style.borderColor = 'var(--color-accent)';
            cards[index].style.boxShadow = 'var(--shadow-lg)';
        }
    });

    step.addEventListener('mouseleave', () => {
        const cards = document.querySelectorAll('.method-card');
        if (cards[index]) {
            cards[index].style.borderColor = '';
            cards[index].style.boxShadow = '';
        }
    });
});

/* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-link-cta)');

    window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

initActiveNav();

/* ---------- VIDEO MODAL ---------- */
function initVideoModal() {
    const modal = document.getElementById('videoModal');
    const backdrop = document.getElementById('videoModalBackdrop');
    const closeBtn = document.getElementById('videoModalClose');
    const content = document.getElementById('videoModalContent');
    const triggers = document.querySelectorAll('.js-video-trigger');

    if (!modal || !triggers.length) return;

    function openModal(videoId) {
        // Vô hiệu hoá scroll trên trang hiển thị modal
        document.body.style.overflow = 'hidden';
        
        // Nhúng iframe vào container với ID video
        content.innerHTML = `<iframe src="https://www.tiktok.com/embed/v2/${videoId}" style="width: 100%; height: 100%; border: none; border-radius: var(--radius-lg); background: #000;" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
        modal.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Đợi CSS transition chạy xong mới xoá nội dung container (tránh tắt tiếng ngay lập tức giật cục)
        setTimeout(() => {
            content.innerHTML = '';
        }, 300);
    }

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const videoId = trigger.getAttribute('data-video-id');
            if (videoId) openModal(videoId);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
}
