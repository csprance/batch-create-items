import * as parse from 'csv-parse/lib/sync';

export const zip = (...arrays: any[]): any[] =>
  arrays[0].map((_: any, i: any) => arrays.map(array => array[i]));

/*
Inject values from a csv string into a template
 */
export const inject = (csvString: string, template: string): string[] => {
  const rows = parse(csvString, {
    columns: true,
    skip_empty_lines: true
  });
  // Loop through all the rows
  const vals = [];
  for (const row of rows) {
    const headers = Object.keys(rows[0]);
    const values = Object.values(row);
    const zipped = zip(headers, values);
    let stringVal = template;

    zipped.forEach(([key, val]: [string, string]) => {
      const pattern = `\\$${key}\\$`;
      stringVal = stringVal.replace(new RegExp(pattern, 'g'), val);
    });
    vals.push(stringVal);
  }
  return vals;
};

export default inject;
