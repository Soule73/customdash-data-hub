'use strict';

const { execSync } = require('child_process');
const path = require('path');

const scripts = ['generate-salles', 'generate-orders', 'generate-employees', 'generate-products'];

console.log('Generating all datasets...\n');

for (const script of scripts) {
  execSync(`node ${path.resolve(__dirname, `${script}.js`)}`, { stdio: 'inherit' });
}

console.log('\nAll datasets generated successfully.');
