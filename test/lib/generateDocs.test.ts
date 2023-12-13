import { jest } from '@jest/globals'
jest.unstable_mockModule('../../src/lib/asyncapiFile.js', () => ({
  getAsyncAPIFileContent: jest.fn(),
}))

jest.unstable_mockModule('../../src/lib/logger.js', () => ({
  logInfoMessage: jest.fn(),
  logError: jest.fn()
}))

jest.unstable_mockModule('@asyncapi/generator', () => ({
  default: function () {
    return { generateFromString: jest.fn() }
  }
}));


describe('generateDocs', () => {
  const config = { docs: { enabled: true } }
  it('should not proceed if docs generation is disabled', async () => {
    const { getAsyncAPIFileContent } = await import('../../src/lib/asyncapiFile.js')
    const { generateDocs } = await import('../../src/lib/docs.js')
    const config = { docs: { enabled: false } }
    await generateDocs(config)
    expect(getAsyncAPIFileContent).not.toHaveBeenCalled()
  });

  it('should proceed with docs generation when enabled', async () => {
    const { getAsyncAPIFileContent } = await import('../../src/lib/asyncapiFile.js')
    const { generateDocs } = await import('../../src/lib/docs.js')
    await generateDocs(config)
    expect(getAsyncAPIFileContent).toHaveBeenCalled()
  });

  it('should generate docs successfully', async () => {
    const { getAsyncAPIFileContent } = await import('../../src/lib/asyncapiFile.js')
    const { generateDocs } = await import('../../src/lib/docs.js')
    const { logInfoMessage } = await import('../../src/lib/logger.js')
    await generateDocs(config);

    expect(getAsyncAPIFileContent).toHaveBeenCalled();
    expect(logInfoMessage).toHaveBeenCalledWith('Successfully generated docs');
  });

})
