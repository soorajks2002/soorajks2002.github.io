// Theme toggle functionality
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