// Main Application Entry Point
// Initializes the application and coordinates all modules

class TaskManagerApp {
    constructor() {
        this.init();
    }

    init() {
        console.log('🚀 Initializing Task Manager Pro...');

        // 1. Load saved state from storage
        this.loadSavedState();

        // 2. Initialize UI
        this.initializeUI();

        // 3. Restore drag state
        taskManager.dragEnabled = StorageService.getDragState();
        if (taskManager.dragEnabled) {
            uiManager.elements.dragToggle.setAttribute('aria-pressed', 'true');
        }

        // 4. Initial render
        uiManager.render();

        // 5. Initialize charts
        chartsManager.updateAllCharts();

        // 6. Setup auto-save
        this.setupAutoSave();

        // 7. Setup periodic updates (for time-based UI changes)
        this.setupPeriodicUpdates();

        console.log('✅ Application initialized successfully');
    }

    loadSavedState() {
        const savedTheme = StorageService.getTheme();
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }

    initializeUI() {
        // Make sure all elements are cached
        uiManager.cacheElements();
        
        // Apply current theme
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        chartsManager.setTheme(currentTheme);
    }

    setupAutoSave() {
        // Auto-save every 10 seconds
        setInterval(() => {
            taskManager.saveTasks();
        }, 10000);

        // Save on before unload
        window.addEventListener('beforeunload', () => {
            taskManager.saveTasks();
        });
    }

    setupPeriodicUpdates() {
        // Update UI every minute to refresh time-based information (overdue indicators, etc)
        setInterval(() => {
            // Update tasks that might have become overdue
            const currentTasks = taskManager.getFilteredTasks();
            uiManager.updateTaskList();
        }, 60000); // 1 minute
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TaskManagerApp();
});

// Handle service worker for PWA capability (optional)
if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('sw.js').catch(() => {});
}

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    uiManager.showNotification('An error occurred. Please try again.', 'error');
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    uiManager.showNotification('An error occurred. Please try again.', 'error');
});

// Log app version (useful for debugging)
console.log('📋 Task Manager Pro v1.0.0');
console.log('🎨 UI Framework: Vanilla JS with Glassmorphism Design');
console.log('📊 Charts: Chart.js v4.4.0');
console.log('💾 Storage: Browser LocalStorage');
