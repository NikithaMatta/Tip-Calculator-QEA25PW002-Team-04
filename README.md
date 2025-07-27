# Tip-Calculator

A sleek and responsive tip calculator built using HTML, CSS, and JavaScript. It calculates tips based on service rating, supports theme switching (light/dark), and lets users add an optional supplemental tip.

## 🚀 Features

- 🌕🌑 Dark/Light mode toggle with sun/moon icons
- 🧮 Calculates:
  - Base tip based on service rating (scale of 1–10)
  - Total bill including tip
  - Per-person cost split
- ➕ Optional extra tip input
- ✅ Input validation with helpful alerts
- 🔁 Reset button to clear the form
- 🧠 Modern CSS animations and transitions

## 📁 Project Structure

```plaintext
tip-calculator/
├── index.html
├── script.js
├── styles/
│   ├── base.css
│   ├── light.css
│   ├── dark.css
│   └── toggle.css
├── favicon.ico
└── README.md
```

## 🔧 How to Use

- Enter the bill amount.
- Select a service rating (1 = very poor → 10 = outstanding).
- Enter the number of people (must be a whole number ≥ 1).
- Click Calculate to view:
  - Total tip
  -  Tip per person
  - Final bill split
- (Optional) Enable "Additional Tip" checkbox and add more tip.
- Click Recalculate to update totals.

## 📦 Requirements

No dependencies needed—pure vanilla HTML, CSS, and JavaScript. Works in all modern browsers.

## 📄 License

This project is open-source and free to use under the MIT License.
