document.addEventListener('DOMContentLoaded', () => {

    // ── 1. Pricing Tabs ──────────────────────────────────────────
    const tabBtns         = document.querySelectorAll('.tab-btn');
    const pricingContents = document.querySelectorAll('.pricing-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
            pricingContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const targetId = btn.getAttribute('data-target');
            const targetEl = targetId ? document.getElementById(targetId) : null;
            if (targetEl) targetEl.classList.add('active');
        });
    });


    // ── 2. Navbar Scroll Effect ───────────────────────────────────
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }


    // ── 3. Mobile Menu Toggle ─────────────────────────────────────
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks     = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', String(isOpen));
            // Swap icon
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars',  !isOpen);
                icon.classList.toggle('fa-times',  isOpen);
            }
        });

        // Close menu when any nav link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileToggle.querySelector('i');
                if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-times'); }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileToggle.querySelector('i');
                if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-times'); }
            }
        });
    }


    // ── 4. Smooth Scrolling for Anchor Links ─────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            let target = null;
            try { target = document.querySelector(href); } catch { return; }
            if (target) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });


    // ── 5. Skill Bar Animation (IntersectionObserver) ─────────────
    const skillBars = document.querySelectorAll('.skill-bar .bar span[data-width]');

    if ('IntersectionObserver' in window && skillBars.length) {
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const span = entry.target;
                    const targetWidth = span.getAttribute('data-width') || '0';
                    // Small delay for staggered feel
                    setTimeout(() => {
                        span.style.width = targetWidth + '%';
                    }, 100);
                    barObserver.unobserve(span);
                }
            });
        }, { threshold: 0.3 });

        skillBars.forEach(span => barObserver.observe(span));
    } else {
        // Fallback – show bars immediately
        skillBars.forEach(span => {
            span.style.width = (span.getAttribute('data-width') || '0') + '%';
        });
    }


    // ── 6. Section Entrance Animations ───────────────────────────
    const sections = document.querySelectorAll('.section');

    sections.forEach(sec => {
        sec.style.transition = 'opacity 0.65s ease-out, transform 0.65s ease-out';
    });

    if (!('IntersectionObserver' in window)) {
        sections.forEach(sec => { sec.style.opacity = '1'; sec.style.transform = 'none'; });
        return;
    }

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity  = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    sections.forEach(sec => {
        sec.style.opacity  = '0';
        sec.style.transform = 'translateY(28px)';
        sectionObserver.observe(sec);
    });

});
