import * as path from 'path';
import * as parse from 'csv-parse/lib/sync';

export const createFilePaths = (
  csvString: string,
  outputFolder: string,
  key: string = 'NAME'
) => {
  const filePaths: any[] = [];
  const rows = parse(csvString, {
    columns: true,
    skip_empty_lines: true
  });
  rows.map((row: any) => {
    filePaths.push(path.normalize(path.join(outputFolder, row[key] + '.xml')));
  });
  return filePaths;
};
export default createFilePaths ;