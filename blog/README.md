# Blog System Guide

This guide explains how to add new blog posts to your portfolio website. You have two options: **Markdown files** (recommended for writing) or **HTML files** (for direct publishing).

## 📝 Option 1: Using Markdown Files (Recommended)

### Why Markdown?
- **Easier to write**: Focus on content, not HTML tags
- **Portable**: Works with any static site generator
- **Version control friendly**: Better diffs in Git
- **Future-proof**: Easy to migrate to other systems

### How to Add a Markdown Blog Post

1. **Create the markdown file** in the `blog/` folder:
   ```
   blog/your-post-title.md
   ```

2. **Use this template**:
   ```markdown
   ---
   title: "Your Post Title"
   date: "2024-01-25"
   excerpt: "A brief description of your post for the blog index"
   ---

   # Your Post Title

   Your introduction paragraph goes here. Keep it engaging and set the context for what readers will learn.

   ## Main Section

   Your content here. You can use all standard markdown features:

   ### Subsection

   - Bullet points
   - Another point
   - And more

   ### Code Examples

   Inline `code` or code blocks:

   ```javascript
   function example() {
       return "Hello, World!";
   }
   ```

   ### Lists and Links

   1. Numbered lists
   2. Are also supported
   3. [Links work too](https://example.com)

   ## Conclusion

   Wrap up your thoughts here.
   ```

3. **To publish the markdown post**:
   - **Option A**: Convert to HTML using the conversion script (see below)
   - **Option B**: Use a static site generator like Jekyll, Hugo, or Astro
   - **Option C**: Manual conversion (copy content into HTML template)

### Quick Conversion Script

Create a simple Node.js script to convert markdown to HTML:

```bash
# In your blog folder, create a package.json
npm init -y

# Install markdown-it for conversion
npm install markdown-it

# Create convert.js script (see below)
```

**convert.js**:
```javascript
const fs = require('fs');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

// Read your markdown file
const markdownContent = fs.readFileSync('your-post.md', 'utf8');

// Extract frontmatter (title, date, excerpt)
const parts = markdownContent.split('---');
const frontmatter = parts[1];
const content = parts[2];

// Convert markdown to HTML
const htmlContent = md.render(content);

// Create full HTML page using your template
const fullHTML = `<!DOCTYPE html>
<html lang="en">
<!-- Your full HTML template with ${htmlContent} inserted -->
</html>`;

// Write the HTML file
fs.writeFileSync('your-post.html', fullHTML);
```

## 🌐 Option 2: Direct HTML Files

If you prefer to publish directly as HTML, follow this process:

### HTML Template Structure

Every blog post should follow this exact structure:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Post Title - soorajks2002</title>
    <link rel="stylesheet" href="../style.css">
</head>

<body>
    <div class="container">
        <!-- Navigation -->
        <nav class="top-nav">
            <a href="../index.html" class="nav-brand">soorajks2002</a>
            <div class="nav-right">
                <ul class="nav-links">
                    <li><a href="../experience.html">Experience</a></li>
                    <li><a href="../projects.html">Projects</a></li>
                                         <li><a href="../blog.html" class="active">Blog</a></li>
                </ul>
                <button class="theme-toggle" id="theme-toggle">
                    <span class="theme-icon">Dark</span>
                </button>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="content">
            <article class="blog-article">
                <header>
                                         <div class="back-link">
                         <a href="../blog.html">← Back to Blog</a>
                     </div>
                    <h1>Your Post Title</h1>
                    <div class="meta">January 25, 2024</div>
                </header>

                <div class="content">
                    <!-- YOUR BLOG CONTENT GOES HERE -->
                    
                </div>
            </article>
        </main>

        <!-- Footer -->
        <footer class="footer">
            <div class="footer-content">
                <h3>Connect with me</h3>
                <p class="footer-quote">Questions about this post? Reach out!</p>
                <div class="footer-social-links">
                    <a href="https://github.com/soorajks2002" title="GitHub">GitHub</a>
                    <a href="https://twitter.com/soorajks2002" title="Twitter/X">Twitter/X</a>
                    <a href="https://linkedin.com/in/soorajks2002" title="LinkedIn">LinkedIn</a>
                    <a href="mailto:soorajks2002@gmail.com" title="Email">Email</a>
                </div>
                <p class="footer-copyright">© 2024 soorajks2002</p>
            </div>
        </footer>
    </div>

    <script src="../script.js"></script>
</body>

</html>
```

### HTML Content Elements

Use these elements in your blog posts:

```html
<!-- Headings -->
<h2>Section Title</h2>
<h3>Subsection</h3>

<!-- Text -->
<p>Paragraph text with <strong>bold</strong> and <em>italic</em> formatting.</p>

<!-- Lists -->
<ul>
    <li>Bullet point</li>
    <li>Another point</li>
</ul>

<ol>
    <li>Numbered item</li>
    <li>Next item</li>
</ol>

<!-- Code -->
<p>Use <code>inline code</code> for short snippets.</p>

<pre><code>// Multi-line code blocks
function example() {
    return "Hello, World!";
}
</code></pre>

<!-- Links -->
<p>Link to <a href="https://example.com">external resources</a>.</p>

<!-- Images (if you add any) -->
<p><img src="../assets/images/your-image.jpg" alt="Description" /></p>
```

## 📄 Updating the Blog Index

**Every time you add a new post**, you must update `blog.html` (in the root directory):

1. Open `blog.html` 
2. Find the `<ul class="blog-posts">` section
3. Add your new post **at the top** (newest first):

```html
<li class="blog-post">
    <h3><a href="blog/your-post-filename.html">Your Post Title</a></h3>
    <div class="date">January 25, 2024</div>
    <p class="excerpt">
        Brief 2-3 sentence description of the post content.
        Make it engaging to encourage clicks.
    </p>
</li>
```

## 🚀 Publishing Workflow

### For Markdown Approach:
1. Write your post in markdown: `blog/my-awesome-post.md`
2. Convert to HTML (manually or with script)
3. Update `blog.html` (in root) with new post entry
4. Commit and push to GitHub

### For HTML Approach:
1. Create HTML file: `blog/my-awesome-post.html`
2. Update `blog.html` (in root) with new post entry
3. Commit and push to GitHub

## 🎯 File Naming Conventions

- **Use lowercase letters and hyphens**: `react-performance-tips.html`
- **Be descriptive but concise**: `database-optimization-guide.html`
- **Avoid special characters**: No spaces, underscores, or symbols
- **Keep it URL-friendly**: Think about how it will look in the browser

## 🔧 Tips for Great Blog Posts

1. **Start with an outline** before writing
2. **Use clear headings** to structure your content
3. **Include code examples** for technical posts
4. **Keep paragraphs short** for better readability
5. **End with a call to action** or conclusion
6. **Test your links** before publishing
7. **Proofread** for typos and grammar

## 📁 Current Blog Structure

```
/
├── blog.html           # Blog listing page (main blog page)
└── blog/
    ├── README.md       # This guide
    ├── init-blog.html  # Example post
    └── [your-posts].html   # Your blog posts
```

## 🤝 Need Help?

- Check the `init-blog.html` file as a working example
- Follow the HTML template exactly for consistency
- Test your posts locally before pushing
- Feel free to modify the styling in the main `style.css` if needed

Happy blogging! 🎉 