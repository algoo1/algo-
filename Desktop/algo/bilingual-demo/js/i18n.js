/**
 * Bilingual Website - Internationalization (i18n) Module
 * Handles language detection, switching, and content management
 */

// Main i18n controller
const I18N = {
    // Current language code (en or ar)
    currentLang: 'en',
    
    // Default language
    defaultLang: 'en',
    
    // Available languages
    languages: {
        en: {
            name: 'English',
            dir: 'ltr',
            code: 'en',
            locale: 'en-US'
        },
        ar: {
            name: 'العربية',
            dir: 'rtl',
            code: 'ar',
            locale: 'ar-SA'
        }
    },
    
    // Translation data store
    translations: {},
    
    // Font loading status
    fontsLoaded: {
        en: false,
        ar: false
    },
    
    /**
     * Initialize the i18n system
     */
    init: async function() {
        // Load translations
        await this.loadTranslations();
        
        // Detect initial language
        this.detectLanguage();
        
        // Apply initial language
        this.applyLanguage(this.currentLang);
        
        // Set up language toggle event listeners
        this.setupEventListeners();
        
        // Preload fonts for both languages
        this.preloadFonts();
        
        console.log(`I18N initialized with language: ${this.currentLang}`);
    },
    
    /**
     * Load translation data from JSON files
     */
    loadTranslations: async function() {
        try {
            // Load English translations
            const enResponse = await fetch('./translations/en.json');
            const enData = await enResponse.json();
            this.translations.en = enData;
            
            // Load Arabic translations
            const arResponse = await fetch('./translations/ar.json');
            const arData = await arResponse.json();
            this.translations.ar = arData;
            
            console.log('Translations loaded successfully');
        } catch (error) {
            console.error('Error loading translations:', error);
            
            // Fallback to embedded translations if fetch fails
            this.loadFallbackTranslations();
        }
    },
    
    /**
     * Fallback translations (used if JSON fetch fails)
     */
    loadFallbackTranslations: function() {
        this.translations = {
            en: {
                "nav.home": "Home",
                "nav.about": "About",
                "nav.services": "Services",
                "nav.contact": "Contact",
                "lang.switch": "العربية",
                "hero.title": "Welcome to Our Bilingual Website",
                "hero.subtitle": "Experience seamless language switching between English and Arabic",
                "hero.cta": "Learn More",
                "features.title": "Our Features",
                "feature1.title": "Responsive Design",
                "feature1.desc": "Our website looks great on all devices, from mobile phones to desktop computers.",
                "feature2.title": "Bilingual Support",
                "feature2.desc": "Full support for both English and Arabic with proper RTL implementation.",
                "feature3.title": "Fast Performance",
                "feature3.desc": "Optimized code ensures the website loads quickly and runs smoothly.",
                "cta.title": "Ready to Get Started?",
                "cta.desc": "Join thousands of satisfied customers using our services worldwide.",
                "cta.button": "Contact Us",
                "footer.about": "About Us",
                "footer.about.desc": "We are a company dedicated to providing high-quality bilingual web solutions.",
                "footer.links": "Quick Links",
                "footer.contact": "Contact Info",
                "footer.address": "123 Street Name, City, Country",
                "footer.phone": "+1 234 567 890",
                "footer.email": "info@example.com",
                "footer.copyright": "© 2023 Bilingual Website. All rights reserved."
            },
            ar: {
                "nav.home": "الرئيسية",
                "nav.about": "من نحن",
                "nav.services": "خدماتنا",
                "nav.contact": "اتصل بنا",
                "lang.switch": "English",
                "hero.title": "مرحبًا بكم في موقعنا ثنائي اللغة",
                "hero.subtitle": "استمتع بتجربة التبديل السلس بين اللغتين الإنجليزية والعربية",
                "hero.cta": "اعرف المزيد",
                "features.title": "مميزاتنا",
                "feature1.title": "تصميم متجاوب",
                "feature1.desc": "يظهر موقعنا بشكل رائع على جميع الأجهزة، من الهواتف المحمولة إلى أجهزة الكمبيوتر المكتبية.",
                "feature2.title": "دعم ثنائي اللغة",
                "feature2.desc": "دعم كامل للغتين الإنجليزية والعربية مع تطبيق صحيح للكتابة من اليمين إلى اليسار.",
                "feature3.title": "أداء سريع",
                "feature3.desc": "الشفرة المحسنة تضمن تحميل الموقع بسرعة وتشغيله بسلاسة.",
                "cta.title": "هل أنت مستعد للبدء؟",
                "cta.desc": "انضم إلى آلاف العملاء الراضين الذين يستخدمون خدماتنا حول العالم.",
                "cta.button": "اتصل بنا",
                "footer.about": "من نحن",
                "footer.about.desc": "نحن شركة مكرسة لتقديم حلول ويب ثنائية اللغة عالية الجودة.",
                "footer.links": "روابط سريعة",
                "footer.contact": "معلومات الاتصال",
                "footer.address": "١٢٣ اسم الشارع، المدينة، البلد",
                "footer.phone": "٨٩٠ ٥٦٧ ٢٣٤ ١+",
                "footer.email": "info@example.com",
                "footer.copyright": "© ٢٠٢٣ الموقع ثنائي اللغة. جميع الحقوق محفوظة."
            }
        };
        
        console.log('Loaded fallback translations');
    },
    
    /**
     * Detect user's preferred language
     */
    detectLanguage: function() {
        // Check URL parameter first
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        
        if (langParam && this.isValidLanguage(langParam)) {
            this.currentLang = langParam;
            return;
        }
        
        // Check localStorage
        const storedLang = localStorage.getItem('language');
        if (storedLang && this.isValidLanguage(storedLang)) {
            this.currentLang = storedLang;
            return;
        }
        
        // Check browser language
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang) {
            // Check if browser language starts with 'ar'
            if (browserLang.startsWith('ar')) {
                this.currentLang = 'ar';
                return;
            }
        }
        
        // Default to English if no preference detected
        this.currentLang = this.defaultLang;
    },
    
    /**
     * Check if a language code is valid
     */
    isValidLanguage: function(langCode) {
        return Object.keys(this.languages).includes(langCode);
    },
    
    /**
     * Apply language to the page
     */
    applyLanguage: function(langCode) {
        if (!this.isValidLanguage(langCode)) {
            console.error(`Invalid language code: ${langCode}`);
            return;
        }
        // Set the current language
        this.currentLang = langCode;
        // Update the document direction
        document.documentElement.setAttribute('dir', this.languages[langCode].dir);
        // Update the document language
        document.documentElement.setAttribute('lang', langCode);
        // Update the page content
        this.updateContent();
        // Store the selected language in localStorage
        localStorage.setItem('language', langCode);
        console.log(`Language applied: ${langCode}`);
    },
    
    /**
     * Load direction-specific CSS
     */
    loadDirectionalCSS: function(direction) {
        // Remove existing direction-specific stylesheet if it exists
        const existingLink = document.getElementById('direction-css');
        if (existingLink) {
            existingLink.remove();
        }
        
        // Create and append the new stylesheet link
        const link = document.createElement('link');
        link.id = 'direction-css';
        link.rel = 'stylesheet';
        link.href = `./css/${direction}.css`;
        document.head.appendChild(link);
    },
    
    /**
     * Update all translatable content on the page
     */
    updatePageContent: function() {
        // Get all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            // Check if element has data-i18n-attr attribute
            const attr = element.getAttribute('data-i18n-attr');
            
            if (attr) {
                // Update the specified attribute
                element.setAttribute(attr, translation);
            } else {
                // Update the element's content
                element.textContent = translation;
            }
        });
        
        // Handle placeholder translations
        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.getTranslation(key);
        });
        
        // Handle HTML content translations
        const htmlElements = document.querySelectorAll('[data-i18n-html]');
        htmlElements.forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            element.innerHTML = this.getTranslation(key);
        });
    },
    
    /**
     * Get translation for a key
     */
    getTranslation: function(key) {
        // Check if translations and current language exist
        if (!this.translations || !this.translations[this.currentLang]) {
            return key; // Return the key as fallback
        }
        
        // Get translation or return key as fallback
        return this.translations[this.currentLang][key] || key;
    },
    
    /**
     * Update the language toggle button text and mark active language
     */
    updateLanguageToggle: function() {
        const toggleBtn = document.getElementById('language-toggle');
        if (toggleBtn) {
            // Update button text to show the other language option
            const otherLang = this.currentLang === 'en' ? 'ar' : 'en';
            const switchText = this.getTranslation('lang.switch');
            
            // Find the span element inside the button
            const spanElement = toggleBtn.querySelector('span[data-i18n="lang.switch"]');
            if (spanElement) {
                spanElement.textContent = switchText;
            } else {
                // Fallback: update the entire button text if span not found
                toggleBtn.innerHTML = `<i class="fas fa-globe"></i> <span>${switchText}</span>`;
            }
            
            // Update aria-label
            toggleBtn.setAttribute('aria-label', `Switch to ${this.languages[otherLang].name}`);
        }
        
        // Update active state in language options
        const langOptions = document.querySelectorAll('.language-option');
        langOptions.forEach(option => {
            const optionLang = option.getAttribute('data-lang');
            if (optionLang === this.currentLang) {
                option.setAttribute('data-active', 'true');
                option.setAttribute('aria-selected', 'true');
            } else {
                option.setAttribute('data-active', 'false');
                option.setAttribute('aria-selected', 'false');
            }
        });
    },
    
    /**
     * Update URL parameter without page reload
     */
    updateURLParameter: function(langCode) {
        // Create new URL object
        const url = new URL(window.location.href);
        
        // Set or update the lang parameter
        url.searchParams.set('lang', langCode);
        
        // Update browser history without reloading the page
        window.history.replaceState({}, '', url.toString());
    },
    
    /**
     * Toggle between available languages
     */
    toggleLanguage: function() {
        const newLang = this.currentLang === 'en' ? 'ar' : 'en';
        this.applyLanguage(newLang);
    },
    
    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        // Find language toggle button
        const toggleBtn = document.getElementById('language-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                // Toggle dropdown visibility
                const options = document.querySelector('.language-options');
                if (options) {
                    options.classList.toggle('show');
                } else {
                    // Fallback to simple toggle if dropdown doesn't exist
                    this.toggleLanguage();
                }
            });
        }
        
        // Set up language option buttons
        const langOptions = document.querySelectorAll('.language-option');
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
                const lang = option.getAttribute('data-lang');
                if (lang) {
                    this.applyLanguage(lang);
                    
                    // Hide dropdown after selection
                    const options = document.querySelector('.language-options');
                    if (options) {
                        options.classList.remove('show');
                    }
                }
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-switcher')) {
                const options = document.querySelector('.language-options');
                if (options) {
                    options.classList.remove('show');
                }
            }
        });
        
        // Listen for font loading events
        document.fonts.ready.then(() => {
            // Mark all fonts as loaded
            this.fontsLoaded.en = true;
            this.fontsLoaded.ar = true;
            
            // Remove font loading class
            document.body.classList.remove('font-loading');
            
            console.log('Fonts loaded successfully');
        });
    },
    
    /**
     * Preload fonts for both languages
     */
    preloadFonts: function() {
        // English fonts are usually loaded by default
        this.fontsLoaded.en = true;
        
        // For Arabic fonts, we'll create a preload link
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&family=Amiri:wght@400;700&display=swap';
        preloadLink.as = 'style';
        preloadLink.onload = () => {
            // Create and append the stylesheet link
            const styleLink = document.createElement('link');
            styleLink.rel = 'stylesheet';
            styleLink.href = preloadLink.href;
            document.head.appendChild(styleLink);
            
            // Mark Arabic fonts as loaded
            this.fontsLoaded.ar = true;
            
            // If current language is Arabic, remove font loading class
            if (this.currentLang === 'ar') {
                document.body.classList.remove('font-loading');
            }
        };
        
        document.head.appendChild(preloadLink);
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    I18N.init();
});