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
- [🤖 Function-Calling API](#-function-calling-api)
- [📨 PostMessage API](#-postmessage-api)
- [📄 License](#-license)

## 📖 About
Kizuna (絆 - meaning "bond" in Japanese) is a powerful website enhancement service that adds interactive features to any website without modifying existing code. It provides a floating menu system with customizable features including auto-scrolling, interactive quizzes, JavaScript sandbox, privacy compliance tools, Progressive Web App installation, and comprehensive data management capabilities.

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
├── main.js                # Core client-side functionality
├── styles.js              # CSS styling and animations
├── pinyin-pro@3.12.0.js   # Pinyin library for Chinese characters
├── index.html              # Demo page and documentation
├── package.json           # Dependencies and scripts
├── dockerfile             # Docker configuration
├── .gitignore             # Git ignore patterns
├── LICENSE                # MIT License
└── .github/workflows/     # CI/CD automation
    └── main.yml           # Docker Hub deployment
```

## 🎯 Features

### 🎮 Core Features
- **Floating Menu System**: Non-intrusive hamburger menu in bottom-right corner
- **⏱️ Timer Widget**: Draggable timer/chronometer with countdown and stopwatch modes
- **📱 PWA Installation**: Auto-detect and prompt for Progressive Web App installation
- **🈯 Add Pinyin**: Automatically adds pinyin pronunciation to Chinese characters on the page
- **Auto Scroll**: Intelligent scrolling with zoom awareness and speed control
- **Interactive Quizzes**: Dynamic quiz generation from table data with timer support
- **JavaScript Sandbox**: Safe code execution environment with output capture and pinyin support
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
- **Draggable Components**: Timer widget can be positioned anywhere on screen
- **Accessibility**: Proper contrast ratios and semantic markup

## 📚 Dependencies

### Runtime Dependencies
- **Express**: `^4.18.2` - Web server framework for parameter injection
- **pinyin-pro**: `3.12.0` - Chinese character pinyin conversion library

### Client-Side Features
- **Vanilla JavaScript**: No external libraries required for core functionality
- **Modern CSS**: CSS3 animations and flexbox layouts
- **Web APIs**: FileReader, IndexedDB, Cache API, Service Workers, PWA APIs

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

### Timer Widget
The timer feature provides:
- **Timer Mode**: Set countdown in minutes
- **Chrono Mode**: Stopwatch functionality
- **Draggable Interface**: Position anywhere on screen
- **Visual Display**: Large, clear time display

### PWA Installation
Kizuna automatically detects PWA-capable websites and:
- **Auto-prompts**: Shows installation popup after 2 seconds
- **Manual Install**: Available via menu button
- **Smart Detection**: Checks for manifest and installability

### Chinese Language Support
The "Add Pinyin" feature:
- **Auto-detection**: Finds all Chinese characters on page
- **Inline Addition**: Adds pinyin next to characters
- **Preserves HTML**: Maintains original page structure
- **Tone Numbers**: Shows tones as numbers (1-4)

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
- **`GET /pinyin-pro@3.12.0.js`** - Pinyin conversion library
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

### E-learning Platform with Chinese Support
```html
<script defer src="https://kizuna.kahiether.com/main.js?website-url=https://mylearningsite.com&personalinfostored=yes&enablemdquizz=yes&enablejssandbox=yes&enableprivacy=yes"></script>
```
Perfect for language learning sites with Chinese content.

### Corporate Website
```html
<script defer src="https://kizuna.kahiether.com/main.js?website-url=https://company.com&personalinfostored=no&enablemdquizz=no&enablejssandbox=no&enableprivacy=yes"></script>
```
Minimal features for professional environments.

### Documentation Site
```html
<script defer src="https://kizuna.kahiether.com/main.js?website-url=https://docs.example.com&personalinfostored=no&enablemdquizz=no&enablejssandbox=yes&enableprivacy=no"></script>
```
Code sandbox for interactive documentation.

### Features Always Available
Regardless of configuration, these features are always enabled:
- **Timer**: Countdown and stopwatch functionality
- **PWA Install**: Progressive Web App installation
- **Auto Scroll**: Start/stop scrolling functionality
- **Clear All Data**: Complete local data management
- **Reload Page**: Quick page refresh
- **Add Pinyin**: Chinese character support
- **Kahiether Link**: Link to service provider


## 🤖 Function-Calling API

Kizuna includes a programmatic function-calling bridge for automation and integration. All functions are available via the global `window` object.

### Discovery
```javascript
// List all available actions
const info = window.kizuna_list_actions();
console.log(info.tools);  // Array of available tools
console.log(info.state);  // Current Kizuna state
```

### Function Calling
```javascript
// Execute a Kizuna action
const result = await window.kizuna_call({
  name: "timer.open",
  arguments: {}
});

console.log(result.ok);      // true/false
console.log(result.result);  // Action-specific result
console.log(result.state);   // Updated state
```

### Available Functions

#### UI Simulation
- **`mouse.simulate`** - Simulate mouse interactions
  - `selector` (string): CSS selector for target element
  - `action` (string): "click", "rightClick", "hover", or "unhover"
- **`keyboard.simulate`** - Simulate keyboard input
  - `selector` (string): CSS selector for target element
  - `action` (string): "fill" or "pressKey"
  - `text` (string): Text to fill or key to press

#### Timer Control
- **`timer.open`** - Open the timer/chrono widget
- **`timer.close`** - Close the timer widget
- **`timer.start`** - Trigger the Start button
- **`timer.reset`** - Reset the timer/chrono count
- **`timer.setMode`** - Switch between modes (`mode`: "timer" or "chrono")
- **`timer.testRing`** - Test the native completion sound

#### Scroll Control
- **`scroll.start`** - Start auto-scrolling (optional `speedMs` parameter)
- **`scroll.stop`** - Stop auto-scrolling

#### Quiz Control
- **`quiz.start`** - Start quiz (`level`: "beginner" or "advanced")

#### Privacy
- **`privacy.open`** - Open privacy/GDPR popup (if enabled)

#### Sandbox Control
- **`sandbox.open`** - Open JS sandbox (if enabled)
- **`sandbox.close`** - Close JS sandbox
- **`sandbox.execute`** - Execute code in sandbox textarea
- **`sandbox.clear`** - Clear sandbox textarea and output
- **`sandbox.copyOutput`** - Copy output to clipboard
- **`sandbox.addPinyin`** - Add pinyin to page content
- **`sandbox.exploreIndexedDB`** - Explore IndexedDB databases

#### PWA
- **`pwa.installPrompt.open`** - Trigger PWA install prompt

#### Navigation
- **`page.reload`** - Reload page (optional `hard`: boolean)
- **`nav.kahiether`** - Open kahiether.com in new tab

#### Data Management
- **`data.clear.confirmOpen`** - Open clear-all-data confirmation
- **`data.clear.execute`** - Clear all local data and reload

### State Information
The state object includes:
```javascript
{
  features: {
    mdQuiz: boolean,
    jsSandbox: boolean,
    privacy: boolean
  },
  pwa: {
    isStandalone: boolean,
    hasInstallPrompt: boolean
  },
  ui: {
    hasQuiz: boolean,
    hasSandbox: boolean,
    canStopScroll: boolean
  }
}
```

### Example Usage
```javascript

// Simulate clicking a button
await window.kizuna_call({
  name: "mouse.simulate",
  arguments: {
    selector: "#my-button",
    action: "click"
  }
});

// Fill an input field
await window.kizuna_call({
  name: "keyboard.simulate",
  arguments: {
    selector: "#email-input",
    action: "fill",
    text: "user@example.com"
  }
});

// Open timer and start quiz
await window.kizuna_call({ name: "timer.open" });
await window.kizuna_call({ 
  name: "quiz.start", 
  arguments: { level: "advanced" } 
});

// Start auto-scroll with custom speed
await window.kizuna_call({ 
  name: "scroll.start", 
  arguments: { speedMs: 30 } 
});

// Check if sandbox is available
const info = window.kizuna_list_actions();
if (info.state.features.jsSandbox) {
  await window.kizuna_call({ name: "sandbox.open" });
}
```




## 🔐 Privacy & Security

### Data Handling
- **No Server Storage**: All data remains in user's browser
- **GDPR Compliant**: Full privacy disclosure and user control
- **Secure Sandbox**: JavaScript execution in isolated context
- **User Consent**: Clear warnings before data operations

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with ES6 support

## 📄 License
MIT License - see LICENSE file for details.

---

**Kizuna** - Strengthening the bond through enhanced functionality. 🤝
