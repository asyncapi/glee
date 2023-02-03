export type AuthFunction<T> = ({serverName, channelName, parsedAsyncAPI}) => T

export interface MqttAuthConfig {
    cert?: string
    userPassword?: {username: string, password: string}
    clientId?: string
}

export interface WsAuthConfig {
    token?: string
}

