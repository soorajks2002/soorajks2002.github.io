---
title: CSS Grid vs Flexbox - When to Use What
date: February 5, 2024
excerpt: Master the art of choosing between CSS Grid and Flexbox. Learn when to use each layout system for optimal results in your web designs.
---

# CSS Grid vs Flexbox: When to Use What

Both CSS Grid and Flexbox are powerful layout systems, but they excel in different scenarios. Understanding when to use each will make you a more effective developer.

## Flexbox: One-Dimensional Layouts

Flexbox is designed for **one-dimensional layouts** - either rows or columns.

### Perfect for:
- Navigation bars
- Centering content
- Distributing space between items
- Aligning items within containers

### Basic Flexbox
```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
```

### Common Flexbox Patterns

#### Center Everything
```css
.center-all {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

#### Responsive Navigation
```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}
```

## CSS Grid: Two-Dimensional Layouts

Grid excels at **two-dimensional layouts** where you need control over both rows and columns.

### Perfect for:
- Page layouts
- Card grids
- Complex UI components
- Magazine-style layouts

### Basic Grid
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

### Common Grid Patterns

#### Holy Grail Layout
```css
.page-layout {
  display: grid;
  grid-template-areas: 
    "header header header"
    "nav main aside"
    "footer footer footer";
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
```

#### Responsive Card Grid
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

## Decision Framework

### Use Flexbox When:
- ✅ Laying out items in a single row/column
- ✅ Centering content
- ✅ Distributing space between items
- ✅ Creating flexible components

### Use Grid When:
- ✅ Creating complex layouts
- ✅ Need precise control over rows AND columns
- ✅ Building page-level layouts
- ✅ Overlapping elements

## Combining Both

You often use both in the same project:

```css
/* Grid for page layout */
.page {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}

/* Flexbox for navigation */
.nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Grid for content cards */
.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* Flexbox within each card */
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

## Browser Support

Both Flexbox and Grid have excellent browser support:
- **Flexbox**: Supported in all modern browsers
- **Grid**: Supported in all modern browsers (IE 11 with -ms- prefix)

## Conclusion

Don't think of Grid vs Flexbox as competitors - they're complementary tools. Grid handles the big picture layout, while Flexbox handles component-level alignment and distribution.

**Rule of thumb**: Start with Flexbox for simple layouts, move to Grid when you need two-dimensional control! 