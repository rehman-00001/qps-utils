import constructUrl from '../src/constructUrl';

describe('function constructUrl():', () => {
  let qpsUtil;
  beforeAll(() => {
    qpsUtil = {
      baseUrl: '',
      constructUrl
    };
  });

  test('Should return an empty string', () => {
    expect(qpsUtil.constructUrl()).toBe('');
  });

  test('Should return url for a given object', () => {
    const inputObject = {
      key1: 123,
      key2: 'value2'
    };
    const expectedUrl = 'key1=123&key2=value2';
    expect(qpsUtil.constructUrl(inputObject)).toBe(expectedUrl);
  });

  test('Should construct url for the given baseUrl', () => {
    const inputObject = {
      key1: 123,
      key2: 'value2'
    };
    qpsUtil.baseUrl = 'https://example.com';
    qpsUtil.qMap = inputObject;
    const expectedUrl = 'https://example.com?key1=123&key2=value2';
    expect(qpsUtil.constructUrl(inputObject)).toBe(expectedUrl);
  });
});
