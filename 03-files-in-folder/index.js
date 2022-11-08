const { readdir } = require("fs/promises");
const { stat } = require("fs");
const { stdout } = require("process");
const path = require("path");

async function dirInfo() {
  let filename = path.join(path.dirname(__dirname),'03-files-in-folder/secret-folder');
  try {
    const files = await readdir(filename);
    for (const file of files) {
      stat(path.join(path.dirname(filename), "/secret-folder/"+file), (err, stats) => {
        if (!stats.isDirectory()) {
          stdout.write(file + " - " + path.extname(file).slice(1) + " - " + stats.size + "b\n");
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
}

dirInfo();