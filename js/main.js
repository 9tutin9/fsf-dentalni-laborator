(function () {
  const byId = (id) => document.getElementById(id);
  const qs = (sel, el = document) => el.querySelector(sel);
  const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  // Update footer year
  const yearEl = byId('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const toggle = qs('.nav-toggle');
  const nav = byId('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // Header scroll effect
  const header = qs('.site-header');
  if (header) {
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScrollY = currentScrollY;
    });
  }

  // Gallery filters
  const filterChips = qsa('.chip');
  const galleryItems = qsa('.gallery-item');
  if (filterChips.length && galleryItems.length) {
    filterChips.forEach((chip) =>
      chip.addEventListener('click', () => {
        filterChips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.getAttribute('data-filter');
        galleryItems.forEach((item) => {
          const cat = item.getAttribute('data-category');
          const show = filter === 'all' || filter === cat;
          item.style.display = show ? '' : 'none';
        });
      })
    );
  }

  // Lightbox
  const lightbox = byId('lightbox');
  const lightboxImg = byId('lightbox-img');
  const lightboxCaption = byId('lightbox-caption');
  const lightboxClose = qs('.lightbox-close');
  if (lightbox && lightboxImg && lightboxCaption && lightboxClose) {
    qsa('.lightbox-link').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const href = a.getAttribute('href');
        const title = a.getAttribute('data-title') || '';
        lightboxImg.src = href || '';
        lightboxCaption.textContent = title;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });
    const close = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImg.removeAttribute('src');
    };
    lightboxClose.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) close();
    });
  }

  // Contact form progressive enhancement (demo only)
  const form = qs('.contact-form');
  const status = byId('form-status');
  if (form && status) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = 'Odesílám…';
      // Example integration placeholder: replace with Formspree/Netlify/PHP endpoint
      try {
        await new Promise((r) => setTimeout(r, 800));
        form.reset();
        status.textContent = 'Děkujeme, zpráva byla odeslána.';
      } catch (err) {
        status.textContent = 'Omlouváme se, zkuste to prosím znovu.';
      }
    });
  }

  // Booking wizard functionality
  const bookingForm = qs('#rezervace .booking-form');
  const bookingStatus = byId('booking-status');
  let currentStep = 1;
  const totalSteps = 3;

  if (bookingForm) {
    // Wizard navigation
    const nextButtons = qsa('.wizard-next');
    const prevButtons = qsa('.wizard-prev');
    const progressSteps = qsa('.progress-step');
    const wizardSteps = qsa('.wizard-step');

    function updateProgress() {
      progressSteps.forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.toggle('active', stepNum === currentStep);
        step.classList.toggle('completed', stepNum < currentStep);
      });
      
      wizardSteps.forEach((step, index) => {
        step.classList.toggle('active', index + 1 === currentStep);
      });
    }

    function updateSummary() {
      const name = qs('#booking-name')?.value || '-';
      const email = qs('#booking-email')?.value || '-';
      const phone = qs('#booking-phone')?.value || '-';
      const clinic = qs('#booking-clinic')?.value || '-';
      const date = qs('#booking-date')?.value || '-';
      const time = qs('#booking-time')?.value || '-';
      const message = qs('#booking-message')?.value || '';

      byId('summary-name').textContent = name;
      byId('summary-email').textContent = email;
      byId('summary-phone').textContent = phone;
      byId('summary-clinic').textContent = clinic || 'Neuvedeno';
      byId('summary-date').textContent = date ? new Date(date).toLocaleDateString('cs-CZ') : '-';
      byId('summary-time').textContent = time || '-';
      
      const messageItem = byId('summary-message-item');
      if (message) {
        byId('summary-message').textContent = message;
        messageItem.style.display = 'block';
      } else {
        messageItem.style.display = 'none';
      }
    }

    nextButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
          currentStep++;
          updateProgress();
          if (currentStep === 3) updateSummary();
        }
      });
    });

    prevButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (currentStep > 1) {
          currentStep--;
          updateProgress();
        }
      });
    });

    // Form submission
    if (bookingStatus) {
      bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        bookingStatus.textContent = 'Odesílám rezervaci…';
        // Example integration placeholder: replace with booking system endpoint
        try {
          await new Promise((r) => setTimeout(r, 1000));
          bookingForm.reset();
          currentStep = 1;
          updateProgress();
          bookingStatus.textContent = 'Děkujeme, rezervace byla odeslána. Ozveme se vám do 24 hodin.';
        } catch (err) {
          bookingStatus.textContent = 'Omlouváme se, zkuste to prosím znovu.';
        }
      });
    }
  }

  // Parallax mouse movement for hero background blobs
  const hero = qs('#hero');
  const blob1 = qs('.hero-animated-bg .b1');
  const blob2 = qs('.hero-animated-bg .b2');
  const blob3 = qs('.hero-animated-bg .b3');
  
  if (hero && blob1 && blob2 && blob3) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40; // -20px..20px
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40; // -20px..20px
      
      // Each blob reacts differently to mouse movement
      blob1.style.setProperty('--mx', `${x * 0.3}px`);
      blob1.style.setProperty('--my', `${y * 0.3}px`);
      
      blob2.style.setProperty('--mx', `${x * -0.2}px`);
      blob2.style.setProperty('--my', `${y * 0.4}px`);
      
      blob3.style.setProperty('--mx', `${x * 0.5}px`);
      blob3.style.setProperty('--my', `${y * -0.2}px`);
    });
    
    hero.addEventListener('mouseleave', () => {
      blob1.style.setProperty('--mx', '0px');
      blob1.style.setProperty('--my', '0px');
      blob2.style.setProperty('--mx', '0px');
      blob2.style.setProperty('--my', '0px');
      blob3.style.setProperty('--mx', '0px');
      blob3.style.setProperty('--my', '0px');
    });
  }

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  const animateElements = qsa('.card, .content-card, .feature-list li, .review');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add CSS for animate-in class
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // Marquee track duplication for reviews
  function ensureReviewsTrackDuplication() {
    const track = qs('.reviews-track');
    const strip = qs('.reviews-strip');
    if (!track || !strip) return;
    track.innerHTML = '';
    track.appendChild(strip);
    const clone = strip.cloneNode(true);
    track.appendChild(clone);
  }
  ensureReviewsTrackDuplication();

  // Google Reviews widget (client-side Places) - optional
  async function initGoogleReviews() {
    const apiKey = qs('meta[name="google-maps-api-key"]')?.getAttribute('content') || '';
    const placeId = qs('meta[name="google-place-id"]')?.getAttribute('content') || '';
    if (!apiKey || !placeId) return; // keep static fallback

    // Load Maps JS Places library
    await new Promise((resolve, reject) => {
      const existing = document.getElementById('gmaps');
      if (existing) return resolve();
      const s = document.createElement('script');
      s.id = 'gmaps';
      s.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=__onGmapsReady`;
      s.async = true; s.defer = true;
      window.__onGmapsReady = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });

    try {
      const service = new google.maps.places.PlacesService(document.createElement('div'));
      await new Promise((resolve, reject) => {
        service.getDetails({ placeId, fields: ['reviews', 'rating', 'user_ratings_total'] }, (place, status) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK || !place?.reviews) return reject(status);
          // Render reviews
          const container = qs('.reviews-strip');
          if (!container) return resolve();
          container.innerHTML = '';
          place.reviews.slice(0, 12).forEach((r) => {
            const li = document.createElement('li');
            li.className = 'review';
            const stars = '★★★★★'.slice(0, Math.round(r.rating)).padEnd(5, '☆');
            li.innerHTML = `<span class="stars" aria-label="${r.rating} z 5 hvězdiček">${stars}</span><span class="review-text">“${r.text?.slice(0, 140) || ''}” — ${r.author_name}</span>`;
            container.appendChild(li);
          });
          ensureReviewsTrackDuplication();
          resolve();
        });
      });
    } catch (e) {
      // Silent fallback to static content
    }
  }

  initGoogleReviews();

  // Mobile parallax fallback for background image in O nás
  const parallaxSection = document.querySelector('.section-bg.parallax');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 769;
  
  if (parallaxSection && !prefersReduced && isMobile) {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = parallaxSection.getBoundingClientRect();
          const offset = (window.scrollY - rect.top) * 0.3; // stronger parallax on mobile
          parallaxSection.style.setProperty('--py', `${offset}px`);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();



