# 🔗 Kizuna 絆

## 📋 Table of Contents
- [📖 About](#-about)
- [🚀 Getting Started](#-getting-started)
- [🔨 How to Build / How to Run](#-how-to-build--how-to-run)
- [🏗️ Project Structure](#️-project-structure)
- [🎯 Features](#-features)
- [📚 Dependencies](#-dependencies)
- [🐳 Docker Deployment](#-docker-deployment)
- [💡 Usage](#-usage)
- [⚙️ Configuration](#️-configuration)
- [🔧 API Endpoints](#-api-endpoints)
- [🌐 Integration Examples](#-integration-examples)
- [📄 License](#-license)

## 📖 About
Kizuna (絆 - meaning "bond" in Japanese) is a powerful website enhancement service that adds interactive features to any website without modifying existing code. It provides a floating menu system with customizable features including auto-scrolling, interactive quizzes, JavaScript sandbox, privacy compliance tools, and comprehensive data management capabilities.

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm package manager
- Modern web browser with ES6+ support

### 📦 Installation
```bash
git clone <repository-url>
cd kizuna
npm install
```

## 🔨 How to Build / How to Run

### Development Mode
```bash
# Start the development server
npm start
# or
node server.js
```
The service will be available at `http://localhost:3000`

### Production Mode
```bash
# Install dependencies
npm install --production

# Start the server
NODE_ENV=production node server.js
```

## 🏗️ Project Structure
```
kizuna/
├── server.js              # Express server with parameter injection
├── main.js                 # Core client-side functionality
├── styles.js               # CSS styling and animations
├── index.html              # Demo page and documentation
├── package.json            # Dependencies and scripts
├── dockerfile              # Docker configuration
├── .gitignore              # Git ignore patterns
├── LICENSE                 # MIT License
└── .github/workflows/      # CI/CD automation
    └── main.yml            # Docker Hub deployment
```

## 🎯 Features

### 🎮 Core Features
- **Floating Menu System**: Non-intrusive hamburger menu in bottom-right corner
- **Auto Scroll**: Intelligent scrolling with zoom awareness and speed control
- **Interactive Quizzes**: Dynamic quiz generation from table data with timer support
- **JavaScript Sandbox**: Safe code execution environment with output capture
- **Privacy Compliance**: GDPR-compliant privacy popups and information display

### 🗑️ Data Management
- **Clear All Data**: Comprehensive local data cleanup including:
  - localStorage and sessionStorage
  - IndexedDB databases
  - Browser cache (Cache API)
  - Service Workers
  - Same-origin cookies
  - Confirmation popup with detailed warnings

### 🎨 UI/UX Features
- **Responsive Design**: Mobile-friendly interface
- **Zero Conflicts**: Scoped CSS that doesn't interfere with existing styles
- **Smooth Animations**: CSS transitions and keyframe animations
- **Accessibility**: Proper contrast ratios and semantic markup

## 📚 Dependencies

### Runtime Dependencies
- **Express**: `^4.18.2` - Web server framework for parameter injection

### Client-Side Features
- **Vanilla JavaScript**: No external libraries required
- **Modern CSS**: CSS3 animations and flexbox layouts
- **Web APIs**: FileReader, IndexedDB, Cache API, Service Workers

## 🐳 Docker Deployment

### Build Docker Image
```bash
docker build -t kizuna:latest .
```

### Run Container
```bash
docker run -p 3000:3000 kizuna:latest
```

### Docker Configuration
- **Base Image**: Node.js 23 Alpine
- **Working Directory**: `/app`
- **Exposed Port**: 3000
- **Health Check**: Available at `/health`

## 💡 Usage

### Basic Integration
Add Kizuna to any website with a single script tag:

```html
<script defer src="https://kizuna.kahiether.com/main.js?website-url=https://yoursite.com&personalinfostored=no&enablemdquizz=yes&enablejssandbox=yes&enableprivacy=yes"></script>
```

### Quiz System Requirements
For quiz functionality, ensure your HTML contains a table with this structure:
```html
<table>
  <tbody>
    <tr>
      <td>Question</td>
      <td>Correct Answer</td>
      <td>Alternative Answer</td>
    </tr>
    <!-- More rows... -->
  </tbody>
</table>
```

## ⚙️ Configuration

### URL Parameters
Configure Kizuna features using URL parameters:

| Parameter | Values | Description |
|-----------|--------|-------------|
| `website-url` | URL string | Your website URL (for privacy notices) |
| `personalinfostored` | `yes`/`no` | Whether your site stores personal data |
| `enablemdquizz` | `yes`/`no` | Enable interactive quiz system |
| `enablejssandbox` | `yes`/`no` | Enable JavaScript code sandbox |
| `enableprivacy` | `yes`/`no` | Show GDPR privacy popup |

### Alternative Parameter Names
Supports both hyphenated and camelCase formats:
- `website-url` or `websiteUrl`
- `personalinfostored` or `personalInfoStored`
- `enablemdquizz` or `enableMdQuizz`
- `enablejssandbox` or `enableJsSandbox`
- `enableprivacy` or `enablePrivacy`

## 🔧 API Endpoints

### Main Endpoints
- **`GET /`** - Demo page with live Kizuna features
- **`GET /main.js`** - Injection script with parameter processing
- **`GET /styles.js`** - CSS styles and animations
- **`GET /health`** - Service health check with metrics
- **`GET /test`** - Parameter validation and testing

### Health Check Response
```json
{
  "status": "healthy",
  "timestamp": "2025-01-20T10:30:00.000Z",
  "service": "Kizuna Enhancement Service",
  "version": "1.0.0",
  "uptime": 3600,
  "memory": {...}
}
```

## 🌐 Integration Examples

### E-learning Platform
```html
<script defer src="https://kizuna.kahiether.com/main.js?website-url=https://mylearningsite.com&personalinfostored=yes&enablemdquizz=yes&enablejssandbox=yes&enableprivacy=yes"></script>
```

### Corporate Website
```html
<script defer src="https://kizuna.kahiether.com/main.js?website-url=https://company.com&personalinfostored=no&enablemdquizz=no&enablejssandbox=no&enableprivacy=yes"></script>
```

### Documentation Site
```html
<script defer src="https://kizuna.kahiether.com/main.js?website-url=https://docs.example.com&personalinfostored=no&enablemdquizz=no&enablejssandbox=yes&enableprivacy=no"></script>
```

### Features Always Available
Regardless of configuration, these features are always enabled:
- **Auto Scroll**: Start/stop scrolling functionality
- **Clear All Data**: Complete local data management
- **Reload Page**: Quick page refresh
- **Kahiether Link**: Link to service provider

## 📄 License
MIT License - see LICENSE file for details.

---

**Kizuna** - Strengthening the bond through enhanced functionality. 🤝
