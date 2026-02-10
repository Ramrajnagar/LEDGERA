
const fs = require('fs');
const path = require('path');

const envPath = path.resolve('.env');
const bakPath = path.resolve('.env.bak');

let content = '';

if (fs.existsSync(envPath)) {
    content += fs.readFileSync(envPath, 'utf8') + '\n';
}

if (fs.existsSync(bakPath)) {
    content += fs.readFileSync(bakPath, 'utf8') + '\n';
}

// Simple parser to dedupe keys (last one wins) and strip quotes
const lines = content.split('\n');
const env = {};
const order = [];

lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const idx = trimmed.indexOf('=');
    if (idx === -1) return;

    const key = trimmed.substring(0, idx).trim();
    let val = trimmed.substring(idx + 1).trim();

    // Strip surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
    }

    if (!env[key]) {
        order.push(key);
    }
    env[key] = val;
});

let newContent = '';
order.forEach(key => {
    newContent += `${key}=${env[key]}\n`;
});

fs.writeFileSync(envPath, newContent, 'utf8');
console.log('Fixed .env encoding, deduped keys, and stripped quotes.');
