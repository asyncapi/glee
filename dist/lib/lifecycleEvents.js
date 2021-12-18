import { stat } from 'fs/promises';
import walkdir from 'walkdir';
import Glee from './glee.js';
import { logInfoMessage } from './logger.js';
import { arrayHasDuplicates } from './util.js';
export const events = {};
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
                const { default: fn, lifecycleEvent, channels, servers } = await import(filePath);
                if (!events[lifecycleEvent])
                    events[lifecycleEvent] = [];
                events[lifecycleEvent].push({
                    fn,
                    channels,
                    servers,
                });
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
export async function run(lifecycleEvent, params) {
    if (!Array.isArray(events[lifecycleEvent]))
        return;
    try {
        const connectionChannels = params.connection.channels;
        const connectionServer = params.connection.serverName;
        const handlers = events[lifecycleEvent]
            .filter(info => {
            if (info.channels && !arrayHasDuplicates([
                ...connectionChannels,
                ...(info.channels)
            ])) {
                return false;
            }
            if (info.servers) {
                return info.servers.includes(connectionServer);
            }
            return true;
        });
        if (!handlers.length)
            return;
        logInfoMessage(`Running ${lifecycleEvent} lifecycle event...`, {
            highlightedWords: [lifecycleEvent]
        });
        const responses = await Promise.all(handlers.map(info => info.fn(params)));
        responses.forEach(res => {
            if (res && Array.isArray(res.send)) {
                res.send.forEach((event) => {
                    try {
                        params.glee.send(new Glee.Message({
                            payload: event.payload,
                            headers: event.headers,
                            channel: event.channel,
                            serverName: event.server,
                            connection: params.connection,
                        }));
                    }
                    catch (e) {
                        console.error(`The ${lifecycleEvent} lifecycle function failed to send an event to channel ${event.channel}.`);
                        console.error(e);
                    }
                });
            }
        });
    }
    catch (e) {
        console.error(e);
    }
}
