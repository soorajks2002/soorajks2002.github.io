const THEME_ICONS = {
    light: `
      <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="4.5"></circle>
        <path d="M12 2.5v2.5"></path>
        <path d="M12 19v2.5"></path>
        <path d="M4.9 4.9l1.8 1.8"></path>
        <path d="M17.3 17.3l1.8 1.8"></path>
        <path d="M2.5 12h2.5"></path>
        <path d="M19 12h2.5"></path>
        <path d="M4.9 19.1l1.8-1.8"></path>
        <path d="M17.3 6.7l1.8-1.8"></path>
      </svg>
    `,
    system: `
      <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="3.5" y="4" width="17" height="12.5" rx="2"></rect>
        <path d="M8.5 20h7"></path>
        <path d="M12 16.5V20"></path>
      </svg>
    `,
    dark: `
      <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20 14.2A8.5 8.5 0 0 1 9.8 4A8.7 8.7 0 1 0 20 14.2z"></path>
      </svg>
    `
};

const THEME_OPTIONS = [
    { value: 'light', label: 'light' },
    { value: 'system', label: 'system' },
    { value: 'dark', label: 'dark' }
];

function isValidThemePreference(value) {
    return value === 'light' || value === 'dark' || value === 'system';
}

function getThemeTriggerIconKey(themePreference, activeTheme) {
    if (themePreference === 'system') {
        return 'system';
    }

    return activeTheme === 'dark' ? 'dark' : 'light';
}

function getStoredThemePreference() {
    try {
        const storedTheme = localStorage.getItem('theme');
        return isValidThemePreference(storedTheme) ? storedTheme : null;
    } catch (error) {
        return null;
    }
}

function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(themePreference) {
    if (themePreference === 'light' || themePreference === 'dark') {
        return themePreference;
    }

    return getSystemTheme();
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
    const initialTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const initialThemePreference = document.documentElement.getAttribute('data-theme-preference') || 'system';
    const initialThemeLabel = initialThemePreference === 'system' ? `system (${initialTheme})` : initialThemePreference;
    const initialThemeIconKey = getThemeTriggerIconKey(initialThemePreference, initialTheme);

    if (path.includes('/experience/') || path.includes('/projects/') || path.includes('/techstack/')) {
        pathPrefix = '../';
    }

    const themeOptionsMarkup = THEME_OPTIONS.map(({ value, label }) => `
        <button class="theme-option" type="button" role="menuitemradio" data-theme-option="${value}" aria-checked="false" aria-label="${label}" title="${label}">
            <span class="theme-option-icon" aria-hidden="true">${THEME_ICONS[value]}</span>
            <span class="sr-only">${label}</span>
        </button>
    `).join('');

    return `
        <header class="top-nav">
            <div class="top-nav__inner">
                <a href="${pathPrefix}" class="nav-brand ${currentPage === 'home' ? 'active' : ''}">soorajks2002</a>
                <nav>
                    <ul class="nav-links">
                        <li><a href="${pathPrefix}experience/" ${currentPage === 'experience' ? 'class="active"' : ''}>experience</a></li>
                        <li><a href="${pathPrefix}projects/" ${currentPage === 'projects' ? 'class="active"' : ''}>projects</a></li>
                        <li><a href="${pathPrefix}techstack/" ${currentPage === 'techstack' ? 'class="active"' : ''}>techstack</a></li>
                    </ul>
                </nav>
                <div class="theme-selector" id="theme-selector">
                    <button class="theme-toggle" id="theme-toggle" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="theme-menu" aria-live="polite" aria-label="Select theme. Current: ${initialThemeLabel}" data-theme-preference="${initialThemePreference}" data-active-theme="${initialTheme}">
                        <span class="sr-only">Select theme. Current: ${initialThemeLabel}</span>
                        <span class="theme-icon" aria-hidden="true">${THEME_ICONS[initialThemeIconKey]}</span>
                    </button>
                    <div class="theme-menu" id="theme-menu" role="menu" aria-label="Theme" hidden>
                        ${themeOptionsMarkup}
                    </div>
                </div>
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
    const themeSelector = document.getElementById('theme-selector');
    const themeToggle = document.getElementById('theme-toggle');
    const themeMenu = document.getElementById('theme-menu');
    if (!themeSelector || !themeToggle || !themeMenu) return;

    const body = document.body;
    const root = document.documentElement;
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const srOnly = themeToggle.querySelector('.sr-only');
    const themeOptions = Array.from(themeMenu.querySelectorAll('[data-theme-option]'));
    const mediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

    const updateButtonState = (themePreference, activeTheme) => {
        const selectedOption = THEME_OPTIONS.find((option) => option.value === themePreference) || THEME_OPTIONS[1];
        const themeIconKey = getThemeTriggerIconKey(themePreference, activeTheme);
        themeToggle.setAttribute('data-theme-preference', themePreference);
        themeToggle.setAttribute('data-active-theme', activeTheme);
        const currentThemeLabel = themePreference === 'system' ? `system (${activeTheme})` : selectedOption.label;
        themeToggle.setAttribute('aria-label', `Select theme. Current: ${currentThemeLabel}`);
        if (srOnly) {
            srOnly.textContent = `Select theme. Current: ${currentThemeLabel}`;
        }

        if (themeIcon) {
            themeIcon.innerHTML = THEME_ICONS[themeIconKey] || THEME_ICONS.system;
        }

        themeOptions.forEach((optionButton) => {
            const isSelected = optionButton.getAttribute('data-theme-option') === themePreference;
            optionButton.setAttribute('aria-checked', String(isSelected));
            optionButton.classList.toggle('is-selected', isSelected);
        });
    };

    const applyTheme = (themePreference, persistPreference = false) => {
        const nextPreference = isValidThemePreference(themePreference) ? themePreference : 'system';
        const nextTheme = resolveTheme(nextPreference);
        body.setAttribute('data-theme', nextTheme);
        body.setAttribute('data-theme-preference', nextPreference);
        root.setAttribute('data-theme', nextTheme);
        root.setAttribute('data-theme-preference', nextPreference);
        syncThemeSensitiveMedia(nextTheme);
        updateButtonState(nextPreference, nextTheme);

        if (persistPreference) {
            try {
                localStorage.setItem('theme', nextPreference);
            } catch (error) {
                // Ignore storage failures and keep the in-memory theme state.
            }
        }
    };

    const positionMenu = () => {
        const viewportPadding = 16;
        themeMenu.style.left = '0';
        themeMenu.style.right = 'auto';

        const selectorRect = themeSelector.getBoundingClientRect();
        const menuRect = themeMenu.getBoundingClientRect();
        let offsetX = (selectorRect.width - menuRect.width) / 2;

        const overflowRight = selectorRect.left + offsetX + menuRect.width - (window.innerWidth - viewportPadding);
        if (overflowRight > 0) {
            offsetX -= overflowRight;
        }

        const overflowLeft = selectorRect.left + offsetX - viewportPadding;
        if (overflowLeft < 0) {
            offsetX -= overflowLeft;
        }

        themeMenu.style.left = `${offsetX}px`;
    };

    const openMenu = () => {
        themeMenu.hidden = false;
        themeSelector.classList.add('is-open');
        themeToggle.setAttribute('aria-expanded', 'true');
        positionMenu();

        const selectedOption = themeMenu.querySelector('[aria-checked="true"]');
        if (selectedOption) {
            selectedOption.focus();
        }
    };

    const closeMenu = (restoreFocus = false) => {
        themeMenu.hidden = true;
        themeSelector.classList.remove('is-open');
        themeToggle.setAttribute('aria-expanded', 'false');

        if (restoreFocus) {
            themeToggle.focus();
        }
    };

    const moveFocus = (currentOption, direction) => {
        const currentIndex = themeOptions.indexOf(currentOption);
        if (currentIndex === -1) return;

        const nextIndex = (currentIndex + direction + themeOptions.length) % themeOptions.length;
        themeOptions[nextIndex].focus();
    };

    const handleSystemThemeChange = () => {
        const themePreference = themeToggle.getAttribute('data-theme-preference') || 'system';
        if (themePreference === 'system') {
            applyTheme('system');
        }
    };

    const initialPreference = getStoredThemePreference() || 'system';
    applyTheme(initialPreference);

    themeToggle.addEventListener('click', () => {
        if (themeMenu.hidden) {
            openMenu();
            return;
        }

        closeMenu();
    });

    themeToggle.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            openMenu();
        }
    });

    themeOptions.forEach((optionButton) => {
        optionButton.addEventListener('click', () => {
            const nextPreference = optionButton.getAttribute('data-theme-option') || 'system';
            applyTheme(nextPreference, true);
            closeMenu(true);
        });

        optionButton.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                moveFocus(optionButton, 1);
                return;
            }

            if (event.key === 'ArrowUp') {
                event.preventDefault();
                moveFocus(optionButton, -1);
                return;
            }

            if (event.key === 'Home') {
                event.preventDefault();
                themeOptions[0].focus();
                return;
            }

            if (event.key === 'End') {
                event.preventDefault();
                themeOptions[themeOptions.length - 1].focus();
                return;
            }

            if (event.key === 'Escape') {
                event.preventDefault();
                closeMenu(true);
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (!themeSelector.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener('focusin', (event) => {
        if (!themeMenu.hidden && !themeSelector.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !themeMenu.hidden) {
            closeMenu(true);
        }
    });

    if (mediaQuery) {
        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', handleSystemThemeChange);
        } else if (typeof mediaQuery.addListener === 'function') {
            mediaQuery.addListener(handleSystemThemeChange);
        }
    }

    window.addEventListener('resize', () => {
        if (!themeMenu.hidden) {
            positionMenu();
        }
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
