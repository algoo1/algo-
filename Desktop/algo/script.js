// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Register Service Worker for PWA support
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    }

// Background Animation System
class BackgroundAnimations {
    constructor(containerPrefix = '') {
        const shootingId = containerPrefix ? `${containerPrefix}-shooting-stars-container` : 'shooting-stars-container';
        const twinklingId = containerPrefix ? `${containerPrefix}-twinkling-stars-container` : 'twinkling-stars-container';
        const glowingId = containerPrefix ? `${containerPrefix}-glowing-particles-container` : 'glowing-particles-container';
        
        this.shootingStarsContainer = document.getElementById(shootingId);
        this.twinklingStarsContainer = document.getElementById(twinklingId);
        this.glowingParticlesContainer = document.getElementById(glowingId);
        
        this.init();
    }
    
    init() {
        if (this.shootingStarsContainer) {
            this.startShootingStars();
        }
        if (this.twinklingStarsContainer) {
            this.startTwinklingStars();
        }
        if (this.glowingParticlesContainer) {
            this.startGlowingParticles();
        }
    }
    
    // Shooting Stars - appear randomly and move diagonally
    startShootingStars() {
        setInterval(() => {
            this.createShootingStar();
        }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds
    }
    
    createShootingStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        
        // Random starting position with 5px spacing consideration
        const gridSize = 5;
        const startX = Math.floor(Math.random() * (window.innerWidth - 200) / gridSize) * gridSize;
        const startY = Math.floor(Math.random() * (window.innerHeight / gridSize)) * gridSize;
        
        star.style.left = startX + 'px';
        star.style.top = startY + 'px';
        
        // Extended duration for complete lifecycle
        const duration = 10000; // 10 seconds total animation
        star.style.animationDuration = duration + 'ms';
        
        this.shootingStarsContainer.appendChild(star);
        
        // Remove after animation
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, duration);
    }
    
    // Twinkling Stars - pulse and reappear in new positions
    startTwinklingStars() {
        // Create initial stars
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                this.createTwinklingStar();
            }, i * 200);
        }
    }
    
    createTwinklingStar() {
        const star = document.createElement('div');
        star.className = 'twinkling-star';
        
        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.animation = `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`;
        
        this.twinklingStarsContainer.appendChild(star);
        
        // Remove and recreate in new position after random time
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
                // Create new star in different position
                setTimeout(() => {
                    this.createTwinklingStar();
                }, Math.random() * 1000);
            }
        }, 5000 + Math.random() * 5000);
    }
    
    // Glowing Particles - rise from bottom and fade
    startGlowingParticles() {
        setInterval(() => {
            this.createGlowingParticle();
        }, 1000 + Math.random() * 2000); // Random interval between 1-3 seconds
    }
    
    createGlowingParticle() {
        const particle = document.createElement('div');
        particle.className = 'glowing-particle';
        
        // Start from bottom at random x position
        const x = Math.random() * window.innerWidth;
        
        particle.style.left = x + 'px';
        particle.style.top = window.innerHeight + 'px';
        particle.style.animation = `particle-rise ${8 + Math.random() * 4}s ease-out forwards`;
        
        this.glowingParticlesContainer.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 12000);
    }
}

// Initialize background animations when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
    // Initialize global background animations
    new BackgroundAnimations();
});
} else {
    // Initialize global background animations
    new BackgroundAnimations();
}

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuButton = document.getElementById('close-menu-button');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    if (closeMenuButton && mobileMenu) {
        closeMenuButton.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    }

    // Close mobile menu when clicking on menu links
    if (mobileMenu) {
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Chat functionality
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    if (chatForm && userInput && chatMessages) {
        // Generate a session ID for this chat session
        const sessionId = generateSessionId();

        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const message = userInput.value.trim();
            
            if (message) {
                // Display user message
                displayUserMessage(message);
                userInput.value = '';
                
                // Show loading indicator
                const loadingIndicator = displayLoadingIndicator();
                
                // Send message to n8n webhook
                sendMessageToBot(message, sessionId)
                    .then(response => {
                        // Remove loading indicator
                        loadingIndicator.remove();
                        
                        // Display bot response
                        displayBotMessage(response);
                    })
                    .catch(error => {
                        // Remove loading indicator
                        loadingIndicator.remove();
                        
                        // Display error message
                        displayBotMessage("Sorry, something went wrong. Please try again later.");
                        console.error('Error:', error);
                    });
            }
        });
    }

    // Set up intersection observers for animations
    setupAnimations();
});

/**
 * Generates a unique session ID for the chat
 * @returns {string} A unique session ID
 */
function generateSessionId() {
    // Check if there's an existing session ID in localStorage
    let sessionId = localStorage.getItem('algo_chat_session_id');
    
    if (!sessionId) {
        // Generate a new session ID if none exists
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('algo_chat_session_id', sessionId);
    }
    
    return sessionId;
}

/**
 * Displays the user's message in the chat UI
 * @param {string} message - The message to display
 */
function displayUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'flex items-start justify-end mb-4';
    messageElement.innerHTML = `
        <div class="bg-background rounded-lg p-3 max-w-[80%] ml-auto">
            <p>${sanitizeInput(message)}</p>
        </div>
        <div class="w-8 h-8 rounded-full bg-background flex items-center justify-center ml-3">
            <span class="text-white text-xs font-bold">You</span>
        </div>
    `;
    
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.appendChild(messageElement);
    scrollToBottom(chatMessages);
}

/**
 * Displays a loading indicator in the chat UI
 * @returns {HTMLElement} The loading indicator element
 */
function displayLoadingIndicator() {
    const loadingElement = document.createElement('div');
    loadingElement.className = 'flex items-start mb-4';
    loadingElement.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mr-3">
            <span class="text-white text-xs font-bold">A</span>
        </div>
        <div class="bg-background rounded-lg p-3 max-w-[80%] flex items-center">
            <div class="spinner mr-2"></div>
            <p>Thinking...</p>
        </div>
    `;
    
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.appendChild(loadingElement);
    scrollToBottom(chatMessages);
    
    return loadingElement;
}

/**
 * Displays the bot's message in the chat UI
 * @param {string} message - The message to display
 */
function displayBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'flex items-start mb-4';
    messageElement.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mr-3">
            <span class="text-white text-xs font-bold">A</span>
        </div>
        <div class="bg-background rounded-lg p-3 max-w-[80%]">
            <p>${sanitizeInput(message)}</p>
        </div>
    `;
    
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.appendChild(messageElement);
    scrollToBottom(chatMessages);
}

/**
 * Scrolls the chat container to the bottom
 * @param {HTMLElement} container - The chat container element
 */
function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
}

/**
 * Sanitizes user input to prevent XSS attacks
 * @param {string} input - The input to sanitize
 * @returns {string} The sanitized input
 */
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

/**
 * Sends a message to the chatbot via n8n webhook
 * @param {string} message - The message to send
 * @param {string} sessionId - The session ID
 * @returns {Promise<string>} The bot's response
 */
async function sendMessageToBot(message, sessionId) {
    // In a production environment, this URL would be loaded from an environment variable
    // For this demo, we'll use a placeholder that would be replaced during deployment
    const webhookUrl = process.env.N8N_URL ? process.env.N8N_URL + '/webhook/chatbot' : '/api/chatbot';
    
    // Implement rate limiting
    const lastRequestTime = localStorage.getItem('algo_last_request_time');
    const now = Date.now();
    
    if (lastRequestTime && now - parseInt(lastRequestTime) < 1000) {
        // If less than 1 second has passed since the last request, delay this one
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Update the last request time
    localStorage.setItem('algo_last_request_time', Date.now().toString());
    
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                sessionId: sessionId
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.reply || "I didn't understand that. Could you try again?";
    } catch (error) {
        console.error('Error sending message to bot:', error);
        throw error;
    }
}

/**
 * Sets up intersection observers for fade-in animations
 */
function setupAnimations() {
    // Add the fade-in-section class to elements we want to animate
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
    });
    
    // Create an intersection observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible
    
    // Observe all sections
    const fadeElems = document.querySelectorAll('.fade-in-section');
    fadeElems.forEach(elem => {
        observer.observe(elem);
    });
}

// For development/demo purposes, we'll create a mock chatbot response
// This would be replaced by the actual n8n webhook in production
if (typeof process === 'undefined' || !process.env.N8N_URL) {
    // Mock API endpoint for development
    window.fetch = async function(url, options) {
        if (url.includes('/api/chatbot')) {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const requestData = JSON.parse(options.body);
            const userMessage = requestData.message.toLowerCase();
            
            // Simple response logic for demo purposes
            let botReply = "I'm sorry, I don't understand that question. Can you try asking something else?";
            
            if (userMessage.includes('hello') || userMessage.includes('hi')) {
                botReply = "Hello! How can I help you today?";
            } else if (userMessage.includes('pricing') || userMessage.includes('cost')) {
                botReply = "Our pricing starts at $29/month for the Basic plan. Would you like me to tell you more about our pricing options?";
            } else if (userMessage.includes('feature') || userMessage.includes('can you')) {
                botReply = "Algo can handle customer inquiries, schedule appointments, provide product information, and much more. What specific feature are you interested in?";
            } else if (userMessage.includes('integration') || userMessage.includes('connect')) {
                botReply = "We integrate seamlessly with most CRMs, websites, and messaging platforms including Slack, WhatsApp, and Facebook Messenger. No coding required!";
            } else if (userMessage.includes('demo') || userMessage.includes('try')) {
                botReply = "I'd be happy to set up a personalized demo for you! Please provide your email address and our team will contact you within 24 hours.";
            }
            
            return {
                ok: true,
                json: async () => ({ reply: botReply })
            };
        }
        
        // Pass through to the real fetch for other requests
        return originalFetch(url, options);
    };
}