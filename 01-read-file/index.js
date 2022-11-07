const path = require('path');
const fs = require('fs');
const { Stream } = require('stream');
const { stdout } = process;
const filename = path.join(path.dirname(__dirname), '01-read-file/text.txt')
const input = fs.createReadStream(filename, 'utf-8');

input.on('data', chunk => stdout.write(chunk));