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

// AUTH SYSTEM (LOGIN & SIGN UP)
document.addEventListener('DOMContentLoaded', function() {

  const loginBtn = document.getElementById('loginBtn');
  const loginModal = document.getElementById('loginModal');
  const closeLoginBtn = document.getElementById('closeBtn');
  const loginForm = document.querySelector('.login-form');

  // === PERBAIKAN: signupModal (bukan singupModal) ===
  const signupModal = document.getElementById('signupModal');
  const closeSignupBtn = document.getElementById('closeSignupBtn');
  const signupForm = document.querySelector('.signup-form');
  
  const currentUser = localStorage.getItem('jkt48_user');
  if (currentUser) {
    updateNavbarLoggedIn(currentUser);
  }

  // === LOGIN MODAL ===
  if (loginBtn && loginModal) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loginModal.classList.add('active');
    });

    closeLoginBtn.addEventListener('click', () => {
      loginModal.classList.remove('active');
      // === PERBAIKAN: requestFullscreen -> reset ===
      if (loginForm) loginForm.reset();
    });

    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.classList.remove('active');
        if (loginForm) loginForm.reset();
      }
    });
  }

  // === SIGN UP MODAL ===
  if (signupModal && closeSignupBtn) {
    closeSignupBtn.addEventListener('click', () => {
      signupModal.classList.remove('active');
      // === PERBAIKAN: requestFullscreen -> reset ===
      if (signupForm) signupForm.reset();
    });

    signupModal.addEventListener('click', (e) => {
      if (e.target === signupModal) {
        signupModal.classList.remove('active');
        if (signupForm) signupForm.reset();
      }
    });

    // Link ke Login dari Sign-up
    const toLoginLink = document.getElementById('toLoginLink');
    if (toLoginLink) {
      toLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupModal.classList.remove('active');
        loginModal.classList.add('active');
      });
    }
  }

  // === LINK KE SIGN UP DARI LOGIN ===
  const toSignupFromLogin = document.getElementById('toSignupFromLogin');
  if (toSignupFromLogin && signupModal) {
    toSignupFromLogin.addEventListener('click', (e) => {
      e.preventDefault();
      loginModal.classList.remove('active');
      signupModal.classList.add('active');
    });
  }

  // === SIGN UP FUNCTION ===
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = document.getElementById('signupUsername').value;
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;
      const confirmPassword = document.getElementById('signupConfirmPassword').value;

      if (username.length < 3) {
        alert('Username minimal 3 karakter!');
        return;
      }

      if (password.length < 6) {
        alert('Password minimal 6 karakter!');
        return;
      }

      if (password !== confirmPassword) {
        alert('Password tidak cocok!');
        return;
      }

      // Simpan ke localStorage
      const userData = { username, email, password };
      localStorage.setItem('jkt48_user_' + username, JSON.stringify(userData));

      alert('Daftar berhasil! Silakan login.');
      signupForm.reset();
      signupModal.classList.remove('active');
      loginModal.classList.add('active');
    });
  }

  // === LOGIN FUNCTION ===
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const username = loginForm.querySelector('input[type="text"]').value;
      const password = loginForm.querySelector('input[type="password"]').value;
      
      const savedUser = localStorage.getItem('jkt48_user_' + username);
      
      if (!savedUser) {
        alert('Username belum terdaftar!');
        return;
      }
      
      const userData = JSON.parse(savedUser);
      
      if (userData.password !== password) {
        alert('Password salah!');
        return;
      }
      
      localStorage.setItem('jkt48_user', username);
      alert('Login berhasil! Selamat datang, ' + username);
      loginForm.reset();
      loginModal.classList.remove('active');
      updateNavbarLoggedIn(username);
    });
  }

  // === UPDATE NAVBAR ===
  function updateNavbarLoggedIn(username) {
    const nav = document.querySelector('.nav-links');
    if (nav && loginBtn) {
      loginBtn.textContent = username;
      loginBtn.classList.add('logged-in');
      
      const logoutLi = document.createElement('li');
      logoutLi.innerHTML = '<a href="#" id="logoutBtn">Logout</a>';
      nav.appendChild(logoutLi);
      
      document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('jkt48_user');
        alert('Logout berhasil!');
        location.reload();
      });
    }
  }
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
      const searchTerm = searchInput.value.toLowerCase().trim();
      const selectedTeam = filterTeam.value;
      const sortValue = sortSelect.value;

      memberElements.forEach(element => {
        const h3 = element.querySelector("h3");
        const span = element.querySelector("span");

        if (h3 && span) {
          const nameText = h3.textContent.toLowerCase();
          const teamText = span.textContent.trim();

          const matchesSearch = nameText.includes(searchTerm);
          const matchesTeam = (selectedTeam === "all") || (teamText === selectedTeam);

          if (matchesSearch && matchesTeam) {
            element.style.display = "block";
          } else {
            element.style.display = "none";
          }
        }
      });

      const sortedElements = memberElements.sort((a, b) => {
        const nameA = a.querySelector("h3") ? a.querySelector("h3").textContent.toLowerCase().trim() : "";
        const nameB = b.querySelector("h3") ? b.querySelector("h3").textContent.toLowerCase().trim() : "";
        
        if (sortValue === "a-z") {
          return nameA.localeCompare(nameB);
        } else if (sortValue === "z-a") {
          return nameB.localeCompare(nameA);
        }
        return 0;
      });

      sortedElements.forEach(element => memberGrid.appendChild(element));
    }

    searchInput.addEventListener("input", updateMemberDisplay);
    filterTeam.addEventListener("change", updateMemberDisplay);
    sortSelect.addEventListener("change", updateMemberDisplay);

    updateMemberDisplay();
  }
});