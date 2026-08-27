const minify = require('html-minifier').minify;
const fs = require('fs');
const path = require('path');

const htmlFiles = [
  'index.html',
  'projects.html',
  'about.html',
  'investors.html',
  'contact.html'
];

const options = {
  removeComments: true,
  removeCommentsFromCDATA: true,
  collapseWhitespace: true,
  removeEmptyAttributes: true,
  minifyJS: true,
  minifyCSS: true,
};

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const minified = minify(content, options);
  const minFile = file.replace('.html', '.min.html');
  fs.writeFileSync(minFile, minified);
  
  const originalSize = content.length;
  const minifiedSize = minified.length;
  const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(2);
  
  console.log(`✓ ${path.basename(minFile)}: ${originalSize} → ${minifiedSize} bytes (${savings}% smaller)`);
});

console.log('\nAll files minified successfully!');
