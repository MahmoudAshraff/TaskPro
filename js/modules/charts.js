// Charts Module
// Handles all Chart.js visualizations

class ChartsManager {
    constructor() {
        this.charts = {};
        this.colorScheme = {
            light: {
                primary: '#6366f1',
                success: '#10b981',
                warning: '#f59e0b',
                danger: '#ef4444',
                info: '#3b82f6',
                background: '#ffffff',
                text: '#1f2937'
            },
            dark: {
                primary: '#818cf8',
                success: '#34d399',
                warning: '#fbbf24',
                danger: '#f87171',
                info: '#60a5fa',
                background: '#1e293b',
                text: '#f1f5f9'
            }
        };
        this.currentTheme = 'light';
    }

    setTheme(theme) {
        this.currentTheme = theme;
    }

    getColors() {
        return this.colorScheme[this.currentTheme];
    }

    initCompletionChart() {
        const stats = taskManager.getStatistics();
        const ctx = document.getElementById('completionChart');
        
        if (!ctx) return;

        const colors = this.getColors();
        const completed = stats.completed;
        const remaining = stats.active;

        // Destroy existing chart
        if (this.charts.completion) {
            this.charts.completion.destroy();
        }

        this.charts.completion = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'Remaining'],
                datasets: [{
                    data: [completed, remaining],
                    backgroundColor: [colors.success, colors.primary],
                    borderColor: [colors.background, colors.background],
                    borderWidth: 2,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: colors.text,
                            font: { size: 12, weight: 500 },
                            padding: 15,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        padding: 12,
                        borderRadius: 6,
                        callbacks: {
                            label: (context) => {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    initCategoryChart() {
        const stats = taskManager.getStatistics();
        const ctx = document.getElementById('categoryChart');
        
        if (!ctx) return;

        const colors = this.getColors();
        const categoryColors = {
            work: '#3b82f6',
            personal: '#ec4899',
            health: '#10b981',
            shopping: '#f59e0b',
            finance: '#8b5cf6',
            learning: '#06b6d4'
        };

        const labels = Object.keys(stats.byCategory).map(cat => 
            cat.charAt(0).toUpperCase() + cat.slice(1)
        );
        const data = Object.values(stats.byCategory);
        const bgColors = Object.keys(stats.byCategory).map(cat => categoryColors[cat]);

        // Destroy existing chart
        if (this.charts.category) {
            this.charts.category.destroy();
        }

        this.charts.category = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Tasks by Category',
                    data: data,
                    backgroundColor: bgColors,
                    borderRadius: 6,
                    borderSkipped: false,
                    hoverBackgroundColor: bgColors.map(c => this.lightenColor(c, 20))
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        borderRadius: 6,
                        callbacks: {
                            label: (context) => `${context.parsed.x} tasks`
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            color: colors.text,
                            stepSize: 1
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: colors.text
                        },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    }
                }
            }
        });
    }

    initTrendChart() {
        const ctx = document.getElementById('trendChart');
        
        if (!ctx) return;

        const colors = this.getColors();
        
        // Generate mock productivity trend data (last 7 days)
        const last7Days = [];
        const completionCounts = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            last7Days.push(dayName);
            
            // Mock data: random completion count
            completionCounts.push(Math.floor(Math.random() * 5) + 1);
        }

        // Destroy existing chart
        if (this.charts.trend) {
            this.charts.trend.destroy();
        }

        this.charts.trend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: last7Days,
                datasets: [{
                    label: 'Tasks Completed',
                    data: completionCounts,
                    borderColor: colors.primary,
                    backgroundColor: this.hexToRgba(colors.primary, 0.1),
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: colors.primary,
                    pointBorderColor: colors.background,
                    pointBorderWidth: 2,
                    pointHoverRadius: 7,
                    hoverBackgroundColor: colors.primary
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: colors.text,
                            font: { size: 12, weight: 500 },
                            padding: 15,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        borderRadius: 6,
                        callbacks: {
                            label: (context) => `${context.parsed.y} completed`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: colors.text,
                            stepSize: 1
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            color: colors.text
                        },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    }
                }
            }
        });
    }

    updateAllCharts() {
        this.initCompletionChart();
        this.initCategoryChart();
        this.initTrendChart();
    }

    destroyAllCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.charts = {};
    }

    // Helper functions
    lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, (num >> 16) + amt);
        const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
        const B = Math.min(255, (num & 0x0000FF) + amt);
        return "#" + (0x1000000 + (R << 16) + (G << 8) + B).toString(16).slice(1);
    }

    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
}

// Initialize charts manager
const chartsManager = new ChartsManager();
