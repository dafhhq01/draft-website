// AOS Init
AOS.init({
    duration: 1000,
    once: true
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar Hamburger
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuLinks = mobileMenu.querySelectorAll('a');

let menuOpen = false;

hamburger.addEventListener('click', () => {
    if (!menuOpen) {
        mobileMenu.classList.add('active');
        hamburger.classList.add('open');
        menuOpen = true;
    } else {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('open');
        menuOpen = false;
    }
});

// Tutup saat menu diklik
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('open');
        menuOpen = false;
    });
});

// === Navbar Shrink on Scroll (Optimized with requestAnimationFrame) ===
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;
let ticking = false;

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('shrink');
    } else {
        navbar.classList.remove('shrink');
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleNavbarScroll);
        ticking = true;
    }
});

// Navbar Hamburger End

// === ScrollSpy ===
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
let manualClick = false;

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        manualClick = true;

        // Hapus semua .active dan .clicked
        navLinks.forEach(l => {
            l.classList.remove('active');
            l.classList.remove('clicked');
        });

        // Tambahkan keduanya ke link yang diklik
        link.classList.add('clicked');
        link.classList.add('active');

        // Setelah scroll selesai, hapus .clicked (biarkan scrollspy ambil alih)
        setTimeout(() => {
            manualClick = false;
            link.classList.remove('clicked');
        }, 1000);
    });
});


function activateNavLink() {
    if (manualClick) return;

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200; // offset agar lebih responsif
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);





// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
let autoSlideInterval;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});
prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

function autoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlide();
}

// Init
showSlide(currentSlide);
autoSlide();
// Hero Slider End








document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".animate-in");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add("visible");

          // Jika elemen butuh class tambahan (contoh navbar)
          if (el.dataset.animate === "navbar") {
            el.classList.add("animate-scroll");
          }

          // Hentikan observe setelah animasi dijalankan satu kali
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.15, // elemen mulai terlihat 15% akan memicu animasi
    }
  );

  elements.forEach((el) => {
    observer.observe(el);
  });
});



