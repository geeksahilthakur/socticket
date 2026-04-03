# 🛡️ SOC Incident Report Generator

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
</div>

<br />

The **SOC Incident Report Generator** is an enterprise-grade, front-end application designed to drastically streamline the ticket creation and triage documentation process for Security Operations Center (SOC) Analysts. 

It provides a highly responsive, intuitive interface to log incidents, generate accurate analytical verdicts, and instantly export findings into **Plain Text**, **DOCX**, or **PDF** formats—all without needing a backend server.

---

## ✨ Key Features

- **⚡ Live Preview Generation**: Watch your final report construct itself dynamically as you input data mapping endpoints, threat statuses, and analysis logic.
- **📄 Native DOCX & PDF Exports**: Utilizes client-side processing (`docx` and `jspdf`) to securely convert your final report structure into universally shareable enterprise formats.
- **🔄 Dynamic Product Awareness**: Tailor the report entirely. If you switch the security tool from SentinelOne to CrowdStrike or Defender, all internal labels, tooltips, and report headers update dynamically.
- **📱 Fully Responsive Design**: Built with a custom 12-column Grid and Flexbox implementation via Tailwind CSS, making ticket creation accessible on ultra-wide SOC monitors or mobile phone viewports.
- **💾 Local State Persistence**: Accidentally close the tab? Local storage instantly recovers your ongoing draft so no triage data is lost.
- **🛠 Structured Analysis Blocks**: Eliminates free-form chaos by guiding analysts into logical blocks for *Detected File Context*, *Endpoint Details*, *Mitigation Steps*, and dynamically labeling *True/False Positive Justifications*.

---

## 💻 Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (Custom Design System with Day/Night Themes)
- **Document Generation:** `docx` & `jspdf`
- **State Management:** React Hooks (`useState`, `useEffect`) & LocalStorage API

---

## 🚀 Quick Start Setup

To run this project locally on your machine, you must have Node.js installed.

1. **Clone the repository:**
   ```bash
   git clone <YOUR-GITHUB-REPO-URL>
   cd SOCticket
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   The application will be available locally at `http://localhost:5173/`.

4. **Build for Production (Netlify/Vercel):**
   ```bash
   npm run build
   ```
   This will output the highly optimized static client application to the `dist/` directory.

---

## 🎨 File Structure

```text
src/
├── components/          # Reusable UI components (Fields, Grid Shells)
│   └── sections/        # Major app blocks (ThreatSummary, AnalysisNotes)
├── data/                # Pre-defined JSON models and option templates
├── utils/               # Logic for PDF mapping, object structuring, and state validation
├── App.jsx              # Application Core State Router
├── index.css            # Tailwind directives and CSS theme variables
└── main.jsx             # React DOM injection point
```

---

## 🤝 Contributing

This tool is designed to adapt to any SOC environment. Feel free to modify `src/utils/defaults.js` or `src/data/options.js` to change the drop-down classifications or default company footers specific to your internal operations!

*Created to simplify SOC analysis routines.*
