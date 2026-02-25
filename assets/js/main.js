/**
 * ========================================
 * ROZEE WEBSITE - MAIN JAVASCRIPT
 * ========================================
 * 
 * Handles:
 * - Mobile navigation toggle
 * - Smooth scroll for anchor links
 * - Gallery lightbox functionality
 * - Band members dynamic rendering
 * - Booking form handling and validation
 * - Scroll effects for header
 * 
 * © 2025 Angie Web Studio
 */

// ========================================
// BAND MEMBERS DATA
// ========================================
// CUSTOMIZE: Edit this array to update band members
// Add or remove objects to change the band roster
const bandMembers = [
    {
        name: "Rozee",
        role: "Lead Vocals",
        image: "/assets/img/headshot.png",
        bio: "Rozee is the heart and soul of the band, bringing powerhouse vocals and magnetic stage presence to every performance. With roots in soul and R&B, her voice is impossible to forget."
    },
   {
        name: "Virginia Bistline",
        role: "Piano",
        image: "/assets/img/headshotsavana.png",
        bio: "Music has been part of her life for as long as she can remember. Singing has always been her first passion, and she began playing piano at three before picking up the guitar at eleven. Now at 19, she draws inspiration from the emotion of jazz, the soul of R&B, and the timeless power of ’80s ballads."
    },
    {
        name: "Band Member 3",
        role: "Bass",
        image: "/assets/img/IMG_20260124_174150 (4).jpg",
        bio: "The backbone of every groove, she keeps the low end tight and the crowd moving. Her smooth, melodic bass lines are the glue that holds the band together."
    },
    {
        name: "Band Member 4",
        role: "Drums",
        image: "/assets/img/IMG_20260124_174150 (3).jpg",
        bio: "With precision timing and explosive energy behind the kit, he drives the band forward with a rhythm that's both powerful and deeply musical."
    }
];

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener("DOMContentLoaded", function() {
    console.log("RoZee website initializing...");
    
    // Initialize all components
    initMobileNavigation();
    initSmoothScroll();
    initGalleryLightbox();
    initBandMembers();
    initBookingForm();
    initHeaderScroll();
    
    console.log("RoZee website initialized successfully");
});

// ========================================
// MOBILE NAVIGATION
// ========================================

/**
 * Initialize mobile navigation toggle
 */
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) {
        console.warn("Mobile navigation elements not found");
        return;
    }
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// GALLERY LIGHTBOX
// ========================================

/**
 * Initialize gallery lightbox functionality
 */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    if (!lightbox) {
        console.warn("Lightbox elements not found");
        return;
    }
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => item.getAttribute('data-img'));
    
    /**
     * Open lightbox with specified image
     * @param {number} index - Index of image to display
     */
    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImage.src = images[currentImageIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    /**
     * Close lightbox
     */
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    /**
     * Show previous image
     */
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentImageIndex];
    }
    
    /**
     * Show next image
     */
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImage.src = images[currentImageIndex];
    }
    
    // Event listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });
    
    console.log("Gallery lightbox initialized with", images.length, "images");
}

// ========================================
// BAND MEMBERS RENDERING
// ========================================

/**
 * Render band members dynamically from bandMembers array
 */
function initBandMembers() {
    const bandGrid = document.getElementById('bandGrid');
    
    if (!bandGrid) {
        console.warn("Band grid element not found");
        return;
    }
    
    // Clear existing content
    bandGrid.innerHTML = '';
    
    // Render each band member
    bandMembers.forEach(member => {
        const memberCard = createBandMemberCard(member);
        bandGrid.appendChild(memberCard);
    });
    
    console.log("Band members rendered:", bandMembers.length);
}

/**
 * Create a band member card element
 * @param {Object} member - Band member data
 * @returns {HTMLElement} Band member card
 */
function createBandMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'band-member';
    
    card.innerHTML = `
        <div class="band-member-image">
            <img src="${member.image}" alt="${member.name}" loading="lazy" onerror="this.src='/assets/img/placeholder-member.jpg'">
        </div>
        <h3 class="band-member-name">${member.name}</h3>
        <p class="band-member-role">${member.role}</p>
        <p class="band-member-bio">${member.bio}</p>
    `;
    
    return card;
}

// ========================================
// BOOKING FORM HANDLING
// ========================================

/**
 * Initialize booking form with validation and submission handling
 */
function initBookingForm() {
    const form = document.getElementById('bookingForm');
    const successMessage = document.getElementById('formSuccess');
    const errorMessage = document.getElementById('formError');
    
    if (!form) {
        console.warn("Booking form not found");
        return;
    }
    
    form.addEventListener('submit', function(e) {
        // If using Netlify Forms, let the default form submission proceed
        // The data-netlify attribute will handle the submission
        
        // Basic client-side validation
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Check required fields
        if (!fullName || !email || !message) {
            e.preventDefault();
            showFormError("Please fill in all required fields.");
            return false;
        }
        
        // Validate email format
        if (!isValidEmail(email)) {
            e.preventDefault();
            showFormError("Please enter a valid email address.");
            return false;
        }
        
        // If validation passes, show success message
        // Note: With Netlify Forms, the page will redirect to a success page
        // This is a fallback for other form handling methods
        
        console.log("Booking form submitted successfully");
    });
    
    /**
     * Show form error message
     * @param {string} message - Error message to display
     */
    function showFormError(message) {
        if (errorMessage) {
            errorMessage.querySelector('p').textContent = message;
            errorMessage.classList.add('active');
            
            // Hide error after 5 seconds
            setTimeout(() => {
                errorMessage.classList.remove('active');
            }, 5000);
        }
    }
    
    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} True if valid email
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// ========================================
// HEADER SCROLL EFFECTS
// ========================================

/**
 * Add scroll effects to header
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (!header) {
        console.warn("Header element not found");
        return;
    }
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when scrolled down
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========================================
// LAZY LOADING IMAGES (Optional Enhancement)
// ========================================

/**
 * Initialize lazy loading for images
 * This is optional but improves performance
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// ========================================
// ERROR HANDLING
// ========================================

/**
 * Global error handler
 */
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    // You could send this to an error tracking service
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    // You could send this to an error tracking service
});

// ========================================
// EXPORT FOR TESTING/DEBUGGING
// ========================================

// Make certain functions available globally for debugging
window.RoZee = {
    bandMembers,
    initBandMembers,
    initGalleryLightbox,
    initMobileNavigation
};

console.log("Main.js loaded successfully");
