import fs from 'fs'
import path from 'path'
import { findSpecFile } from '../../src/lib/configs.js'

describe('Test resolving the AsyncAPI file path.', () => {
    afterEach(async () => {
        const promises = ['./asyncapi.yaml', './asyncapi.json'].map(async (file) => fs.unlinkSync(path.resolve(file)))
        await Promise.allSettled(promises)
    })

    test('Should throw error if AsyncAPI file doesn\'t exists.', async () => {
        expect(() => findSpecFile("")).toThrowError('AsyncAPI file was not found. you can set its path in config file.')
    })

    test('Should throw error if there are multiple AsyncAPI spec files.', async () => {
        fs.writeFileSync(path.resolve('./asyncapi.json'), '')
        fs.writeFileSync(path.resolve('./asyncapi.yaml'), '')
        expect(() => findSpecFile("")).toThrowError('Multiple AsyncAPI files found. Please make sure to choose one in your config file.')
    })

    test('Should succeed in finding AsyncAPI spec if there is only one.', async () => {
        fs.writeFileSync(path.resolve('./asyncapi.json'), '')
        const resultingPath = findSpecFile('')
        expect(resultingPath).toBe(path.resolve('./asyncapi.json'))
    })
})