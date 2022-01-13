import { Directory } from './../Directory';
import { BufferFile } from './../BufferFile';

jest.mock('../../config.ts', () => ({
  MAX_BUF_FILE_SIZE: 2,
}));

describe('BufferFile', () => {
  it('should have name', () => {
    const file = new BufferFile('name');
    expect(file.name).toEqual('name');
  });

  it('should accept initial queue as an array of strings and work like a queue', () => {
    const content: string[] = ['item1', 'item2'];
    const file = new BufferFile('name', content);
    expect(file.consume()).toEqual('item1');
    expect(file.consume()).toEqual('item2');
    expect(file.consume()).toEqual(undefined);

    file.push('item3');
    file.push('item4');

    expect(file.consume()).toEqual('item3');
    expect(file.consume()).toEqual('item4');
  });

  it('should return undefined if no items provided in the beginning', () => {
    const file = new BufferFile('name');
    expect(file.consume()).toEqual(undefined);
  });

  it('should have parent if in dir', () => {
    const file = new BufferFile('name');
    const dir = new Directory('dir', [file]);
    expect(file.parent).toEqual(dir);
  });

  it('should throw error in constructor is more items than MAX_BUF_FILE_SIZE provided', () => {
    expect(
      () => new BufferFile('name', ['item1', 'item2', 'item3']),
    ).toThrowError();
  });

  it('should throw error in push method is more items than MAX_BUF_FILE_SIZE provided', () => {
    const file = new BufferFile('name');
    expect(() => {
      file.push('item1');
      file.push('item2');
    }).not.toThrowError();

    expect(() => {
      file.push('item3');
    }).toThrowError();
  });
});
