# File Reference Updates After Reorganization

After running the `organize-project.bat` script, you'll need to update file references in your HTML, CSS, and JavaScript files. Here's a guide on what needs to be changed:

## HTML Files

### In `index.html`:

```html
<!-- Before -->
<link rel="stylesheet" href="styles.css">
<script src="script.js"></script>

<!-- After -->
<link rel="stylesheet" href="assets/css/styles.css">
<script src="assets/js/script.js"></script>

<!-- Before -->
<link rel="manifest" href="manifest.json">

<!-- After -->
<link rel="manifest" href="config/manifest.json">
```

### In `pages/about-bot.html` and `pages/start.html`:

```html
<!-- Before -->
<link rel="stylesheet" href="styles.css">
<script src="script.js"></script>

<!-- After -->
<link rel="stylesheet" href="../assets/css/styles.css">
<script src="../assets/js/script.js"></script>

<!-- Before -->
<link rel="manifest" href="manifest.json">

<!-- After -->
<link rel="manifest" href="../config/manifest.json">
```

## JavaScript Files

### In `assets/js/script.js`:

```javascript
// Before
navigator.serviceWorker.register('/service-worker.js')

// After
navigator.serviceWorker.register('/service-worker.js')
// No change needed as service worker remains at root level
```

## Service Worker

### In `service-worker.js`:

```javascript
// Before
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/favicon.svg',
  '/manifest.json',
  // ...
];

// After
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/styles.css',
  '/assets/js/script.js',
  '/assets/icons/favicon.svg',
  '/config/manifest.json',
  // ...
];
```

## Configuration Files

### In `config/sitemap.xml`:

No changes needed as it references external URLs.

### In `config/robots.txt`:

No changes needed as it references external URLs.

### In `config/manifest.json`:

```json
// Before
{
  "icons": [
    {
      "src": "favicon.svg",
      // ...
    }
  ]
}

// After
{
  "icons": [
    {
      "src": "assets/icons/favicon.svg",
      // ...
    }
  ]
}
```

## Important Notes

1. Make sure to test all links and functionality after reorganization
2. Update any image references in CSS files to point to the new locations
3. If you have any absolute paths in your code, they will need to be updated
4. Consider using relative paths where appropriate to make the site more portable

This guide covers the most common file references that need updating, but there may be others specific to your project.