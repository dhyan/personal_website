// Smooth scrolling for non-mobile navigation
document.addEventListener('DOMContentLoaded', function() {
    // Only apply this to larger screens where mobile menu is not used
    if (window.innerWidth > 768) {
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                // Get header height for proper offset calculation
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            });
        });
    }

    // Smooth scrolling for home buttons (these work the same on all screen sizes)
    document.querySelectorAll('.home-buttons a').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Get header height for proper offset calculation
            const headerHeight = document.querySelector('header').offsetHeight;
            // Add additional spacing for mobile
            const mobileOffset = window.innerWidth <= 768 ? 20 : 0;
            
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight - mobileOffset,
                behavior: 'smooth'
            });
        });
    });
});

// Dynamic year in the footer
document.addEventListener('DOMContentLoaded', function() {
    const footerYear = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2023', currentYear);
});

// Mobile responsive menu
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.desktop-nav');
    const body = document.body;
    const overlay = document.querySelector('.mobile-nav-overlay');
    
    if (!mobileMenuToggle || !nav || !overlay) return;
    
    // Function to check if we're on a mobile device (max-width 480px)
    function isMobileDevice() {
        return window.innerWidth <= 480;
    }
    
    // Hide navigation on small mobile devices
    function checkMobileAndHideNav() {
        if (isMobileDevice()) {
            nav.style.display = 'none';
            nav.style.visibility = 'hidden';
            nav.style.opacity = '0';
            nav.style.pointerEvents = 'none';
        }
    }
    
    // Run on page load
    checkMobileAndHideNav();
    
    // Run on resize
    window.addEventListener('resize', checkMobileAndHideNav);
    
    // Toggle menu function
    function toggleMobileMenu() {
        // Don't allow toggling on mobile devices
        if (isMobileDevice()) {
            return;
        }
        
        const isOpen = nav.classList.contains('mobile-nav-open');
        
        if (isOpen) {
            // Close the menu
            nav.classList.remove('mobile-nav-open');
            body.classList.remove('mobile-menu-open');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        } else {
            // Open the menu
            nav.classList.add('mobile-nav-open');
            body.classList.add('mobile-menu-open');
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
            mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
        }
    }
    
    // Add click event to toggle button
    mobileMenuToggle.addEventListener('click', function(e) {
        if (isMobileDevice()) return; // Don't do anything on mobile devices
        
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu when clicking on the overlay
    overlay.addEventListener('click', function(e) {
        if (isMobileDevice()) return; // Don't do anything on mobile devices
        
        toggleMobileMenu();
    });
    
    // Handle mobile contact navigation with longer delay
    function handleMobileContactNavigation(e) {
        e.preventDefault();
        
        // If we're on a small mobile device, just scroll without menu handling
        if (isMobileDevice()) {
            scrollToContact();
            return;
        }
        
        // Check if we're on a tablet and menu is open
        if (window.innerWidth <= 768 && nav.classList.contains('mobile-nav-open')) {
            // Close the menu first
            const wasOpen = toggleMobileMenu();
            
            // Use longer delay for contact section on mobile
            setTimeout(() => {
                scrollToContact();
            }, 500); // Longer delay for mobile
        } else {
            // Regular scroll for desktop or when menu is already closed
            scrollToContact();
        }
    }
    
    // Close mobile menu when clicking on a link and handle smooth scrolling
    document.querySelectorAll('nav a').forEach(navLink => {
        navLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // On small mobile devices, links shouldn't be visible but just in case
            if (isMobileDevice()) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
                return;
            }
            
            // Special handling for Contact section on tablet
            if (this.getAttribute('href') === "#contact") {
                if (window.innerWidth <= 768 && !isMobileDevice()) {
                    handleMobileContactNavigation(e);
                    return;
                } else {
                    // For desktop just do normal contact scrolling
                    scrollToContact();
                    return;
                }
            }
            
            // For other navigation links
            if (nav.classList.contains('mobile-nav-open')) {
                toggleMobileMenu();
            }
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Add a slight delay to allow the menu to close first
            setTimeout(() => {
                // Get header height for proper offset calculation
                const headerHeight = document.querySelector('header').offsetHeight;
                // Add additional spacing for mobile
                const mobileOffset = window.innerWidth <= 768 ? 40 : 0;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - mobileOffset,
                    behavior: 'smooth'
                });
            }, 300); // Short delay to let the menu close animation finish
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && nav.classList.contains('mobile-nav-open')) {
            toggleMobileMenu();
        }
    });
    
    // Add keyboard accessibility (close on escape)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('mobile-nav-open')) {
            toggleMobileMenu();
        }
    });
});

// Toggle dark/light mode - Updated for new toggle buttons
document.addEventListener('DOMContentLoaded', function() {
    // Get all toggle buttons
    const oldToggleBtn = document.getElementById('theme-toggle');
    const newToggleBtn = document.getElementById('theme-toggle-new');
    const mobileThemeToggleBtn = document.querySelector('.mobile-theme-toggle');
    const headerThemeToggleBtn = document.querySelector('.header-theme-toggle');
    
    // Collect all sun/moon icons
    const sunIcons = document.querySelectorAll('.sun-icon');
    const moonIcons = document.querySelectorAll('.moon-icon');
    
    // Use available toggle buttons
    const toggleBtns = [newToggleBtn, oldToggleBtn, mobileThemeToggleBtn, headerThemeToggleBtn].filter(btn => btn);
    
    if (toggleBtns.length === 0) {
        console.error('No theme toggle buttons found in the DOM');
        return;
    }
    
    const body = document.body;
    
    // Check if theme is already stored
    const storedTheme = localStorage.getItem('theme');
    
    // Function to update icon visibility for all buttons
    function updateIconVisibility(isDarkMode) {
        // Update all sun icons
        sunIcons.forEach(icon => {
            icon.style.display = isDarkMode ? 'block' : 'none';
        });
        
        // Update all moon icons
        moonIcons.forEach(icon => {
            icon.style.display = isDarkMode ? 'none' : 'block';
        });
        
        // For the old button format that just has emoji text
        if (oldToggleBtn) {
            oldToggleBtn.innerHTML = isDarkMode ? '☀️' : '🌙';
        }
    }
    
    // Set initial theme
    if (storedTheme === 'light') {
        body.classList.remove('dark-mode');
        updateIconVisibility(false);
    } else {
        // Set dark mode as default if no stored preference
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        updateIconVisibility(true);
    }
    
    // Add toggle functionality to all buttons
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            
            if (isDarkMode) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
            
            updateIconVisibility(isDarkMode);
        });
    });
});

// Animate elements when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    // Add the 'fade-in' class to elements you want to animate
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
});

// Project Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const workToggle = document.getElementById('work-toggle');
    const personalToggle = document.getElementById('personal-toggle');
    const workProjects = document.getElementById('work-projects');
    const personalProjects = document.getElementById('personal-projects');
    
    if (workToggle && personalToggle) {
        workToggle.addEventListener('click', function() {
            // Update toggle buttons
            workToggle.classList.add('active');
            personalToggle.classList.remove('active');
            workToggle.setAttribute('aria-pressed', 'true');
            personalToggle.setAttribute('aria-pressed', 'false');
            
            // Update project sections
            workProjects.classList.add('active');
            personalProjects.classList.remove('active');
        });
        
        personalToggle.addEventListener('click', function() {
            // Update toggle buttons
            personalToggle.classList.add('active');
            workToggle.classList.remove('active');
            personalToggle.setAttribute('aria-pressed', 'true');
            workToggle.setAttribute('aria-pressed', 'false');
            
            // Update project sections
            personalProjects.classList.add('active');
            workProjects.classList.remove('active');
        });
    }
});

// Work Experience Timeline
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineContents = document.querySelectorAll('.timeline-content');
    
    if (timelineItems.length > 0) {
        timelineItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                timelineItems.forEach(i => i.classList.remove('active'));
                timelineContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Show corresponding content
                const contentId = `${item.dataset.id}-content`;
                const content = document.getElementById(contentId);
                if (content) {
                    content.classList.add('active');
                }
            });
        });
        
        // Handle horizontal scrolling with mouse drag
        const timelineTrack = document.querySelector('.timeline-track');
        const timelineScrollContainer = document.querySelector('.timeline-scroll-container');
        
        if (timelineTrack && timelineScrollContainer) {
            let isDown = false;
            let startX;
            let scrollLeft;
            
            timelineScrollContainer.addEventListener('mousedown', (e) => {
                isDown = true;
                timelineScrollContainer.style.cursor = 'grabbing';
                startX = e.pageX - timelineScrollContainer.offsetLeft;
                scrollLeft = timelineScrollContainer.scrollLeft;
            });
            
            timelineScrollContainer.addEventListener('mouseleave', () => {
                isDown = false;
                timelineScrollContainer.style.cursor = 'grab';
            });
            
            timelineScrollContainer.addEventListener('mouseup', () => {
                isDown = false;
                timelineScrollContainer.style.cursor = 'grab';
            });
            
            timelineScrollContainer.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - timelineScrollContainer.offsetLeft;
                const walk = (x - startX) * 2; // Adjust scrolling speed
                timelineScrollContainer.scrollLeft = scrollLeft - walk;
            });
            
            // Add grab cursor style
            timelineScrollContainer.style.cursor = 'grab';
            
            // Add touch support for mobile devices
            timelineScrollContainer.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX - timelineScrollContainer.offsetLeft;
                scrollLeft = timelineScrollContainer.scrollLeft;
            }, { passive: true });
            
            timelineScrollContainer.addEventListener('touchmove', (e) => {
                if (e.cancelable) {
                    e.preventDefault();
                }
                const x = e.touches[0].pageX - timelineScrollContainer.offsetLeft;
                const walk = (x - startX) * 2;
                timelineScrollContainer.scrollLeft = scrollLeft - walk;
            }, { passive: false });
        }
    }
});

// Improve page load performance
window.addEventListener('load', function() {
    // Add loaded class to body to trigger animations
    document.body.classList.add('loaded');
    
    // Lazy load images that are below the fold
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    imgObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
});

// Handle window resize for better scroll targets
window.addEventListener('resize', function() {
    // Update any scroll margin properties based on window size
    const sections = document.querySelectorAll('section');
    const headerHeight = document.querySelector('header').offsetHeight;
    
    sections.forEach(section => {
        // Set scroll margin based on current header height
        if (window.innerWidth <= 480) {
            section.style.scrollMarginTop = (headerHeight + 20) + 'px';
        } else if (window.innerWidth <= 768) {
            section.style.scrollMarginTop = (headerHeight + 30) + 'px';
        } else {
            section.style.scrollMarginTop = (headerHeight + 40) + 'px';
        }
    });
    
    // Ensure Contact section always has extra margin
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const extraPadding = window.innerWidth <= 480 ? 80 : 
                           window.innerWidth <= 768 ? 100 : 120;
        contactSection.style.scrollMarginTop = (headerHeight + extraPadding) + 'px';
    }
});

// Set initial scroll margins
document.addEventListener('DOMContentLoaded', function() {
    // Update scroll margin properties based on window size
    const sections = document.querySelectorAll('section');
    const headerHeight = document.querySelector('header').offsetHeight;
    
    sections.forEach(section => {
        // Set scroll margin based on current header height
        if (window.innerWidth <= 480) {
            section.style.scrollMarginTop = (headerHeight + 20) + 'px';
        } else if (window.innerWidth <= 768) {
            section.style.scrollMarginTop = (headerHeight + 30) + 'px';
        } else {
            section.style.scrollMarginTop = (headerHeight + 40) + 'px';
        }
    });
    
    // Call this function to specifically ensure Contact section is visible
    function adjustContactSectionMargin() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const extraPadding = window.innerWidth <= 480 ? 80 : 
                               window.innerWidth <= 768 ? 100 : 120;
            contactSection.style.scrollMarginTop = (headerHeight + extraPadding) + 'px';
        }
    }
    
    adjustContactSectionMargin();
});

// Function to scroll to the contact section
function scrollToContact() {
    const contactSection = document.querySelector('#contact');
    const headerHeight = document.querySelector('header').offsetHeight;
    const mobileOffset = window.innerWidth <= 768 ? 40 : 0;
    
    window.scrollTo({
        top: contactSection.offsetTop - headerHeight - mobileOffset,
        behavior: 'smooth'
    });
}

// Set specific handling for home buttons that link to Contact
document.addEventListener('DOMContentLoaded', function() {
    const contactButtons = document.querySelectorAll('.home-buttons a[href="#contact"]');
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToContact();
        });
    });
});

// Update mobile menu click handlers
document.addEventListener('DOMContentLoaded', function() {
    const contactLink = document.querySelector('nav a[href="#contact"]');
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // For mobile devices, use the special mobile navigation
            if (window.innerWidth <= 768) {
                handleMobileContactNavigation();
            } else {
                scrollToContact();
            }
        });
    }
}); 