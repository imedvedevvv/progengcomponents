import { Directory } from './Directory';
import { FileSystemItem } from './FileSystemItem';

export class BinaryFile extends FileSystemItem {
  constructor(
    name: string,
    private readonly content?: ArrayBuffer,
    parent?: Directory,
  ) {
    super(name, parent);
  }

  public read(): ArrayBuffer | undefined {
    return this.content;
  }
}
