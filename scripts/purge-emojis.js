const fs = require('fs');
const path = require('path');

// Regex matching emoji ranges
const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu;

const REPLACEMENTS = [
  [/🚗/gu, ''],
  [/🚙/gu, ''],
  [/🏠/gu, ''],
  [/🏡/gu, ''],
  [/🚶/gu, ''],
  [/⚡/gu, 'Power '],
  [/💧/gu, 'Water '],
  [/❤️/gu, ''],
  [/🚀/gu, ''],
  [/👋/gu, ''],
  [/🛡️?/gu, 'Verified '],
  [/🎓/gu, 'Campus '],
  [/🎉/gu, ''],
  [/📍/gu, 'Hub: '],
  [/🔑/gu, 'Direct '],
  [/🛏️?/gu, 'Beds '],
  [/🚿/gu, 'Baths '],
  [/📐/gu, 'Sqft '],
  [/🧳/gu, 'Bags '],
  [/❄️?/gu, 'AC '],
  [/🪑/gu, 'Seats '],
  [/⭐|★/gu, 'Stars '],
  [/🏢/gu, 'Apartments '],
  [/✨/gu, ''],
];

const IGNORED_DIRS = new Set([
  'node_modules',
  '.git',
  '.expo',
  '.next',
  '.system_generated',
  'dist_backup',
]);

const TARGET_EXTENSIONS = new Set(['.tsx', '.ts', '.html', '.js', '.json', '.css']);

let filesModified = 0;

function purgeDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name)) {
        purgeDirectory(path.join(dir, entry.name));
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (TARGET_EXTENSIONS.has(ext)) {
        if (entry.name === 'purge-emojis.js' || entry.name === 'audit-zero-emojis.js') continue;

        const filePath = path.join(dir, entry.name);
        let content = fs.readFileSync(filePath, 'utf8');

        if (emojiRegex.test(content)) {
          REPLACEMENTS.forEach(([pattern, rep]) => {
            content = content.replace(pattern, rep);
          });
          // Catch-all for any remaining emoji unicode
          content = content.replace(emojiRegex, '');
          fs.writeFileSync(filePath, content, 'utf8');
          filesModified++;
          console.log(`Purged emojis in: ${filePath}`);
        }
      }
    }
  }
}

console.log('Starting automated emoji purge...');
purgeDirectory(path.resolve(__dirname, '..'));
console.log(`Completed emoji purge: ${filesModified} files modified.`);
