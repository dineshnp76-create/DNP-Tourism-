document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
   
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('nav-scrolled');
                navbar.classList.remove('py-6');
                navbar.classList.add('py-3');
            } else {
                navbar.classList.remove('nav-scrolled');
                navbar.classList.add('py-6');
                navbar.classList.remove('py-3');
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // current year in footer
    const yearSpan = document.getElementById('current-year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
