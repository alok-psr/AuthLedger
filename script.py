# Create Vite React project structure with all files from the working system
import os

# Create project structure for Vite React
vite_structure = """
sih-certificate-system/
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── components/
│       ├── ParticleBackground.jsx
│       ├── RoleSelection.jsx
│       ├── Authentication.jsx
│       ├── Dashboard.jsx
│       ├── StudentDashboard.jsx
│       ├── EmployerDashboard.jsx
│       ├── CollegeDashboard.jsx
│       ├── GovernmentDashboard.jsx
│       ├── QRCodeModal.jsx
│       ├── PortfolioModal.jsx
│       ├── UploadModal.jsx
│       ├── AnalyticsCharts.jsx
│       └── FaceVerification.jsx
├── public/
│   └── vite.svg
└── README.md
"""

print("Vite React Project Structure:")
print(vite_structure)

# Create package.json for Vite React
package_json = {
    "name": "sih-certificate-system",
    "private": True,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
        "preview": "vite preview"
    },
    "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "chart.js": "^4.4.0",
        "qrcode": "^1.5.3",
        "papaparse": "^5.4.1",
        "jspdf": "^2.5.1",
        "chartjs-adapter-date-fns": "^3.0.0"
    },
    "devDependencies": {
        "@types/react": "^18.2.15",
        "@types/react-dom": "^18.2.7",
        "@vitejs/plugin-react": "^4.0.3",
        "eslint": "^8.45.0",
        "eslint-plugin-react": "^7.32.2",
        "eslint-plugin-react-hooks": "^4.6.0",
        "eslint-plugin-react-refresh": "^0.4.3",
        "vite": "^4.4.5"
    }
}

import json
with open('package.json', 'w') as f:
    json.dump(package_json, f, indent=2)

# Create vite.config.js
vite_config = """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
"""

with open('vite.config.js', 'w') as f:
    f.write(vite_config)

# Create index.html for Vite
index_html = """<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Smart India Hackathon - Professional Certificate Verification System</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
"""

with open('index.html', 'w') as f:
    f.write(index_html)

# Create main.jsx (entry point)
main_jsx = """import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
"""

with open('main.jsx', 'w') as f:
    f.write(main_jsx)

print("✅ Created Vite React configuration files:")
print("- package.json")
print("- vite.config.js") 
print("- index.html")
print("- main.jsx")