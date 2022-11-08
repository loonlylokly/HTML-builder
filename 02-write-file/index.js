const path = require("path");
const fs = require("fs");
const readline = require("readline")
const { stdin, stdout } = require("process");
const { createDiffieHellmanGroup } = require("crypto");

const output = fs.createWriteStream(path.join(path.dirname(__dirname), '02-write-file/text.txt'));

const rl = readline.createInterface(stdin, output);

function bye() {
  process.exit();
}

stdout.write("Введите текст:\n");

rl.on('line', (line) => {
  if (line === "exit") {
    process.exit();
  }
  output.write(line+'\n');
})
process.on('exit', () => console.log("Пока!"));
//catches ctrl+c event
process.on('SIGINT', bye);

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', bye);
process.on('SIGUSR2', bye);

//catches uncaught exceptions
process.on('uncaughtException', bye);