import { BinaryFile } from './models/BinaryFile';
import { BufferFile } from './models/BufferFile';
import { Directory } from './models/Directory';
import { FileSystem } from './models/FileSystem';
import { LogTextFile } from './models/LogTextFile';

const root = new Directory('root', [
  new Directory('item1', [new BinaryFile('bin'), new BufferFile('buf')]),
  new LogTextFile('logfile'),
]);

const fs = new FileSystem(root);
// todo add methods for fs to find files, etc
console.log('fs:', fs);
