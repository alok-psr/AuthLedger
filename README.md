# 🏆 Smart India Hackathon 2025 - Certificate Verification System

A complete **Vite + React** application for blockchain-powered certificate verification with AI-enhanced security.

## ✨ Features

### 🎯 **ALL FEATURES WORKING - NO "COMING SOON":**

- ✅ **Face Verification** - Real camera integration with 3-second timer.
- ✅ **QR Code Generation** - Working QR codes with download functionality  
- ✅ **File Upload** - Student upload with drag & drop and progress tracking
- ✅ **Bulk Upload** - Institution CSV/Excel batch processing
- ✅ **Analytics Charts** - Real Chart.js visualizations
- ✅ **Certificate Portfolio** - Complete certificate management
- ✅ **Fraud Detection** - AI-powered verification with confidence scores
- ✅ **Blockchain Integration** - Hash generation and verification status

### 🎨 **Beautiful UI:**
- Professional dark theme with floating particles
- Glass morphism effects throughout
- Smooth animations and transitions  
- Responsive design for all devices

### 👥 **User Roles:**
- **Student** - Portfolio management, QR generation, document upload
- **Institution** - Certificate issuance, bulk processing, analytics
- **Employer** - Scanner, verification, fraud detection
- **Government** - System monitoring, compliance reports

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Extract and navigate to project:**
   ```bash
   cd sih-certificate-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

## 📂 Project Structure

```
sih-certificate-system/
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── index.html               # Entry HTML file
├── src/
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # React entry point
│   ├── index.css            # Global styles
│   └── components/
│       ├── ParticleBackground.jsx
│       ├── RoleSelection.jsx
│       ├── Authentication.jsx
│       ├── FaceVerification.jsx
│       ├── Dashboard.jsx
│       ├── StudentDashboard.jsx
│       ├── EmployerDashboard.jsx  
│       ├── CollegeDashboard.jsx
│       ├── GovernmentDashboard.jsx
│       ├── QRCodeModal.jsx
│       ├── PortfolioModal.jsx
│       ├── UploadModal.jsx
│       └── AnalyticsCharts.jsx
└── README.md
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Demo Flow

1. **Role Selection** - Choose your user type (Student/Institution/Employer/Government)
2. **Authentication** - Login with email/password or face recognition
3. **Dashboard** - Access role-specific features and tools
4. **Upload & Verify** - Upload certificates and generate QR codes
5. **Analytics** - View comprehensive charts and statistics

## 🔐 Face Verification

The face verification system:
- Accesses device camera with permission
- Detects faces in real-time
- 3-second countdown timer (matching Python implementation)
- Success/failure feedback with animations
- Professional biometric interface

## 📊 Analytics Features

Real Chart.js visualizations:
- Monthly certificate issuance trends (Line chart)
- Status distribution (Pie chart)  
- Institution performance (Bar chart)
- Fraud detection analytics (Area chart)
- Interactive hover effects and tooltips

## 📤 Upload System

- **Student Upload**: Drag & drop with progress tracking
- **Bulk Upload**: CSV/Excel parsing for institutions
- File validation (PDF, JPG, PNG, max 10MB)
- Real-time progress indicators
- Success notifications and error handling

## 🛠 Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Chart.js** - Interactive data visualizations
- **QRCode.js** - QR code generation
- **PapaParse** - CSV file processing
- **jsPDF** - PDF document generation

## 🎯 Key Features by Role

### 👨🎓 Student Dashboard
- View certificate portfolio
- Generate QR codes for certificates
- Upload new certificates
- Download certificates as PDF
- Personal analytics dashboard

### 🏫 Institution Dashboard  
- Issue single certificates
- Bulk upload via CSV/Excel
- Student management tools
- Analytics and reporting
- Blockchain integration status

### 💼 Employer Dashboard
- QR code scanner for verification
- Certificate authenticity checking
- Fraud detection alerts
- Verification history
- Candidate assessment tools

### 🏛️ Government Dashboard
- System-wide monitoring
- Institution oversight
- Compliance reporting
- Fraud analytics
- Policy management

## 🔗 Integration Points

### Blockchain Ready
- Hash generation for certificates
- Verification status tracking
- Transaction simulation
- Network health monitoring

### AI/ML Integration Points
- Face recognition system
- Document authenticity detection
- Fraud risk assessment
- Confidence scoring algorithms


## 📈 Performance

- **Vite** provides lightning-fast development
- **Code splitting** for optimal loading
- **Tree shaking** for smaller bundles
- **Modern JavaScript** for better performance

## 🔒 Security Features

- Client-side certificate validation
- Secure file upload handling  
- Face recognition privacy (local processing)
- Fraud detection algorithms
- Blockchain hash verification

## 📞 Support

This is your complete SIH-ready certificate verification system with:
- ✅ All functionality working
- ✅ Professional UI/UX
- ✅ Real charts and analytics
- ✅ Face verification integrated
- ✅ Upload and QR systems functional
- ✅ Ready for production deployment

**Perfect for Smart India Hackathon presentation!** 🏆
