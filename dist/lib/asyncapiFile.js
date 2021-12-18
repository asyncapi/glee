import { readFile } from 'fs/promises';
import asyncapi from '@asyncapi/parser';
import { getConfigs } from './configs.js';
export async function getParsedAsyncAPI() {
    const { ASYNCAPI_FILE_PATH } = getConfigs();
    const asyncapiFileContent = await readFile(ASYNCAPI_FILE_PATH, 'utf-8');
    return asyncapi.parse(asyncapiFileContent);
}
