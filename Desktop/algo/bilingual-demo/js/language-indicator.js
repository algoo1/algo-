/**
 * Language Indicator Component
 * Shows the current active language in a small indicator at the bottom of the page
 * Enhanced version with improved UI and accessibility
 */

const LanguageIndicator = {
    hideTimeout: null,
    animationDuration: 300, // ms
    displayDuration: 3000, // ms
    
    // Initialize the language indicator
    init: function() {
        // Create the indicator element if it doesn't exist
        this.createIndicator();
        
        // Update the indicator with current language
        this.updateIndicator();
        
        // Listen for language changes
        window.addEventListener('languageChanged', (event) => {
            this.updateIndicator(event.detail.language);
            this.showIndicator();
        });
        
        // Show initially and hide after timeout
        if (typeof I18N !== 'undefined' && I18N.currentLang) {
            this.showIndicator();
        }
    },
    
    // Create the indicator element
    createIndicator: function() {
        // Check if indicator already exists
        if (document.getElementById('language-indicator')) {
            return;
        }
        
        // Create indicator element
        const indicator = document.createElement('div');
        indicator.id = 'language-indicator';
        indicator.className = 'language-indicator';
        indicator.setAttribute('role', 'status');
        indicator.setAttribute('aria-live', 'polite');
        
        // Create inner container for better styling
        const container = document.createElement('div');
        container.className = 'indicator-container';
        
        // Add icon
        const icon = document.createElement('i');
        icon.className = 'fas fa-globe';
        icon.setAttribute('aria-hidden', 'true');
        container.appendChild(icon);
        
        // Add language code
        const code = document.createElement('span');
        code.className = 'indicator-lang-code';
        container.appendChild(code);
        
        // Add text
        const text = document.createElement('span');
        text.id = 'language-indicator-text';
        text.className = 'indicator-lang-name';
        container.appendChild(text);
        
        // Add container to indicator
        indicator.appendChild(container);
        
        // Add hover behavior to prevent hiding
        indicator.addEventListener('mouseenter', () => {
            clearTimeout(this.hideTimeout);
        });
        
        indicator.addEventListener('mouseleave', () => {
            this.hideTimeout = setTimeout(() => {
                this.hideIndicator();
            }, 2000);
        });
        
        // Add click behavior to toggle language
        indicator.addEventListener('click', () => {
            if (typeof I18N !== 'undefined') {
                I18N.toggleLanguage();
            }
        });
        
        // Add tooltip
        indicator.setAttribute('title', 'Click to toggle language');
        
        // Add to document
        document.body.appendChild(indicator);
    },
    
    // Update the indicator with current language
    updateIndicator: function(language) {
        const indicator = document.getElementById('language-indicator');
        const textElement = document.getElementById('language-indicator-text');
        const codeElement = indicator ? indicator.querySelector('.indicator-lang-code') : null;
        
        if (!indicator || !textElement) {
            return;
        }
        
        // Get current language if not provided
        if (!language && typeof I18N !== 'undefined') {
            language = I18N.currentLang;
        }
        
        // Set text and code based on language
        if (language === 'ar') {
            textElement.textContent = 'العربية';
            if (codeElement) codeElement.textContent = 'AR';
            indicator.setAttribute('dir', 'rtl');
            indicator.classList.add('rtl');
            indicator.classList.remove('ltr');
        } else {
            textElement.textContent = 'English';
            if (codeElement) codeElement.textContent = 'EN';
            indicator.setAttribute('dir', 'ltr');
            indicator.classList.add('ltr');
            indicator.classList.remove('rtl');
        }
        
        // Update tooltip based on current language
        const otherLang = language === 'ar' ? 'English' : 'العربية';
        indicator.setAttribute('title', `Click to switch to ${otherLang}`);
        
        // Clear any existing hide timeout
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }
        this.hideTimeout = setTimeout(() => {
            this.hideIndicator();
        }, 3000);
    },
    
    // Hide the indicator
    hideIndicator: function() {
        const indicator = document.getElementById('language-indicator');
        
        if (!indicator) {
            return;
        }
        
        // Remove show class to trigger CSS transitions
        indicator.classList.remove('show');
        
        // Hide after transition
        setTimeout(() => {
            indicator.style.display = 'none';
        }, this.animationDuration);
    },
    
    // Show the indicator
    showIndicator: function() {
        const indicator = document.getElementById('language-indicator');
        
        if (!indicator) {
            return;
        }
        
        // Clear any existing timeout
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }
        
        // Show and fade in
        indicator.style.display = 'flex';
        
        // Use setTimeout to ensure display takes effect before adding show class
        setTimeout(() => {
            indicator.classList.add('show');
        }, 10);
        
        // Set timeout to hide the indicator
        this.hideTimeout = setTimeout(() => {
            this.hideIndicator();
        }, this.displayDuration);
        
        // Announce language change for screen readers
        const currentLang = typeof I18N !== 'undefined' ? I18N.currentLang : 'en';
        const langName = currentLang === 'ar' ? 'العربية' : 'English';
        const srAnnouncement = document.createElement('div');
        srAnnouncement.className = 'sr-only';
        srAnnouncement.setAttribute('aria-live', 'assertive');
        srAnnouncement.textContent = `Language changed to ${langName}`;
        document.body.appendChild(srAnnouncement);
        
        // Remove announcement after it's been read
        setTimeout(() => {
            if (srAnnouncement.parentNode) {
                srAnnouncement.parentNode.removeChild(srAnnouncement);
            }
        }, 1000);
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    LanguageIndicator.init();
});