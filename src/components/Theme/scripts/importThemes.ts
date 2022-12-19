import fs from 'fs';
import path from 'path';

const regexArray = async (data: any) => {
  var re = /\.\S*/g;
  var m;
  var classArray = [];

  while ((m = re.exec(data)) !== null) {
    if (m.index === re.lastIndex) {
      re.lastIndex++;
    }
    classArray.push(m[0].replace('.theme-', ''));
  }
  return classArray;
};

const readSassFile = async (path: string) => {
  let data = fs.readFileSync(path, 'utf8');
  const array = await regexArray(data);
  return array;
};

const main = async () => {
  const themes = await readSassFile('src/styles/scss/default/_themes.scss');
  console.log(themes);
  fs.writeFileSync(path.join(__dirname, 'themes.json'), JSON.stringify(themes));
};

main();
