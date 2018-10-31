import * as fs from 'fs';

export default (filepaths: string[], injectedTemplates: string[]) => {
  filepaths.forEach((path, idx) => {
    fs.writeFile(path, injectedTemplates[idx], err => {
      if (err) {
        throw err;
      }
      console.log('The file was saved!', path);
    });
  });
};
