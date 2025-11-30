// State Management Module
// Handles application state, data persistence, and business logic

class TaskManager {
    constructor() {
        this.tasks = [];
        this.filters = {
            status: 'all',
            category: [],
            search: ''
        };
        this.dragEnabled = false;
        this.init();
    }

    init() {
        this.loadTasks();
        if (this.tasks.length === 0) {
            this.initializeMockData();
        }
        this.saveTasks();
    }

    initializeMockData() {
        const now = new Date();
        const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
        
        this.tasks = [
            // Work Tasks
            {
                id: this.generateId(),
                title: 'Complete Q4 Project Proposal',
                description: 'Prepare comprehensive project proposal with timeline and budget',
                category: 'work',
                priority: 'high',
                dueDate: tomorrow.toISOString().split('T')[0],
                tags: ['urgent', 'important'],
                completed: false,
                recurring: false,
                recurrencePattern: null,
                createdAt: new Date().toISOString(),
                completedAt: null
            },
            {
                id: this.generateId(),
                title: 'Review Team Code Submissions',
                description: 'Code review for Q4 sprint submissions',
                category: 'work',
                priority: 'medium',
                dueDate: nextWeek.toISOString().split('T')[0],
                tags: ['review'],
                completed: false,
                recurring: false,
                recurrencePattern: null,
                createdAt: new Date().toISOString(),
                completedAt: null
            },
            {
                id: this.generateId(),
                title: 'Update Project Documentation',
                description: 'Update API documentation and tech specs',
                category: 'work',
                priority: 'low',
                dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                tags: ['documentation'],
                completed: true,
                recurring: false,
                recurrencePattern: null,
                createdAt: new Date().toISOString(),
                completedAt: twoWeeksAgo.toISOString()
            },
            {
                id: this.generateId(),
                title: 'Client Meeting Preparation',
                description: 'Prepare slides and demo for Monday\'s client meeting',
                category: 'work',
                priority: 'high',
                dueDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                tags: ['meeting', 'client'],
                completed: false,
                recurring: false,
                recurrencePattern: null,
                createdAt: new Date().toISOString(),
                completedAt: null
            },
            {
                id: this.generateId(),
                title: 'Weekly Team Standup',
                description: 'Prepare weekly status update',
                category: 'work',
                priority: 'medium',
                dueDate: null,
                tags: ['recurring', 'meeting'],
                completed: false,
                recurring: true,
                recurrencePattern: {
                    type: 'weekly',
                    days: [1, 3, 5],
                    endDate: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                },
                createdAt: new Date().toISOString(),
                completedAt: null
            },

            // Personal Tasks
            {
                id: this.generateId(),
                title: 'Plan Weekend Trip',
                description: 'Research destinations and book accommodations',
                category: 'personal',
                priority: 'medium',
                dueDate: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                tags: ['travel', 'planning'],
                completed: false,
                recurring: false,
                recurrencePattern: null,
                createdAt: new Date().toISOString(),
                completedAt: null
            },
            {
                id: this.generateId(),
                title: 'Update Resume',
                description: 'Add recent projects and accomplishments',
                category: 'personal',
                priority: 'high',
                dueDate: tomorrow.toISOString().split('T')[0],
                tags: ['important'],
                completed: false,
                recurring: false,
                recurrencePattern: null,
                createdAt: new Date().toISOString(),
                completedAt: null
            },
            {
                id: this.generateId(),
                title: 'Call Mom',
                description: 'Weekly family call',
                category: 'personal',
                priority: 'low',
                dueDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                tags: [],
                completed: false,
                recurring: true,
                recurrencePattern: {
                    type: 'weekly',
                    days: [0],
                    endDate: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                },
                createdAt: new Date().toISOString(),
                completedAt: null
            },
            {
                id: this.generateId(),
                title: 'Organize Home Office',
                description: 'Declutter and organize desk area',
                category: 'personal',
                priority: 'low',
                dueDate: yesterday.toISOString().split('T')[0],
                tags: [],
                completed: false,
                recurring: false,
                recurrencePattern: null,
                createdAt: new Date().toISOString(),
                completedAt: null
            },

            // Health Tasks
            {
                id: this.generateId(),
                title: 'Gym Session - Leg Day',
                description: 'Complete leg workout routine',
                category: 'health',
                priority: 'medium',
                dueDate: tomorrow.toISOString().split('T')[0],
                tags: ['fitness', 'exercise'],
                completed: false,
                recurring: true,
                recurrencePattern: {
                    type: 'weekly',
                    days: [1, 3, 5],
                    endDate: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                },
                createdAt: new Date().toISOString(),
                completedAt: null
            },
            {
                id: this.generateId(),
                title: 'Annual Health Checkup',
                description: 'Schedule and complete annual physical exam',
                category: 'health',
                priority: 'high',
                dueDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                tags: ['health', 'medical'],
                completed: true,
                recurring: false,
                recurrencePattern: null,
                createdAt: new Date().toISOString(),
                completedAt: twoWeeksAgo.toISOString()
            },
            {
                id: this.generateId(),
                title: 'Drink 8 Glasses of Water',
                description: 'Daily hydration reminder',
                category: 'health',
                priority: 'low',
                dueDate: now.toISOString().split('T')[0],
                tags: ['daily', 'wellness'],
                completed: true,
                recurring: true,
                recurrencePattern: {
                    type: 'daily',
                    days: [0, 1, 2, 3, 4, 5, 6],
                    endDate: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                },
                createdAt: new Date().toISOString(),
                completedAt: new Date().toISOString()
            },

            // Shopping Tasks
            {
                id: this.generateId(),
                title: 'Buy Winter Coat',
                description: 'Look for warm winter coat on sale',
                category: 'shopping',
                priority: 'low',
                dueDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                tags: ['clothing', 'shopping'],
                completed: false,
                recurring: false,
                recurrencePattern: null,
                createdAt: new Date().toISOString(),
                completedAt: null
            },
            {
                id: this.generateId(),
                title: 'Grocery Shopping',
                description: 'Buy weekly groceries - milk, eggs, vegetables, bread',
                category: 'shopping',
                priority: 'medium',
                dueDate: tomorrow.toISOString().split('T')[0],
                tags: ['groceries', 'weekly'],
                completed: false,
                recurring: true,
                recurrencePattern: {
                    type: 'weekly',
                    days: [6],
                    endDate: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                },
                createdAt: new Date().toISOString(),
                completedAt: null
            },
            {
                id: this.generateId(),
                title: 'Book Christmas Gifts',
                description: 'Order gifts for family members',
                category: 'shopping',
                priority: 'high',
                dueDate: yesterday.toISOString().split('T')[0],
                tags: ['gifts', 'holiday'],
                completed: false,
                recurring: false,
                recurrencePattern: null,
                createdAt: new Date().toISOString(),
                completedAt: null
            },

            // Finance Tasks
            {
                id: this.generateId(),
                title: 'Pay Monthly Bills',
                description: 'Electricity, water, internet, and mortgage',
                category: 'finance',
                priority: 'high',
                dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                tags: ['bills', 'monthly'],
                completed: false,
                recurring: true,
                recurrencePattern: {
                    type: 'monthly',
                    days: null,
                    endDate: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                },
                createdAt: new Date().toISOString(),
                completedAt: null
            },
            {
                id: this.generateId(),
                title: 'Review Investment Portfolio',
                description: 'Quarterly review of stocks and bonds',
                category: 'finance',
                priority: 'medium',
                dueDate: new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                tags: ['investments', 'quarterly'],
                completed: true,
                recurring: false,
                recurrencePattern: null,
                createdAt: new Date().toISOString(),
                completedAt: twoWeeksAgo.toISOString()
            },
            {
                id: this.generateId(),
                title: 'File Tax Return',
                description: 'Gather documents and file 2024 tax return',
                category: 'finance',
                priority: 'high',
                dueDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                tags: ['taxes', 'important'],
                completed: false,
                recurring: false,
                recurrencePattern: null,
                createdAt: new Date().toISOString(),
                completedAt: null
            },

            // Learning Tasks
            {
                id: this.generateId(),
                title: 'Complete Python Course Module 5',
                description: 'Finish Python advanced functions module',
                category: 'learning',
                priority: 'medium',
                dueDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                tags: ['learning', 'python'],
                completed: false,
                recurring: false,
                recurrencePattern: null,
                createdAt: new Date().toISOString(),
                completedAt: null
            },
            {
                id: this.generateId(),
                title: 'Read Tech Article Series',
                description: 'Read about new CSS techniques - Part 3 of 5',
                category: 'learning',
                priority: 'low',
                dueDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                tags: ['reading', 'css', 'learning'],
                completed: false,
                recurring: false,
                recurrencePattern: null,
                createdAt: new Date().toISOString(),
                completedAt: null
            },
            {
                id: this.generateId(),
                title: 'Daily Coding Practice',
                description: 'Solve LeetCode algorithmic challenges',
                category: 'learning',
                priority: 'medium',
                dueDate: now.toISOString().split('T')[0],
                tags: ['daily', 'coding', 'practice'],
                completed: true,
                recurring: true,
                recurrencePattern: {
                    type: 'daily',
                    days: [0, 1, 2, 3, 4, 5],
                    endDate: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                },
                createdAt: new Date().toISOString(),
                completedAt: new Date().toISOString()
            }
        ];
    }

    generateId() {
        return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // CRUD Operations
    addTask(taskData) {
        const task = {
            id: this.generateId(),
            ...taskData,
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null
        };
        this.tasks.push(task);
        this.saveTasks();
        return task;
    }

    updateTask(id, updates) {
        const taskIndex = this.tasks.findIndex(t => t.id === id);
        if (taskIndex === -1) return null;
        
        this.tasks[taskIndex] = {
            ...this.tasks[taskIndex],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        this.saveTasks();
        return this.tasks[taskIndex];
    }

    deleteTask(id) {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index === -1) return false;
        this.tasks.splice(index, 1);
        this.saveTasks();
        return true;
    }

    getTask(id) {
        return this.tasks.find(t => t.id === id);
    }

    // Filtering and Sorting
    getFilteredTasks() {
        let filtered = [...this.tasks];

        // Status filter
        if (this.filters.status === 'completed') {
            filtered = filtered.filter(t => t.completed);
        } else if (this.filters.status === 'active') {
            filtered = filtered.filter(t => !t.completed);
        } else if (this.filters.status === 'overdue') {
            const today = new Date().toISOString().split('T')[0];
            filtered = filtered.filter(t => !t.completed && t.dueDate && t.dueDate < today);
        }

        // Category filter (support multiple selections)
        if (this.filters.category && Array.isArray(this.filters.category) && this.filters.category.length > 0) {
            filtered = filtered.filter(t => this.filters.category.includes(t.category));
        }

        // Search filter
        if (this.filters.search) {
            const search = this.filters.search.toLowerCase();
            filtered = filtered.filter(t => 
                t.title.toLowerCase().includes(search) || 
                (t.description && t.description.toLowerCase().includes(search))
            );
        }

        return filtered;
    }

    sortTasks(tasks, sortBy = 'dueDate') {
        const sorted = [...tasks];
        
        switch (sortBy) {
            case 'dueDate':
                sorted.sort((a, b) => {
                    if (!a.dueDate) return 1;
                    if (!b.dueDate) return -1;
                    return new Date(a.dueDate) - new Date(b.dueDate);
                });
                break;
            case 'priority':
                const priorityOrder = { high: 0, medium: 1, low: 2 };
                sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
                break;
            case 'category':
                sorted.sort((a, b) => a.category.localeCompare(b.category));
                break;
            case 'created':
                sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
        }
        
        return sorted;
    }

    // Completion tracking
    toggleTask(id) {
        const task = this.getTask(id);
        if (!task) return null;

        const updates = {
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toISOString() : null
        };

        return this.updateTask(id, updates);
    }

    // Statistics
    getStatistics() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const active = total - completed;
        
        const today = new Date().toISOString().split('T')[0];
        const overdue = this.tasks.filter(t => !t.completed && t.dueDate && t.dueDate < today).length;
        
        const recurring = this.tasks.filter(t => t.recurring).length;

        const byCategory = {};
        const byPriority = {};

        this.tasks.forEach(task => {
            byCategory[task.category] = (byCategory[task.category] || 0) + 1;
            byPriority[task.priority] = (byPriority[task.priority] || 0) + 1;
        });

        return {
            total,
            completed,
            active,
            overdue,
            recurring,
            completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
            byCategory,
            byPriority
        };
    }

    // Local Storage
    saveTasks() {
        try {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            localStorage.setItem('lastSaved', new Date().toISOString());
        } catch (e) {
            console.error('Failed to save tasks:', e);
        }
    }

    loadTasks() {
        try {
            const saved = localStorage.getItem('tasks');
            if (saved) {
                this.tasks = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Failed to load tasks:', e);
            this.tasks = [];
        }
    }

    clearAllTasks() {
        this.tasks = [];
        this.saveTasks();
    }

    // Recurrence handling
    getRecurrenceString(pattern) {
        if (!pattern) return '';

        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        if (pattern.type === 'daily') {
            return `Daily until ${pattern.endDate}`;
        } else if (pattern.type === 'weekly') {
            const days = pattern.days.map(d => dayNames[d].substring(0, 3)).join(', ');
            return `Every ${days} until ${pattern.endDate}`;
        } else if (pattern.type === 'monthly') {
            return `Monthly until ${pattern.endDate}`;
        } else if (pattern.type === 'custom') {
            const days = pattern.days.map(d => dayNames[d].substring(0, 3)).join(', ');
            return `Custom: ${days} until ${pattern.endDate}`;
        }
        return '';
    }
}

// Initialize global task manager
const taskManager = new TaskManager();
