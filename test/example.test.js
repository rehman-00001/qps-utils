const qps = require('../dist/qps-utils')

describe('Description of a test block', () => {
    it('Specific test case', () => {
        const result = qps.baseUrl('https://test.com')
        expect(typeof(result)).toBe('object')
    })
})