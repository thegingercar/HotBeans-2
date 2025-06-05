const fs = require('fs');
const path = require('path');

// Read the built index.html
const buildPath = path.join(__dirname, 'build');
const indexPath = path.join(buildPath, 'index.html');
const staticFallbackPath = path.join(__dirname, 'public', 'static-fallback.html');

if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Fix relative paths for static serving
  indexContent = indexContent.replace(/href="\//g, 'href="./');
  indexContent = indexContent.replace(/src="\//g, 'src="./');
  
  // Write the corrected content back
  fs.writeFileSync(indexPath, indexContent);
  
  // Create additional HTML files for better compatibility
  fs.writeFileSync(path.join(buildPath, 'home.html'), indexContent);
  fs.writeFileSync(path.join(buildPath, 'hotbeansweb.html'), indexContent);
  
  console.log('✅ React build files created successfully!');
} else {
  console.log('❌ React build folder not found.');
}

// Copy the static fallback HTML file
if (fs.existsSync(staticFallbackPath)) {
  const staticContent = fs.readFileSync(staticFallbackPath, 'utf8');
  
  // Create static HTML versions
  fs.writeFileSync(path.join(buildPath, 'static.html'), staticContent);
  fs.writeFileSync(path.join(buildPath, 'dreamweaver.html'), staticContent);
  fs.writeFileSync(path.join(buildPath, 'standalone.html'), staticContent);
  
  console.log('✅ Static HTML files created successfully!');
  console.log('📁 Files created: index.html, home.html, hotbeansweb.html, static.html, dreamweaver.html, standalone.html');
  console.log('🌐 You can now open ANY of these HTML files directly in a browser or Dreamweaver!');
  console.log('');
  console.log('📋 FILE DESCRIPTIONS:');
  console.log('   • index.html, home.html, hotbeansweb.html = Full React app (needs JS enabled)');
  console.log('   • static.html, dreamweaver.html, standalone.html = Pure HTML/CSS/JS (works without React)');
  console.log('');
  console.log('🎯 FOR DREAMWEAVER: Use static.html, dreamweaver.html, or standalone.html');
} else {
  console.log('❌ Static fallback file not found.');
}