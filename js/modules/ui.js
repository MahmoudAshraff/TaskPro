// UI Module
// Handles all DOM manipulation and user interactions

class UIManager {
    constructor() {
        this.elements = {};
        this.currentSort = 'dueDate';
        this.cacheElements();
        if (this.elements.sortSelect) this.elements.sortSelect.value = this.currentSort;
        this.attachEventListeners();
        this.initTheme();
        // animations are always enabled by default (no toggle)
        this.animationsEnabled = true;
        this.initAuth();
    }

    cacheElements() {
        // Header elements
        this.elements.header = document.querySelector('.header');
        this.elements.searchInput = document.getElementById('searchInput');
        this.elements.dragToggle = document.getElementById('dragToggle');
        this.elements.themeToggle = document.getElementById('themeToggle');
        this.elements.addTaskBtn = document.getElementById('addTaskBtn');
        this.elements.sortSelect = document.getElementById('sortSelect');

        // Sidebar elements
        this.elements.sidebar = document.querySelector('.sidebar');
        this.elements.categoryFilters = document.getElementById('categoryFilters');
        this.elements.completionRate = document.getElementById('completionRate');
        this.elements.progressFill = document.getElementById('progressFill');
        this.elements.filtersToggle = document.getElementById('filtersToggle');
        this.elements.filterBadge = document.getElementById('filterBadge');
        this.elements.sidebarOverlay = document.getElementById('sidebarOverlay');

        // Main content
        this.elements.tasksContainer = document.getElementById('tasksContainer');
        this.elements.emptyState = document.getElementById('emptyState');
        this.elements.sectionTitle = document.getElementById('sectionTitle');
        this.elements.viewBtns = document.querySelectorAll('.view-btn');

        // Modal elements
        this.elements.taskModal = document.getElementById('taskModal');
        this.elements.taskForm = document.getElementById('taskForm');
        this.elements.taskTitle = document.getElementById('taskTitle');
        this.elements.taskDescription = document.getElementById('taskDescription');
        this.elements.taskCategory = document.getElementById('taskCategory');
        this.elements.taskPriority = document.getElementById('taskPriority');
        this.elements.taskDueDate = document.getElementById('taskDueDate');
        this.elements.taskTags = document.getElementById('taskTags');
        this.elements.taskRecurring = document.getElementById('taskRecurring');
        this.elements.recurrenceSection = document.getElementById('recurrenceSection');
        this.elements.recurrenceType = document.getElementById('recurrenceType');
        this.elements.customDaysGroup = document.getElementById('customDaysGroup');
        this.elements.recurrenceEndDate = document.getElementById('recurrenceEndDate');
        this.elements.recurrencePreview = document.getElementById('recurrencePreview');
        this.elements.cancelBtn = document.getElementById('cancelBtn');
        this.elements.modalTitle = document.getElementById('taskModalTitle');

        // Header right (for user display)
        this.elements.headerRight = document.querySelector('.header-right');

        // Auth elements
        this.elements.signInBtn = document.getElementById('signInBtn');
        this.elements.registerBtn = document.getElementById('registerBtn');
        this.elements.authModal = document.getElementById('authModal');
        this.elements.authForm = document.getElementById('authForm');
        this.elements.authMode = document.getElementById('authMode');
        this.elements.authNameGroup = document.getElementById('authNameGroup');
        this.elements.authName = document.getElementById('authName');
        this.elements.authEmail = document.getElementById('authEmail');
        this.elements.authPassword = document.getElementById('authPassword');
        this.elements.authSubmit = document.getElementById('authSubmit');
        this.elements.authSwitch = document.getElementById('authSwitch');
        this.elements.authClose = document.getElementById('authClose');
        // Statistics
        this.elements.totalCompleted = document.getElementById('totalCompleted');
        this.elements.totalActive = document.getElementById('totalActive');
        this.elements.totalOverdue = document.getElementById('totalOverdue');
        this.elements.totalRecurring = document.getElementById('totalRecurring');

        // Notification
        this.elements.notification = document.getElementById('notification');
        this.elements.notificationMessage = document.getElementById('notificationMessage');

        // Filter controls
        this.elements.filterRadios = document.querySelectorAll('input[name="status"]');
    }

    attachEventListeners() {
        // Header
        this.elements.addTaskBtn.addEventListener('click', () => this.openTaskModal());
        this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.elements.dragToggle.addEventListener('click', () => this.toggleDragMode());
        this.elements.searchInput.addEventListener('input', (e) => this.handleSearch(e));

        // Modal
        this.elements.taskForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        this.elements.cancelBtn.addEventListener('click', () => this.closeTaskModal());
        document.querySelector('.modal-overlay').addEventListener('click', () => this.closeTaskModal());
        document.querySelector('.btn-close').addEventListener('click', () => this.closeTaskModal());

        // animations toggle removed; animations enabled by default

        // Sort select
        if (this.elements.sortSelect) {
            this.elements.sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.render();
            });
        }

        // Sidebar toggle (single-click) or clear filters (double-click)
        if (this.elements.filtersToggle) {
            let clickCount = 0;
            this.elements.filtersToggle.addEventListener('click', (e) => {
                clickCount++;
                if (clickCount === 1) {
                    setTimeout(() => {
                        if (clickCount === 1) {
                            this.toggleSidebar();
                        }
                        clickCount = 0;
                    }, 300);
                } else if (clickCount === 2) {
                    this.clearAllFilters();
                    clickCount = 0;
                }
            });
        }
        if (this.elements.sidebarOverlay) this.elements.sidebarOverlay.addEventListener('click', () => this.closeSidebar());

        // Auth buttons
        if (this.elements.signInBtn) this.elements.signInBtn.addEventListener('click', () => this.openAuthModal('signin'));
        if (this.elements.registerBtn) this.elements.registerBtn.addEventListener('click', () => this.openAuthModal('register'));

        // Filters
        this.elements.filterRadios.forEach(radio => {
            radio.addEventListener('change', (e) => this.handleStatusFilter(e));
        });

        // View controls
        this.elements.viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleViewChange(e));
        });

        // Recurrence toggle
        this.elements.taskRecurring.addEventListener('change', (e) => {
            this.toggleRecurrenceSection(e.target.checked);
        });

        // Recurrence type change
        this.elements.recurrenceType.addEventListener('change', (e) => {
            this.handleRecurrenceTypeChange(e.target.value);
        });

        // Auth modal listeners
        if (this.elements.authClose) this.elements.authClose.addEventListener('click', () => this.closeAuthModal());
        if (this.elements.authForm) this.elements.authForm.addEventListener('submit', (e) => this.handleAuthSubmit(e));
        if (this.elements.authSwitch) this.elements.authSwitch.addEventListener('click', () => this.toggleAuthMode());
        // Key shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    initAnimations() {
        // removed. animations are enabled by default and styled via CSS
    }

    // Authentication (mock) helpers
    initAuth() {
        const user = StorageService.getUser();
        this.currentUser = user;
        this.updateUserUI();
        // If auth modal overlay is clicked, close that modal specifically
        const authOverlay = this.elements.authModal?.querySelector('.modal-overlay');
        if (authOverlay) authOverlay.addEventListener('click', () => this.closeAuthModal());
    }

    openAuthModal(mode = 'signin') {
        if (!this.elements.authModal) return;
        this.elements.authMode.value = mode;
        const isRegister = mode === 'register';
        const title = isRegister ? 'Register' : 'Sign In';
        document.getElementById('authModalTitle').textContent = title;
        if (this.elements.authNameGroup) this.elements.authNameGroup.style.display = isRegister ? 'block' : 'none';
        if (this.elements.authSubmit) this.elements.authSubmit.textContent = isRegister ? 'Register' : 'Sign In';
        if (this.elements.authSwitch) this.elements.authSwitch.textContent = isRegister ? 'Switch to Sign In' : 'Switch to Register';
        this.elements.authModal.classList.add('active');
        (this.elements.authEmail || {}).focus && this.elements.authEmail.focus();
    }

    closeAuthModal() {
        if (!this.elements.authModal) return;
        this.elements.authModal.classList.remove('active');
        if (this.elements.authForm) this.elements.authForm.reset();
    }

    toggleAuthMode() {
        const mode = this.elements.authMode.value === 'register' ? 'signin' : 'register';
        this.openAuthModal(mode);
    }

    handleAuthSubmit(e) {
        e.preventDefault();
        const mode = this.elements.authMode.value || 'signin';
        const email = (this.elements.authEmail.value || '').trim().toLowerCase();
        const password = (this.elements.authPassword.value || '').trim();
        if (!email || !password) {
            this.showNotification('Email and password are required', 'error');
            return;
        }

        if (mode === 'register') {
            const name = (this.elements.authName.value || '').trim();
            if (!name) { this.showNotification('Please enter your name', 'error'); return; }
            // Simple mock register: save to localStorage
            const user = { name, email, password };
            StorageService.saveUser(user);
            this.currentUser = user;
            this.updateUserUI();
            this.closeAuthModal();
            this.showNotification('Registered and signed in', 'success');
            return;
        }

        // Sign in
        const stored = StorageService.getUser();
        if (!stored) {
            this.showNotification('No registered user found. Please register first.', 'error');
            return;
        }
        if (stored.email === email && stored.password === password) {
            this.currentUser = stored;
            this.updateUserUI();
            this.closeAuthModal();
            this.showNotification(`Welcome back, ${stored.name.split(' ')[0] || stored.email}`, 'success');
        } else {
            this.showNotification('Invalid credentials', 'error');
        }
    }

    updateUserUI() {
        // Remove any previous user-display
        const existing = this.elements.headerRight.querySelector('.user-display');
        if (existing) existing.remove();

        if (this.currentUser) {
            // hide sign in/register buttons
            if (this.elements.signInBtn) this.elements.signInBtn.style.display = 'none';
            if (this.elements.registerBtn) this.elements.registerBtn.style.display = 'none';

            // build user display
            const wrapper = document.createElement('div');
            wrapper.className = 'user-display';
            const avatar = document.createElement('div');
            avatar.className = 'avatar';
            avatar.textContent = (this.currentUser.name || this.currentUser.email || 'U').charAt(0).toUpperCase();
            const nameSpan = document.createElement('span');
            nameSpan.textContent = this.currentUser.name || this.currentUser.email;
            const actions = document.createElement('div');
            actions.className = 'user-actions';
            const signout = document.createElement('button');
            signout.className = 'signout-btn';
            signout.textContent = 'Sign out';
            signout.addEventListener('click', () => this.signOut());
            actions.appendChild(signout);
            wrapper.appendChild(avatar);
            wrapper.appendChild(nameSpan);
            wrapper.appendChild(actions);
            this.elements.headerRight.insertBefore(wrapper, this.elements.addTaskBtn);
        } else {
            // show sign in/register
            if (this.elements.signInBtn) this.elements.signInBtn.style.display = '';
            if (this.elements.registerBtn) this.elements.registerBtn.style.display = '';
        }
    }

    signOut() {
        StorageService.clearUser();
        this.currentUser = null;
        this.updateUserUI();
        this.showNotification('Signed out', 'info');
    }

    toggleAnimations() {
        // removed animation toggle function
    }

    applyAnimationState() {
        // removed; animations are controlled purely by CSS for consistent UX
    }

    // Task Modal Management
    openTaskModal(taskId = null) {
        if (taskId) {
            const task = taskManager.getTask(taskId);
            if (task) {
                this.populateFormWithTask(task);
                this.elements.modalTitle.textContent = 'Edit Task';
                this.elements.taskForm.dataset.taskId = taskId;
            }
        } else {
            this.resetForm();
            this.elements.modalTitle.textContent = 'Add New Task';
            delete this.elements.taskForm.dataset.taskId;
        }

        this.elements.taskModal.classList.add('active');
        this.elements.taskTitle.focus();
    }

    closeTaskModal() {
        this.elements.taskModal.classList.remove('active');
        this.resetForm();
    }

    resetForm() {
        this.elements.taskForm.reset();
        this.elements.recurrenceSection.style.display = 'none';
        this.elements.customDaysGroup.style.display = 'none';
        this.elements.recurrencePreview.textContent = '';
        document.querySelectorAll('input[name="customDays"]').forEach(cb => cb.checked = false);
    }

    populateFormWithTask(task) {
        this.elements.taskTitle.value = task.title;
        this.elements.taskDescription.value = task.description || '';
        this.elements.taskCategory.value = task.category;
        this.elements.taskPriority.value = task.priority;
        this.elements.taskDueDate.value = task.dueDate || '';
        this.elements.taskTags.value = task.tags ? task.tags.join(', ') : '';

        if (task.recurring && task.recurrencePattern) {
            this.elements.taskRecurring.checked = true;
            this.toggleRecurrenceSection(true);
            this.elements.recurrenceType.value = task.recurrencePattern.type;
            
            if (task.recurrencePattern.type === 'custom' || task.recurrencePattern.type === 'weekly') {
                this.elements.customDaysGroup.style.display = 'flex';
                task.recurrencePattern.days.forEach(day => {
                    document.querySelector(`input[name="customDays"][value="${day}"]`).checked = true;
                });
            }
            
            if (task.recurrencePattern.endDate) {
                this.elements.recurrenceEndDate.value = task.recurrencePattern.endDate;
                this.updateRecurrencePreview();
            }
        } else {
            this.elements.taskRecurring.checked = false;
            this.toggleRecurrenceSection(false);
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const title = this.elements.taskTitle.value.trim();
        if (!title) {
            this.showNotification('Please enter a task title', 'error');
            return;
        }

        const category = this.elements.taskCategory.value;
        if (!category) {
            this.showNotification('Please select a category', 'error');
            return;
        }

        const taskData = {
            title,
            description: this.elements.taskDescription.value.trim(),
            category,
            priority: this.elements.taskPriority.value,
            dueDate: this.elements.taskDueDate.value || null,
            tags: this.elements.taskTags.value
                ? this.elements.taskTags.value.split(',').map(t => t.trim())
                : [],
            recurring: this.elements.taskRecurring.checked,
            recurrencePattern: null
        };

        // Handle recurrence
        if (taskData.recurring) {
            const recType = this.elements.recurrenceType.value;
            const endDate = this.elements.recurrenceEndDate.value;

            if (!endDate) {
                this.showNotification('Please set an end date for recurring tasks', 'error');
                return;
            }

            let days = [];
            if (recType === 'custom' || recType === 'weekly') {
                const selectedDays = document.querySelectorAll('input[name="customDays"]:checked');
                days = Array.from(selectedDays).map(cb => parseInt(cb.value));

                if (days.length === 0) {
                    this.showNotification('Please select at least one day', 'error');
                    return;
                }
            }

            taskData.recurrencePattern = {
                type: recType,
                days: days.length > 0 ? days : null,
                endDate
            };
        }

        const taskId = this.elements.taskForm.dataset.taskId;
        if (taskId) {
            taskManager.updateTask(taskId, taskData);
            this.showNotification('Task updated successfully', 'success');
        } else {
            taskManager.addTask(taskData);
            this.showNotification('Task created successfully', 'success');
        }

        this.closeTaskModal();
        this.render();
    }

    // Filtering & Search
    handleSearch(e) {
        taskManager.filters.search = e.target.value.toLowerCase();
        this.render();
    }

    handleStatusFilter(e) {
        taskManager.filters.status = e.target.value;
        this.render();
    }

    handleCategoryFilter(category, checked) {
        // support multiple categories
        if (!Array.isArray(taskManager.filters.category)) taskManager.filters.category = [];
        if (checked) {
            if (!taskManager.filters.category.includes(category)) taskManager.filters.category.push(category);
        } else {
            const idx = taskManager.filters.category.indexOf(category);
            if (idx !== -1) taskManager.filters.category.splice(idx, 1);
        }
        this.render();
    }

    // View Controls
    handleViewChange(e) {
        const view = e.target.dataset.view;
        this.elements.viewBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        this.elements.tasksContainer.dataset.view = view;
    }

    // Theme Management
    initTheme() {
        const savedTheme = StorageService.getTheme();
        this.applyTheme(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        StorageService.saveTheme(theme);
        this.elements.themeToggle.setAttribute('aria-pressed', theme === 'dark');
        
        // Update charts theme
        chartsManager.setTheme(theme);
        chartsManager.updateAllCharts();
    }

    // Drag Mode
    toggleDragMode() {
        taskManager.dragEnabled = !taskManager.dragEnabled;
        StorageService.saveDragState(taskManager.dragEnabled);
        this.elements.dragToggle.setAttribute('aria-pressed', taskManager.dragEnabled);
        
        if (taskManager.dragEnabled) {
            this.showNotification('Drag-to-reorder enabled', 'success');
        } else {
            this.showNotification('Drag-to-reorder disabled', 'info');
        }
        
        this.render();
    }

    // Recurrence UI
    toggleRecurrenceSection(show) {
        this.elements.recurrenceSection.style.display = show ? 'block' : 'none';
    }

    handleRecurrenceTypeChange(type) {
        if (type === 'custom' || type === 'weekly') {
            this.elements.customDaysGroup.style.display = 'flex';
        } else {
            this.elements.customDaysGroup.style.display = 'none';
        }
        this.updateRecurrencePreview();
    }

    updateRecurrencePreview() {
        const recType = this.elements.recurrenceType.value;
        const endDate = this.elements.recurrenceEndDate.value;

        if (!endDate) {
            this.elements.recurrencePreview.textContent = '';
            return;
        }

        let days = [];
        if (recType === 'custom' || recType === 'weekly') {
            const selectedDays = document.querySelectorAll('input[name="customDays"]:checked');
            days = Array.from(selectedDays).map(cb => parseInt(cb.value));
        }

        const pattern = {
            type: recType,
            days: days.length > 0 ? days : null,
            endDate
        };

        const display = RecurrenceEngine.getRecurrenceDisplay(pattern);
        this.elements.recurrencePreview.textContent = `Pattern: ${display}`;
    }

    // Task Rendering
    render() {
        this.updateTaskList();
        this.updateSidebar();
        this.updateStatistics();
        this.renderCategoryFilters();
    }

    updateTaskList() {
        const tasks = taskManager.getFilteredTasks();
        const sortBy = this.currentSort || 'dueDate';
        const sortedTasks = taskManager.sortTasks(tasks, sortBy);

        this.elements.tasksContainer.innerHTML = '';

        if (sortedTasks.length === 0) {
            this.elements.emptyState.style.display = 'flex';
            return;
        }

        this.elements.emptyState.style.display = 'none';

        sortedTasks.forEach((task, idx) => {
            const taskElement = this.createTaskCard(task);
            this.elements.tasksContainer.appendChild(taskElement);
            // Apply entrance animation only when animations are enabled
            if (this.animationsEnabled) {
                taskElement.classList.add('animate-in');
                taskElement.style.animationDelay = `${idx * 45}ms`;
                taskElement.addEventListener('animationend', () => {
                    // Preserve final visible state set by the animation
                    try {
                        taskElement.style.opacity = '1';
                        taskElement.style.transform = 'none';
                    } catch (err) {}
                    // clean up animation delay but keep final visible styles
                    taskElement.style.animationDelay = '';
                }, { once: true });
            } else {
                taskElement.style.opacity = '1';
            }
        });

        // Add drag event listeners if enabled
        if (taskManager.dragEnabled) {
            this.attachDragListeners();
        }

        // Update section title
        const statusLabel = {
            all: 'All Tasks',
            active: 'Active Tasks',
            completed: 'Completed Tasks',
            overdue: 'Overdue Tasks'
        };
        this.elements.sectionTitle.textContent = statusLabel[taskManager.filters.status] || 'All Tasks';
    }

    createTaskCard(task) {
        const card = document.createElement('div');
        card.className = 'task-card';
        if (this.animationsEnabled) card.classList.add('card-hover');
        card.dataset.taskId = task.id;
        card.draggable = taskManager.dragEnabled;

        if (task.completed) card.classList.add('completed');

        const isOverdue = RecurrenceEngine.isTaskOverdue(task.dueDate) && !task.completed;
        if (isOverdue) card.classList.add('overdue');

        let html = '';

        // Drag handle
        if (taskManager.dragEnabled) {
            html += '<div class="drag-handle">⋮⋮</div>';
        }

        // Checkbox
        html += `<input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} aria-label="Toggle task completion">`;

        // Content
        html += `
            <div class="task-content">
                <div class="task-title">${this.escapeHtml(task.title)}</div>
                ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ''}
                <div class="task-meta">
                    <span class="task-category ${task.category}">${task.category}</span>
                    <span class="task-priority ${task.priority}">${task.priority}</span>
                    ${task.recurring ? `<span class="task-recurrence" title="${RecurrenceEngine.getRecurrenceDisplay(task.recurrencePattern)}">🔄 Recurring</span>` : ''}
                    ${task.dueDate ? `<span class="task-due-date">${RecurrenceEngine.formatDueDateText(task.dueDate)}</span>` : ''}
                </div>
            </div>
        `;

        // Actions
        html += `
            <div class="task-actions">
                <button class="task-btn edit-btn" title="Edit task" aria-label="Edit task">✎</button>
                <button class="task-btn delete-btn" title="Delete task" aria-label="Delete task">✕</button>
            </div>
        `;

        card.innerHTML = html;

        // Attach event listeners
        const checkbox = card.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => {
            taskManager.toggleTask(task.id);
            this.render();
        });

        const editBtn = card.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => this.openTaskModal(task.id));

        const deleteBtn = card.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this task?')) {
                taskManager.deleteTask(task.id);
                this.render();
                this.showNotification('Task deleted', 'success');
            }
        });

        return card;
    }

    // Drag and Drop
    attachDragListeners() {
        const cards = document.querySelectorAll('.task-card');
        
        cards.forEach(card => {
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', e.currentTarget);
                card.classList.add('dragging-source');
            });

            card.addEventListener('dragend', (e) => {
                card.classList.remove('dragging-source');
                document.querySelectorAll('.task-card').forEach(c => c.classList.remove('drag-over-target'));
            });
            card.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                if (card.classList.contains('dragging-source')) return;
                card.classList.add('drag-over-target');
            });

            card.addEventListener('dragleave', (e) => {
                card.classList.remove('drag-over-target');
            });

            card.addEventListener('drop', (e) => {
                e.preventDefault();
                card.classList.remove('drag-over-target');
                
                const sourceId = document.querySelector('.dragging-source')?.dataset.taskId;
                const targetId = card.dataset.taskId;
                
                if (sourceId && targetId && sourceId !== targetId) {
                    // Reorder tasks in UI (visual swap)
                    const container = this.elements.tasksContainer;
                    const sourceElement = document.querySelector(`[data-task-id="${sourceId}"]`);
                    const targetElement = document.querySelector(`[data-task-id="${targetId}"]`);
                    
                    if (sourceElement && targetElement) {
                        container.insertBefore(sourceElement, targetElement);
                                sourceElement.classList.remove('dragging');
                                targetElement.classList.remove('drag-over');
                                // Persist new order: collect current task IDs from DOM and reorder taskManager.tasks
                                const order = Array.from(container.querySelectorAll('.task-card')).map(el => el.dataset.taskId);
                                const newTasks = [];
                                order.forEach(id => {
                                    const t = taskManager.getTask(id);
                                    if (t) newTasks.push(t);
                                });
                                // Append any remaining tasks that might be filtered out in the current view
                                taskManager.tasks.forEach(t => {
                                    if (!order.includes(t.id)) newTasks.push(t);
                                });
                                taskManager.tasks = newTasks;
                                taskManager.saveTasks();
                                this.showNotification('Task order saved', 'success');
                    }
                }
            });
        });
    }

    // Sidebar Updates
    updateSidebar() {
        const stats = taskManager.getStatistics();
        
        // Update completion rate
        this.elements.completionRate.textContent = stats.completionRate + '%';
        this.elements.progressFill.style.width = stats.completionRate + '%';

        // Update filter counts
        document.querySelector('[data-status="all"]').textContent = stats.total;
        document.querySelector('[data-status="active"]').textContent = stats.active;
        document.querySelector('[data-status="completed"]').textContent = stats.completed;
        document.querySelector('[data-status="overdue"]').textContent = stats.overdue;

        // Update filter badge (active filters count)
        try {
            let activeFilters = 0;
            if (taskManager.filters) {
                if (taskManager.filters.status && taskManager.filters.status !== 'all') activeFilters++;
                if (taskManager.filters.search && taskManager.filters.search.trim() !== '') activeFilters++;
                if (Array.isArray(taskManager.filters.category) && taskManager.filters.category.length > 0) activeFilters += taskManager.filters.category.length;
            }
            if (this.elements.filterBadge) {
                if (activeFilters > 0) {
                    this.elements.filterBadge.style.display = 'inline-block';
                    this.elements.filterBadge.textContent = String(activeFilters);
                } else {
                    this.elements.filterBadge.style.display = 'none';
                }
            }
        } catch (err) {
            // ignore badge errors
        }
    }

    renderCategoryFilters() {
        const categories = ['work', 'personal', 'health', 'shopping', 'finance', 'learning'];
        this.elements.categoryFilters.innerHTML = categories.map(cat => `
            <label class="filter-item">
                <input type="checkbox" name="category" value="${cat}" ${Array.isArray(taskManager.filters.category) && taskManager.filters.category.includes(cat) ? 'checked' : ''}>
                <span class="filter-label">${cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                <span class="filter-count">${this.getCategoryCount(cat)}</span>
            </label>
        `).join('');

        document.querySelectorAll('input[name="category"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleCategoryFilter(e.target.value, e.target.checked);
            });
        });
    }

    getCategoryCount(category) {
        return taskManager.tasks.filter(t => t.category === category && !t.completed).length;
    }

    // Statistics
    updateStatistics() {
        const stats = taskManager.getStatistics();
        this.elements.totalCompleted.textContent = stats.completed;
        this.elements.totalActive.textContent = stats.active;
        this.elements.totalOverdue.textContent = stats.overdue;
        this.elements.totalRecurring.textContent = stats.recurring;

        chartsManager.updateAllCharts();
    }

    // Notifications
    showNotification(message, type = 'info') {
        this.elements.notificationMessage.textContent = message;
        this.elements.notification.className = `notification show ${type}`;

        setTimeout(() => {
            this.elements.notification.classList.remove('show');
        }, 3000);
    }

    // Keyboard Shortcuts
    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            this.elements.searchInput.focus();
        }

        // Ctrl/Cmd + N to create new task
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            this.openTaskModal();
        }

        // Escape to close modal
        if (e.key === 'Escape') {
            this.closeTaskModal();
            this.closeSidebar();
        }
    }

    // Sidebar control
    toggleSidebar() {
        if (!this.elements.sidebar) return;
        if (this.elements.sidebar.classList.contains('open')) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    openSidebar() {
        if (!this.elements.sidebar) return;
        // Save previous focus to restore later
        try { this._previousFocus = document.activeElement; } catch (e) { this._previousFocus = null; }

        this.elements.sidebar.classList.add('open');
        this.elements.sidebar.setAttribute('aria-hidden', 'false');
        if (this.elements.sidebarOverlay) this.elements.sidebarOverlay.classList.add('active');

        // Mark main content as inert for screen readers
        const main = document.querySelector('.content');
        if (main) main.setAttribute('aria-hidden', 'true');

        // Focus the first focusable control in the sidebar
        const focusable = Array.from(this.elements.sidebar.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled'));
        if (focusable.length > 0) {
            focusable[0].focus();
        }

        // Install focus-trap key handler
        this._sidebarKeyHandler = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                this.closeSidebar();
                return;
            }

            if (e.key !== 'Tab') return;

            const nodes = Array.from(this.elements.sidebar.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(n => !n.hasAttribute('disabled'));
            if (nodes.length === 0) return;
            const first = nodes[0];
            const last = nodes[nodes.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener('keydown', this._sidebarKeyHandler, true);
    }

    closeSidebar() {
        if (!this.elements.sidebar) return;
        this.elements.sidebar.classList.remove('open');
        this.elements.sidebar.setAttribute('aria-hidden', 'true');
        if (this.elements.sidebarOverlay) this.elements.sidebarOverlay.classList.remove('active');
        // remove inert marker from main
        const main = document.querySelector('.content');
        if (main) main.removeAttribute('aria-hidden');

        // remove focus trap
        if (this._sidebarKeyHandler) {
            document.removeEventListener('keydown', this._sidebarKeyHandler, true);
            this._sidebarKeyHandler = null;
        }

        // restore previous focus
        try {
            if (this._previousFocus && typeof this._previousFocus.focus === 'function') this._previousFocus.focus();
        } catch (err) {}
    }

    clearAllFilters() {
        taskManager.filters.status = 'all';
        taskManager.filters.category = [];
        taskManager.filters.search = '';
        this.elements.searchInput.value = '';
        document.querySelector('input[name="status"][value="all"]').checked = true;
        this.showNotification('All filters cleared', 'success');
        this.render();
    }

    // Utility
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize UI
const uiManager = new UIManager();
