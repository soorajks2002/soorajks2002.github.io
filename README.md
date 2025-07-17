# Portfolio Website

A clean, minimal portfolio website with dark/light mode and a markdown-based blog system.

## Features

- **Clean Typography**: Uses Charter and Inter fonts for excellent readability
- **Dark/Light Mode**: Automatic system preference detection with manual toggle
- **Responsive Design**: Works perfectly on all devices
- **Blog System**: Write posts in Markdown, convert to HTML
- **Minimal Design**: Text-heavy, content-focused design

## Structure

```
├── index.html          # Main portfolio page
├── style.css           # Shared styles for all pages
├── blog/
│   ├── index.html      # Blog listing page
│   ├── build.js        # Markdown to HTML converter
│   ├── *.md            # Markdown blog posts
│   └── *.html          # Generated HTML blog posts
└── README.md
```

## Writing Blog Posts

### 1. Create a Markdown File

Create a new `.md` file in the `blog/` directory:

```markdown
# Your Blog Post Title

**Published:** January 15, 2024

Your blog post content here. You can use:

## Headers

### Subheaders

**Bold text** and `inline code`.

```javascript
// Code blocks with syntax highlighting
function example() {
  return "Hello, world!";
}
```

- Bullet points
- Lists work great

[Links](https://example.com) are supported too.
```

### 2. Convert to HTML

Run the build script to convert your markdown to HTML:

```bash
cd blog
node build.js your-post-name.md
```

This creates `your-post-name.html` with the proper styling and navigation.

### 3. Update Blog Index

Add your new post to `blog/index.html` and the main `index.html` blog section.

## Customization

### Colors

Edit the CSS variables in `style.css`:

```css
:root {
  --color-bg: #ffffff;
  --color-text: #2a2a2a;
  --color-accent: #2563eb;
  /* ... */
}

[data-theme="dark"] {
  --color-bg: #0f0f0f;
  --color-text: #e5e5e5;
  --color-accent: #60a5fa;
  /* ... */
}
```

### Content

Update the following sections in `index.html`:
- About Me
- Work Experience  
- Projects
- Contact links

### Fonts

The site uses:
- **Charter**: For body text (serif, excellent for reading)
- **Inter**: For headings and UI elements (sans-serif, modern)
- **Monaco/Menlo**: For code blocks (monospace)

To change fonts, update the Google Fonts link and CSS font-family declarations.

## Deployment

This is a static site that can be deployed anywhere:

- **GitHub Pages**: Push to your `username.github.io` repository
- **Netlify**: Drag and drop the folder or connect your repo
- **Vercel**: Deploy directly from GitHub
- **Traditional hosting**: Upload files via FTP

## Blog Workflow

1. Write your post in markdown (`blog/post-name.md`)
2. Convert to HTML (`node build.js post-name.md`)
3. Add the post to your blog index pages
4. Commit and push to deploy

## Tips

- Keep the markdown files for editing, but deploy the HTML versions
- The build script is basic - consider using `marked` or `remark` for production
- Images can be stored in a `blog/assets/` folder
- The design prioritizes readability and simplicity over flashy effects

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and CSS Custom Properties required
- JavaScript required for dark mode toggle

---

Built with HTML, CSS, and a touch of JavaScript. No frameworks, no build process required. 