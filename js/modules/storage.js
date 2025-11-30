// Storage Module
// Handles local storage persistence and data operations

class StorageService {
    static KEYS = {
        TASKS: 'tasks',
        FILTERS: 'filters',
        THEME: 'theme',
        DRAG_ENABLED: 'dragEnabled',
        LAST_SAVED: 'lastSaved',
        ANIMATIONS_ENABLED: 'animationsEnabled',
        USER: 'user'
    };

    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error(`Failed to save ${key}:`, e);
            return false;
        }
    }

    static get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (e) {
            console.error(`Failed to load ${key}:`, e);
            return defaultValue;
        }
    }

    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error(`Failed to remove ${key}:`, e);
            return false;
        }
    }

    static clear() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Failed to clear storage:', e);
            return false;
        }
    }

    static getSize() {
        let size = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                size += localStorage[key].length + key.length;
            }
        }
        return size;
    }

    static exportData() {
        const tasks = this.get(this.KEYS.TASKS, []);
        const filters = this.get(this.KEYS.FILTERS, {});
        const theme = this.get(this.KEYS.THEME, 'light');

        return {
            tasks,
            filters,
            theme,
            exportedAt: new Date().toISOString()
        };
    }

    static importData(data) {
        try {
            if (data.tasks) {
                this.set(this.KEYS.TASKS, data.tasks);
            }
            if (data.filters) {
                this.set(this.KEYS.FILTERS, data.filters);
            }
            if (data.theme) {
                this.set(this.KEYS.THEME, data.theme);
            }
            return true;
        } catch (e) {
            console.error('Failed to import data:', e);
            return false;
        }
    }

    static saveTheme(theme) {
        return this.set(this.KEYS.THEME, theme);
    }

    static getTheme() {
        return this.get(this.KEYS.THEME, 'light');
    }

    static saveDragState(enabled) {
        return this.set(this.KEYS.DRAG_ENABLED, enabled);
    }

    static getDragState() {
        return this.get(this.KEYS.DRAG_ENABLED, false);
    }

    static saveFilters(filters) {
        return this.set(this.KEYS.FILTERS, filters);
    }

    static getFilters() {
        return this.get(this.KEYS.FILTERS, {
            status: 'all',
            category: null,
            search: ''
        });
    }

    static saveAnimationsEnabled(enabled) {
        return this.set(this.KEYS.ANIMATIONS_ENABLED, !!enabled);
    }

    static getAnimationsEnabled() {
        return this.get(this.KEYS.ANIMATIONS_ENABLED, true);
    }

    static saveUser(userObj) {
        return this.set(this.KEYS.USER, userObj);
    }

    static getUser() {
        return this.get(this.KEYS.USER, null);
    }

    static clearUser() {
        return this.remove(this.KEYS.USER);
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageService;
}
