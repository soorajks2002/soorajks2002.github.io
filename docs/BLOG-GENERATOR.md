# 📝 Enhanced Blog Generation System

## Features
- ✅ **Organized source files** - All markdown files in `blog/markdown/` directory
- ✅ **Clean URL generation** - Automatic directory structure creation
- ✅ **Automatic pagination** - Configurable posts per page (default: 5)
- ✅ **Multiple page support** - Generates `/blog/page/2/`, `/blog/page/3/`, etc.
- ✅ **Automatic blog listing** - Updates main blog page automatically
- ✅ **Custom URL paths** - Control your blog post URLs
- ✅ **Excerpt support** - Rich blog post previews
- ✅ **Python-based** - No Node.js required!

## Quick Start

### Enhanced Workflow
1. Create markdown file in `blog/markdown/` directory:
```markdown
---
title: My Amazing Post
date: January 15, 2024
excerpt: A compelling description of your post for the blog listing
---

# My Content

Write your blog post in **markdown** here!
```

2. Generate blog post with custom URL:
```bash
python3 scripts/generate_blog.py blog/markdown/my-post.md my-custom-url
```

This will:
- ✅ Create `/blog/my-custom-url/index.html`
- ✅ Automatically update `/blog/` listing page
- ✅ Generate clean URL: `/blog/my-custom-url/`

## What You Get
- ✅ **Full HTML file** with navigation, styling, footer
- ✅ **Automatic pagination** with configurable posts per page
- ✅ **Clean pagination URLs** (`/blog/page/2/`, `/blog/page/3/`, etc.)
- ✅ **Automatic theme toggle** functionality  
- ✅ **Consistent design** with rest of site
- ✅ **SEO-friendly** structure
- ✅ **No manual HTML** required

## Pagination System

The blog generator automatically creates paginated listings when you have more than 5 posts (configurable). 

### Regenerate Pagination
```bash
# Regenerate all blog pages with current pagination
python3 scripts/generate_blog.py --regenerate-pagination
```

### Pagination Configuration
Edit `POSTS_PER_PAGE` in `scripts/generate_blog.py` to change posts per page:
```python
POSTS_PER_PAGE = 5  # Change to your preferred number
```

### URL Structure
- Main blog page: `/blog/`
- Page 2: `/blog/page/2/`
- Page 3: `/blog/page/3/`
- And so on...

## File Structure
```
├── blog/                     # All blog-related content
│   ├── markdown/             # Source markdown files
│   │   ├── my-first-post.md # Organized source files
│   │   └── getting-started.md # Easy to manage
│   ├── index.html           # Auto-updated listing
│   ├── template.html        # Reusable template
│   ├── my-first-post/
│   │   └── index.html       # Clean URL structure
│   └── getting-started/
│       └── index.html       # /blog/getting-started/
└── scripts/
    └── generate_blog.py     # Enhanced generator
```

## Benefits
- **Organized**: Source files separated from generated content
- **Automated**: Blog listing updates automatically
- **Clean URLs**: No `.html` extensions in URLs
- **Custom paths**: Control your blog post URLs
- **Fast**: Create and publish posts in seconds
- **Consistent**: Same structure and styling every time
- **Maintainable**: Update template once, affects all posts
- **Simple**: Just write markdown, everything else is automated
- **No Dependencies**: Uses only Python standard library 