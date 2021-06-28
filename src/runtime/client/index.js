
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
  
static promiseSayGleeRegisterFunction(target, payload) {
  return new Promise((resolve, reject) => {
    var client = new glee_proto.Glee(target, credentials.createInsecure());
    client.sayGleeRegisterFunction(payload, (err, response) => {
      if(err){
        reject(err);
      }else{
        resolve(response);
      }
    });
  });
}
static sayGleeRegisterFunction(target, payload, cb) {
  var client = new glee_proto.Glee(target, credentials.createInsecure());
  client.sayGleeRegisterFunction(payload, cb);
}

static promiseSayGleeTriggerFunction(target, payload) {
  return new Promise((resolve, reject) => {
    var client = new glee_proto.Glee(target, credentials.createInsecure());
    client.sayGleeTriggerFunction(payload, (err, response) => {
      if(err){
        reject(err);
      }else{
        resolve(response);
      }
    });
  });
}
static sayGleeTriggerFunction(target, payload, cb) {
  var client = new glee_proto.Glee(target, credentials.createInsecure());
  client.sayGleeTriggerFunction(payload, cb);
}

static promiseSayGleeTriggerLifecycle(target, payload) {
  return new Promise((resolve, reject) => {
    var client = new glee_proto.Glee(target, credentials.createInsecure());
    client.sayGleeTriggerLifecycle(payload, (err, response) => {
      if(err){
        reject(err);
      }else{
        resolve(response);
      }
    });
  });
}
static sayGleeTriggerLifecycle(target, payload, cb) {
  var client = new glee_proto.Glee(target, credentials.createInsecure());
  client.sayGleeTriggerLifecycle(payload, cb);
}

static promiseSayGleeRegisterLifecycle(target, payload) {
  return new Promise((resolve, reject) => {
    var client = new glee_proto.Glee(target, credentials.createInsecure());
    client.sayGleeRegisterLifecycle(payload, (err, response) => {
      if(err){
        reject(err);
      }else{
        resolve(response);
      }
    });
  });
}
static sayGleeRegisterLifecycle(target, payload, cb) {
  var client = new glee_proto.Glee(target, credentials.createInsecure());
  client.sayGleeRegisterLifecycle(payload, cb);
}

}
