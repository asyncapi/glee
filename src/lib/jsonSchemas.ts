export const HeadersSchema = {
  type: 'object',
  propertyNames: { type: 'string' },
  additionalProperties: { type: 'string' },
}
export const HttpOptionsSchema = {
  type: ['object', 'null'],
  additionalProperties: true,
  properties: {
    url: { type: 'string' },
    headers: HeadersSchema,
    method: { type: 'string' },
    body: {},
  },
}
export const OutboundMessageSchema = {
  type: 'object',
  properties: {
    payload: {},
    headers: {
      type: 'object',
      propertyNames: { type: 'string' },
      additionalProperties: { type: 'string' },
    },
    channel: { type: 'string' },
    server: { type: 'string' },
  },
}
export const FunctionReturnSchema = {
  type: ['object', 'null'],
  properties: {
    send: {
      type: 'array',
      items: OutboundMessageSchema,
    },
    reply: {
      type: 'array',
      items: OutboundMessageSchema,
    },
    invoke: {
      type: 'array',
      items: HttpOptionsSchema,
    },
  },
  additionalProperties: false,
  anyOf: [{ required: ['send'] }, { required: ['reply'] }, { required: ['invoke'] }],
}
