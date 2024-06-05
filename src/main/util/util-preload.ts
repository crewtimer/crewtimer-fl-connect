/**
 * Support for using LapStorage in renderer
 *
 * Add ```import './util/util-preload';``` to preload.ts to integrate with main
 */
import { KeyMap } from 'crewtimer-common';
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
const path = require('path');

export interface CloseFileReturn {
  error: string;
}

export interface OpenFileReturn {
  cancelled: boolean;
  filePath: string;
}

export interface OpenDirReturn {
  cancelled: boolean;
  path: string;
}

export interface DirListReturn {
  error: string;
  files: string[];
}
// Function to open the file dialog and return the selected file path as a promise
export function openFileDialog(): Promise<OpenFileReturn> {
  return new Promise((resolve, _reject) => {
    ipcRenderer
      .invoke('open-file-dialog')
      .then((result) => resolve(result))
      .catch((_err) => resolve({ cancelled: true, filePath: '' }));
  });
}

export function deleteFile(filename: string): Promise<CloseFileReturn> {
  return new Promise((resolve, _reject) => {
    ipcRenderer
      .invoke('delete-file', filename)
      .then((result) => resolve(result))
      .catch((err) => resolve({ error: String(err) }));
  });
}

export function openDirDialog(
  title: string,
  defaultPath: string
): Promise<OpenDirReturn> {
  return new Promise((resolve, _reject) => {
    ipcRenderer
      .invoke('open-dir-dialog', title, defaultPath)
      .then((result) => resolve(result))
      .catch((_err) => resolve({ cancelled: true, path: defaultPath }));
  });
}

// Function to get the files in a directory and return them as a promise
export function getFilesInDirectory(dirPath: string): Promise<DirListReturn> {
  // console.log('Executing getFiles in dir preload');
  return new Promise((resolve, _reject) => {
    ipcRenderer
      .invoke('get-files-in-directory', dirPath)
      .then((result: DirListReturn) => {
        // console.log('get files in dir result=' + JSON.stringify(result));
        resolve(result);
      })
      .catch((err) => ({ error: String(err), files: [] }));
  });
}

export function readJsonFile<T = KeyMap>(
  filePath: string
): Promise<{ status: string; error?: string; json?: T }> {
  // send message to main
  return new Promise((resolve, _reject) => {
    ipcRenderer
      .invoke('read-json-file', filePath)
      .then((result) => resolve(result))
      .catch((err) => resolve({ status: 'Fail', error: String(err) }));
  });
}

export function storeJsonFile<T = KeyMap>(
  filePath: string,
  json: T
): Promise<{ status: string; error?: string }> {
  return new Promise((resolve, _reject) => {
    // send message to main
    ipcRenderer
      .invoke('store-json-file', filePath, json)
      .then((result) => resolve(result))
      .catch((err) => resolve({ status: 'Fail', error: String(err) }));
  });
}

contextBridge.exposeInMainWorld('Util', {
  onUserMessage: (
    callback: (_event: IpcRendererEvent, level: string, msg: string) => void
  ) => ipcRenderer.on('user-message', callback),
  getFilesInDirectory,
  openFileDialog,
  openDirDialog,
  deleteFile,
  readJsonFile,
  storeJsonFile,
});

contextBridge.exposeInMainWorld('platform', {
  platform: process.platform,
  pathSeparator: path.sep,
  appVersion: require('../../../release/app/package.json').version,
});
