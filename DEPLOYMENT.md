# Deployment Guide

## GitHub Pages Deployment

### Prerequisites
- Git installed
- GitHub account
- Repository created (e.g., `task-manager`)

### Steps

#### 1. Initialize Git Repository
```bash
cd task-manager
git init
git add .
git commit -m "Initial commit: Advanced task manager with glassmorphism design"
```

#### 2. Add Remote and Push
```bash
git remote add origin https://github.com/yourusername/task-manager.git
git branch -M main
git push -u origin main
```

#### 3. Enable GitHub Pages
1. Go to repository Settings
2. Scroll to "Pages" section
3. Set source to "main" branch, root folder
4. Save
5. Wait 2-3 minutes for deployment

#### 4. Access Live Site
Your app will be available at: `https://yourusername.github.io/task-manager`

### Custom Domain (Optional)
1. In Settings > Pages
2. Add your custom domain
3. Update DNS records:
   - Add CNAME record pointing to `yourusername.github.io`
   - Or add A records for GitHub IP addresses

## Local Development

### Running Locally
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

Visit `http://localhost:8000`

### File Size Optimization

For production, minimize assets:

#### CSS Minification
```bash
# Using cssnano
npx postcss css/*.css -o dist/styles.min.css
```

#### JavaScript Minification
```bash
# Using terser
npx terser js/modules/*.js -o dist/app.min.js -c -m
```

#### HTML Minification
```bash
# Using html-minifier
npx html-minifier index.html -o dist/index.html --remove-comments --collapse-whitespace
```

## Performance Optimization Checklist

- [ ] Run Lighthouse audit (Chrome DevTools)
- [ ] Check Core Web Vitals
- [ ] Validate HTML (https://validator.w3.org/)
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Check responsiveness at all breakpoints
- [ ] Verify all links work
- [ ] Test dark/light mode
- [ ] Test form submissions
- [ ] Verify localStorage persistence
- [ ] Check for console errors
- [ ] Test drag-to-reorder feature
- [ ] Verify all charts display correctly

## Browser Testing

### Desktop
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile
- [ ] iPhone Safari (latest iOS)
- [ ] Chrome Android (latest)
- [ ] Firefox Android (latest)
- [ ] Samsung Internet (latest)

## Accessibility Testing

```bash
# Using axe DevTools
# Install extension and run audit

# Using WAVE
# https://wave.webaim.org/

# Using Lighthouse
# Chrome DevTools > Lighthouse > Accessibility
```

## SEO Optimization

Update these in `index.html`:
```html
<meta name="description" content="Your custom description">
<meta name="keywords" content="task manager, productivity, todo">
<meta name="author" content="Your Name">
<meta property="og:title" content="TaskPro - Advanced Task Manager">
<meta property="og:description" content="Professional task management application">
<meta property="og:image" content="preview-image.jpg">
```

## Analytics Setup

Add Google Analytics (optional):
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## Regular Maintenance

### Weekly
- [ ] Check for console errors
- [ ] Test new browser versions
- [ ] Review GitHub issues/PRs

### Monthly
- [ ] Audit Lighthouse scores
- [ ] Test accessibility compliance
- [ ] Check link integrity
- [ ] Performance profiling

### Quarterly
- [ ] Security audit
- [ ] Dependencies check (if any)
- [ ] Feature planning for next version
- [ ] User feedback review

## Troubleshooting Deployment

### 404 Error on GitHub Pages
- Verify files are in repository
- Check branch settings in GitHub Pages
- Ensure index.html is in root folder

### Styles Not Loading
- Check CSS file paths are relative
- Verify CSS files are in repository
- Clear browser cache (Ctrl+Shift+Del)

### Charts Not Displaying
- Check CDN link for Chart.js
- Verify internet connection for CDN access
- Test in different browser

### LocalStorage Not Working
- Check browser privacy settings
- Ensure cookies/storage not disabled
- Test in incognito/private window

## Version History

### v1.0.0 (November 2025)
- Initial release
- 20 mock tasks with realistic data
- Advanced recurrence patterns
- Glassmorphism UI
- Dark mode support
- Responsive design (mobile to desktop)
- Chart.js analytics
- WCAG 2.1 AA compliance
- Drag-to-reorder functionality
- Local storage persistence

## Contact & Support

For deployment issues:
1. Check browser console (F12)
2. Review this guide
3. Check GitHub issues
4. Contact: your.email@example.com

---

Successfully deployed! 🎉
Remember to update links in README and social media with your live URL.
