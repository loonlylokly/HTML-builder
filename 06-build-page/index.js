const path = require ("path");
const fs = require("fs");


async function copyDir(dirPath, copyDirPath) {
  await fs.promises.mkdir(copyDirPath, { recursive: true }).then(() => { 
    fs.readdir(dirPath, {withFileTypes: true}, (error, files) => {
      for (let file of files) {
        if (file.isDirectory()) {
          copyDir(path.resolve(dirPath, file.name), path.resolve(copyDirPath, file.name));
        } else {
          fs.promises.copyFile(path.resolve(dirPath, file.name), path.resolve(copyDirPath, file.name));
        }
      }
    });
  });
}

async function buildStyles() {
  const files = await fs.promises.readdir(path.join(path.dirname(__dirname), "06-build-page", "styles"), {withFileTypes: true});
  const output = fs.createWriteStream(path.join(path.dirname(__dirname), "06-build-page", "project-dist", "style.css"));
  for (let file of files) {
    if (file.isFile && path.extname(file.name) === ".css") {
      const input = fs.createReadStream(path.join(path.dirname(__dirname), "06-build-page", "styles", file.name),"utf-8")
      let data = '';
      input.on('data', (chunk) => output.write(data += chunk + '\n'));
    }
  }
}

async function buildHtml() {
  let blocks = {};
  await fs.promises.readFile(path.join(path.dirname(__dirname), "06-build-page", "template.html"), "utf-8").then( async (data) => {
    const sections = data.match(/{{\w{1,}}}/gm);
    for (let i = 0; i < sections.length; i++) {
      const fileName = sections[i].slice(2, -2);
      const htmlBlock = await fs.promises.readFile(path.join(path.dirname(__dirname), "06-build-page", "components", fileName+".html"));
      blocks[fileName] = htmlBlock;
    }
    return data;
  }).then(data => {
    data = data.replace(/{{\w{1,}}}/gm, (match) => blocks[match.slice(2, -2)]);
    return data;
  }).then(data => 
    fs.promises.writeFile(path.join(path.dirname(__dirname), "06-build-page", "project-dist", "index.html"), data)
  );
}

fs.rm(path.resolve(__dirname, "/06-build-page", "project-dist"), { recursive: true, force: true }, async () => {
  await copyDir(path.join(path.dirname(__dirname), "/06-build-page", "assets/"),
          path.join(path.dirname(__dirname), "/06-build-page", "project-dist", "assets"));
  await buildStyles();
  await buildHtml();
});