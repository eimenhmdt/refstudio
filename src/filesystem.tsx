import {
  BaseDirectory,
  createDir,
  FileEntry,
  readBinaryFile,
  readDir,
  writeBinaryFile,
  writeTextFile,
} from '@tauri-apps/api/fs';
import { appDataDir, join } from '@tauri-apps/api/path';

import { INITIAL_CONTENT } from './TipTapEditor/TipTapEditorConfigs';

const PROJECT_NAME = 'project-x';
const UPLOADS_DIR = 'uploads';

async function getBaseDir() {
  return join(await appDataDir(), PROJECT_NAME);
}
export async function ensureProjectFileStructure() {
  try {
    const baseDir = await getBaseDir();
    await createDir(baseDir, { recursive: true });
    await createDir(await join(baseDir, UPLOADS_DIR), { recursive: true });

    // Create sample files
    await writeTextFile(await join(baseDir, 'file 1.tiptap'), INITIAL_CONTENT);
    await writeTextFile(await join(baseDir, 'file 2.tiptap'), '# Heading');

    console.log('Project structure created with success. Folder: ', baseDir);

    return baseDir;
  } catch (err) {
    console.error('ERROR', err);
    throw new Error('Error ensuring file struture');
  }
}
export async function readAllProjectFiles() {
  const entries = await readDir(await getBaseDir(), { recursive: true });
  return sortedFileEntries(entries);
}

export async function uploadFiles(files: FileList) {
  const uploadsDir = await join(await getBaseDir(), UPLOADS_DIR);
  for (const file of files) {
    const path = await join(uploadsDir, file.name);
    const bytes = await file.arrayBuffer();
    await writeBinaryFile(path, bytes, { dir: BaseDirectory.Home });
  }
}

export async function readFile(file: FileEntry) {
  const content = await readBinaryFile(file.path);
  return content;
}

function sortedFileEntries(entries: FileEntry[]): FileEntry[] {
  return entries
    .sort((fileA, fileB) => {
      if (fileA.children === null) return -1;
      if (fileB.children === null) return 1;
      return fileA.name?.localeCompare(fileB.name || '') || 0;
    })
    .map((entry) => {
      return {
        ...entry,
        children: entry.children ? sortedFileEntries(entry.children) : entry.children,
      };
    });
}
