# ⚡ LeetMetric

> **Visualize your LeetCode journey at a glance.**

LeetMetric is a clean, modern front-end app that fetches any LeetCode user's problem-solving stats via the GraphQL API and presents them through animated SVG progress rings and submission summary cards — all with zero frameworks, zero build steps.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green?style=flat)

---

## ✨ Features

- 🔍 **Username search** — validate and look up any public LeetCode profile
- 📊 **Animated SVG rings** — smooth progress rings for Easy, Medium, and Hard difficulties
- 🏷️ **Total solved badge** — shows overall problems solved vs total available
- 🗂️ **Submission cards** — displays total submission counts per difficulty with a hover effect
- ⌨️ **Keyboard support** — press `Enter` to search without clicking
- 🌑 **Premium dark theme** — deep dark background, gradient accents, glassmorphism-style cards
- 📱 **Responsive layout** — works on mobile, tablet, and desktop
- ♿ **Accessible** — semantic HTML, `aria-live` region, and descriptive labels

---

## 🖥️ Preview

| Empty State | Stats Loaded |
|---|---|
| Search prompt with dark card UI | Animated rings + submission count cards |

---

## 🚀 Getting Started

### Prerequisites

A modern browser (Chrome, Firefox, Edge, Safari) with JavaScript enabled. No installs required.

### Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/kaushik-53/LeetMetric

# 2. Open the project folder
cd LeetMetric

# 3. Open index.html directly in your browser
#    (or use a local dev server for best results)
```

> **Tip:** Use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension for instant reload during development.

---

## 📖 Usage

1. Open `index.html` in your browser.
2. Type a valid LeetCode username into the input field.
3. Press **Search** or hit `Enter`.
4. View your animated progress rings and submission stats.

---

## 📁 File Structure

```
LeetMetric/
├── index.html      # Semantic HTML structure & SVG ring markup
├── style.css       # Dark theme, CSS variables, animations, responsive layout
├── script.js       # Validation, GraphQL fetch, ring animation, card rendering
└── README.md
```

---

## ⚙️ How It Works

```
User Input → Validate Username → Fetch LeetCode GraphQL API (via CORS proxy)
         → Parse response → Animate SVG rings → Render submission cards
```

The app queries the **LeetCode GraphQL endpoint** (`https://leetcode.com/graphql/`) using the `userSessionProgress` query, which returns:

- `allQuestionsCount` — total problems per difficulty
- `matchedUser.submitStats.acSubmissionNum` — accepted solutions per difficulty
- `matchedUser.submitStats.totalSubmissionNum` — all submissions per difficulty

---

## ⚠️ CORS Proxy Note

LeetCode's API does not allow direct browser requests due to CORS restrictions. This app routes requests through **[cors-anywhere](https://cors-anywhere.herokuapp.com/)** as a temporary workaround.

**Limitations:**
- You may need to visit [cors-anywhere.herokuapp.com/corsdemo](https://cors-anywhere.herokuapp.com/corsdemo) and click **"Request temporary access"** before the first use.
- The proxy is a public demo service and may have rate limits.
- For production use, consider self-hosting a CORS proxy or building a small backend proxy.

---

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure, SVG ring markup |
| **CSS3** | Dark theme, CSS custom properties, conic gradients, animations |
| **Vanilla JS** | Fetch API, DOM manipulation, SVG animation via `strokeDashoffset` |
| **Google Fonts – Inter** | Modern, legible typography |
| **LeetCode GraphQL API** | Source of all stats data |

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Open an **Issue** to report bugs or suggest features
- Submit a **Pull Request** with improvements

```bash
# Fork → Clone → Create branch → Make changes → Open PR
git checkout -b feature/your-feature-name
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE). Feel free to use, modify, and distribute it for personal or educational projects.

---

<p align="center">Made with ❤️ for the competitive programming community</p>
