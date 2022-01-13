import { Directory } from './Directory';
import { FileSystemItem } from './FileSystemItem';

export class LogTextFile extends FileSystemItem {
  constructor(
    name: string,
    private content?: string,
    parent?: Directory,
  ) {
    super(name, parent);
  }
  public read(): string | undefined {
    return this.content;
  }
  public append(what: string): void {
    this.content ||= '';
    this.content += what;
  }
}
