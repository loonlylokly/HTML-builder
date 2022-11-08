const path = require("path");
const fs = require("fs");
const readline = require("readline")
const { stdin, stdout } = require("process");

const output = fs.createWriteStream(path.join(path.dirname(__dirname), '02-write-file/text.txt'));

const rl = readline.createInterface(stdin, output);

stdout.write("Введите текст:\n");

rl.on('line', (line) => {
  if (line === "exit") {
    stdout.write("Пока");
    process.exit();
  }
  output.write(line+'\n');
})