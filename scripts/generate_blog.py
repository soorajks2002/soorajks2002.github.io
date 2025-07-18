#!/usr/bin/env python3

import os
import sys
import re
from pathlib import Path
from datetime import datetime
import math

# Configuration
POSTS_PER_PAGE = 5  # Number of posts to show per page


def generate_blog_post(source_md_file, url_path):
    """Generate blog post from markdown source and update blog listing"""

    # Validate source file exists
    source_path = Path(source_md_file)
    if not source_path.exists():
        print(f"❌ Source file not found: {source_path}")
        return None

    # Read and parse the markdown file
    with open(source_path, 'r', encoding='utf-8') as f:
        content = f.read()

    meta, body = parse_frontmatter(content)

    if 'title' not in meta or 'date' not in meta:
        print("❌ Markdown file must have 'title' and 'date' in frontmatter")
        return None

    # Convert markdown to HTML
    html_content = markdown_to_html(body)

    # Generate the blog post HTML
    post_html = generate_post_html(meta['title'], meta['date'], html_content)

    # Create directory structure and save post
    post_dir = Path('blog') / url_path
    post_dir.mkdir(parents=True, exist_ok=True)

    output_path = post_dir / 'index.html'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(post_html)

    # Update the main blog listing with pagination
    update_blog_listing_with_pagination()

    print(f"✅ Generated: {output_path}")
    print(f"🌐 Clean URL: /blog/{url_path}/")
    print(f"📝 Updated blog listing")
    return output_path


def generate_post_html(title, date, content):
    """Generate HTML for a blog post using template"""
    template_path = Path('blog/template.html')
    if not template_path.exists():
        print(f"❌ Template not found: {template_path}")
        return None

    with open(template_path, 'r', encoding='utf-8') as f:
        template = f.read()

    # Replace placeholders
    html = template.replace('{{TITLE}}', title)
    html = html.replace('{{DATE}}', date)
    html = html.replace('{{CONTENT}}', content)

    return html


def get_all_blog_posts():
    """Get all blog posts with metadata, sorted by date (newest first)"""
    markdown_dir = Path('blog/markdown')
    if not markdown_dir.exists():
        return []

    posts = []
    for md_file in markdown_dir.glob('*.md'):
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()

            meta, _ = parse_frontmatter(content)
            if 'title' in meta and 'date' in meta:
                # Parse date for sorting
                try:
                    from datetime import datetime
                    date_obj = datetime.strptime(meta['date'], '%B %d, %Y')
                except:
                    date_obj = datetime.now()

                posts.append({
                    'title': meta['title'],
                    'date': meta['date'],
                    'date_obj': date_obj,
                    'excerpt': meta.get('excerpt', f"Read about {meta['title'].lower()} and more insights."),
                    'url_path': md_file.stem,
                    'file': md_file
                })
        except Exception as e:
            print(f"⚠️  Warning: Could not parse {md_file.name}: {e}")

    # Sort by date (newest first)
    posts.sort(key=lambda x: x['date_obj'], reverse=True)
    return posts


def generate_pagination_controls(current_page, total_pages):
    """Generate HTML for pagination controls"""
    if total_pages <= 1:
        return ""

    controls = ['<div class="pagination">']

    # Previous button
    if current_page > 1:
        prev_url = "../" if current_page == 2 else f"../page/{current_page - 1}/"
        controls.append(
            f'<a href="{prev_url}" class="pagination-btn">← Previous</a>')
    else:
        controls.append(
            '<span class="pagination-btn disabled">← Previous</span>')

    # Page numbers
    controls.append('<div class="page-numbers">')
    for page in range(1, total_pages + 1):
        if page == current_page:
            controls.append(f'<span class="page-number current">{page}</span>')
        else:
            page_url = "../" if page == 1 else f"../page/{page}/"
            controls.append(
                f'<a href="{page_url}" class="page-number">{page}</a>')
    controls.append('</div>')

    # Next button
    if current_page < total_pages:
        next_url = f"../page/{current_page + 1}/"
        controls.append(
            f'<a href="{next_url}" class="pagination-btn">Next →</a>')
    else:
        controls.append('<span class="pagination-btn disabled">Next →</span>')

    controls.append('</div>')
    return '\n'.join(controls)


def generate_blog_listing_html(posts, current_page, total_pages):
    """Generate HTML for blog post listing with pagination"""
    if not posts:
        return '<p class="no-posts">No blog posts yet. Create your first post!</p>'

    post_html = []
    for post in posts:
        post_html.append(f'''                    <li class="blog-post">
                        <h3><a href="{post['url_path']}/">{post['title']}</a></h3>
                        <div class="date">{post['date']}</div>
                        <p class="excerpt">
                            {post['excerpt']}
                        </p>
                    </li>''')

    posts_html = '\n'.join(post_html)
    pagination_html = generate_pagination_controls(current_page, total_pages)

    return f'''                <ul class="blog-posts">
{posts_html}
                </ul>
                {pagination_html}'''


def update_blog_listing_with_pagination():
    """Update blog listing with pagination support"""
    all_posts = get_all_blog_posts()
    if not all_posts:
        print("📝 No posts found for pagination")
        return

    total_pages = math.ceil(len(all_posts) / POSTS_PER_PAGE)

    # Generate main blog page (page 1)
    page_1_posts = all_posts[:POSTS_PER_PAGE]
    update_blog_page(page_1_posts, 1, total_pages, 'blog/index.html')

    # Generate additional pages if needed
    for page_num in range(2, total_pages + 1):
        start_idx = (page_num - 1) * POSTS_PER_PAGE
        end_idx = start_idx + POSTS_PER_PAGE
        page_posts = all_posts[start_idx:end_idx]

        # Create page directory
        page_dir = Path(f'blog/page/{page_num}')
        page_dir.mkdir(parents=True, exist_ok=True)

        update_blog_page(page_posts, page_num, total_pages,
                         f'blog/page/{page_num}/index.html')

    print(
        f"📄 Generated {total_pages} page(s) with {len(all_posts)} total posts")


def update_blog_page(posts, current_page, total_pages, file_path):
    """Update a specific blog page with posts"""
    blog_page_path = Path(file_path)

    # Read the template blog page
    template_path = Path('blog/index.html')
    if not template_path.exists():
        print(f"❌ Blog template not found: {template_path}")
        return

    with open(template_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Generate the posts HTML with pagination
    posts_html = generate_blog_listing_html(posts, current_page, total_pages)

    # Replace everything from blog posts through any existing pagination
    combined_pattern = r'(<ul class="blog-posts">.*?</ul>).*?(?=\s*</section>)'

    # Replace blog posts section with new posts and pagination
    content = re.sub(combined_pattern, posts_html, content, flags=re.DOTALL)

    # Ensure parent directory exists
    blog_page_path.parent.mkdir(parents=True, exist_ok=True)

    # Save the page
    with open(blog_page_path, 'w', encoding='utf-8') as f:
        f.write(content)


def update_blog_listing(title, date, excerpt, url_path):
    """Update the main blog/index.html with the new post"""
    blog_index_path = Path('blog/index.html')

    if not blog_index_path.exists():
        print(f"❌ Blog index not found: {blog_index_path}")
        return

    with open(blog_index_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Create new blog post entry
    new_post_html = f'''                    <li class="blog-post">
                        <h3><a href="{url_path}/">{title}</a></h3>
                        <div class="date">{date}</div>
                        <p class="excerpt">
                            {excerpt if excerpt else f"Read about {title.lower()} and more insights."}
                        </p>
                    </li>'''

    # Find the insertion point (after <ul class="blog-posts">)
    pattern = r'(<ul class="blog-posts">)'
    replacement = f'\\1\n{new_post_html}'

    # Check if this post already exists and update it
    existing_pattern = rf'<li class="blog-post">.*?<h3><a href="{re.escape(url_path)}/".*?</li>'
    if re.search(existing_pattern, content, re.DOTALL):
        # Update existing post
        content = re.sub(existing_pattern, new_post_html.strip(),
                         content, flags=re.DOTALL)
        print("📝 Updated existing post in blog listing")
    else:
        # Add new post
        content = re.sub(pattern, replacement, content)
        print("📝 Added new post to blog listing")

    # Save updated blog index
    with open(blog_index_path, 'w', encoding='utf-8') as f:
        f.write(content)


def markdown_to_html(markdown_text):
    """Convert basic markdown to HTML"""
    html = markdown_text

    # Headers
    html = re.sub(r'^# (.+)$', r'<h1>\1</h1>', html, flags=re.MULTILINE)
    html = re.sub(r'^## (.+)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^### (.+)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)

    # Bold and italic
    html = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', html)
    html = re.sub(r'\*(.+?)\*', r'<em>\1</em>', html)

    # Code
    html = re.sub(r'`(.+?)`', r'<code>\1</code>', html)

    # Lists - Simple implementation
    lines = html.split('\n')
    result_lines = []
    in_ul = False
    in_ol = False

    for line in lines:
        stripped = line.strip()

        # Unordered list
        if stripped.startswith('- '):
            if not in_ul:
                if in_ol:
                    result_lines.append('</ol>')
                    in_ol = False
                result_lines.append('<ul>')
                in_ul = True
            result_lines.append(f'<li>{stripped[2:].strip()}</li>')

        # Ordered list
        elif re.match(r'^\d+\. ', stripped):
            if not in_ol:
                if in_ul:
                    result_lines.append('</ul>')
                    in_ul = False
                result_lines.append('<ol>')
                in_ol = True
            content = re.sub(r'^\d+\. ', '', stripped)
            result_lines.append(f'<li>{content}</li>')

        # Regular line
        else:
            # Close any open lists
            if in_ul:
                result_lines.append('</ul>')
                in_ul = False
            if in_ol:
                result_lines.append('</ol>')
                in_ol = False

            # Add paragraph if not empty and not already HTML
            if stripped and not stripped.startswith('<'):
                result_lines.append(f'<p>{stripped}</p>')
            elif stripped.startswith('<') or not stripped:
                result_lines.append(line)

    # Close any remaining lists
    if in_ul:
        result_lines.append('</ul>')
    if in_ol:
        result_lines.append('</ol>')

    return '\n'.join(result_lines)


def parse_frontmatter(content):
    """Parse YAML-like frontmatter from markdown"""
    if not content.startswith('---'):
        return {}, content

    parts = content.split('---', 2)
    if len(parts) < 3:
        return {}, content

    frontmatter_text = parts[1].strip()
    body = parts[2].strip()

    # Simple frontmatter parsing
    meta = {}
    for line in frontmatter_text.split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            meta[key.strip()] = value.strip()

    return meta, body


def list_available_posts():
    """List all available markdown files in blog/markdown/ directory"""
    markdown_dir = Path('blog/markdown')
    if not markdown_dir.exists():
        print("❌ blog/markdown/ directory not found")
        return

    md_files = list(markdown_dir.glob('*.md'))
    if not md_files:
        print("📁 No markdown files found in blog/markdown/ directory")
        return

    print("📚 Available blog posts:")
    for md_file in sorted(md_files):
        print(f"  - {md_file.name}")


def main():
    """Main function to handle command line arguments"""
    if len(sys.argv) < 2:
        print("""
📝 Blog Post Generator (Enhanced with Pagination)

Usage:
  python3 scripts/generate_blog.py <source.md> <url-path>
  python3 scripts/generate_blog.py blog/markdown/my-post.md my-post
  python3 scripts/generate_blog.py blog/markdown/my-post.md custom-url
  python3 scripts/generate_blog.py --regenerate-pagination

Arguments:
  source.md   Path to markdown file in blog/markdown/ directory
  url-path    URL path for the blog post (e.g., 'my-post' creates /blog/my-post/)

Special Commands:
  --regenerate-pagination    Regenerate all blog pages with current pagination

Examples:
  python3 scripts/generate_blog.py blog/markdown/first-post.md first-post
  python3 scripts/generate_blog.py blog/markdown/tutorial.md getting-started
  python3 scripts/generate_blog.py --regenerate-pagination

Features:
  ✅ Automatic directory creation
  ✅ Clean URL generation
  ✅ Automatic pagination (""" + str(POSTS_PER_PAGE) + """ posts per page)
  ✅ Multiple page support (/blog/page/2/, /blog/page/3/, etc.)
  ✅ Organized source file management
        """)
        list_available_posts()
        sys.exit(1)

    # Handle special commands
    if sys.argv[1] == '--regenerate-pagination':
        print("🔄 Regenerating pagination for all blog posts...")
        update_blog_listing_with_pagination()
        return

    if len(sys.argv) != 3:
        print("❌ Please provide both source file and URL path")
        print("Usage: python3 scripts/generate_blog.py blog/markdown/post.md url-path")
        print("Or use: python3 scripts/generate_blog.py --regenerate-pagination")
        sys.exit(1)

    source_file = sys.argv[1]
    url_path = sys.argv[2]

    # Validate URL path (no special characters, spaces, etc.)
    if not re.match(r'^[a-z0-9-]+$', url_path):
        print("❌ URL path must contain only lowercase letters, numbers, and hyphens")
        sys.exit(1)

    generate_blog_post(source_file, url_path)


if __name__ == '__main__':
    main()
