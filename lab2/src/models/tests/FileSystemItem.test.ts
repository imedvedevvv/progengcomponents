import { Directory } from './../Directory';
import { BinaryFile } from './../BinaryFile';
import { LogTextFile } from '../LogTextFile';
import { BufferFile } from '../BufferFile';
import { FileSystemItem } from '../FileSystemItem';

const logFile = new LogTextFile('logFile');
const binaryFile = new BinaryFile('binFile');
const bufferFile = new BufferFile('bufFile');
const dir = new Directory('dir');

describe.each([logFile, binaryFile, bufferFile, dir])(
  'FileSystemItem %p',
  (item: FileSystemItem) => {
    let parentDir: Directory;
    beforeEach(() => {
      parentDir = new Directory('root', [logFile, binaryFile, bufferFile, dir]);
    });

    it('should be deleted from parent dir', () => {
      expect(item.parent).toEqual(parentDir);
      expect(parentDir.items.includes(item)).toBeTruthy();
      item.delete();
      expect(parentDir.items.includes(item)).toBeFalsy();
    });

    it('should be moved to another directory', () => {
        const anotherDir = new Directory('another');
        expect(item.parent).toEqual(parentDir);
        expect(anotherDir.items.includes(item)).toBeFalsy();

        item.move(anotherDir);

        expect(item.parent).toEqual(anotherDir);
        expect(anotherDir.items.includes(item)).toBeTruthy();

        expect(parentDir.items.includes(item)).toBeFalsy();
    });

    it('should be moved to another dir if no parent', () => {
        item.parent = undefined;
        parentDir.items = parentDir.items.filter(v => v !== item);

        expect(parentDir.items.includes(item)).toBeFalsy();
        const anotherDir = new Directory('another');

        expect(anotherDir.items.includes(item)).toBeFalsy();

        item.move(anotherDir);

        expect(item.parent).toEqual(anotherDir);
        expect(anotherDir.items.includes(item)).toBeTruthy();
    })
  },
);
