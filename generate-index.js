const fs = require('fs');
const path = require('path');

const recipesDir = './public/recipes';
const files = fs.readdirSync(recipesDir).filter(f => f.endsWith('.yaml'));

// This creates a JSON array of your filenames
fs.writeFileSync('./src/recipes-index.json', JSON.stringify(files));
console.log(`Indexed ${files.length} recipes!`);