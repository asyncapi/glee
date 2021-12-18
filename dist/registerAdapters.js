import MqttAdapter from './adapters/mqtt/index.js';
import WebSocketAdapter from './adapters/ws/index.js';
import SocketIOAdapter from './adapters/socket.io/index.js';
import { getSelectedServerNames } from './lib/servers.js';
export default async (app, parsedAsyncAPI, config) => {
    const serverNames = await getSelectedServerNames();
    serverNames.forEach(serverName => {
        const server = parsedAsyncAPI.server(serverName);
        if (!server) {
            throw new Error(`Server "${serverName}" is not defined in the AsyncAPI file.`);
        }
        registerAdapterForServer(serverName, server, app, parsedAsyncAPI, config);
    });
};
function registerAdapterForServer(serverName, server, app, parsedAsyncAPI, config) {
    const protocol = server.protocol();
    if (['mqtt', 'mqtts', 'secure-mqtt'].includes(protocol)) {
        app.addAdapter(MqttAdapter, {
            serverName,
            server,
            parsedAsyncAPI,
        });
    }
    else if (['amqp', 'amqps'].includes(protocol)) {
        // TODO: Implement AMQP support
    }
    else if (['ws', 'wss'].includes(protocol)) {
        const configWsAdapter = config?.websocket?.adapter;
        if (!configWsAdapter || configWsAdapter === 'native') {
            app.addAdapter(WebSocketAdapter, {
                serverName,
                server,
                parsedAsyncAPI,
            });
        }
        else if (configWsAdapter === 'socket.io') {
            app.addAdapter(SocketIOAdapter, {
                serverName,
                server,
                parsedAsyncAPI,
            });
        }
        else if (typeof configWsAdapter === 'object') {
            app.addAdapter(configWsAdapter, {
                serverName,
                server,
                parsedAsyncAPI,
            });
        }
        else {
            throw new Error(`Unknown value for websocket.adapter found in glee.config.js: ${config.websocket.adapter}. Allowed values are 'native-websocket', 'socket.io', or a reference to a custom Glee adapter.`);
        }
    }
    else {
        // TODO: Improve error message with link to repo encouraging the developer to contribute.
        throw new Error(`Protocol "${server.protocol()}" is not supported yet.`);
    }
}
