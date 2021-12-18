import { existsSync } from 'fs';
import path from 'path';
let GLEE_DIR;
let GLEE_PROJECT_DIR;
let GLEE_LIFECYCLE_DIR;
let GLEE_FUNCTIONS_DIR;
let GLEE_CONFIG_FILE_PATH;
let ASYNCAPI_FILE_PATH;
export async function setConfigs(config) {
    GLEE_PROJECT_DIR = process.cwd();
    GLEE_DIR = path.resolve(GLEE_PROJECT_DIR, '.glee');
    GLEE_LIFECYCLE_DIR = path.resolve(GLEE_DIR, config.functionsDir || 'lifecycle');
    GLEE_FUNCTIONS_DIR = path.resolve(GLEE_DIR, config.functionsDir || 'functions');
    GLEE_CONFIG_FILE_PATH = path.resolve(GLEE_DIR, 'glee.config.js');
    ASYNCAPI_FILE_PATH = path.resolve(GLEE_PROJECT_DIR, 'asyncapi.yaml');
    await loadConfigsFromFile();
    return getConfigs();
}
/**
 * Loads the configuration from glee project.
 */
async function loadConfigsFromFile() {
    if (!existsSync(GLEE_CONFIG_FILE_PATH))
        return;
    try {
        let { default: projectConfigs } = await import(GLEE_CONFIG_FILE_PATH);
        if (typeof projectConfigs === 'function')
            projectConfigs = await projectConfigs();
        if (!projectConfigs)
            return;
        GLEE_DIR = projectConfigs.GLEE_DIR ? path.parse(projectConfigs.GLEE_DIR) : GLEE_DIR;
        GLEE_LIFECYCLE_DIR = projectConfigs.GLEE_LIFECYCLE_DIR ? path.resolve(GLEE_DIR, projectConfigs.GLEE_LIFECYCLE_DIR) : GLEE_LIFECYCLE_DIR;
        GLEE_FUNCTIONS_DIR = projectConfigs.GLEE_FUNCTIONS_DIR ? path.resolve(GLEE_DIR, projectConfigs.GLEE_FUNCTIONS_DIR) : GLEE_FUNCTIONS_DIR;
        ASYNCAPI_FILE_PATH = projectConfigs.ASYNCAPI_FILE_PATH ? path.resolve(GLEE_DIR, projectConfigs.ASYNCAPI_FILE_PATH) : ASYNCAPI_FILE_PATH;
    }
    catch (e) {
        if (e.code !== 'ERR_MODULE_NOT_FOUND') {
            return console.error(e);
        }
    }
}
export function getConfigs() {
    return {
        GLEE_DIR,
        GLEE_PROJECT_DIR,
        GLEE_LIFECYCLE_DIR,
        GLEE_FUNCTIONS_DIR,
        GLEE_CONFIG_FILE_PATH,
        ASYNCAPI_FILE_PATH
    };
}
