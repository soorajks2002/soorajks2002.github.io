# Sooraj Kumar S - Portfolio

A clean, minimal portfolio website showcasing my work as a software engineer. Built with pure HTML, CSS, and JavaScript - no frameworks, no build process.

## 🌟 Features

- **Monochrome Design**: Clean black & white aesthetic with strategic color accents
- **Dark/Light Theme**: Automatic theme switching with persistent preferences
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Blog System**: Write posts in Markdown, generate static HTML
- **Clean URLs**: No `.html` extensions (e.g., `/blog/my-post/` instead of `/blog/my-post.html`)
- **Typography-First**: Beautiful typography with carefully selected fonts
- **Fast & Lightweight**: Pure vanilla web technologies

## 🚀 Live Demo

Visit the live portfolio: [soorajks2002.github.io](https://soorajks2002.github.io)

## 🎨 Design Philosophy

This portfolio follows a minimalist design approach:
- **Content First**: Focus on showcasing work and writing
- **Readability**: Typography optimized for extended reading
- **Accessibility**: High contrast, semantic HTML, keyboard navigation
- **Performance**: Zero dependencies, fast loading times

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: CSS Custom Properties, Flexbox, Grid
- **Typography**: Noto Sans, Playfair Display, Saira, Asap, JetBrains Mono
- **Blog**: Python-based Markdown to HTML generator
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
├── index.html              # Home page
├── experience/
│   └── index.html         # Work experience (/experience/)
├── projects/
│   └── index.html         # Project showcase (/projects/)
├── blog/
│   ├── index.html         # Blog listing (/blog/)
│   ├── template.html      # Blog post template
│   ├── markdown/
│   │   ├── my-post.md     # Markdown source files
│   │   └── getting-started.md # (organized under blog)
│   ├── my-post/
│   │   └── index.html     # Blog post (/blog/my-post/)
│   └── getting-started/
│       └── index.html     # Blog post (/blog/getting-started/)
├── style.css              # Global styles
├── navbar.js              # Navigation component
├── footer.js              # Footer component
├── scripts/
│   └── generate_blog.py   # Enhanced blog generator
└── assets/
    ├── profile/           # Hero images
    └── images/            # Blog images
```

## 🔧 Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/soorajks2002/soorajks2002.github.io.git
   cd soorajks2002.github.io
   ```

2. **Serve locally** (choose one)
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open browser**
   Navigate to `http://localhost:8000`

## ✍️ Writing Blog Posts

Create new blog posts easily with the enhanced Python generator:

```bash
# Create a markdown file in blog/markdown/ directory
echo "---
title: My New Post
date: January 15, 2024
excerpt: A brief description of your post
---

# Hello World

This is my **new blog post**!" > blog/markdown/my-new-post.md

# Generate HTML with automatic blog listing update
python3 scripts/generate_blog.py blog/markdown/my-new-post.md my-new-post
```

See [docs/BLOG-GENERATOR.md](docs/BLOG-GENERATOR.md) for detailed instructions.

## 🎨 Customization

The design system uses CSS custom properties for easy theming:

```css
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
  --accent-color: #8b5cf6;  /* Light mode highlight */
}

[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #f5f5f5;
  --accent-color: #fbbf24;  /* Dark mode highlight */
}
```

## 🚢 Deployment

This site is deployed on GitHub Pages:

1. **Fork or clone** this repository
2. **Customize** content and styling
3. **Push to GitHub** (ensure repository is named `yourusername.github.io`)
4. **Enable GitHub Pages** in repository settings

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to:
- Fork this repository for your own portfolio
- Submit issues for bugs or suggestions
- Create pull requests for improvements

## 📬 Contact

- **Website**: [soorajks2002.github.io](https://soorajks2002.github.io)
- **GitHub**: [@soorajks2002](https://github.com/soorajks2002)
- **Email**: soorajks2002@gmail.com

---

*Built with ❤️ using vanilla web technologies* 