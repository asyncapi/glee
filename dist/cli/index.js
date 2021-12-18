#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import findNpmPrefix from 'find-npm-prefix';
import { spawn } from 'cross-spawn';
import TscWatchClient from 'tsc-watch/client.js';
import { accessSync } from 'fs';
import { logLineWithIcon } from '../lib/logger.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const args = process.argv.splice(2);
const command = args[0];
if (command === 'dev') {
    const projectDir = await findNpmPrefix(process.cwd());
    const watch = new TscWatchClient();
    let childProcess;
    const startParams = ['--silent'];
    watch.on('compile_errors', console.error);
    watch.on('started', () => {
        // Kill existing processes, otherwise, the ports will be in use.
        if (childProcess) {
            childProcess.kill();
            logLineWithIcon('↯', 'File change detected. Compiling...', {
                emptyLinesBefore: 1,
                emptyLinesAfter: 1,
            });
        }
    });
    watch.on('success', () => {
        childProcess = spawn('node', [resolve(__dirname, 'start.js')], {
            stdio: 'inherit',
        });
    });
    // If project has a tsconfig.json, use it.
    try {
        accessSync(resolve(projectDir, 'tsconfig.json'));
        startParams.push('--project');
        startParams.push(projectDir);
    }
    catch (err) {
        // Ignore it...
    }
    watch.start(...startParams);
    process.on('beforeExit', () => {
        watch.kill();
    });
}
else if (command === 'start') {
    import('./start.js');
}
else {
    console.error(`Unknown command "${args[0]}"`);
}
