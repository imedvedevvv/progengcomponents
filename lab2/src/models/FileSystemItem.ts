import { Directory } from './Directory';

export abstract class FileSystemItem {
  constructor(
    public readonly name: string,
    public parent?: Directory,
  ) {}

  public delete(): void {
    this.removeFromParent();
  }
  public move(to: Directory): void {
    this.removeFromParent();
    to.addItems([this]);
  }

  private removeFromParent(): void {
    if (this.parent) {
      this.parent.items = this.parent.items.filter(item  => item !== this);
      this.parent = undefined;
    }
  }
}
