const path = require("path");
const { stdin, stdout } = require("fs");
const fs = require("fs");
const { mkdir, readdir } = require("fs/promises");


function copyStyles(files) {
  const output = fs.createWriteStream(path.join(path.dirname(__dirname), "05-merge-styles", "project-dist", "bundle.css"));
  for (let file of files) {
    if (file.isFile && path.extname(file.name) === ".css") {
      const input = fs.createReadStream(path.join(path.dirname(__dirname), "05-merge-styles", "styles", file.name),"utf-8")
      let data = '';
      input.on('data', (chunk) => output.write(data += chunk + '\n'));
    }
  }
}

async function dirInfo() {
  try {
    const files = await readdir(path.join(path.dirname(__dirname), "05-merge-styles", "styles"), {withFileTypes: true});
    copyStyles(files);
  } catch (err) {
    console.error(err);
  }
}

dirInfo();