
require('dotenv').config();

const required = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'DATABASE_URL', 'DIRECT_URL'];
const missing = [];

console.log("Checking environment variables...");
required.forEach(key => {
    if (!process.env[key]) {
        console.log(`❌ Missing: ${key}`);
        missing.push(key);
    } else {
        console.log(`✅ Found: ${key}`);
    }
});

if (missing.length > 0) {
    console.log("Environment check failed.");
    process.exit(1);
} else {
    console.log("Environment check passed.");
    process.exit(0);
}
