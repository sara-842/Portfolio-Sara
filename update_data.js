const fs = require('fs');
const sizeOf = require('image-size');
const path = require('path');

let content = fs.readFileSync('data/portfolioData.js', 'utf8');

// Find all categories
const categoryRegex = /folder:\s*"([^"]+)"[\s\S]*?projects:\s*\[([\s\S]*?)\]\n    \}/g;

let updatedContent = content;

let match;
while ((match = categoryRegex.exec(content)) !== null) {
  const fullMatch = match[0];
  const folder = match[1];
  const projectsStr = match[2];
  
  const projectsRegex = /images:\s*\[([\s\S]*?)\]/g;
  let updatedProjectsStr = projectsStr;
  
  let pMatch;
  while ((pMatch = projectsRegex.exec(projectsStr)) !== null) {
    const imagesMatch = pMatch[0];
    const imagesStr = pMatch[1];
    
    // Check if already updated to objects
    if (imagesStr.includes('{')) continue;
    
    const strings = [...imagesStr.matchAll(/"([^"]+)"/g)].map(m => m[1]);
    
    const objects = strings.map(filename => {
      let imgPath = path.join('assets', 'images', folder, filename);
      let width = 800, height = 600;
      try {
        const dimensions = sizeOf(imgPath);
        width = dimensions.width;
        height = dimensions.height;
      } catch (e) {
        console.log("Error reading", imgPath);
      }
      return `\n            { filename: "${filename}", width: ${width}, height: ${height} }`;
    });
    
    const newImagesMatch = `images: [${objects.join(',')}\n          ]`;
    updatedProjectsStr = updatedProjectsStr.replace(imagesMatch, newImagesMatch);
  }
  
  const updatedFullMatch = fullMatch.replace(projectsStr, updatedProjectsStr);
  updatedContent = updatedContent.replace(fullMatch, updatedFullMatch);
}

fs.writeFileSync('data/portfolioData.js', updatedContent);
console.log('Successfully updated portfolioData.js');
