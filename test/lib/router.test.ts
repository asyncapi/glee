import 'jest-extended'
import GleeRouter from '../../src/lib/router.js'

describe('router', () => {
  describe('addMiddlewares', () => {
    it('adds middleware with compound', () => {
      const fakeMiddlewareFunction = (message, next) => next()

      const fakeMiddleware = {
        channel: 'channel',
        fn: fakeMiddlewareFunction,
      }

      const router = new GleeRouter()
      router.addMiddlewares([fakeMiddleware], 'category')

      const mws = router.getMiddlewares()
      expect(mws[0].channel).toBe('category/channel')
    })
  })
})
