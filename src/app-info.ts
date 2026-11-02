import { readFileSync } from 'fs';
import { join } from 'path';

export interface AppInfo {
  name: string;
  version: string;
  startedAt: Date;
}

export const APP_INFO = 'APP_INFO'; 

export function appInfoFactory(): AppInfo {
  const packageJsonPath = join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  
  return {
    name: packageJson.name,
    version: packageJson.version,
    startedAt: new Date(),
  };
}