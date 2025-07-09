# SupplyChainManagement

![Vite](https://img.shields.io/badge/built%20with-Vite-brightgreen)
![React](https://img.shields.io/badge/framework-React-blue)
![TypeScript](https://img.shields.io/badge/language-TypeScript-lightgrey)
![Tailwind CSS](https://img.shields.io/badge/style-Tailwind_CSS-teal)
![License: MIT](https://img.shields.io/badge/license-MIT-yellow)

## Description

SupplyChainManagement is a responsive, interactive web application designed to visualize and manage supply chain data. Built with React, TypeScript, and Vite as part of the Walmart Sparkathon 2025, it leverages Leaflet for map-based route plotting and Recharts for dynamic data visualizations.

## Features

- **Interactive Maps**: Plot supply chain routes and nodes on a world map using React-Leaflet and Leaflet.
- **Data Visualization**: Display line charts, bar graphs, and pie charts with Recharts to track metrics such as shipment volume, delivery times, and more.
- **Responsive Design**: Styled with Tailwind CSS to ensure seamless viewing across devices.
- **Iconography**: Utilizes Lucide React icons for clean, customizable UI elements.
- **Modular Components**: Structured component architecture for maintainability and scalability.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS
- **Maps**: Leaflet, React-Leaflet
- **Charts**: Recharts
- **Icons**: Lucide React
- **Linting**: ESLint (@eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh)

## Installation

To get started locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/Tanisha2174/SupplyChainManagement.git

# Navigate to the project directory
cd SupplyChainManagement

# Install dependencies
npm install

# Start the development server
npm run dev
```

Once running, open your browser and visit `http://localhost:5173` to explore the application.

## Project Structure

```plaintext
SupplyChainManagement/
├── src/                  # Application source code
│   ├── components/       # Reusable React components
│   ├── pages/            # Page-level components
│   └── App.tsx           # Main application entry
├── index.html            # HTML template
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── vite.config.ts        # Vite configuration
└── package.json          # Project metadata & scripts
```

## Scripts

- `npm run dev` – Launches the Vite development server
- `npm run build` – Bundles the app for production
- `npm run preview` – Serves the production build locally
- `npm run lint` – Runs ESLint to analyze code quality

