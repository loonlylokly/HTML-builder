const path = require ("path");
const { mkdir, rm, readdir, copyFile, constants } = require("fs/promises");
const fs = require("fs");

fs.rm(path.resolve(__dirname, 'files-copy'), { recursive: true, force: true }, () => {
  fs.promises.mkdir(path.join(path.dirname(__dirname), "/04-copy-directory/files-copy/"), { recursive: true }).then(() => {
    const dirPath = path.join(path.dirname(__dirname), "/04-copy-directory/files/");
    fs.readdir(dirPath, (error, files) => {
      for (let file of files) {
        fs.copyFile(path.join(path.dirname(dirPath), "/files/"+file),
                      path.join(path.dirname(dirPath), "/files-copy/"+file), () => {});
      }
    });
  });
});