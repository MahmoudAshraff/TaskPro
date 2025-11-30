// Recurrence Module
// Handles recurring task patterns and generation

class RecurrenceEngine {
    static patterns = {
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
        custom: 'Custom'
    };

    static createRecurrencePattern(type, days, endDate) {
        return {
            type,
            days: days || [],
            endDate
        };
    }

    static getRecurrenceDisplay(pattern) {
        if (!pattern) return '';

        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const fullDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let display = '';

        switch (pattern.type) {
            case 'daily':
                display = `Every day`;
                break;
            case 'weekly':
                const weekDays = pattern.days.map(d => dayNames[d]).join(', ');
                display = `Every ${weekDays}`;
                break;
            case 'monthly':
                display = `Monthly (on the same date)`;
                break;
            case 'custom':
                const customDays = pattern.days.map(d => fullDayNames[d]).join(' and ');
                display = `Every ${customDays}`;
                break;
        }

        if (pattern.endDate) {
            const endDateObj = new Date(pattern.endDate);
            const formattedEnd = endDateObj.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            display += ` until ${formattedEnd}`;
        }

        return display;
    }

    static getNextOccurrence(dueDate, pattern) {
        if (!pattern || !pattern.type) return null;

        const currentDate = new Date(dueDate);
        const endDate = pattern.endDate ? new Date(pattern.endDate) : null;

        let nextDate = new Date(currentDate);

        switch (pattern.type) {
            case 'daily':
                nextDate.setDate(nextDate.getDate() + 1);
                break;

            case 'weekly':
                if (pattern.days && pattern.days.length > 0) {
                    const currentDay = nextDate.getDay();
                    let daysToAdd = 1;
                    let found = false;

                    // Find next occurrence in same week
                    for (let i = 1; i <= 7; i++) {
                        const checkDay = (currentDay + i) % 7;
                        if (pattern.days.includes(checkDay)) {
                            daysToAdd = i;
                            found = true;
                            break;
                        }
                    }

                    if (!found) {
                        daysToAdd = 7 - currentDay + pattern.days[0];
                    }

                    nextDate.setDate(nextDate.getDate() + daysToAdd);
                }
                break;

            case 'monthly':
                const dayOfMonth = currentDate.getDate();
                nextDate.setMonth(nextDate.getMonth() + 1);
                nextDate.setDate(Math.min(dayOfMonth, new Date(nextDate.getFullYear(), nextDate.getMonth() + 1, 0).getDate()));
                break;

            case 'custom':
                if (pattern.days && pattern.days.length > 0) {
                    const currentDay = nextDate.getDay();
                    let daysToAdd = 1;
                    let found = false;

                    for (let i = 1; i <= 7; i++) {
                        const checkDay = (currentDay + i) % 7;
                        if (pattern.days.includes(checkDay)) {
                            daysToAdd = i;
                            found = true;
                            break;
                        }
                    }

                    if (!found) {
                        daysToAdd = 7 - currentDay + pattern.days[0];
                    }

                    nextDate.setDate(nextDate.getDate() + daysToAdd);
                }
                break;
        }

        // Check if next date is beyond end date
        if (endDate && nextDate > endDate) {
            return null;
        }

        return nextDate.toISOString().split('T')[0];
    }

    static isTaskOverdue(dueDate) {
        if (!dueDate) return false;
        const today = new Date().toISOString().split('T')[0];
        return dueDate < today;
    }

    static getDaysUntilDue(dueDate) {
        if (!dueDate) return null;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const due = new Date(dueDate);
        due.setHours(0, 0, 0, 0);

        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays;
    }

    static formatDueDateText(dueDate) {
        if (!dueDate) return '';

        const days = this.getDaysUntilDue(dueDate);

        if (days < 0) {
            return `Overdue by ${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''}`;
        } else if (days === 0) {
            return 'Due today';
        } else if (days === 1) {
            return 'Due tomorrow';
        } else if (days <= 7) {
            return `Due in ${days} days`;
        } else {
            return `Due on ${new Date(dueDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            })}`;
        }
    }

    static parseCustomPattern(days) {
        // Validate that at least one day is selected
        if (!days || days.length === 0) {
            throw new Error('Please select at least one day');
        }
        return days;
    }

    static validatePattern(pattern) {
        if (!pattern.type) {
            throw new Error('Recurrence type is required');
        }

        if (pattern.type === 'custom' || pattern.type === 'weekly') {
            if (!pattern.days || pattern.days.length === 0) {
                throw new Error('Please select at least one day');
            }
        }

        if (!pattern.endDate) {
            throw new Error('End date is required for recurring tasks');
        }

        const today = new Date().toISOString().split('T')[0];
        if (pattern.endDate < today) {
            throw new Error('End date cannot be in the past');
        }

        return true;
    }

    static generateRecurrencePreview(pattern, startDate, count = 5) {
        if (!pattern) return [];

        const occurrences = [];
        let currentDate = new Date(startDate);

        for (let i = 0; i < count; i++) {
            const nextOccurrence = this.getNextOccurrence(currentDate.toISOString().split('T')[0], pattern);

            if (!nextOccurrence) break;

            occurrences.push(nextOccurrence);
            currentDate = new Date(nextOccurrence);

            if (pattern.endDate && nextOccurrence >= pattern.endDate) {
                break;
            }
        }

        return occurrences;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RecurrenceEngine;
}
