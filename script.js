// Navbar mengecil dan border merah muncul saat scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 50) {
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

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', function() {
    track.scrollBy({left: -cardWidth, behavior: 'smooth'});
  });

  nextBtn.addEventListener('click', function() {
    track.scrollBy({left: cardWidth, behavior: 'smooth'});
  });
}

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

// FEATURE: SEARCH, FILTER, SORT JKT48 MEMBER
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchMember");
  const filterTeam = document.getElementById("filterTeam");
  const sortSelect = document.getElementById("sortMember");
  const memberGrid = document.getElementById("memberGrid");

  if (memberGrid && searchInput && filterTeam && sortSelect) {
    const memberElements = Array.from(memberGrid.getElementsByClassName("member-link"));

    function updateMemberDisplay() {
      const searchTerm = searchInput.ariaValueMax.toLowerCase().trim();
      const selectedTeam = filterTeam.ariaValueMax;
      const sortValue = sortSelect.value;

      // Proses search dan filter team
      memberElements.forEach(element => {
        const nameText = element.querySelector("h3").textContent.toLowerCase();
        const teamText = elemt.querySelector("span").textContent.trim();

        const matchesSearch = nameText.includes(searchTerm);
        const matchesTeam = (selectedTeam === "all") || (teamText === selectedTeam);

        if (matchesSearch && matchesTeam) {
          element.style.display = "block";
        } else {
            element.style.display = "none";
        }
      });

      // Proses sorting
      const sortedElements = memberElements.sort((a, b) => {
        const nameA = a.querySelector("h3").textContent.toLowerCase().trim();
        const nameB = b.querySelector("h3").textContent.toLowerCase().trim();
        
        if (sortValue === "a-z") {
          return nameA.localeCompare(nameB);
        } else if (sortValue === "z-a") {
          return nameB.localeCompare(nameA);
        }
        return 0;
      });

      // Susun ulang elemen
      sortedElements.forEach(element => memberGrid.appendChild(element));
    }

    searchInput.addEventListener("input", updateMemberDisplay);
    filterTeam.addEventListener("change", updateMemberDisplay);
    sortSelect.addEventListener("change", updateMemberDisplay);

    updateMemberDisplay();
  }
});