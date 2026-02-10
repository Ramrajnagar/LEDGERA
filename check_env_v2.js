
const fs = require('fs');
const dotenv = require('dotenv');

const files = ['.env', '.env.local'];
let env = {};

files.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`Loading ${file}...`);
        const parsed = dotenv.parse(fs.readFileSync(file));
        env = { ...env, ...parsed };
    }
});

const required = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'DATABASE_URL', 'DIRECT_URL'];
const missing = [];

console.log("Checking loaded environment variables...");
required.forEach(key => {
    if (!env[key]) {
        console.log(`❌ Missing: ${key}`);
        missing.push(key);
    } else {
        // Check for placeholders
        if (env[key].includes('your-project-url') || env[key].includes('your-anon-key')) {
            console.log(`❌ Placeholder detected: ${key}`);
            missing.push(key);
        } else {
            console.log(`✅ Found: ${key}`);
        }
    }
});

if (missing.length > 0) {
    console.log("Environment check failed.");
    process.exit(1);
} else {
    console.log("Environment check passed.");
    process.exit(0);
}
