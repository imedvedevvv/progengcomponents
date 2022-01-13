import { Directory } from './../Directory';
import { BinaryFile } from './../BinaryFile';
describe('BinaryFile', () => {
  it('should have name', () => {
    const file = new BinaryFile('name');
    expect(file.name).toEqual('name');
  });

  it('should have binary content', () => {
    const buffer = new ArrayBuffer(32);
    const file = new BinaryFile('name', buffer);
    expect(file.read()).toEqual(buffer);
  });

  it('should have undefined as default content', () => {
    const file = new BinaryFile('name');
    expect(file.read()).toEqual(undefined);
  });

  it('should have parent if in dir', () => {
    const file = new BinaryFile('name');
    const dir = new Directory('dir', [file]);
    expect(file.parent).toEqual(dir);
  });
});
