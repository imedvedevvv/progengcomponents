import { DIR_MAX_ELEMS } from '../config';
import { FileSystemItem } from './FileSystemItem';

export class Directory extends FileSystemItem {
  public items: FileSystemItem[] = [];

  constructor(name: string, items: FileSystemItem[] = []) {
    super(name);
    this.addItems(items);
  }

  public moveItem(what: FileSystemItem, to: Directory): void {
    if (!this.items.includes(what)) {
      throw new Error(`No such file or directory ${what.name}`);
    }
    what.move(to);
  }

  public addItems(items: FileSystemItem[]): void {
    const nextItemsCount = this.items.length + items.length;
    if (nextItemsCount > DIR_MAX_ELEMS) {
      throw new Error(`Max file amount exceeded: ${DIR_MAX_ELEMS}. Received ${nextItemsCount}`);
    }
    items.forEach(item => item.parent = this);
    this.items.push(...items);
  }
}
