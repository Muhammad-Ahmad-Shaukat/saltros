import fs from 'fs';
import path from 'path';

function replaceInDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDirectory(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('/collections')) {
        content = content.replace(/\/collections/g, '/collection');
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

replaceInDirectory(path.join(process.cwd(), 'src'));
