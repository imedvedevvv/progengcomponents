import { LogTextFile } from './../LogTextFile';
import { BinaryFile } from '../BinaryFile';
import { Directory } from '../Directory';
import { FileSystem } from '../FileSystem';
import { FileSystemItem } from '../FileSystemItem';

jest.mock('../../config.ts', () => ({
  DIR_MAX_ELEMS: 2,
}));

describe('Directory', () => {

  it('should have name from constructor', () => {
    const dir = new Directory('dirName');
    expect(dir.name).toEqual('dirName');
  });

  it('should have empty items by default', () => {
    const dir = new Directory('dirName');
    expect(dir.items).toEqual([]);
  });

  it('should have items', () => {
    const mockItems: FileSystemItem[] = [
      new Directory('mockDir'),
      new BinaryFile('bin'),
    ];
    const dir = new Directory('dirName', mockItems);
    expect(dir.items).toEqual(mockItems);
  });

  it('should move item to another dir', () => {
    const file = new LogTextFile('logFile', 'file content');
    const anotherDir = new Directory('another');
    const currDir = new Directory('curr', [file]);

    expect(currDir.items.includes(file)).toBeTruthy();
    currDir.moveItem(file, anotherDir);
    expect(currDir.items.includes(file)).toBeFalsy();
    expect(anotherDir.items.includes(file)).toBeTruthy();
  });

  it('should throw an error if no such file to move from dir', () => {
    const anotherDir = new Directory('another');
    const currDir = new Directory('curr');

    expect(() =>
      currDir.moveItem(new LogTextFile('noSuchFile'), anotherDir),
    ).toThrowError();
  });

  it('should throw an error from addItems method if dir files count is more than DIR_MAX_ELEMS', () => {
    const currDir = new Directory('curr');
    expect(
      () => currDir.addItems(new Array(10).fill(new LogTextFile('file')))
    ).toThrowError();
  });

  it('should throw an error from conctructor  if dir files count is more than DIR_MAX_ELEMS', () => {
    expect(
      () => new Directory('curr', new Array(10).fill(new LogTextFile('file')))
    ).toThrowError();
  });
});
