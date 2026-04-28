// Navbar mengecil dan border merah muncul saat scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');

    if (this.window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const cards = document.querySelectorAll('.news-card');

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, index) {
        if (entry.isIntersecting) {
            setTimeout(function() {
                entry.target.classList.add('visible');
            }, index * 150);
        }
    });
}, {threshold: 0.1});

cards.forEach(function(card) {
    observer.observe(card);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Carousel member
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cardWidth = 240;

prevBtn.addEventListener('click', function() {
    track.scrollBy({left: -cardWidth, behavior: 'smooth'});
});

nextBtn.addEventListener('click', function() {
    track.scrollBy({left: cardWidth, behavior: 'smooth'});
});

// Active link saat scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function() {
  let current = '';

  sections.forEach(function(section) {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(function(link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Loading screen
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    setTimeout(function() {
        loader.classList.add('hidden');
    }, 1200);
});