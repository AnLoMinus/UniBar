# 🧭 UniBar - סרגלי עזר אוניברסליים

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub release](https://img.shields.io/github/release/AnLoMinus/UniBar.svg)](https://github.com/AnLoMinus/UniBar/releases)
[![GitHub issues](https://img.shields.io/github/issues/AnLoMinus/UniBar.svg)](https://github.com/AnLoMinus/UniBar/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/AnLoMinus/UniBar.svg)](https://github.com/AnLoMinus/UniBar/pulls)

> **מסגרת-על לסרגלי עזר אוניברסליים** — UniBar מספק סט מקיף של סרגלי עזר וכלים מיסטיים לפיתוח, ניהול פרויקטים וחוויית משתמש משופרת.

## 🌟 תכונות עיקריות

- 🧭 **סרגלי ניווט חכמים** - ניווט מהיר ויעיל בין רכיבים
- ✨ **כלים מיסטיים** - פונקציונליות מתקדמת וקסם טכני
- 🎨 **עיצוב מותאם אישית** - ממשק משתמש יפה ואינטואיטיבי
- 🔧 **התאמה מלאה** - ניתן להתאמה לכל פרויקט
- 📱 **תמיכה רב-פלטפורמית** - עובד בכל הדפדפנים והמכשירים

## 🚀 התחלה מהירה

### התקנה

```bash
# שכפול המאגר
git clone https://github.com/AnLoMinus/UniBar.git
cd UniBar

# התקנת תלויות
npm install

# הרצה מקומית
npm run dev
```

### שימוש בסיסי

```javascript
import { UniBar } from '@unibar/core';

const uniBar = new UniBar({
  theme: 'mystical',
  position: 'top',
  features: ['navigation', 'search', 'shortcuts']
});

uniBar.init();
```

## 📚 תיעוד

- [מדריך התחלה מהירה](docs/GETTING_STARTED.md)
- [מדריך API](docs/API.md)
- [מדריך התאמה](docs/CUSTOMIZATION.md)
- [מדריך פריסה](docs/DEPLOYMENT.md)
- [מדריך תרומה](CONTRIBUTING.md)

## 🛠️ פיתוח

### דרישות מערכת

- Node.js 18+
- npm או yarn
- דפדפן מודרני עם תמיכה ב-ES6+

### הרצת בדיקות

```bash
# בדיקות יחידה
npm test

# בדיקות אינטגרציה
npm run test:integration

# בדיקות E2E
npm run test:e2e
```

### בנייה

```bash
# בנייה לפיתוח
npm run build:dev

# בנייה לייצור
npm run build:prod
```

## 🤝 תרומה לפרויקט

אנחנו שמחים לקבל תרומות! אנא קראו את [מדריך התרומה](CONTRIBUTING.md) לפני שתתחילו.

### דרכים לתרום

- 🐛 דיווח על באגים
- 💡 הצעת תכונות חדשות
- 📝 שיפור תיעוד
- 🔧 תיקון בעיות קוד
- 🎨 שיפור עיצוב

## 📄 רישיון

פרויקט זה מופץ תחת רישיון MIT. ראה [LICENSE](LICENSE) לפרטים נוספים.

## 🔗 קישורים שימושיים

- [אתר הפרויקט](https://anlominus.github.io/UniBar/)
- [דוגמאות חיות](https://anlominus.github.io/UniBar/examples)
- [מדריך API](https://anlominus.github.io/UniBar/api)
- [קהילת Discord](https://discord.gg/unibar)

## 🙏 תודות

תודה לכל התורמים והמשתמשים שתומכים בפרויקט הזה!

---

**נוצר עם ❤️ על ידי [AnLoMinus](https://github.com/AnLoMinus)**

*"וִיהִי נֹעַם ה׳ אֱלֹקֵינוּ עָלֵינוּ, וּמַעֲשֵׂה יָדֵינוּ כּוֹנְנָה עָלֵינוּ; וּמַעֲשֵׂה יָדֵינוּ כּוֹנְנֵהוּ."* (תהלים צ׳, י״ז)
