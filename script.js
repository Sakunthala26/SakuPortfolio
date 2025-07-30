
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });

    // Sticky Navbar
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      navbar.classList.toggle('scrolled', window.scrollY > 50);

      // Back to Top Button
      const backToTop = document.getElementById('backToTop');
      backToTop.classList.toggle('active', window.scrollY > 300);
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
          item.classList.add('active');
        }
      });
    });

    // Form Submission
    document.getElementById('contactForm').addEventListener('submit', async function (e) {
      e.preventDefault();

      const form = e.target;
      const formMessage = document.getElementById('formMessage');
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;

      // Disable button and show sending status
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      formMessage.style.display = 'none';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formMessage.textContent = '✅ Message sent successfully! I will get back to you soon.';
          formMessage.className = 'form-message success';
          form.reset();
        } else {
          throw new Error('Message failed to send');
    }
  }
      finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        formMessage.style.display = 'block';

        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 5000);
      }
   });
