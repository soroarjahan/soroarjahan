document.addEventListener('DOMContentLoaded', () => {

    // 1. Services Accordion Logic
    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach(item => {
        item.addEventListener('click', () => {
            serviceItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });


    // 2. Pricing Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const pricingContents = document.querySelectorAll('.pricing-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked button
            btn.classList.add('active');

            // Hide all content
            pricingContents.forEach(content => content.classList.remove('active'));

            // Show target content (guard against missing/invalid target)
            const targetId = btn.getAttribute('data-target');
            if (!targetId) return;

            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.classList.add('active');
            }
        });
    });


    // 3. Navbar Scroll Effect (guard against missing navbar)
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }


    // 4. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }


    // 5. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Allow normal behavior if href is missing
            if (!href) return;

            // Prevent default only when we can handle the scroll target safely
            e.preventDefault();

            // Handle "back to top" links like href="#"
            if (href === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            let target = null;
            try {
                target = document.querySelector(href);
            } catch {
                // Invalid selector; do nothing to avoid runtime error
                return;
            }

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // 6. Entrance Animations with IntersectionObserver (FIXED)
    const sections = document.querySelectorAll('.section');

    // Set transition property on all sections first
    sections.forEach(section => {
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers: show sections immediately
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
        return;
    }

    // Modern browsers: use IntersectionObserver
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Set initial hidden state and observe
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        observer.observe(section);
    });
});