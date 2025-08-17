/**
 * Study O'Clock - Main JavaScript File
 * Consolidated functionality for the website
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle functionality
    initMobileMenu();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize any countdown timers
    initCountdownTimers();
    
    // Initialize accordion functionality (if present)
    initAccordions();
    
    // Initialize course filter functionality (if on courses page)
    initCourseFilters();
    
    // Initialize contact form functionality (if on contact page)
    initContactForm();
});

/**
 * Initialize mobile hamburger menu functionality
 */
function initMobileMenu() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    
    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', function() {
            // Use consistent class names for mobile menu toggle
            mainNav.classList.toggle('mobile-active');
            hamburgerMenu.classList.toggle('is-active');
        });
    }
}

/**
 * Initialize smooth scrolling for internal anchor links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize countdown timer functionality
 */
function initCountdownTimers() {
    const countdownTimerElement = document.querySelector('.countdown-timer');
    
    if (countdownTimerElement) {
        // Check for data attribute with deadline
        const deadline = countdownTimerElement.dataset.deadline;
        
        if (deadline) {
            const targetDate = new Date(deadline).getTime();
            
            const interval = setInterval(function() {
                const now = new Date().getTime();
                const distance = targetDate - now;
                
                // If the countdown is finished, display a message and stop the timer
                if (distance < 0) {
                    clearInterval(interval);
                    countdownTimerElement.innerHTML = '<h3 class="countdown-expired">This scholarship deadline has passed.</h3>';
                    return;
                }
                
                // Time calculations for days, hours, minutes and seconds
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                // Update display - flexible approach for different HTML structures
                const daysEl = countdownTimerElement.querySelector('.days .number');
                const hoursEl = countdownTimerElement.querySelector('.hours .number');
                const minutesEl = countdownTimerElement.querySelector('.minutes .number');
                const secondsEl = countdownTimerElement.querySelector('.seconds .number');
                
                if (daysEl) daysEl.innerHTML = days;
                if (hoursEl) hoursEl.innerHTML = hours;
                if (minutesEl) minutesEl.innerHTML = minutes;
                if (secondsEl) secondsEl.innerHTML = seconds;
                
                // Alternative: Update time blocks if using different structure
                const timeBlocks = countdownTimerElement.querySelectorAll('.time-block .number');
                if (timeBlocks.length >= 4) {
                    timeBlocks[0].innerHTML = days;
                    timeBlocks[1].innerHTML = hours;
                    timeBlocks[2].innerHTML = minutes;
                    timeBlocks[3].innerHTML = seconds;
                }
                
            }, 1000);
        }
    }
}

/**
 * Initialize accordion functionality (FAQ sections)
 */
function initAccordions() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(function(item) {
        const header = item.querySelector('.accordion-header');
        
        if (header) {
            header.addEventListener('click', function() {
                // Close all other accordion items first
                accordionItems.forEach(function(otherItem) {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle the clicked accordion item
                item.classList.toggle('active');
            });
        }
    });
}

/**
 * Utility function for enhanced mobile menu animations
 * Adds CSS animations for hamburger menu transformation
 */
function addMobileMenuAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        .hamburger-menu.is-active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger-menu.is-active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger-menu.is-active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize course filter functionality (for courses page)
 */
function initCourseFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCategories = document.querySelectorAll('.course-category');
    
    if (filterButtons.length > 0 && courseCategories.length > 0) {
        filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Show/hide course categories
                courseCategories.forEach(function(categoryDiv) {
                    if (category === 'all' || categoryDiv.getAttribute('data-category') === category) {
                        categoryDiv.style.display = 'block';
                    } else {
                        categoryDiv.style.display = 'none';
                    }
                });
            });
        });
    }
}

/**
 * Initialize contact form functionality
 */
function initContactForm() {
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        // Add focus/blur effects to form inputs
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(function(input) {
            input.addEventListener('focus', function() {
                this.style.borderColor = 'var(--primary-red)';
            });
            
            input.addEventListener('blur', function() {
                this.style.borderColor = 'var(--border-color)';
            });
        });
        
        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const phone = this.querySelector('#phone').value.trim();
            
            if (!name || !email || !phone) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // If validation passes, show success message
            alert('Thank you for your message! We will get back to you within 24 hours.');
            
            // Reset form
            this.reset();
        });
    }
}

// Initialize mobile menu animations
addMobileMenuAnimations();
