import type { ChannelInterface, ChannelParameterInterface } from "@asyncapi/parser"
import type { GleeQuoreMessage} from "@asyncapi/gleequore"
import { extractExpressionValueFromMessage } from "@asyncapi/glee-shared-utils"

export function applyAddressParameters(channel: ChannelInterface, message?: GleeQuoreMessage): string {
  let address = channel.address()
  const parameters = channel.parameters()
  for (const parameter of parameters) {
    address = substituteParameterInAddress(parameter, address, message)
  }
  return address
}

export function substituteParameterInAddress(parameter: ChannelParameterInterface, address: string, message?: GleeQuoreMessage): string {
  const doesExistInAddress = address.includes(`{${parameter.id()}}`)
  if (!doesExistInAddress) return address
  const parameterValue = getParamValue(parameter, message)
  if (!parameterValue) {
    throw Error(`parsing parameter "${parameter.id()}" value failed. please make sure it exists in your header/payload or in default field of the parameter.`)
  }
  address = address.replace(`{${parameter.id()}}`, parameterValue)
  return address
}

const getParamValue = (parameter: ChannelParameterInterface, message: GleeQuoreMessage): string | null => {
  const location = parameter.location()
  if (!location) return parameter.json().default
  const paramFromLocation = getParamFromLocation(location, message)
  if (!paramFromLocation) {
    return parameter.json().default
  }
  return paramFromLocation
}

function getParamFromLocation(location: string, message: GleeQuoreMessage) {
  if ((message.payload || message.headers) && location) {
    return extractExpressionValueFromMessage(message, location)
  }
}