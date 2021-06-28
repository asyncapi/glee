
import { AsyncAPIDocument } from '@asyncapi/parser';
import { TypeScriptGenerator, FormatHelpers } from '@asyncapi/modelina';
import { File } from '@asyncapi/generator-react-sdk';
import {pascalCase, camelCase} from '../helpers/general';


function renderGRPCType(model) {
  if(model === undefined) return 'google.protobuf.Any';
  if (Array.isArray(model)) {
    return model.map(t => this.renderGRPCType(t)).join(' | ');
  }
  if (model.enum !== undefined) {
    return model.enum.map(value => typeof value === 'string' ? `"${value}"` : value).join(' | ');
  }
  if (model.$ref !== undefined) {
    return pascalCase(model.$ref);
  }
  return toGRPCType(model.type, model);
}

function toGRPCType(type, model) {
  if (type === undefined) {
    return '';
  }
  switch (type) { 
  case 'object':
    return 'bytes';
  case 'string':
    return 'string';
  case 'integer':
    return 'int64';
  case 'number':
    return 'double';
  case 'boolean':
    return 'bool';
  case 'null':
    return '';
  case 'array': {
    return `repeated ${renderGRPCType(model.items)}`;
  }
  default: return type;
  }
}
/**
 * Custom model preset to ensure property names are lower cased
 */
 const preset = {
  interface: {
    async self({ renderer, model }) {
      if(!model.properties) return;
      const propertyEntries = Object.keys(model.properties).length ? Object.entries(model.properties) : [];
      let index = 1;
      let properties = propertyEntries.map(([propName, propModel]) => {
        if (Array.isArray(propModel.type)) {
          return `oneof ${camelCase(propName)} { ${propModel.type.map(t => {const type = toGRPCType(t, propModel).replace('repeated ', ''); if(!type) return; return `${type} ${camelCase(propName)}${pascalCase(type)}Value = ${index++};`}).join(' ')} }`;
        } else {
          return `${renderGRPCType(propModel)} ${camelCase(propName)} = ${index++};`;
        }
      });
      return `message ${pascalCase(renderer.model.$id)} {
\t${properties.join('\n\t')}
}\n`;
    }
  }
};

async function gRPCMessages(asyncapi){
  const typescriptGenerator = new TypeScriptGenerator({modelType: 'interface', presets: [preset]});
  const channelEntries = Object.keys(asyncapi.channels()).length ? Object.entries(asyncapi.channels()) : [];
  let generatedModels = [];
  const generatedModelIds = [];
  for (const [, channel] of channelEntries) {
    let requestSchema;
    let responseSchema;
    if(channel.hasPublish()){
      requestSchema = channel.publish().bindings().grpc.subscribe.payload;
      responseSchema = channel.publish().message().payload()._json;
    }
    if(channel.hasSubscribe()){
      requestSchema = channel.subscribe().message().payload()._json;
      responseSchema = channel.subscribe().bindings().grpc.publish.payload;
    }
    const requestModels = await typescriptGenerator.generate(requestSchema);
    const responseModels = await typescriptGenerator.generate(responseSchema);
    for (const requestModel of requestModels) {
      if(!generatedModelIds.includes(requestModel.model.$id)){
        generatedModelIds.push(requestModel.model.$id);
        generatedModels.push(requestModel.result);
      }
    }
    for (const responseModel of responseModels) {
      if(!generatedModelIds.includes(responseModel.model.$id)){
        generatedModelIds.push(responseModel.model.$id);
        generatedModels.push(responseModel.result);
      }
    }
  }
  console.log(JSON.stringify(generatedModels, null, 4))
  return generatedModels;
}

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
export default async function index({ asyncapi, params }) {
  let serviceRPC = [];
  const channelEntries = Object.keys(asyncapi.channels()).length ? Object.entries(asyncapi.channels()) : [];
  serviceRPC = channelEntries.map(([channelName, channel]) => {
    let rpcCallName;
    let requestMessage;
    let responseMessage;
    if(channel.hasPublish()){
      rpcCallName = `Say${pascalCase(channelName)}`;
      requestMessage = pascalCase(channel.publish().bindings().grpc.subscribe.payload["x-parser-schema-id"]);
      responseMessage = pascalCase(channel.publish().message().payload().uid());
    }
    if(channel.hasSubscribe()){
      rpcCallName = `Say${pascalCase(channelName)}`;
      requestMessage = pascalCase(channel.subscribe().message().payload().uid());
      responseMessage = pascalCase(channel.subscribe().bindings().grpc.publish.payload["x-parser-schema-id"]);
    }
    return `rpc ${rpcCallName} (${requestMessage}) returns (${responseMessage}) {}`;
  });
  return (
    <File name="glee.proto">
      {`
syntax = "proto3";
import "google/protobuf/any.proto";

option java_multiple_files = true;
option java_package = "asyncapi.glee";
option java_outer_classname = "GleeRuntimeProto";
option objc_class_prefix = "HLW";

package asyncapi.glee;

// The greeting service definition.
service Glee {
\t${serviceRPC.join('\n\t')}
}

${(await gRPCMessages(asyncapi)).join('')}

`}
    </File>
  );
}
