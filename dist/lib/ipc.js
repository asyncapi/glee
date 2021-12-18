import EventEmitter from 'events';
import ipc from 'node-ipc';
ipc.config.appspace = 'glee.runtime.';
ipc.config.delimiter = '\n';
ipc.config.silent = true;
const eventEmitter = new EventEmitter();
export async function sendMessage(socketId, operationId, correlationId, message) {
    if (!ipc.of[socketId])
        await connect(socketId);
    ipc.of[socketId].emit(operationId, JSON.stringify({
        ...message,
        ...{
            correlationId,
        }
    }));
    ipc.of[socketId].on('response', (msg) => {
        if (msg.correlationId) {
            eventEmitter.emit(msg.correlationId, msg);
        }
        else {
            console.warn('WARN: A message without correlationId has been received from the Java runtime:');
            console.log(msg);
        }
    });
}
export function connect(socketId) {
    return new Promise((resolve) => {
        ipc.connectTo(socketId, () => {
            resolve();
        });
    });
}
export default eventEmitter;
