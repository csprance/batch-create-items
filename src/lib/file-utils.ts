import { remote, OpenDialogOptions } from 'electron';

export const openFileDialogReturnPath = () => {
  return new Promise(resolve => {
    const options: OpenDialogOptions = {
      properties: ['openDirectory']
    };

    remote.dialog.showOpenDialog(options, fileNames => {
      if (fileNames !== undefined) {
        resolve(fileNames[0]);
      }
    });
  });
};

