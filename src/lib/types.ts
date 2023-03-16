import { TypeScriptGenerator } from '@asyncapi/modelina';
import fs from 'fs'
import path from 'path'
import { logInfoMessage, logError } from './logger.js'

export default async (spec, config, resDir) => {
    logInfoMessage(`Generating types for your parsed specification...`)
    // Create directory to store types based on the idea - /types/`operationId`.d.t.s
    mkDirByPathSync('operations/types')
    
    const channelNames = spec.channelNames()
    channelNames.forEach((channelName) => {
        const channel = spec.channel(channelName)
        if (channel.hasPublish()) {
            const operationId = channel.publish().json('operationId')
            const generator = new TypeScriptGenerator({
                modelType: 'interface',
                constraints: {
                    modelName: ({ modelName }) => {
                        modelName = operationId
                        return modelName
                    }
                }
            })
            channel.publish().messages().map(async message => {
                const { _json: { payload } } = message
                const models = await generator.generate({
                    type: payload.type,
                    additionalProperties: payload.additionalProperties,
                    properties: payload.properties
                })
                // Todo: create files based on the models generated.
            })
        }
    })
}

function mkDirByPathSync(targetDir: string){
    const seperator = path.sep
    const initDir = path.isAbsolute(targetDir) ? seperator : ''
    const baseDir = '.'

    targetDir.split(seperator).reduce((parentDir, childDir) => {
        const currDir = path.resolve(baseDir, parentDir, childDir)
        try {
            fs.mkdirSync(currDir)
        } catch (error) {
            if(error.code === 'EEXIST'){
                console.log(`Directory ${currDir} already exists!`)
                return currDir
            }
            if (error.code === 'ENOENT') { 
                throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
            }

            const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(error.code) > -1;
            if (!caughtErr || caughtErr && currDir === path.resolve(targetDir)) {
                throw error
            }
        }
        return currDir
    }, initDir)
}