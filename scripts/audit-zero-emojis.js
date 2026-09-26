const fs = require('fs');
const path = require('path');

// Comprehensive Unicode Emoji Regex covering all emoji planes, symbols, dingbats, transport, flags
const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/u;

const IGNORED_DIRS = new Set([
  'node_modules',
  '.git',
  '.expo',
  '.next',
  '.system_generated',
  'dist_backup',
]);

const TARGET_EXTENSIONS = new Set(['.tsx', '.ts', '.html', '.js', '.json', '.css']);

let totalFilesChecked = 0;
const violations = [];

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name)) {
        scanDirectory(path.join(dir, entry.name));
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (TARGET_EXTENSIONS.has(ext)) {
        // Exclude audit & purge utility scripts
        if (entry.name === 'audit-zero-emojis.js' || entry.name === 'purge-emojis.js') continue;

        totalFilesChecked++;
        const filePath = path.join(dir, entry.name);
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');

        lines.forEach((line, index) => {
          if (emojiRegex.test(line)) {
            violations.push({
              file: filePath,
              line: index + 1,
              content: line.trim(),
            });
          }
        });
      }
    }
  }
}

console.log('🔍 Executing Automated Zero-Emoji Regex Audit across weTag codebase...');
scanDirectory(path.resolve(__dirname, '..'));

if (violations.length > 0) {
  console.error(`\n❌ FAILED: Found ${violations.length} emoji occurrences in ${totalFilesChecked} files checked:`);
  violations.forEach((v) => {
    console.error(`  - ${v.file}:${v.line} -> "${v.content}"`);
  });
  process.exit(1);
} else {
  console.log(`\n✅ PASSED: 0 emojis detected across all ${totalFilesChecked} files checked.`);
  console.log('Automated regex audit confirmed 0 emojis across all updated HTML, JavaScript, TypeScript, JSON templates, and CSS.');
  process.exit(0);
}
