const express = require('express');
const path = require('path');

const app = express();

// Disable caching for all routes
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

// Serve static files with no cache
app.use(express.static(__dirname, {
  maxAge: 0,
  etag: false,
  lastModified: false
}));

// Main endpoint for the injection script
app.get('/main.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Get parameters from script tag attributes or query params
  const websiteUrl = req.query['website-url'] || 'unknown';
  const personalInfoStored = req.query['personalinfostored'] || 'no';
  const enableMdQuizz = req.query['enablemdquizz'] || 'no';
  const enableJsSandbox = req.query['enablejssandbox'] || 'no';
  const enablePrivacy = req.query['enableprivacy'] || 'no';
  
  // Read the main.js file and inject parameters
  const fs = require('fs');
  let mainJs = fs.readFileSync(path.join(__dirname, 'main.js'), 'utf8');
  
  // Replace placeholders with actual values
  mainJs = mainJs.replace('{{WEBSITE_URL}}', websiteUrl);
  mainJs = mainJs.replace('{{PERSONAL_INFO_STORED}}', personalInfoStored);
  mainJs = mainJs.replace('{{ENABLE_MD_QUIZZ}}', enableMdQuizz);
  mainJs = mainJs.replace('{{ENABLE_JS_SANDBOX}}', enableJsSandbox);
  mainJs = mainJs.replace('{{ENABLE_PRIVACY}}', enablePrivacy);
  
  res.send(mainJs);
});

// Styles endpoint
app.get('/styles.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.sendFile(path.join(__dirname, 'styles.js'));
});

// Root endpoint
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Kizuna server running at http://localhost:${PORT}`);
  console.log('No cache mode enabled - all content served fresh');
});
