import { exec } from 'child_process';

import { ApiProvider, ProviderConfig, ProviderResponse } from '../types';

const ANSI_ESCAPE = /\x1b(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g;

function stripText(text: string) {
  return text.replace(ANSI_ESCAPE, '');
}

export class ScriptCompletionProvider implements ApiProvider {
  constructor(private scriptPath: string, private config?: ProviderConfig) {}

  id() {
    return 'script';
  }

  async callApi(prompt: string) {
    return new Promise((resolve, reject) => {
      exec(`${this.scriptPath} "${prompt}"`, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve({ output: stripText(stdout.trim()) });
        }
      });
    }) as Promise<ProviderResponse>;
  }
}
