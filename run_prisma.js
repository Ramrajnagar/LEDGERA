
const { spawn } = require('child_process');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load .env
const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

console.log('Loaded env keys:', Object.keys(envConfig));
if (process.env.DATABASE_URL) {
    console.log('DATABASE_URL length:', process.env.DATABASE_URL.length);
    console.log('DATABASE_URL starts with:', process.env.DATABASE_URL.substring(0, 10));
} else {
    console.error('DATABASE_URL missing in process.env!');
}

const args = process.argv.slice(2);
// Use local binary directly to avoid npx/shell issues
const command = path.resolve('node_modules\\.bin\\prisma.cmd');
const cmdArgs = [...args];

console.log('Running:', command, cmdArgs.join(' '));

const child = spawn(command, cmdArgs, {
    stdio: 'inherit',
    shell: true,
    env: process.env
});

child.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
    process.exit(code);
});
