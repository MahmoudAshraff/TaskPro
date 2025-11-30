# 🚀 Quick Start Guide

## Getting Started in 5 Minutes

### 1. Run Locally (Choose One)

**Python 3:**
```bash
cd task-manager
python -m http.server 8000
```

**Node.js:**
```bash
cd task-manager
npx http-server
```

**VS Code Live Server:**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

### 2. Open in Browser
- Navigate to `http://localhost:8000`
- You should see the TaskPro application with 20 sample tasks

### 3. Test Features (2 minutes)

**Basic Functionality:**
- ✅ Click checkbox to complete a task
- ✅ Click ✎ to edit a task
- ✅ Click ✕ to delete a task
- ✅ Click "+ Add Task" to create new task

**Advanced Features:**
- 🌓 Click moon icon to toggle dark mode
- 🔍 Use search box to find tasks
- 📊 Scroll down to see analytics charts
- ⇅ Click drag button, then drag task to reorder
- 🔄 Check recurring task patterns

**Filters:**
- Click "Completed", "Active", "Overdue" to filter
- Check category boxes in sidebar
- Combine filters for precise results

### 4. Deploy to GitHub (10 minutes)

**Create GitHub repository:**
```bash
cd task-manager
git init
git add .
git commit -m "Initial commit: Advanced task manager"
git remote add origin https://github.com/YOUR_USERNAME/task-manager.git
git branch -M main
git push -u origin main
```

**Enable GitHub Pages:**
1. Go to `https://github.com/YOUR_USERNAME/task-manager`
2. Click "Settings" → "Pages"
3. Select "main" branch
4. Save and wait 2-3 minutes
5. Visit `https://YOUR_USERNAME.github.io/task-manager`

## File Structure Overview

```
task-manager/
├── index.html              ← Open this in browser
├── README.md               ← Full documentation
├── DEPLOYMENT.md           ← Deployment guide
│
├── css/                    ← Styling (6 files)
│   └── *.css              ← Import all in HTML
│
└── js/                     ← JavaScript modules
    ├── main.js            ← Entry point
    └── modules/
        ├── state.js       ← Task management
        ├── ui.js          ← DOM & interactions
        ├── recurrence.js  ← Recurring logic
        ├── storage.js     ← Data persistence
        └── charts.js      ← Analytics
```

## Key Files to Understand

### index.html
- Complete semantic HTML
- All elements for the app
- Includes Chart.js from CDN
- Imports all CSS and JS

### js/modules/state.js
- `TaskManager` class manages all tasks
- CRUD operations
- Filtering and statistics
- 20 mock tasks included

### js/modules/ui.js
- `UIManager` class handles DOM
- Event listeners and interactions
- Form handling
- Task rendering

### css/variables.css
- Design tokens and colors
- Responsive breakpoints
- Theme definitions

### css/base.css
- Main component styles
- Glassmorphism effects
- Layout structure

## Troubleshooting

### White page on load?
- Check browser console (F12)
- Verify Chart.js CDN is accessible
- Hard refresh (Ctrl+Shift+R)

### Tasks not saving?
- Check localStorage in DevTools
- Verify browser allows storage
- Clear cache and reload

### Charts not showing?
- Check internet connection (needs CDN)
- Try different browser
- Check console for errors

### Styles look broken?
- Clear browser cache
- Check file paths are correct
- Verify all CSS files are loaded

## Key Features at a Glance

| Feature | How to Use |
|---------|-----------|
| **Create Task** | Click "+ Add Task" button |
| **Edit Task** | Click ✎ icon on task card |
| **Delete Task** | Click ✕ icon on task card |
| **Mark Complete** | Click checkbox on task |
| **Search** | Type in search box (top) |
| **Filter Status** | Click All/Active/Completed/Overdue |
| **Filter Category** | Check categories in sidebar |
| **Dark Mode** | Click 🌙 icon in header |
| **Drag Reorder** | Click ⇅, then drag tasks |
| **View Analytics** | Scroll to bottom of page |
| **Add Recurring** | Check "Make recurring" in form |
| **Switch View** | Click list/grid buttons |

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + K` | Focus search |
| `Ctrl + N` | New task |
| `Esc` | Close modal |
| `Tab` | Navigate form |

## Customization Tips

### Change Colors
Edit `css/variables.css`:
```css
--color-primary: #your-color;
```

### Change Fonts
Edit `css/reset.css`:
```css
body { font-family: 'Your Font', sans-serif; }
```

### Add More Categories
Edit `js/modules/ui.js`, `renderCategoryFilters()` function

### Modify Mock Data
Edit `js/modules/state.js`, `initializeMockData()` function

## Before Sharing

- [ ] Test in multiple browsers
- [ ] Test on mobile device
- [ ] Run Lighthouse (Chrome DevTools)
- [ ] Check keyboard navigation (Tab key)
- [ ] Verify dark mode works
- [ ] Test all filters
- [ ] Create/edit/delete a task
- [ ] Check analytics charts
- [ ] Update README with your info
- [ ] Deploy to GitHub Pages

## Share Your Project

Once deployed:
1. Update README.md with your GitHub username
2. Add link to your portfolio
3. Share on LinkedIn/Twitter
4. Use in interviews as discussion point
5. Get feedback from community

## Support

- **Docs**: See README.md for full documentation
- **Issues**: Check DEPLOYMENT.md for troubleshooting
- **Questions**: Review code comments in js/modules/

---

**You're ready to go! Happy coding! 🚀**

Next steps:
1. ✅ Test locally
2. ✅ Deploy to GitHub
3. ✅ Share with portfolio
4. ✅ Discuss in interviews

Remember: This is production-quality code. Be proud of it!
