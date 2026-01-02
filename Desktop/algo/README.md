# Algo AI Chatbot Landing Page

## Overview

This is a single-page landing page for Algo, an AI Chatbot Agency. The landing page showcases the company's services and features a live chatbot demo that visitors can interact with.

## Features

- Modern, responsive design with dark mode visuals
- Interactive AI chatbot demo connected via n8n
- Semantic HTML structure for SEO optimization
- Animations and visual effects
- Mobile-friendly layout

## Tech Stack

- HTML5
- CSS3 with Tailwind CSS
- Vanilla JavaScript
- Integration with n8n for chatbot functionality

## Project Structure

```
/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
├── .env                # Environment variables
└── README.md           # Documentation
```

## Setup Instructions

### Local Development

1. Clone the repository to your local machine
2. Open the project folder in your code editor
3. For local development, the chatbot uses a mock API (included in script.js)

### Connecting to n8n

1. Set up an n8n workflow that accepts webhook requests
2. Update the `.env` file with your n8n webhook URL:
   ```
   N8N_URL=https://your-n8n-instance.com
   ```
3. For production deployment, ensure your hosting platform supports environment variables

## Customization

### Colors

The color scheme is defined in both the Tailwind configuration (in index.html) and in the CSS variables (in styles.css):

```css
:root {
    --primary: #A020F0;
    --accent: #FF00FF;
    --background: #0A0A23;
    --text: #E0E0E0;
    --glass-bg: rgba(10, 10, 35, 0.7);
    --border-color: rgba(255, 255, 255, 0.1);
}
```

### Content

To update the content, edit the text within the HTML file. The page is structured into sections:

- Header
- Hero
- Features
- Trusted Clients
- Live Chatbot Demo
- Benefits
- Testimonials
- Final CTA
- Footer

### Chatbot Behavior

The chatbot functionality is in `script.js`. For development, it uses a mock API with predefined responses. In production, it connects to your n8n webhook.

## Deployment

### Netlify

1. Push your code to a Git repository
2. Connect your repository to Netlify
3. Set the environment variables in the Netlify dashboard
4. Deploy

### Vercel

1. Push your code to a Git repository
2. Import the project in Vercel
3. Configure the environment variables
4. Deploy

## Browser Compatibility

The landing page is compatible with modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Images should be optimized before adding to the project
- Consider using a CDN for production deployment
- Enable GZIP compression on your server

## Security Considerations

- Input sanitization is implemented to prevent XSS attacks
- Rate limiting is implemented for the chatbot API
- Environment variables are used to store sensitive information

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

---

© 2025 Algo AI Chatbot . All rights reserved.