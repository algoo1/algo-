/**
 * Bilingual Website - Main JavaScript
 * Handles general website functionality
 */

// Main application object
const App = {
    // Initialize the application
    init: function() {
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize mobile menu
        this.initMobileMenu();
        
        // Initialize animations
        this.initAnimations();
        
        // Handle RTL/LTR specific adjustments
        this.handleDirectionSpecificAdjustments();
        
        console.log('App initialized');
    },
    
    // Set up event listeners
    setupEventListeners: function() {
        // Listen for language changes
        window.addEventListener('languageChanged', (event) => {
            const { language, direction } = event.detail;
            console.log(`Language changed event: ${language}, direction: ${direction}`);
            
            // Adjust layout for new direction
            this.handleDirectionSpecificAdjustments();
            
            // Update page title based on language
            this.updatePageTitle(language);
            
            // Trigger any custom animations for language change
            this.triggerLanguageChangeAnimation();
        });
        
        // Handle form submissions
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        });
        
        // Handle smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    },
    
    // Initialize mobile menu
    initMobileMenu: function() {
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', () => {
                // Toggle menu visibility
                mobileMenu.classList.toggle('active');
                
                // Toggle aria-expanded attribute
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !isExpanded);
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (event) => {
                if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                    mobileMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    },
    
    // Initialize animations
    initAnimations: function() {
        // Simple reveal animation for elements as they enter viewport
        const revealElements = document.querySelectorAll('.reveal');
        
        if (revealElements.length > 0) {
            // Create intersection observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            // Observe each element
            revealElements.forEach(element => {
                observer.observe(element);
            });
        }
    },
    
    // Handle form submissions
    handleFormSubmit: function(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const formObject = {};
        
        // Convert FormData to object
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        console.log('Form submitted:', formObject);
        
        // Here you would typically send the data to a server
        // For demo purposes, we'll just show a success message
        this.showFormMessage(form, 'success', 'Form submitted successfully!');
    },
    
    // Show form message
    showFormMessage: function(form, type, message) {
        // Remove any existing message
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        // Add message to form
        form.appendChild(messageElement);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    },
    
    // Handle RTL/LTR specific adjustments
    handleDirectionSpecificAdjustments: function() {
        const isRTL = document.documentElement.dir === 'rtl';
        
        // Adjust any direction-specific elements
        const cards = document.querySelectorAll('.card, .feature-card, .service-card');
        cards.forEach(card => {
            if (isRTL) {
                card.style.textAlign = 'right';
            } else {
                card.style.textAlign = 'left';
            }
        });
        
        // Adjust form elements
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            if (isRTL) {
                form.style.direction = 'rtl';
            } else {
                form.style.direction = 'ltr';
            }
        });
    },
    
    updatePageTitle: function(language) {
        const titles = {
            'en': 'Bilingual Website - English',
            'ar': 'موقع ثنائي اللغة - العربية'
        };
        document.title = titles[language] || titles['en'];
    },
    
    triggerLanguageChangeAnimation: function() {
        // Add a subtle animation when language changes
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '0.8';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 150);
        
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    },
    
    // Apply RTL specific adjustments
    applyRTLAdjustments: function() {
        // Adjust slider directions if needed
        const sliders = document.querySelectorAll('.slider');
        sliders.forEach(slider => {
            slider.classList.add('slider-rtl');
        });
        
        // Adjust any third-party components that need RTL support
        // For example, if using a carousel or datepicker
        
        // Fix any RTL-specific issues with forms
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.classList.add('form-rtl');
        });
    },
    
    // Apply LTR specific adjustments
    applyLTRAdjustments: function() {
        // Remove RTL classes if they exist
        const sliders = document.querySelectorAll('.slider');
        sliders.forEach(slider => {
            slider.classList.remove('slider-rtl');
        });
        
        // Remove RTL classes from forms
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.classList.remove('form-rtl');
        });
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});