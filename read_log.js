
const fs = require('fs');

const logFile = 'build.log';

if (fs.existsSync(logFile)) {
    console.log(`Reading ${logFile}...`);
    const content = fs.readFileSync(logFile, 'utf8');
    console.log(content);
} else {
    console.log(`Log file ${logFile} not found.`);
}
