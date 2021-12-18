import { basename, extname } from 'path';
import { stat } from 'fs/promises';
import walkdir from 'walkdir';
export const functions = {};
export async function register(dir) {
    try {
        const statsDir = await stat(dir);
        if (!statsDir.isDirectory())
            return;
    }
    catch (e) {
        if (e.code === 'ENOENT')
            return;
    }
    try {
        const files = await walkdir.async(dir, { return_object: true });
        return await Promise.all(Object.keys(files).map(async (filePath) => {
            try {
                const runtime = extname(filePath).substr(1);
                const functionName = basename(filePath, extname(filePath));
                functions[functionName] = {
                    runtime,
                };
                if (['js', 'ts'].includes(runtime)) {
                    const { default: fn } = await import(filePath);
                    functions[functionName].run = fn;
                }
            }
            catch (e) {
                console.error(e);
            }
        }));
    }
    catch (e) {
        console.error(e);
    }
}
