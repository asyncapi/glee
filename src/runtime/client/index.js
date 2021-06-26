
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
  
static sayGleeRegisterFunction(target, payload, cb) {
  var client = new glee_proto.Greeter(target, credentials.createInsecure());
  client.sayGleeRegisterFunction(payload, cb);
}
    
static sayGleeTriggerFunction(target, payload, cb) {
  var client = new glee_proto.Greeter(target, credentials.createInsecure());
  client.sayGleeTriggerFunction(payload, cb);
}
    
static sayGleeTriggerLifecycle(target, payload, cb) {
  var client = new glee_proto.Greeter(target, credentials.createInsecure());
  client.sayGleeTriggerLifecycle(payload, cb);
}
    
static sayGleeRegisterLifecycle(target, payload, cb) {
  var client = new glee_proto.Greeter(target, credentials.createInsecure());
  client.sayGleeRegisterLifecycle(payload, cb);
}
    
}
