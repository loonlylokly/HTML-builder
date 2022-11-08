const path = require ("path");
const { mkdir, readdir, copyFile, constants } = require("fs/promises");
const { dirname } = require("path");


async function copyDir() {
  try {
    const dirPath = path.join(path.dirname(__dirname), "/04-copy-directory/files/");
    const copyDirPath = path.join(path.dirname(__dirname), "/04-copy-directory/files-copy/");
    const createDir = await mkdir(copyDirPath, { recursive: true });
    const files = await readdir(dirPath);
    for (let file of files) {
      await copyFile(path.join(path.dirname(dirPath), "/files/"+file),
                    path.join(path.dirname(dirPath), "/files-copy/"+file));
    }
  } catch (err) {
    console.error(err.message);
  }
}

copyDir();