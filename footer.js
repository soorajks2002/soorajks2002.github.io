// Footer component for all pages
function createFooter() {
    const currentYear = new Date().getFullYear();
    return `
        <footer class="footer">
            <div class="footer-content">
                <h3>Connect with me</h3>
                <p class="footer-quote">Always excited to connect with fellow developers and discuss interesting problems!</p>
                <div class="footer-social-links">
                    <a href="https://github.com/soorajks2002" title="GitHub">GitHub</a>
                    <a href="https://twitter.com/soorajks2002" title="Twitter/X">Twitter/X</a>
                    <a href="https://linkedin.com/in/soorajks2002" title="LinkedIn">LinkedIn</a>
                    <a href="mailto:soorajks2002@gmail.com" title="Email">Email</a>
                </div>
                <p class="footer-copyright">© ${currentYear} soorajks2002</p>
            </div>
        </footer>
    `;
}

// Insert footer into the page
function insertFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = createFooter();
    }
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', insertFooter);
