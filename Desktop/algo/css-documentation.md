# CSS Architecture Documentation

## Overview
This document outlines the CSS architecture and component system for the AlgoBot website.

## Design System

### Color Palette
```css
--primary: #A020F0;     /* Purple - Primary brand color */
--accent: #FF00FF;      /* Magenta - Accent color */
--background: #0A0A23;  /* Dark blue - Main background */
--text: #E0E0E0;        /* Light gray - Primary text */
```

### Typography Scale
```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
```

### Spacing Scale
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
```

## Utility Classes

### Color Utilities
- `.text-primary` - Primary brand color
- `.text-accent` - Accent color
- `.text-white` - White text
- `.text-gray-200` - Light gray text
- `.text-gradient-primary` - Primary gradient text effect
- `.text-gradient-secondary` - Secondary gradient text effect

### Typography Utilities
- `.font-xs` to `.font-4xl` - Font size utilities
- `.font-light` to `.font-black` - Font weight utilities

### Spacing Utilities
- `.m-1` to `.m-8` - Margin utilities
- `.mb-1` to `.mb-12` - Margin bottom utilities
- `.p-1` to `.p-8` - Padding utilities

## Component Classes

### Hero Title Component
```html
<h1 class="hero-title">
    <span class="hero-title__line hero-title__line--white">Line 1</span>
    <span class="hero-title__line hero-title__line--primary">Line 2</span>
    <span class="hero-title__line hero-title__line--gradient">Line 3</span>
</h1>
```

**Modifiers:**
- `hero-title__line--white` - White text
- `hero-title__line--primary` - Primary color text
- `hero-title__line--gradient` - Gradient text effect

### Hero Subtitle Component
```html
<p class="hero-subtitle">
    Subtitle text with <span class="text-primary">highlighted</span> words.
</p>
```

### Button Component
```html
<a href="#" class="btn btn-primary">
    Button Text
</a>
```

**Features:**
- Performance optimized with `will-change: transform`
- Accessible focus management
- Smooth hover animations

## Accessibility Features

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

### Focus Management
- All interactive elements have visible focus indicators
- Focus outlines use brand colors for consistency
- Proper contrast ratios maintained

### RTL Support
```css
[dir="rtl"] .hero-title,
[dir="rtl"] .hero-subtitle {
    text-align: center;
}
```

## Performance Optimizations

1. **Transform-based animations** instead of layout-changing properties
2. **will-change** property for elements that will be animated
3. **Reduced motion** media query support
4. **Efficient selectors** to minimize CSS parsing time

## Maintenance Guidelines

1. **Use utility classes** instead of inline styles
2. **Follow BEM methodology** for component naming
3. **Update design tokens** in CSS custom properties
4. **Test accessibility** with screen readers and keyboard navigation
5. **Validate color contrast** ratios (minimum 4.5:1)

## Browser Support

- Modern browsers (Chrome 88+, Firefox 85+, Safari 14+)
- CSS Grid and Flexbox support required
- CSS Custom Properties support required
- Backdrop-filter support for glassmorphism effects

## File Organization

Current structure:
```
styles.css (monolithic)
```

Recommended structure:
```
css/
├── base/
│   ├── reset.css
│   ├── typography.css
│   └── variables.css
├── components/
│   ├── buttons.css
│   ├── hero.css
│   └── navigation.css
├── utilities/
│   ├── spacing.css
│   ├── colors.css
│   └── animations.css
└── main.css (imports all)
```

## Future Improvements

1. Split CSS into modular files
2. Implement CSS autoprefixer
3. Add CSS minification for production
4. Implement visual regression testing
5. Add Stylelint for code quality