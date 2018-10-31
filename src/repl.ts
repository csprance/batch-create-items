import * as parse from 'csv-parse/lib/sync';

export const zip = (...arrays: any[]): any[] =>
  arrays[0].map((_: any, i: any) => arrays.map(array => array[i]));

/*
Inject values from a csv string into a template
 */
export const inject = (csvString: string, template: string) => {
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
    zipped.forEach(
      ([key, val]: [string, string]) =>
        (stringVal = stringVal.replace(`$${key}$`, val))
    );
    vals.push(stringVal);

    // For each row replace every value
    // Replace the value in the template
    // const replaced = template.replace(`$${key}$`, row[key]);
  }
  return vals;
};

const csvStringMock = `NAME,ID
Frank,12
TheDude,13
`;
const templateStringMock = 'Test = $NAME$ Id="$ID$"';

const _main = (() => {
  return inject(csvStringMock, templateStringMock);
})();

console.log('Results: ', _main);
