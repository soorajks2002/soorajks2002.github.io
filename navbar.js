// Navbar component for all pages
function createNavbar(currentPage = '') {
    // Determine path prefix based on directory depth
    const path = window.location.pathname;
    let pathPrefix = '';

    if (path.includes('/experience/') || path.includes('/projects/') || path.includes('/techstack/')) {
        // Section pages (1 level deep: /experience/, /projects/, /techstack/)
        pathPrefix = '../';
    }

    return `
        <nav class="top-nav">
            <a href="${pathPrefix}" class="nav-brand ${currentPage === 'home' ? 'active' : ''}">soorajks2002</a>
            <div class="nav-right">
                <ul class="nav-links">
                    <li><a href="${pathPrefix}experience/" ${currentPage === 'experience' ? 'class="active"' : ''}>Experience</a></li>
                    <li><a href="${pathPrefix}projects/" ${currentPage === 'projects' ? 'class="active"' : ''}>Projects</a></li>
                    <li><a href="${pathPrefix}techstack/" ${currentPage === 'techstack' ? 'class="active"' : ''}>Techstack</a></li>
                </ul>
                <button class="theme-toggle" id="theme-toggle">
                    <span class="theme-icon">Dark</span>
                </button>
            </div>
        </nav>
    `;
}

// Insert navbar into the page
function insertNavbar(currentPage = '') {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = createNavbar(currentPage);

        // Initialize theme toggle after navbar is inserted
        initializeThemeToggle();
    }
}

// Theme toggle functionality (moved from script.js)
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const body = document.body;

    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);

    // Set initial button text - show the option to switch TO
    themeIcon.textContent = savedTheme === 'dark' ? 'Light' : 'Dark';

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Update button text to show the option to switch TO
        themeIcon.textContent = newTheme === 'dark' ? 'Light' : 'Dark';
    });
}

// Auto-detect current page based on URL
function getCurrentPage() {
    const path = window.location.pathname;

    // Remove trailing slash for consistent matching
    const cleanPath = path.replace(/\/$/, '');

    if (cleanPath === '' || cleanPath === '/index.html') {
        return 'home';
    } else if (cleanPath.includes('/experience')) {
        return 'experience';
    } else if (cleanPath.includes('/projects')) {
        return 'projects';
    } else if (cleanPath.includes('/techstack')) {
        return 'techstack';
    }

    return '';
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = getCurrentPage();
    insertNavbar(currentPage);
}); 