# 📚 מדריך התחלה מהירה - UniBar

ברוכים הבאים ל-UniBar! מדריך זה יעזור לך להתחיל להשתמש בסרגלי העזר האוניברסליים שלנו.

## 🚀 התקנה מהירה

### התקנה עם npm

```bash
npm install @unibar/core
```

### התקנה עם yarn

```bash
yarn add @unibar/core
```

### התקנה עם pnpm

```bash
pnpm add @unibar/core
```

## 🎯 שימוש בסיסי

### 1. ייבוא UniBar

```javascript
import { UniBar } from '@unibar/core';
```

### 2. יצירת מופע

```javascript
const uniBar = new UniBar({
  theme: 'mystical',
  position: 'top',
  features: ['navigation', 'search', 'shortcuts']
});
```

### 3. אתחול

```javascript
uniBar.init();
```

## 🎨 תצורה בסיסית

### תמות זמינות

- `mystical` - תמה מיסטית עם אפקטים קסומים
- `modern` - תמה מודרנית ומינימליסטית
- `classic` - תמה קלאסית ונקייה
- `dark` - תמה כהה
- `light` - תמה בהירה

### מיקומים זמינים

- `top` - בחלק העליון
- `bottom` - בחלק התחתון
- `left` - בצד השמאלי
- `right` - בצד הימני

### תכונות זמינות

- `navigation` - ניווט עם breadcrumbs
- `search` - חיפוש מהיר
- `shortcuts` - קיצורי מקלדת
- `themes` - החלפת תמות
- `settings` - הגדרות

## 📝 דוגמאות

### דוגמה בסיסית

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UniBar - דוגמה בסיסית</title>
</head>
<body>
    <div id="app">
        <h1>ברוכים הבאים ל-UniBar!</h1>
        <p>השתמש בסרגל העזר למעלה לניווט.</p>
    </div>

    <script type="module">
        import { UniBar } from '@unibar/core';
        
        const uniBar = new UniBar({
            theme: 'mystical',
            position: 'top',
            features: ['navigation', 'search']
        });
        
        uniBar.init();
    </script>
</body>
</html>
```

### דוגמה עם React

```jsx
import React, { useEffect } from 'react';
import { UniBar } from '@unibar/core';

function App() {
  useEffect(() => {
    const uniBar = new UniBar({
      theme: 'modern',
      position: 'top',
      features: ['navigation', 'search', 'shortcuts']
    });
    
    uniBar.init();
    
    return () => {
      uniBar.destroy();
    };
  }, []);

  return (
    <div className="App">
      <h1>ברוכים הבאים ל-UniBar!</h1>
      <p>השתמש בסרגל העזר למעלה לניווט.</p>
    </div>
  );
}

export default App;
```

### דוגמה עם Vue

```vue
<template>
  <div id="app">
    <h1>ברוכים הבאים ל-UniBar!</h1>
    <p>השתמש בסרגל העזר למעלה לניווט.</p>
  </div>
</template>

<script>
import { UniBar } from '@unibar/core';

export default {
  name: 'App',
  mounted() {
    this.uniBar = new UniBar({
      theme: 'classic',
      position: 'top',
      features: ['navigation', 'search']
    });
    
    this.uniBar.init();
  },
  beforeUnmount() {
    if (this.uniBar) {
      this.uniBar.destroy();
    }
  }
}
</script>
```

## 🔧 התאמה מתקדמת

### הגדרות מותאמות אישית

```javascript
const uniBar = new UniBar({
  theme: 'mystical',
  position: 'top',
  features: ['navigation', 'search', 'shortcuts'],
  customConfig: {
    navigation: {
      showBreadcrumbs: true,
      maxBreadcrumbs: 5
    },
    search: {
      placeholder: 'חפש...',
      minLength: 2
    },
    shortcuts: {
      enabled: true,
      showHelp: true
    }
  }
});
```

### CSS מותאם אישית

```css
/* התאמת עיצוב UniBar */
.unibar {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --background-color: #ffffff;
  --text-color: #1f2937;
  --border-color: #e5e7eb;
}

.unibar-mystical {
  --primary-color: #7c3aed;
  --secondary-color: #a855f7;
  --background-color: #1e1b4b;
  --text-color: #f8fafc;
  --border-color: #4c1d95;
}
```

## 🎮 קיצורי מקלדת

- `Ctrl + /` - פתיחת חיפוש
- `Ctrl + K` - פתיחת קיצורי מקלדת
- `Ctrl + T` - החלפת תמה
- `Ctrl + S` - פתיחת הגדרות
- `Esc` - סגירת תפריטים

## 🐛 פתרון בעיות

### בעיות נפוצות

**בעיה**: UniBar לא מופיע
**פתרון**: ודא שהקוד פועל אחרי טעינת הדף

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const uniBar = new UniBar();
  uniBar.init();
});
```

**בעיה**: עיצוב לא נטען
**פתרון**: ודא שה-CSS נטען לפני אתחול UniBar

```html
<link rel="stylesheet" href="node_modules/@unibar/core/dist/unibar.css">
```

**בעיה**: תכונות לא עובדות
**פתרון**: ודא שהתכונות מוגדרות נכון

```javascript
const uniBar = new UniBar({
  features: ['navigation', 'search'] // ודא שהתכונות קיימות
});
```

## 📚 משאבים נוספים

- [מדריך API מלא](API.md)
- [מדריך התאמה](CUSTOMIZATION.md)
- [מדריך פריסה](DEPLOYMENT.md)
- [דוגמאות נוספות](../examples/)
- [שאלות נפוצות](FAQ.md)

## 🤝 עזרה ותמיכה

אם אתה נתקל בבעיות או יש לך שאלות:

- 📧 **אימייל**: anlominus@example.com
- 💬 **Discord**: [קהילת UniBar](https://discord.gg/unibar)
- 🐛 **Issues**: [GitHub Issues](https://github.com/AnLoMinus/UniBar/issues)
- 📖 **תיעוד**: [אתר התיעוד](https://anlominus.github.io/UniBar/)

---

**נוצר עם ❤️ על ידי קהילת UniBar**
