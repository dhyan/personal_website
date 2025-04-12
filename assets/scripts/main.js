// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Smooth scrolling for home buttons
document.querySelectorAll('.home-buttons a').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Dynamic year in the footer
document.addEventListener('DOMContentLoaded', function() {
    const footerYear = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2023', currentYear);
});

// Toggle dark/light mode
document.addEventListener('DOMContentLoaded', function() {
    // Create toggle button
    const body = document.body;
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'theme-toggle';
    toggleBtn.innerHTML = '☀️';
    toggleBtn.setAttribute('aria-label', 'Toggle Dark Mode');
    
    body.appendChild(toggleBtn);
    
    // Set dark mode as default
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    
    // Only switch to light mode if explicitly stored
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
        body.classList.remove('dark-mode');
        toggleBtn.innerHTML = '🌙';
    }
    
    // Toggle function
    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            toggleBtn.innerHTML = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            toggleBtn.innerHTML = '🌙';
            localStorage.setItem('theme', 'light');
        }
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
        }
    }
}); 