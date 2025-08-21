const express = require('express');
const path = require('path');
const fs = require('fs');

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

// Helper function to extract parameters from referer or query
function extractParameters(req) {
  let params = {};
  
  // First try query parameters
  if (Object.keys(req.query).length > 0) {
    params = { ...req.query };
  }
  
  // If no query params, try to extract from referer header
  const referer = req.get('Referer');
  if (referer && Object.keys(params).length === 0) {
    try {
      const url = new URL(referer);
      // Extract from script attributes in the calling page would require parsing
      // For now, we'll rely on query parameters
    } catch (e) {
      // Invalid referer URL
    }
  }
  
  return {
    websiteUrl: params['website-url'] || params.websiteUrl || 'unknown',
    personalInfoStored: params['personalinfostored'] || params.personalInfoStored || 'no',
    enableMdQuizz: params['enablemdquizz'] || params.enableMdQuizz || 'no',
    enableJsSandbox: params['enablejssandbox'] || params.enableJsSandbox || 'no',
    enablePrivacy: params['enableprivacy'] || params.enablePrivacy || 'no'
  };
}

// Main endpoint for the injection script
app.get('/main.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Extract parameters
  const params = extractParameters(req);
  
  // Log parameters for debugging
  console.log('Kizuna main.js requested with params:', params);
  
  try {
    // Read the main.js file and inject parameters
    let mainJs = fs.readFileSync(path.join(__dirname, 'main.js'), 'utf8');
    
    // Replace placeholders with actual values
    mainJs = mainJs.replace('{{WEBSITE_URL}}', params.websiteUrl);
    mainJs = mainJs.replace('{{PERSONAL_INFO_STORED}}', params.personalInfoStored);
    mainJs = mainJs.replace('{{ENABLE_MD_QUIZZ}}', params.enableMdQuizz);
    mainJs = mainJs.replace('{{ENABLE_JS_SANDBOX}}', params.enableJsSandbox);
    mainJs = mainJs.replace('{{ENABLE_PRIVACY}}', params.enablePrivacy);
    
    res.send(mainJs);
  } catch (error) {
    console.error('Error serving main.js:', error);
    res.status(500).send('// Error loading Kizuna');
  }
});

// Styles endpoint
app.get('/styles.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    res.sendFile(path.join(__dirname, 'styles.js'));
  } catch (error) {
    console.error('Error serving styles.js:', error);
    res.status(500).send('// Error loading styles');
  }
});

// Root endpoint
app.get('/', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'index.html'));
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send('Error loading page');
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Kizuna Enhancement Service'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Kizuna server running at http://localhost:${PORT}`);
  console.log('No cache mode enabled - all content served fresh');
  console.log('Available endpoints:');
  console.log('  GET / - Main page');
  console.log('  GET /main.js - Injection script');
  console.log('  GET /styles.js - Styles script');
  console.log('  GET /health - Health check');
});
