
const fs = require('fs');

console.log('--- schema.prisma hex check start ---');
const buf = fs.readFileSync('prisma/schema.prisma');
console.log(buf.subarray(0, 100).toString('hex'));
console.log('--- schema.prisma hex check end ---');
