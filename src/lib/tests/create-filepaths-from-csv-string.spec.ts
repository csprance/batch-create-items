import createFilepaths from '../create-filepaths-from-csv-string';

describe('create-filepaths-from-csv-string', () => {
  it('create a list of filepaths based on the (default) NAME header', () => {
    const csvStringMock = `NAME,TEST,THIRD
TestName,Othervalue,ThirdValue
OtherTestName,SecondOtherValue,ThirdOtherValue`;
    const outputFolder = 'D:/perforce/dev';
    const values = createFilepaths(csvStringMock, outputFolder);

    expect(values).toEqual([
      'D:\\perforce\\dev\\TestName.xml',
      'D:\\perforce\\dev\\OtherTestName.xml'
    ]);
  });

  it('create a list of filepaths based on the TEST header', () => {
    const csvStringMock = `NAME,TEST,THIRD
TestName,Othervalue,ThirdValue
OtherTestName,SecondOtherValue,ThirdOtherValue`;
    const outputFolder = 'D:/perforce/dev';
    const values = createFilepaths(csvStringMock, outputFolder, 'TEST');

    expect(values).toEqual([
      'D:\\perforce\\dev\\Othervalue.xml',
      'D:\\perforce\\dev\\SecondOtherValue.xml'
    ]);
  });
});
