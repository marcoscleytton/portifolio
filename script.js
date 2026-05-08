// Script de Animação e Interatividade Cyberpunk

document.addEventListener("DOMContentLoaded", () => {

    // Animação de Scroll Reveal
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        let windowHeight = window.innerHeight;
        let elementVisible = 150;

        reveals.forEach((reveal) => {
            let elementTop = reveal.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            } else {
                // Remove esta linha se não quiser que as animações repitam ao rolar para cima
                // reveal.classList.remove("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Gatilho inicial

    // Navbar com blur dinâmico
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(3, 3, 5, 0.9)";
            navbar.style.boxShadow = "0 2px 20px rgba(0, 240, 255, 0.1)";
        } else {
            navbar.style.background = "rgba(3, 3, 5, 0.7)";
            navbar.style.boxShadow = "none";
        }
    });
    /* ---- Mobile Menu Logic ---- */
    const mobileMenu = document.getElementById('mobileMenu');
    const openBtn = document.querySelector('.mobile-menu-icon');
    const closeBtn = document.getElementById('closeMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileMenu && openBtn && closeBtn) {
        function toggleMobileMenu(show) {
            if (show) {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        openBtn.addEventListener('click', () => toggleMobileMenu(true));
        closeBtn.addEventListener('click', () => toggleMobileMenu(false));

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => toggleMobileMenu(false));
        });
    }

    // Console Log Hack style
    console.log("%c SYSTEM INITIATED ", "background: #00f0ff; color: #000; font-weight: bold; padding: 4px;");
    console.log("%c PORTFOLIO CYBERPUNK CONNECTED", "color: #00f0ff; font-weight: bold;");
});
