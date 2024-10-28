import type { AuthFunction } from "@asyncapi/gleequore"

export interface MqttAuthConfig {
  cert?: string
  username?: string
  password?: string
  clientId?: string
}

export type MqttAdapterConfig = {
  auth?: MqttAuthConfig | AuthFunction<MqttAuthConfig>
}
