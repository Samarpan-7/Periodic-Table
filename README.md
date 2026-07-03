# ⚛️ Interactive Periodic Table of Elements

A complete, responsive, interactive Periodic Table Web Application built with **Vanilla HTML5, CSS3, and JavaScript (ES6+)**. Fully self-contained with **zero external dependencies** or frameworks.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel)](https://periodic-table-7.vercel.app/)
![Elements](https://img.shields.io/badge/Elements-118%20Complete-38bdf8?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS-f97316?style=for-the-badge)
![Dependencies](https://img.shields.io/badge/Dependencies-Zero-22c55e?style=for-the-badge)

---

## 🌐 Live Demo & Repository

- **🚀 Live App**: [https://periodic-table-7.vercel.app/](https://periodic-table-7.vercel.app/)
- **📦 GitHub Repository**: [https://github.com/Samarpan-7/Periodic-Table.git](https://github.com/Samarpan-7/Periodic-Table.git)

---

## 🌟 Features

- **📊 Complete 118 Elements**: Detailed scientific dataset covering all 118 elements (from Hydrogen to Oganesson).
- **🎨 Category Colour Coding**: Color-coded elements by chemical categories (Alkali Metals, Noble Gases, Transition Metals, Lanthanides, Actinides, etc.).
- **🔍 Real-Time Search**: Instant dynamic filtering by **Name**, **Chemical Symbol**, or **Atomic Number**.
- **🎯 Interactive Category Legend**: Click any category in the legend to highlight matching elements and dim others.
- **🔬 Interactive Detail Modal ("Big View")**: Clicking an element opens a blurred-backdrop modal showing:
  - **Hero Card**: Large glowing symbol, atomic mass, state at room temp.
  - **Physical Tab**: State of matter, melting point, boiling point, density, appearance.
  - **Chemical Tab**: Electronegativity, electron configuration, valency, oxidation states, ionisation energy.
  - **Periodic Tab**: Group, Period, Block, atomic radius, covalent radius, electron affinity.
  - **Occurrence & Use Tab**: Natural abundance and commercial/industrial applications.
- **📱 Fully Responsive**: CSS Grid layout wrapped in an overflow container for smooth horizontal scrolling on mobile screens.
- **🌙 Futuristic Dark Mode**: Modern dark aesthetic (`#0b0f19`) with atomic nucleus animation and glowing element highlights.

---

## 🛠️ Built With

- **HTML5**: Semantic web structure.
- **CSS3**: Custom properties (CSS variables), CSS Grid (18 columns, 10 periods), Flexbox, modern animations, backdrop blur (`backdrop-filter`).
- **JavaScript (ES6+)**: Modular application state, DOM rendering engine, real-time filtering, modal management, and event handling.

---

## 🚀 How to Run Locally

Since this application uses pure Vanilla web technologies with no build steps required, you can run it using any of the following methods:

### Method 1: Direct File Open (Easiest)
1. Clone or download this repository.
2. Locate the `index.html` file in your file explorer.
3. Double-click `index.html` to open it directly in any modern browser (Chrome, Firefox, Edge, Safari).

### Method 2: Python Local HTTP Server
If you prefer running it over `http://localhost`:

```bash
# Clone the repository
git clone https://github.com/Samarpan-7/Periodic-Table.git

# Navigate into the project folder
cd Periodic-Table

# Start Python's built-in HTTP server
python -m http.server 8080
```

Open your browser and visit: `http://localhost:8080`

### Method 3: Node.js `http-server`
```bash
npx http-server -p 8080
```
Open your browser and visit: `http://localhost:8080`

---

## 📂 Project Structure

```
Periodic-Table/
│
├── index.html     # Main HTML structure and modal overlays
├── style.css      # Futuristic dark mode styling, layout grid, and animations
├── app.js         # Complete dataset for all 118 elements & dynamic logic
└── README.md      # Project documentation, live links, and usage guide
```

---

## 📜 License & Copyright

All Rights Reserved to **Samarpan**.
