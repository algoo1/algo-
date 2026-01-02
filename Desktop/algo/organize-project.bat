@echo off
echo Creating folder structure...

:: Create directories
mkdir "assets\css"
mkdir "assets\js"
mkdir "assets\images"
mkdir "assets\icons"
mkdir "pages"
mkdir "config"

:: Move CSS files
echo Moving CSS files...
move "styles.css" "assets\css\"

:: Move JavaScript files
echo Moving JavaScript files...
move "script.js" "assets\js\"

:: Move image files
echo Moving image files...
move "image\logo.jpg" "assets\images\"
move "IMG_*.jpg" "assets\images\"

:: Move HTML pages
echo Moving HTML pages...
move "about-bot.html" "pages\"
move "start.html" "pages\"
move "start (1).html" "pages\start-backup.html"

:: Move configuration files
echo Moving configuration files...
move "manifest.json" "config\"
move "robots.txt" "config\"
move "sitemap.xml" "config\"
move "web.config" "config\"
move "DOC-20250616-WA0031.htaccess" "config\.htaccess"
move "DOC-20250616-WA0030.env" "config\.env"

:: Update file references in HTML files
echo Updating file references in HTML files...

:: Note: This batch file creates the folder structure but doesn't update file references
:: You'll need to manually update the file paths in HTML, CSS, and JS files

echo.
echo Folder structure created successfully!
echo Please update file references in your HTML, CSS, and JS files.
echo.

pause