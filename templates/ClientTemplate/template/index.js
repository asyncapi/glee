
import { AsyncAPIDocument } from '@asyncapi/parser';
import {pascalCase} from '../helpers/general';
import { File } from '@asyncapi/generator-react-sdk';

/**
 * @typedef RenderArgument
 * @type {object}
 * @property {AsyncAPIDocument} asyncapi received from the generator.
 * @property {TemplateParameters} params received from the generator.
 */
/**
 * Function to render file.
 * 
 * @param {RenderArgument} param0 render arguments received from the generator.
 */
export default function index({ asyncapi, params }) {
  let channelWrappers = [];
  const channelEntries = Object.keys(asyncapi.channels()).length ? Object.entries(asyncapi.channels()) : [];
  channelWrappers = channelEntries.map(([channelName, channel]) => {
    return `
static promiseSay${pascalCase(channelName)}(target, payload) {
  return new Promise((resolve, reject) => {
    var client = new glee_proto.Glee(target, credentials.createInsecure());
    client.say${pascalCase(channelName)}(payload, (err, response) => {
      if(err){
        reject(err);
      }else{
        resolve(response);
      }
    });
  });
}
static say${pascalCase(channelName)}(target, payload, cb) {
  var client = new glee_proto.Glee(target, credentials.createInsecure());
  client.say${pascalCase(channelName)}(payload, cb);
}
`;
  });
  return (
    <File name="index.js">
      {`
var PROTO_PATH = import.meta.url.replace('index.js', '').replace('file:', '') + './proto/glee.proto';
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
`}
    </File>
  );
}

