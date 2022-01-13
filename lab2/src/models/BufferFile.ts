import { MAX_BUF_FILE_SIZE } from '../config';
import { Directory } from './Directory';
import { FileSystemItem } from './FileSystemItem';

export class BufferFile extends FileSystemItem {
  private content: string[] = [];
  constructor(
    name: string,
    initialContent: string[] = [],
    parent?: Directory,
  ) {
    super(name, parent);
    initialContent.forEach(this.push.bind(this));
  }

  public push(what: string): void {
    if (this.content.length + 1 > MAX_BUF_FILE_SIZE) {
      throw new Error(`Buffer "${this.name}" overflow. Max buffer length is ${MAX_BUF_FILE_SIZE}`);
    }
    this.content.push(what);
  }
  public consume(): string | undefined {
    return this.content.shift();
  }
}
