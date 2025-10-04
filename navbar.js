const MODE_ICON = '<span class="mode-icon material-symbols-rounded">brightness_4</span>';

// Navbar component for all pages
function createNavbar(currentPage = '') {
    // Determine path prefix based on directory depth
    const path = window.location.pathname;
    let pathPrefix = '';

    if (path.includes('/experience/') || path.includes('/projects/') || path.includes('/techstack/')) {
        pathPrefix = '../';
    }

    return `
        <header class="top-nav">
            <div class="top-nav__inner">
                <a href="${pathPrefix}" class="nav-brand ${currentPage === 'home' ? 'active' : ''}">soorajks2002</a>
                <nav>
                    <ul class="nav-links">
                        <li><a href="${pathPrefix}experience/" ${currentPage === 'experience' ? 'class="active"' : ''}>Experience</a></li>
                        <li><a href="${pathPrefix}projects/" ${currentPage === 'projects' ? 'class="active"' : ''}>Projects</a></li>
                        <li><a href="${pathPrefix}techstack/" ${currentPage === 'techstack' ? 'class="active"' : ''}>Techstack</a></li>
                    </ul>
                </nav>
                <button class="theme-toggle" id="theme-toggle" type="button" data-theme-target="dark" aria-live="polite" aria-label="Switch theme">
                    <span class="sr-only">Switch theme</span>
                    <span class="theme-icon" aria-hidden="true">${MODE_ICON}</span>
                </button>
            </div>
        </header>
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
    if (!themeToggle) return;

    const body = document.body;
    const root = document.documentElement;
    const srOnly = themeToggle.querySelector('.sr-only');

    const updateButtonState = (activeTheme) => {
        const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';
        themeToggle.setAttribute('data-theme-target', targetTheme);
        themeToggle.setAttribute('aria-label', `Switch to ${targetTheme} theme`);
        if (srOnly) {
            srOnly.textContent = `Switch to ${targetTheme} theme`;
        }
    };

    // Determine initial theme from documentElement (set by preload) or localStorage
    const initial = root.getAttribute('data-theme') || localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', initial);
    root.setAttribute('data-theme', initial);
    updateButtonState(initial);

    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        body.setAttribute('data-theme', newTheme);
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateButtonState(newTheme);
    });
}

// Auto-detect current page based on URL
function getCurrentPage() {
    const path = window.location.pathname;
    const cleanPath = path.replace(/\/$/, '');

    if (cleanPath.includes('/experience')) return 'experience';
    if (cleanPath.includes('/projects')) return 'projects';
    if (cleanPath.includes('/techstack')) return 'techstack';

    // Treat any other path as home (covers GitHub Pages base paths)
    return 'home';
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = getCurrentPage();
    // Add a page-specific class to body for layout tweaks
    document.body.classList.add(`page-${currentPage || 'home'}`);
    insertNavbar(currentPage);

    // Smooth page transitions
    setupPageTransitions();
});

// Simple cross-page fade transition
function setupPageTransitions() {
    const body = document.body;

    // Fade-in on load
    body.classList.add('page-enter');
    requestAnimationFrame(() => {
        // Next frame: remove to transition to visible
        body.classList.remove('page-enter');
    });

    // Delegate clicks for internal links to add fade-out
    const anchors = Array.from(document.querySelectorAll('a[href]'));
    anchors.forEach((a) => {
        const url = new URL(a.href, window.location.href);
        const isSameOrigin = url.origin === window.location.origin;
        const isSamePageHash = url.pathname === window.location.pathname && url.hash;
        const isExternal = a.target === '_blank' || a.href.startsWith('mailto:') || a.href.startsWith('tel:');

        if (!isSameOrigin || isExternal || isSamePageHash) return;

        a.addEventListener('click', (e) => {
            // Only intercept left-click without modifier keys
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            const href = a.getAttribute('href');
            body.classList.add('page-exit');
            // Navigate after the transition
            setTimeout(() => {
                window.location.href = href;
            }, 220);
        });
    });
}
