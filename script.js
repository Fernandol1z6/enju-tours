document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    // Funcionalidade do Menu Hamburger
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Fechar o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });

    /* Lightbox / Gallery modal */
    const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const btnClose = document.querySelector('.lightbox-close');
    const btnPrev = document.querySelector('.lightbox-prev');
    const btnNext = document.querySelector('.lightbox-next');

    let currentIndex = -1;

    function openLightbox(index) {
        const img = galleryImages[index];
        if (!img) return;
        currentIndex = index;
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt || '';
        lightboxCaption.textContent = img.alt || '';
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImage.src = '';
        document.body.style.overflow = '';
        currentIndex = -1;
    }

    function showPrev() {
        if (currentIndex > 0) openLightbox(currentIndex - 1);
    }

    function showNext() {
        if (currentIndex < galleryImages.length - 1) openLightbox(currentIndex + 1);
    }

    galleryImages.forEach((img, idx) => {
        img.addEventListener('click', () => openLightbox(idx));
    });

    btnClose.addEventListener('click', closeLightbox);
    btnPrev.addEventListener('click', showPrev);
    btnNext.addEventListener('click', showNext);

    // Fechar ao clicar no overlay (fora do conteúdo)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.getAttribute('aria-hidden') === 'false') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        }
    });
});

/* ==========================================================
       NOVO: Inicialização do Swiper (Carrossel Mobile)
       ========================================================== */

// Carrossel da Galeria de Fotos
new Swiper('.gallery-slider', {
    loop: true,
    spaceBetween: 10,
    pagination: {
        el: '.gallery-pagination',
        clickable: true,
    },
    slidesPerView: 1.5, // 1 slide principal e parte do próximo
    centeredSlides: true,
    breakpoints: {
        // Quando a largura da tela for >= 769px, o Swiper é desativado
        769: {
            enabled: false,
            slidesPerView: 'auto',
            spaceBetween: 0,
        }
    }
});

// Carrossel dos Pacotes Populares
new Swiper('.packages-slider', {
loop: true,
spaceBetween: 20,
pagination: {
    el: '.packages-pagination',
    clickable: true,
},
slidesPerView: 1.1, // Apenas 1 pacote por vez
breakpoints: {
    // Quando a largura da tela for >= 769px, o Swiper é desativado
    769: {
        enabled: false,
        slidesPerView: 'auto',
        spaceBetween: 0,
    }
}
});
});