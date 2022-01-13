import { Directory } from '../Directory';
import { LogTextFile } from '../LogTextFile';

describe('LogTextFile', () => {
  it('should have name', () => {
    const file = new LogTextFile('name');
    expect(file.name).toEqual('name');
  });

  it('should have string content', () => {
    const content = 'content';
    const file = new LogTextFile('name', content);
    expect(file.read()).toEqual(content);
  });

  it('should have undefined as default content', () => {
    const file = new LogTextFile('name');
    expect(file.read()).toEqual(undefined);
  });

  it('should have parent if in dir', () => {
    const file = new LogTextFile('name');
    const dir = new Directory('dir', [file]);
    expect(file.parent).toEqual(dir);
  });

  it('should append content to the end of the file', () => {
    const file = new LogTextFile('name');
    expect(file.read()).toEqual(undefined);
    file.append('content1');
    expect(file.read()).toEqual('content1');
    file.append('content2');
    expect(file.read()).toEqual('content1content2');
  });
});
