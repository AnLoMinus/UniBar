/**
 * UniBar - סרגלי עזר אוניברסליים
 * JavaScript Core Library
 * 
 * @author Moshe Leon Yaakubov (AnLoMinus)
 * @version 1.0.0
 * @license MIT
 */

'use strict';

// ==========================================================================
// UniBar Core Class
// ==========================================================================

class UniBar {
    constructor(options = {}) {
        this.options = {
            theme: 'mystical',
            position: 'top',
            features: ['navigation', 'search', 'shortcuts'],
            customConfig: {},
            container: 'body',
            rtl: true,
            debug: false,
            ...options
        };
        
        this.state = {
            initialized: false,
            currentTheme: this.options.theme,
            currentPosition: this.options.position,
            activeFeatures: new Set(this.options.features),
            searchResults: [],
            breadcrumbs: []
        };
        
        this.elements = {};
        this.eventListeners = new Map();
        this.shortcuts = new Map();
        
        this.init();
    }
    
    /**
     * Initialize UniBar
     */
    init() {
        if (this.state.initialized) {
            this.log('UniBar already initialized');
            return;
        }
        
        this.log('Initializing UniBar...');
        
        try {
            this.createElements();
            this.bindEvents();
            this.setupShortcuts();
            this.updateTheme(this.options.theme);
            this.updatePosition(this.options.position);
            this.setupFeatures();
            
            this.state.initialized = true;
            this.emit('init');
            
            this.log('UniBar initialized successfully');
        } catch (error) {
            this.log('Failed to initialize UniBar:', error);
            throw error;
        }
    }
    
    /**
     * Create DOM elements
     */
    createElements() {
        const container = typeof this.options.container === 'string' 
            ? document.querySelector(this.options.container) 
            : this.options.container;
            
        if (!container) {
            throw new Error('Container element not found');
        }
        
        // Create main UniBar element if it doesn't exist
        let unibar = document.getElementById('unibar');
        if (!unibar) {
            unibar = this.createElement('nav', {
                id: 'unibar',
                className: 'unibar',
                'aria-label': 'ניווט ראשי'
            });
            container.insertBefore(unibar, container.firstChild);
        }
        
        this.elements.unibar = unibar;
        this.elements.container = container;
        
        // Get or create other elements
        this.elements.brand = unibar.querySelector('.unibar__brand') || this.createBrand();
        this.elements.nav = unibar.querySelector('.unibar__nav') || this.createNavigation();
        this.elements.search = unibar.querySelector('.unibar__search') || this.createSearch();
        this.elements.themes = unibar.querySelector('.unibar__themes') || this.createThemes();
        this.elements.settings = unibar.querySelector('.unibar__settings') || this.createSettings();
        this.elements.breadcrumbs = unibar.querySelector('.unibar__breadcrumbs') || this.createBreadcrumbs();
    }
    
    /**
     * Create brand element
     */
    createBrand() {
        const brand = this.createElement('div', { className: 'unibar__brand' });
        const logo = this.createElement('a', {
            href: '#',
            className: 'unibar__logo',
            'aria-label': 'לוגו UniBar'
        });
        
        logo.innerHTML = `
            <span class="unibar__logo-icon">🧭</span>
            <span class="unibar__logo-text">UniBar</span>
        `;
        
        brand.appendChild(logo);
        this.elements.unibar.appendChild(brand);
        return brand;
    }
    
    /**
     * Create navigation element
     */
    createNavigation() {
        const nav = this.createElement('div', { className: 'unibar__nav' });
        const navList = this.createElement('ul', { className: 'unibar__nav-list' });
        
        const navItems = [
            { href: '#home', text: 'בית' },
            { href: '#features', text: 'תכונות' },
            { href: '#docs', text: 'תיעוד' },
            { href: '#examples', text: 'דוגמאות' },
            { href: '#contact', text: 'צור קשר' }
        ];
        
        navItems.forEach(item => {
            const li = this.createElement('li', { className: 'unibar__nav-item' });
            const link = this.createElement('a', {
                href: item.href,
                className: 'unibar__nav-link',
                textContent: item.text
            });
            
            li.appendChild(link);
            navList.appendChild(li);
        });
        
        nav.appendChild(navList);
        this.elements.unibar.appendChild(nav);
        return nav;
    }
    
    /**
     * Create search element
     */
    createSearch() {
        const search = this.createElement('div', { className: 'unibar__search' });
        const container = this.createElement('div', { className: 'unibar__search-container' });
        
        const input = this.createElement('input', {
            type: 'text',
            className: 'unibar__search-input',
            placeholder: 'חפש...',
            'aria-label': 'חיפוש'
        });
        
        const button = this.createElement('button', {
            className: 'unibar__search-button',
            'aria-label': 'חיפוש'
        });
        button.innerHTML = '<span class="unibar__search-icon">🔍</span>';
        
        const results = this.createElement('div', {
            className: 'unibar__search-results',
            id: 'searchResults'
        });
        
        container.appendChild(input);
        container.appendChild(button);
        search.appendChild(container);
        search.appendChild(results);
        this.elements.unibar.appendChild(search);
        
        this.elements.searchInput = input;
        this.elements.searchButton = button;
        this.elements.searchResults = results;
        
        return search;
    }
    
    /**
     * Create themes element
     */
    createThemes() {
        const themes = this.createElement('div', { className: 'unibar__themes' });
        
        const toggle = this.createElement('button', {
            className: 'unibar__theme-toggle',
            id: 'themeToggle',
            'aria-label': 'החלף תמה'
        });
        toggle.innerHTML = '<span class="unibar__theme-icon">🌙</span>';
        
        const menu = this.createElement('div', {
            className: 'unibar__theme-menu',
            id: 'themeMenu'
        });
        
        const themeOptions = [
            { value: 'mystical', text: 'מיסטי' },
            { value: 'modern', text: 'מודרני' },
            { value: 'classic', text: 'קלאסי' },
            { value: 'dark', text: 'כהה' },
            { value: 'light', text: 'בהיר' }
        ];
        
        themeOptions.forEach(option => {
            const button = this.createElement('button', {
                className: 'unibar__theme-option',
                'data-theme': option.value,
                textContent: option.text
            });
            menu.appendChild(button);
        });
        
        themes.appendChild(toggle);
        themes.appendChild(menu);
        this.elements.unibar.appendChild(themes);
        
        this.elements.themeToggle = toggle;
        this.elements.themeMenu = menu;
        
        return themes;
    }
    
    /**
     * Create settings element
     */
    createSettings() {
        const settings = this.createElement('div', { className: 'unibar__settings' });
        
        const toggle = this.createElement('button', {
            className: 'unibar__settings-toggle',
            id: 'settingsToggle',
            'aria-label': 'הגדרות'
        });
        toggle.innerHTML = '<span class="unibar__settings-icon">⚙️</span>';
        
        const menu = this.createElement('div', {
            className: 'unibar__settings-menu',
            id: 'settingsMenu'
        });
        
        menu.innerHTML = `
            <div class="unibar__settings-section">
                <h3>שפה</h3>
                <select class="unibar__settings-select">
                    <option value="he">עברית</option>
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                </select>
            </div>
            <div class="unibar__settings-section">
                <h3>גודל גופן</h3>
                <input type="range" class="unibar__settings-range" min="12" max="24" value="16">
            </div>
            <div class="unibar__settings-section">
                <h3>נגישות</h3>
                <label class="unibar__settings-checkbox">
                    <input type="checkbox" checked>
                    <span>הדגשת קישורים</span>
                </label>
            </div>
        `;
        
        settings.appendChild(toggle);
        settings.appendChild(menu);
        this.elements.unibar.appendChild(settings);
        
        this.elements.settingsToggle = toggle;
        this.elements.settingsMenu = menu;
        
        return settings;
    }
    
    /**
     * Create breadcrumbs element
     */
    createBreadcrumbs() {
        const breadcrumbs = this.createElement('div', {
            className: 'unibar__breadcrumbs',
            id: 'breadcrumbs'
        });
        
        const nav = this.createElement('nav', { className: 'unibar__breadcrumbs-nav' });
        nav.innerHTML = `
            <a href="#" class="unibar__breadcrumbs-home">🏠</a>
            <span class="unibar__breadcrumbs-separator">›</span>
            <span class="unibar__breadcrumbs-current">בית</span>
        `;
        
        breadcrumbs.appendChild(nav);
        this.elements.unibar.appendChild(breadcrumbs);
        
        this.elements.breadcrumbsNav = nav;
        
        return breadcrumbs;
    }
    
    /**
     * Bind event listeners
     */
    bindEvents() {
        // Navigation events
        if (this.elements.nav) {
            this.elements.nav.addEventListener('click', (e) => {
                if (e.target.classList.contains('unibar__nav-link')) {
                    e.preventDefault();
                    this.handleNavigation(e.target);
                }
            });
        }
        
        // Search events
        if (this.elements.searchInput) {
            this.elements.searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
            
            this.elements.searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.performSearch(e.target.value);
                }
            });
        }
        
        if (this.elements.searchButton) {
            this.elements.searchButton.addEventListener('click', () => {
                this.performSearch(this.elements.searchInput.value);
            });
        }
        
        // Theme events
        if (this.elements.themeToggle) {
            this.elements.themeToggle.addEventListener('click', () => {
                this.toggleThemeMenu();
            });
        }
        
        if (this.elements.themeMenu) {
            this.elements.themeMenu.addEventListener('click', (e) => {
                if (e.target.classList.contains('unibar__theme-option')) {
                    this.setTheme(e.target.dataset.theme);
                    this.hideThemeMenu();
                }
            });
        }
        
        // Settings events
        if (this.elements.settingsToggle) {
            this.elements.settingsToggle.addEventListener('click', () => {
                this.toggleSettingsMenu();
            });
        }
        
        // Click outside to close menus
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.unibar__themes')) {
                this.hideThemeMenu();
            }
            if (!e.target.closest('.unibar__settings')) {
                this.hideSettingsMenu();
            }
            if (!e.target.closest('.unibar__search')) {
                this.hideSearchResults();
            }
        });
        
        // Window events
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }
    
    /**
     * Setup keyboard shortcuts
     */
    setupShortcuts() {
        this.shortcuts.set('Ctrl+/', () => this.focusSearch());
        this.shortcuts.set('Ctrl+k', () => this.showShortcuts());
        this.shortcuts.set('Ctrl+t', () => this.toggleTheme());
        this.shortcuts.set('Ctrl+s', () => this.toggleSettings());
        this.shortcuts.set('Escape', () => this.closeAllMenus());
    }
    
    /**
     * Setup features based on configuration
     */
    setupFeatures() {
        this.options.features.forEach(feature => {
            this.enableFeature(feature);
        });
    }
    
    /**
     * Handle navigation
     */
    handleNavigation(link) {
        const href = link.getAttribute('href');
        const text = link.textContent;
        
        // Update active link
        this.elements.nav.querySelectorAll('.unibar__nav-link').forEach(l => {
            l.classList.remove('active');
        });
        link.classList.add('active');
        
        // Update breadcrumbs
        this.updateBreadcrumbs(text);
        
        // Emit navigation event
        this.emit('navigate', href);
        
        // Scroll to section if it's an anchor link
        if (href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
    
    /**
     * Handle search input
     */
    handleSearch(query) {
        if (query.length < 2) {
            this.hideSearchResults();
            return;
        }
        
        // Simulate search results (in real implementation, this would be an API call)
        const results = this.simulateSearch(query);
        this.showSearchResults(results);
    }
    
    /**
     * Perform search
     */
    performSearch(query) {
        if (!query.trim()) return;
        
        this.log('Performing search for:', query);
        this.emit('search', query, this.state.searchResults);
        
        // Hide search results
        this.hideSearchResults();
        
        // Clear search input
        this.elements.searchInput.value = '';
    }
    
    /**
     * Simulate search results
     */
    simulateSearch(query) {
        const mockResults = [
            { title: 'מדריך התחלה מהירה', url: '#docs', description: 'למד איך להשתמש ב-UniBar' },
            { title: 'תכונות מתקדמות', url: '#features', description: 'גלה את כל התכונות הזמינות' },
            { title: 'דוגמאות קוד', url: '#examples', description: 'דוגמאות מעשיות לשימוש' },
            { title: 'API Reference', url: '#docs', description: 'תיעוד מלא של ה-API' },
            { title: 'התאמה אישית', url: '#docs', description: 'התאם את UniBar לצרכים שלך' }
        ];
        
        return mockResults.filter(result => 
            result.title.includes(query) || result.description.includes(query)
        );
    }
    
    /**
     * Show search results
     */
    showSearchResults(results) {
        if (!results.length) {
            this.hideSearchResults();
            return;
        }
        
        this.state.searchResults = results;
        
        const resultsHTML = results.map(result => `
            <div class="unibar__search-result" data-url="${result.url}">
                <div class="unibar__search-result-title">${result.title}</div>
                <div class="unibar__search-result-description">${result.description}</div>
            </div>
        `).join('');
        
        this.elements.searchResults.innerHTML = resultsHTML;
        this.elements.searchResults.classList.add('show');
        
        // Add click handlers to results
        this.elements.searchResults.querySelectorAll('.unibar__search-result').forEach(result => {
            result.addEventListener('click', () => {
                const url = result.dataset.url;
                this.performSearch(url);
            });
        });
    }
    
    /**
     * Hide search results
     */
    hideSearchResults() {
        this.elements.searchResults.classList.remove('show');
    }
    
    /**
     * Update breadcrumbs
     */
    updateBreadcrumbs(currentPage) {
        if (!this.elements.breadcrumbsNav) return;
        
        const current = this.elements.breadcrumbsNav.querySelector('.unibar__breadcrumbs-current');
        if (current) {
            current.textContent = currentPage;
        }
        
        this.state.breadcrumbs = ['בית', currentPage];
        this.emit('breadcrumbsUpdate', this.state.breadcrumbs);
    }
    
    /**
     * Set theme
     */
    setTheme(theme) {
        this.log('Setting theme to:', theme);
        
        const oldTheme = this.state.currentTheme;
        this.state.currentTheme = theme;
        
        // Update CSS class
        this.elements.unibar.className = `unibar unibar--${theme}`;
        
        // Update theme icon
        const themeIcon = this.elements.themeToggle.querySelector('.unibar__theme-icon');
        if (themeIcon) {
            const icons = {
                mystical: '🌙',
                modern: '☀️',
                classic: '📖',
                dark: '🌚',
                light: '☀️'
            };
            themeIcon.textContent = icons[theme] || '🌙';
        }
        
        this.emit('themeChange', theme, oldTheme);
    }
    
    /**
     * Toggle theme menu
     */
    toggleThemeMenu() {
        this.elements.themeMenu.classList.toggle('show');
        this.hideSettingsMenu();
    }
    
    /**
     * Hide theme menu
     */
    hideThemeMenu() {
        this.elements.themeMenu.classList.remove('show');
    }
    
    /**
     * Toggle settings menu
     */
    toggleSettingsMenu() {
        this.elements.settingsMenu.classList.toggle('show');
        this.hideThemeMenu();
    }
    
    /**
     * Hide settings menu
     */
    hideSettingsMenu() {
        this.elements.settingsMenu.classList.remove('show');
    }
    
    /**
     * Close all menus
     */
    closeAllMenus() {
        this.hideThemeMenu();
        this.hideSettingsMenu();
        this.hideSearchResults();
    }
    
    /**
     * Focus search input
     */
    focusSearch() {
        if (this.elements.searchInput) {
            this.elements.searchInput.focus();
        }
    }
    
    /**
     * Show shortcuts help
     */
    showShortcuts() {
        const shortcuts = Array.from(this.shortcuts.keys()).map(key => 
            `${key}: ${this.getShortcutDescription(key)}`
        ).join('\n');
        
        alert(`קיצורי מקלדת:\n${shortcuts}`);
    }
    
    /**
     * Get shortcut description
     */
    getShortcutDescription(key) {
        const descriptions = {
            'Ctrl+/': 'פתח חיפוש',
            'Ctrl+k': 'הצג קיצורי מקלדת',
            'Ctrl+t': 'החלף תמה',
            'Ctrl+s': 'פתח הגדרות',
            'Escape': 'סגור תפריטים'
        };
        return descriptions[key] || 'פונקציה לא ידועה';
    }
    
    /**
     * Toggle theme
     */
    toggleTheme() {
        const themes = ['mystical', 'modern', 'classic', 'dark', 'light'];
        const currentIndex = themes.indexOf(this.state.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        this.setTheme(themes[nextIndex]);
    }
    
    /**
     * Toggle settings
     */
    toggleSettings() {
        this.toggleSettingsMenu();
    }
    
    /**
     * Handle keyboard events
     */
    handleKeyboard(e) {
        const key = this.getKeyString(e);
        
        if (this.shortcuts.has(key)) {
            e.preventDefault();
            this.shortcuts.get(key)();
        }
    }
    
    /**
     * Get key string for shortcuts
     */
    getKeyString(e) {
        const parts = [];
        if (e.ctrlKey) parts.push('Ctrl');
        if (e.altKey) parts.push('Alt');
        if (e.shiftKey) parts.push('Shift');
        parts.push(e.key);
        return parts.join('+');
    }
    
    /**
     * Handle window resize
     */
    handleResize() {
        // Close menus on mobile
        if (window.innerWidth < 768) {
            this.closeAllMenus();
        }
    }
    
    /**
     * Handle window scroll
     */
    handleScroll() {
        // Add scroll effect to UniBar
        const scrolled = window.scrollY > 50;
        this.elements.unibar.classList.toggle('unibar--scrolled', scrolled);
    }
    
    /**
     * Enable feature
     */
    enableFeature(feature) {
        this.state.activeFeatures.add(feature);
        this.emit('featureEnable', feature);
        this.log('Feature enabled:', feature);
    }
    
    /**
     * Disable feature
     */
    disableFeature(feature) {
        this.state.activeFeatures.delete(feature);
        this.emit('featureDisable', feature);
        this.log('Feature disabled:', feature);
    }
    
    /**
     * Check if feature is enabled
     */
    isFeatureEnabled(feature) {
        return this.state.activeFeatures.has(feature);
    }
    
    /**
     * Update configuration
     */
    updateConfig(newOptions) {
        this.options = { ...this.options, ...newOptions };
        this.log('Configuration updated:', newOptions);
    }
    
    /**
     * Update theme
     */
    updateTheme(theme) {
        this.setTheme(theme);
    }
    
    /**
     * Update position
     */
    updatePosition(position) {
        this.log('Updating position to:', position);
        this.state.currentPosition = position;
        this.emit('positionChange', position);
    }
    
    /**
     * Create DOM element
     */
    createElement(tag, attributes = {}) {
        const element = document.createElement(tag);
        
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'textContent') {
                element.textContent = value;
            } else if (key === 'innerHTML') {
                element.innerHTML = value;
            } else {
                element.setAttribute(key, value);
            }
        });
        
        return element;
    }
    
    /**
     * Event emitter
     */
    on(event, callback) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(callback);
    }
    
    /**
     * Remove event listener
     */
    off(event, callback) {
        if (!this.eventListeners.has(event)) return;
        
        if (callback) {
            const listeners = this.eventListeners.get(event);
            const index = listeners.indexOf(callback);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        } else {
            this.eventListeners.delete(event);
        }
    }
    
    /**
     * Emit event
     */
    emit(event, ...args) {
        if (!this.eventListeners.has(event)) return;
        
        this.eventListeners.get(event).forEach(callback => {
            try {
                callback(...args);
            } catch (error) {
                this.log('Error in event listener:', error);
            }
        });
    }
    
    /**
     * Log message
     */
    log(...args) {
        if (this.options.debug) {
            console.log('[UniBar]', ...args);
        }
    }
    
    /**
     * Destroy UniBar
     */
    destroy() {
        this.log('Destroying UniBar...');
        
        // Remove event listeners
        this.eventListeners.clear();
        
        // Remove DOM elements
        if (this.elements.unibar && this.elements.unibar.parentNode) {
            this.elements.unibar.parentNode.removeChild(this.elements.unibar);
        }
        
        // Reset state
        this.state.initialized = false;
        this.elements = {};
        
        this.emit('destroy');
        this.log('UniBar destroyed');
    }
}

// ==========================================================================
// Initialize UniBar when DOM is ready
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize UniBar
    const uniBar = new UniBar({
        theme: 'mystical',
        position: 'top',
        features: ['navigation', 'search', 'shortcuts', 'themes'],
        debug: true
    });
    
    // Add event listeners
    uniBar.on('init', () => {
        console.log('UniBar initialized successfully!');
    });
    
    uniBar.on('themeChange', (newTheme, oldTheme) => {
        console.log(`Theme changed from ${oldTheme} to ${newTheme}`);
    });
    
    uniBar.on('search', (query, results) => {
        console.log(`Search for "${query}" returned ${results.length} results`);
    });
    
    uniBar.on('navigate', (path) => {
        console.log(`Navigated to ${path}`);
    });
    
    // Make UniBar globally available
    window.UniBar = uniBar;
    
    // Add some demo functionality
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            uniBar.focusSearch();
        });
    }
    
    const viewDocsBtn = document.getElementById('viewDocsBtn');
    if (viewDocsBtn) {
        viewDocsBtn.addEventListener('click', () => {
            uniBar.handleNavigation({ 
                getAttribute: () => '#docs',
                textContent: 'תיעוד',
                classList: { 
                    contains: () => false,
                    remove: () => {},
                    add: () => {}
                }
            });
        });
    }
    
    // Example buttons
    document.querySelectorAll('[data-example]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const example = e.target.dataset.example;
            alert(`פתיחת דוגמה: ${example}`);
        });
    });
    
    // Form submission
    const form = document.querySelector('.form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('תודה על ההודעה! נחזור אליך בקרוב.');
            form.reset();
        });
    }
});

// ==========================================================================
// Export for module systems
// ==========================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UniBar;
}

if (typeof define === 'function' && define.amd) {
    define(() => UniBar);
}
