'use strict';

require('source-map-support/register');
require('@asyncapi/parser');
var _ = require('lodash');
var generatorReactSdk = require('@asyncapi/generator-react-sdk');
var jsxRuntime = require('react/cjs/react-jsx-runtime.production.min');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

function pascalCase(string) {
  string = ___default['default'].camelCase(string);
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function index({
  asyncapi,
  params
}) {
  let channelWrappers = [];
  const channelEntries = Object.keys(asyncapi.channels()).length ? Object.entries(asyncapi.channels()) : [];
  channelWrappers = channelEntries.map(([channelName, channel]) => {
    return `
static say${pascalCase(channelName)}(target, payload, cb) {
  var client = new glee_proto.Greeter(target, credentials.createInsecure());
  client.say${pascalCase(channelName)}(payload, cb);
}
    `;
  });
  return /*#__PURE__*/jsxRuntime.jsx(generatorReactSdk.File, {
    name: "client.js",
    children: `
var PROTO_PATH = import.meta.url.replace('client.js', '').replace('file:', '') + './proto/glee.proto';
import { loadPackageDefinition, credentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
var packageDefinition = loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
var glee_proto = loadPackageDefinition(packageDefinition).asyncapi.glee;
export const servers = {
  java: 'localhost:50051'
}
export class gRPCClient {
  ${channelWrappers.join('')}
}
`
  });
}

module.exports = index;
//# sourceMappingURL=client.js.map
