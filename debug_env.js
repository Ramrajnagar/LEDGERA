
const fs = require('fs');
const dotenv = require('dotenv');

console.log('--- raw hex check start ---');
const buf = fs.readFileSync('.env');
console.log(buf.subarray(0, 50).toString('hex'));
console.log('--- raw hex check end ---');

const parsed = dotenv.parse(buf);
console.log('Keys found:', Object.keys(parsed));

// Check specifically for DATABASE_URL
if (parsed.DATABASE_URL) {
    console.log('DATABASE_URL found.');
    console.log('Value starts with:', parsed.DATABASE_URL.substring(0, 10));
} else {
    console.log('DATABASE_URL NOT found in parsed object.');
}
