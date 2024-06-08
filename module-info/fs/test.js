import { promises as fs } from 'fs';

export async function readDirectory(dir) {
  return fs.readdir(dir, { withFileTypes: true });
}

export async function renameFile(oldPath, newPath) {
  return fs.rename(oldPath, newPath);
}
