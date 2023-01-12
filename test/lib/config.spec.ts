import fs from 'fs'
import path from 'path'
import { findSpecFile } from '../../src/lib/configs.js'

const yamlPath = path.resolve('./asyncapi.yaml')
const jsonPath = path.resolve('./asyncapi.json')
describe('Tests resolving the AsyncAPI file path.', () => {
    afterEach(async () => {
        const promises = [jsonPath, yamlPath].map(async (file) => fs.unlinkSync(file))
        await Promise.allSettled(promises)
    })

    test('Should return undefined if AsyncAPI file doesn\'t exists.', async () => {
        expect(findSpecFile("")).toBe(undefined)
    })

    test('Should return undefined if there are multiple AsyncAPI spec files.', async () => {
        fs.writeFileSync(jsonPath, '')
        fs.writeFileSync(yamlPath, '')
        expect(findSpecFile("")).toBe(undefined)
    })

    test('Should fails if asyncapi.json is a folder.', async () => {
        fs.mkdirSync(jsonPath)
        expect(findSpecFile("")).toBe(undefined)
        fs.rmdirSync(jsonPath)
    })

    test('Should succeed in finding AsyncAPI spec if there is only one.', async () => {
        fs.writeFileSync(jsonPath, '')
        const resultingPath = findSpecFile('')
        expect(resultingPath).toBe(jsonPath)
    })
})