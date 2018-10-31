export const extractKeys = (text: string): string[] => {
  const dollarSignRE = /(\$)(.*)(\$)/;
  return Array.from(
    new Set(text
      .split('\n')
      .map(str => str.split(' '))
      .reduce((p, n) => p.concat(n), [])
      .map(str => {
        const results = str.match(dollarSignRE);
        if (results !== null) {
          return results[0];
        }
        return null;
      })
      .filter(value => value) as string[])
  );
};
export const xmlToCsvHeader = (xmlString: string) =>
  extractKeys(xmlString)
    .join(',')
    .replace(/\$/g, '');

