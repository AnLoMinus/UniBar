# 📖 מדריך API - UniBar

מדריך מקיף ל-API של UniBar עם כל הפונקציות והאפשרויות הזמינות.

## 📋 תוכן עניינים

- [ייבוא](#ייבוא)
- [יצירת מופע](#יצירת-מופע)
- [אתחול](#אתחול)
- [תצורה](#תצורה)
- [פונקציות](#פונקציות)
- [אירועים](#אירועים)
- [תכונות](#תכונות)
- [דוגמאות](#דוגמאות)

## 📦 ייבוא

### ייבוא בסיסי

```javascript
import { UniBar } from '@unibar/core';
```

### ייבוא עם תכונות ספציפיות

```javascript
import { UniBar, NavigationBar, SearchComponent } from '@unibar/core';
```

### ייבוא CSS

```javascript
import '@unibar/core/dist/unibar.css';
```

## 🏗️ יצירת מופע

### תצורה בסיסית

```javascript
const uniBar = new UniBar({
  theme: 'mystical',
  position: 'top',
  features: ['navigation', 'search']
});
```

### תצורה מתקדמת

```javascript
const uniBar = new UniBar({
  theme: 'mystical',
  position: 'top',
  features: ['navigation', 'search', 'shortcuts'],
  customConfig: {
    navigation: {
      showBreadcrumbs: true,
      maxBreadcrumbs: 5,
      homeIcon: '🏠'
    },
    search: {
      placeholder: 'חפש...',
      minLength: 2,
      maxResults: 10
    },
    shortcuts: {
      enabled: true,
      showHelp: true,
      customShortcuts: {
        'Ctrl+Shift+T': 'toggleTheme',
        'Ctrl+Shift+S': 'toggleSettings'
      }
    }
  }
});
```

## ⚙️ תצורה

### אפשרויות תצורה

| אפשרות | סוג | ברירת מחדל | תיאור |
|--------|-----|------------|-------|
| `theme` | string | `'modern'` | תמה של UniBar |
| `position` | string | `'top'` | מיקום UniBar |
| `features` | array | `['navigation']` | תכונות להפעלה |
| `customConfig` | object | `{}` | תצורה מותאמת אישית |
| `container` | string\|HTMLElement | `'body'` | אלמנט מכיל |
| `rtl` | boolean | `false` | תמיכה ב-RTL |
| `debug` | boolean | `false` | מצב דיבוג |

### תמות זמינות

```javascript
const themes = [
  'mystical',    // תמה מיסטית עם אפקטים קסומים
  'modern',      // תמה מודרנית ומינימליסטית
  'classic',     // תמה קלאסית ונקייה
  'dark',        // תמה כהה
  'light',       // תמה בהירה
  'custom'       // תמה מותאמת אישית
];
```

### מיקומים זמינים

```javascript
const positions = [
  'top',         // בחלק העליון
  'bottom',      // בחלק התחתון
  'left',        // בצד השמאלי
  'right',       // בצד הימני
  'floating'     // צף
];
```

### תכונות זמינות

```javascript
const features = [
  'navigation',  // ניווט עם breadcrumbs
  'search',      // חיפוש מהיר
  'shortcuts',   // קיצורי מקלדת
  'themes',      // החלפת תמות
  'settings',    // הגדרות
  'notifications' // התראות
];
```

## 🔧 פונקציות

### אתחול

```javascript
// אתחול בסיסי
uniBar.init();

// אתחול עם callback
uniBar.init(() => {
  console.log('UniBar initialized successfully!');
});

// אתחול עם Promise
uniBar.init().then(() => {
  console.log('UniBar initialized successfully!');
}).catch(error => {
  console.error('Failed to initialize UniBar:', error);
});
```

### הרס

```javascript
// הרס UniBar
uniBar.destroy();

// הרס עם callback
uniBar.destroy(() => {
  console.log('UniBar destroyed successfully!');
});
```

### עדכון תצורה

```javascript
// עדכון תצורה
uniBar.updateConfig({
  theme: 'dark',
  position: 'bottom'
});

// עדכון תכונה ספציפית
uniBar.updateFeature('search', {
  placeholder: 'חיפוש חדש...',
  minLength: 3
});
```

### החלפת תמה

```javascript
// החלפת תמה
uniBar.setTheme('mystical');

// החלפת תמה עם אנימציה
uniBar.setTheme('dark', { animate: true, duration: 300 });
```

### החלפת מיקום

```javascript
// החלפת מיקום
uniBar.setPosition('right');

// החלפת מיקום עם אנימציה
uniBar.setPosition('bottom', { animate: true, duration: 500 });
```

### הפעלה/כיבוי תכונות

```javascript
// הפעלת תכונה
uniBar.enableFeature('search');

// כיבוי תכונה
uniBar.disableFeature('shortcuts');

// בדיקת סטטוס תכונה
const isEnabled = uniBar.isFeatureEnabled('navigation');
```

## 📡 אירועים

### האזנה לאירועים

```javascript
// אירועי אתחול
uniBar.on('init', () => {
  console.log('UniBar initialized');
});

uniBar.on('destroy', () => {
  console.log('UniBar destroyed');
});

// אירועי תמה
uniBar.on('themeChange', (newTheme, oldTheme) => {
  console.log(`Theme changed from ${oldTheme} to ${newTheme}`);
});

// אירועי מיקום
uniBar.on('positionChange', (newPosition, oldPosition) => {
  console.log(`Position changed from ${oldPosition} to ${newPosition}`);
});

// אירועי תכונות
uniBar.on('featureEnable', (feature) => {
  console.log(`Feature ${feature} enabled`);
});

uniBar.on('featureDisable', (feature) => {
  console.log(`Feature ${feature} disabled`);
});

// אירועי חיפוש
uniBar.on('search', (query, results) => {
  console.log(`Search for "${query}" returned ${results.length} results`);
});

// אירועי ניווט
uniBar.on('navigate', (path) => {
  console.log(`Navigated to ${path}`);
});
```

### הסרת האזנה

```javascript
// הסרת האזנה לאירוע ספציפי
uniBar.off('themeChange');

// הסרת כל ההאזנות
uniBar.off();
```

## 🎯 תכונות

### ניווט (Navigation)

```javascript
const navigationConfig = {
  showBreadcrumbs: true,
  maxBreadcrumbs: 5,
  homeIcon: '🏠',
  separator: '›',
  showHome: true,
  customRoutes: {
    '/dashboard': 'לוח בקרה',
    '/settings': 'הגדרות',
    '/profile': 'פרופיל'
  }
};

uniBar.updateFeature('navigation', navigationConfig);
```

### חיפוש (Search)

```javascript
const searchConfig = {
  placeholder: 'חפש...',
  minLength: 2,
  maxResults: 10,
  debounceTime: 300,
  searchFields: ['title', 'content', 'tags'],
  customSearch: (query) => {
    // לוגיקת חיפוש מותאמת אישית
    return customSearchResults(query);
  }
};

uniBar.updateFeature('search', searchConfig);
```

### קיצורי מקלדת (Shortcuts)

```javascript
const shortcutsConfig = {
  enabled: true,
  showHelp: true,
  customShortcuts: {
    'Ctrl+Shift+T': 'toggleTheme',
    'Ctrl+Shift+S': 'toggleSettings',
    'Ctrl+Shift+N': 'toggleNavigation',
    'Ctrl+Shift+H': 'showHelp'
  },
  globalShortcuts: true
};

uniBar.updateFeature('shortcuts', shortcutsConfig);
```

### תמות (Themes)

```javascript
const themesConfig = {
  availableThemes: ['mystical', 'modern', 'classic', 'dark', 'light'],
  defaultTheme: 'mystical',
  allowCustomThemes: true,
  themeStorage: 'localStorage'
};

uniBar.updateFeature('themes', themesConfig);
```

### הגדרות (Settings)

```javascript
const settingsConfig = {
  showSettings: true,
  settingsItems: [
    {
      key: 'language',
      label: 'שפה',
      type: 'select',
      options: ['he', 'en', 'ar']
    },
    {
      key: 'fontSize',
      label: 'גודל גופן',
      type: 'range',
      min: 12,
      max: 24
    }
  ]
};

uniBar.updateFeature('settings', settingsConfig);
```

## 📝 דוגמאות

### דוגמה מלאה

```javascript
import { UniBar } from '@unibar/core';
import '@unibar/core/dist/unibar.css';

// יצירת מופע
const uniBar = new UniBar({
  theme: 'mystical',
  position: 'top',
  features: ['navigation', 'search', 'shortcuts', 'themes'],
  customConfig: {
    navigation: {
      showBreadcrumbs: true,
      maxBreadcrumbs: 5,
      homeIcon: '🏠'
    },
    search: {
      placeholder: 'חפש...',
      minLength: 2,
      maxResults: 10
    },
    shortcuts: {
      enabled: true,
      showHelp: true
    }
  },
  rtl: true,
  debug: false
});

// האזנה לאירועים
uniBar.on('init', () => {
  console.log('UniBar initialized successfully!');
});

uniBar.on('themeChange', (newTheme) => {
  console.log(`Theme changed to: ${newTheme}`);
});

uniBar.on('search', (query, results) => {
  console.log(`Search results for "${query}":`, results);
});

// אתחול
uniBar.init().then(() => {
  console.log('Ready to use!');
}).catch(error => {
  console.error('Initialization failed:', error);
});

// פונקציות עזר
function changeTheme(theme) {
  uniBar.setTheme(theme);
}

function toggleFeature(feature) {
  if (uniBar.isFeatureEnabled(feature)) {
    uniBar.disableFeature(feature);
  } else {
    uniBar.enableFeature(feature);
  }
}

// הרס בעת סגירת הדף
window.addEventListener('beforeunload', () => {
  uniBar.destroy();
});
```

### דוגמה עם React

```jsx
import React, { useEffect, useState } from 'react';
import { UniBar } from '@unibar/core';
import '@unibar/core/dist/unibar.css';

function App() {
  const [uniBar, setUniBar] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('mystical');

  useEffect(() => {
    const bar = new UniBar({
      theme: currentTheme,
      position: 'top',
      features: ['navigation', 'search', 'shortcuts'],
      rtl: true
    });

    bar.on('themeChange', (newTheme) => {
      setCurrentTheme(newTheme);
    });

    bar.init();
    setUniBar(bar);

    return () => {
      bar.destroy();
    };
  }, []);

  const handleThemeChange = (theme) => {
    if (uniBar) {
      uniBar.setTheme(theme);
    }
  };

  return (
    <div className="App">
      <h1>ברוכים הבאים ל-UniBar!</h1>
      <div>
        <button onClick={() => handleThemeChange('mystical')}>
          תמה מיסטית
        </button>
        <button onClick={() => handleThemeChange('modern')}>
          תמה מודרנית
        </button>
        <button onClick={() => handleThemeChange('dark')}>
          תמה כהה
        </button>
      </div>
    </div>
  );
}

export default App;
```

## 🔗 קישורים נוספים

- [מדריך התחלה מהירה](GETTING_STARTED.md)
- [מדריך התאמה](CUSTOMIZATION.md)
- [מדריך פריסה](DEPLOYMENT.md)
- [דוגמאות נוספות](../examples/)

---

**נוצר עם ❤️ על ידי קהילת UniBar**
