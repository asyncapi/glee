import fs from 'fs'
import path from 'path'
import { findSpecFile } from '../../src/lib/configs.js'

describe('Test resolving the AsyncAPI file path.', () => {
    afterEach(async () => {
        const promises = ['./asyncapi.yaml', './asyncapi.json'].map(async (file) => fs.unlinkSync(path.resolve(file)))
        await Promise.allSettled(promises)
    })

    test('Should return undefined if AsyncAPI file doesn\'t exists.', async () => {
        expect(findSpecFile("")).toBe(undefined)
    })

    test('Should return undefined if there are multiple AsyncAPI spec files.', async () => {
        fs.writeFileSync(path.resolve('./asyncapi.json'), '')
        fs.writeFileSync(path.resolve('./asyncapi.yaml'), '')
        expect(findSpecFile("")).toBe(undefined)
    })

    test('Should succeed in finding AsyncAPI spec if there is only one.', async () => {
        fs.writeFileSync(path.resolve('./asyncapi.json'), '')
        const resultingPath = findSpecFile('')
        expect(resultingPath).toBe(path.resolve('./asyncapi.json'))
    })
})