const THEME_ICON = `
  <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="8"></circle>
    <path d="M12 4v16"></path>
  </svg>
`;

function getStoredTheme() {
    try {
        return localStorage.getItem('theme');
    } catch (error) {
        return null;
    }
}

function syncThemeSensitiveMedia(activeTheme) {
    const heroImage = document.getElementById('hero-image');
    if (!heroImage) return;

    const theme = activeTheme === 'dark' ? 'dark' : 'light';
    const src = heroImage.getAttribute(`data-${theme}-src`);
    const srcset = heroImage.getAttribute(`data-${theme}-srcset`);

    if (src) {
        heroImage.setAttribute('src', src);
    }

    if (srcset) {
        heroImage.setAttribute('srcset', srcset);
    }
}

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
                    <span class="theme-icon" aria-hidden="true">${THEME_ICON}</span>
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

    const applyTheme = (activeTheme, persistPreference = false) => {
        const nextTheme = activeTheme === 'dark' ? 'dark' : 'light';
        body.setAttribute('data-theme', nextTheme);
        root.setAttribute('data-theme', nextTheme);
        syncThemeSensitiveMedia(nextTheme);
        updateButtonState(nextTheme);

        if (persistPreference) {
            try {
                localStorage.setItem('theme', nextTheme);
            } catch (error) {
                // Ignore storage failures and keep the in-memory theme state.
            }
        }
    };

    // Determine initial theme from documentElement (set by preload) or localStorage
    const initial = root.getAttribute('data-theme') || getStoredTheme() || 'light';
    applyTheme(initial);

    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme, true);
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
});
