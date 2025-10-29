# ❓ שאלות נפוצות - UniBar

רשימת שאלות נפוצות ותשובות על UniBar.

## 🚀 התחלה מהירה

### איך אני מתחיל להשתמש ב-UniBar?

UniBar קל מאוד לשימוש! פשוט:

1. **התקן את החבילה:**
   ```bash
   npm install @unibar/core
   ```

2. **הוסף את ה-CSS:**
   ```html
   <link rel="stylesheet" href="node_modules/@unibar/core/dist/unibar.css">
   ```

3. **הפעל את UniBar:**
   ```javascript
   import { UniBar } from '@unibar/core';
   
   const uniBar = new UniBar({
     theme: 'mystical',
     position: 'top',
     features: ['navigation', 'search']
   });
   
   uniBar.init();
   ```

### איזה דפדפנים נתמכים?

UniBar תומך בכל הדפדפנים המודרניים:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

### האם UniBar עובד עם מסגרות JavaScript?

כן! UniBar תומך ב:
- **React** - עם hooks ו-components
- **Vue** - עם composition API
- **Angular** - עם services ו-directives
- **Vanilla JS** - ללא תלויות

## 🎨 עיצוב ותצורה

### איך אני משנה את התמה?

```javascript
// החלפת תמה
uniBar.setTheme('dark');

// או עם אנימציה
uniBar.setTheme('mystical', { animate: true, duration: 300 });
```

### איך אני מתאים את העיצוב?

```css
/* התאמת צבעים */
.unibar {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  --background-color: #your-color;
}

/* התאמת גודל */
.unibar {
  --font-size-base: 16px;
  --spacing-md: 1rem;
}
```

### האם אני יכול ליצור תמה מותאמת אישית?

כן! אתה יכול:
1. ליצור תמה חדשה עם CSS Variables
2. להשתמש ב-CSS-in-JS
3. ליצור תמה דינמית עם JavaScript

## 🔍 חיפוש

### איך אני מוסיף חיפוש מותאם אישית?

```javascript
const uniBar = new UniBar({
  customConfig: {
    search: {
      customSearch: (query) => {
        // לוגיקת חיפוש מותאמת אישית
        return yourSearchResults(query);
      }
    }
  }
});
```

### איך אני משנה את מקום החיפוש?

```javascript
const uniBar = new UniBar({
  customConfig: {
    search: {
      placeholder: 'חפש במאגר...',
      minLength: 3,
      maxResults: 20
    }
  }
});
```

## ⌨️ קיצורי מקלדת

### איזה קיצורי מקלדת זמינים?

- `Ctrl + /` - פתיחת חיפוש
- `Ctrl + K` - הצגת קיצורי מקלדת
- `Ctrl + T` - החלפת תמה
- `Ctrl + S` - פתיחת הגדרות
- `Esc` - סגירת תפריטים

### איך אני מוסיף קיצורי מקלדת מותאמים אישית?

```javascript
const uniBar = new UniBar({
  customConfig: {
    shortcuts: {
      customShortcuts: {
        'Ctrl+Shift+N': 'toggleNavigation',
        'Ctrl+Shift+H': 'showHelp'
      }
    }
  }
});
```

## 🌐 בינלאומיות

### איך אני מוסיף תמיכה בשפה חדשה?

```javascript
const uniBar = new UniBar({
  customConfig: {
    i18n: {
      language: 'he',
      translations: {
        'search.placeholder': 'חפש...',
        'nav.home': 'בית',
        'nav.about': 'אודות'
      }
    }
  }
});
```

### האם UniBar תומך ב-RTL?

כן! UniBar תומך מלא ב-RTL:
- עברית
- ערבית
- פרסית
- אורדו

## ♿ נגישות

### איך אני משפר את הנגישות?

UniBar תומך מלא בנגישות:
- תמיכה ב-Screen Readers
- ניווט עם מקלדת
- תמיכה ב-High Contrast
- תמיכה ב-Reduced Motion

### איך אני מוסיף תמיכה ב-Screen Readers?

```javascript
const uniBar = new UniBar({
  customConfig: {
    accessibility: {
      announceChanges: true,
      highContrast: true,
      reducedMotion: false
    }
  }
});
```

## 🔧 פיתוח

### איך אני מוסיף תכונה חדשה?

1. **צור issue** ב-GitHub
2. **Fork** את המאגר
3. **צור branch** חדש
4. **פתח** את התכונה
5. **שלח** Pull Request

### איך אני מריץ את הפרויקט מקומית?

```bash
# שכפול המאגר
git clone https://github.com/AnLoMinus/UniBar.git
cd UniBar

# התקנת תלויות
npm install

# הרצה מקומית
npm run dev
```

### איך אני מריץ בדיקות?

```bash
# בדיקות יחידה
npm test

# בדיקות עם כיסוי
npm run test:coverage

# בדיקות E2E
npm run test:e2e
```

## 🐛 בעיות נפוצות

### UniBar לא מופיע

**פתרון:**
1. ודא שה-CSS נטען
2. ודא שה-JavaScript נטען
3. בדוק את ה-console לשגיאות
4. ודא שהקוד פועל אחרי טעינת הדף

### העיצוב לא נטען

**פתרון:**
1. ודא שה-CSS נטען לפני ה-JavaScript
2. בדוק שהנתיב ל-CSS נכון
3. ודא שאין שגיאות CSS

### החיפוש לא עובד

**פתרון:**
1. ודא שהתכונה 'search' מופעלת
2. בדוק את ה-console לשגיאות
3. ודא שהפונקציה customSearch מוגדרת נכון

### התמות לא משתנות

**פתרון:**
1. ודא שהתמה קיימת ברשימה
2. בדוק שהקלאס CSS נטען
3. ודא שאין שגיאות JavaScript

## 📚 משאבים נוספים

### 📖 תיעוד
- [מדריך API מלא](docs/API.md)
- [מדריך התחלה מהירה](docs/GETTING_STARTED.md)
- [מדריך התאמה](docs/CUSTOMIZATION.md)
- [דוגמאות קוד](../examples/)

### 🔗 קישורים שימושיים
- [GitHub Repository](https://github.com/AnLoMinus/UniBar)
- [GitHub Issues](https://github.com/AnLoMinus/UniBar/issues)
- [GitHub Discussions](https://github.com/AnLoMinus/UniBar/discussions)
- [GitHub Wiki](https://github.com/AnLoMinus/UniBar/wiki)

### 💬 קהילה
- [GitHub Discussions](https://github.com/AnLoMinus/UniBar/discussions)
- [GitHub Issues](https://github.com/AnLoMinus/UniBar/issues)
- [Email Support](mailto:anlominus@example.com)

## 🤝 תרומה

### איך אני תורם לפרויקט?

1. **דיווח על באגים** - פתח issue
2. **הצעת תכונות** - פתח issue
3. **שיפור תיעוד** - שלח PR
4. **תיקון באגים** - שלח PR
5. **שיפור עיצוב** - שלח PR

### איך אני מקבל עזרה?

1. **קרא את התיעוד** - רוב השאלות נענות שם
2. **חפש ב-Issues** - אולי השאלה כבר נשאלה
3. **פתח Discussion** - לשאלות כלליות
4. **פתח Issue** - לבאגים ובעיות
5. **צור קשר** - anlominus@example.com

## 📞 יצירת קשר

### 🆘 תמיכה דחופה
- **Email**: anlominus@example.com
- **GitHub Issues**: [דיווח על בעיה](https://github.com/AnLoMinus/UniBar/issues/new)

### 💬 שאלות כלליות
- **GitHub Discussions**: [דיונים](https://github.com/AnLoMinus/UniBar/discussions)
- **GitHub Issues**: [Issues](https://github.com/AnLoMinus/UniBar/issues)

### 🤝 תרומה
- **GitHub**: [תרומה לקוד](https://github.com/AnLoMinus/UniBar)
- **Email**: anlominus@example.com

---

## 📝 הערות

- FAQ זה מתעדכן באופן קבוע
- אם השאלה שלך לא נענתה כאן, פתח issue
- כל הצעה לשיפור FAQ מתקבלת בברכה
- תודה על השימוש ב-UniBar!

**נוצר עם ❤️ על ידי קהילת UniBar**

*"וִיהִי נֹעַם ה׳ אֱלֹקֵינוּ עָלֵינוּ, וּמַעֲשֵׂה יָדֵינוּ כּוֹנְנָה עָלֵינוּ; וּמַעֲשֵׂה יָדֵינוּ כּוֹנְנֵהוּ."* (תהלים צ׳, י״ז)
