const fs = require('fs');
let content = fs.readFileSync('src/components/Education.jsx', 'utf8');

// Find and replace the score span
content = content.replace(
  /className="text-\[#00FFD1\] text-\[14px\] font-mono tracking-wider ml-4 whitespace-nowrap">\{item\.score\}/,
  `className="text-[11px] font-mono tracking-wider ml-4 whitespace-nowrap" style={{ color: index === 0 ? '#00FFD1' : index === 1 ? '#FFA94D' : '#C084FC' }}>{item.score}`
);

fs.writeFileSync('src/components/Education.jsx', content);
console.log('Done');
