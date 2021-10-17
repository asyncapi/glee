import fs from 'fs';
import path from 'path';
import { resolveAsnycApiPath } from '../../src/lib/configs.js';

describe('Test resolving the AsyncApi file path', () => {
    afterEach(async () => {
        const promises = ['asyncapi.yaml', 'asyncapi.yml', 'asyncapi.json'].map(async (file) => fs.unlinkSync(path.resolve(__dirname, file)))
        await Promise.allSettled(promises)
    })

    test('Should throw error if no asyncapi file exists', async () => {
        await expect(resolveAsnycApiPath(__dirname)).rejects.toThrow('AsyncApi file was not found or is not readable')
    })

    test('Should throw error if two asyncapi files are existing', async () => {
        fs.writeFileSync(path.resolve(__dirname, './asyncapi.json'), '')
        fs.writeFileSync(path.resolve(__dirname, './asyncapi.yaml'), '')
        await expect(resolveAsnycApiPath(__dirname)).rejects.toThrow('Multiple AsyncApi files were found - please remove all but one')
    })

    test('Should throw error if two asyncapi files are existing', async () => {
        fs.writeFileSync(path.resolve(__dirname, './asyncapi.json'), '')
        const resultingPath = await resolveAsnycApiPath(__dirname)
        expect(resultingPath).toBe(path.resolve(__dirname, './asyncapi.json'))
    })
})