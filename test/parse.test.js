import parse, { parseQueryString } from '../src/parse';

describe('function parse():', () => {
  test('Should expose methods: "baseUrl" & "params"', () => {
    expect(parse('')).toHaveProperty('baseUrl');
    expect(parse('')).toHaveProperty('params');
  });

  test('Should throw exception for not passing incorrect input type', () => {
    expect(() => parse(34)).toThrow();
  });
});

describe('function parseQueryString(): ', () => {
  let qpsUtil;
  beforeAll(() => {
    qpsUtil = { parseQueryString };
  });

  test('Should expose respective methods', () => {
    const handle = qpsUtil.parseQueryString();
    expect(handle).toHaveProperty('map');
    expect(handle).toHaveProperty('get');
    expect(handle).toHaveProperty('add');
    expect(handle).toHaveProperty('remove');
    expect(handle).toHaveProperty('changeBaseUrl');
    expect(handle).toHaveProperty('construct');
  });

  test('Should return baseUrl from the given link', () => {
    const inputUrl = 'https://www.example.com?key-1=123&key-2=value-2';
    const resultBaseUrl = parse(inputUrl).baseUrl();
    const expectedBaseUrl = 'https://www.example.com';
    expect(resultBaseUrl).toBe(expectedBaseUrl);
  });

  test('Should return map of params from the given link', () => {
    const inputUrl = 'https://www.example.com?key-1=123&key-2=value-2';
    const resultMap = parse(inputUrl)
      .params()
      .map();
    const expectedMap = {
      'key-1': '123',
      'key-2': 'value-2'
    };
    expect(resultMap).toEqual(expectedMap);
  });

  test('Should add a new key to the given link', () => {
    const inputUrl = 'https://www.example.com?key-1=123&key-2=value-2';
    const resultUrl = parse(inputUrl)
      .params()
      .add('key-3', 'value-3')
      .construct();
    const expectedUrl =
      'https://www.example.com?key-1=123&key-2=value-2&key-3=value-3';
    expect(resultUrl).toBe(expectedUrl);
  });

  test('Should remove existing keys from given link', () => {
    const inputUrl = 'https://www.example.com?key-1=123&key-2=value-2';
    const resultUrl = parse(inputUrl)
      .params()
      .add('key-3', 'value-3')
      .remove('key-1')
      .construct();
    const expectedUrl = 'https://www.example.com?key-2=value-2&key-3=value-3';
    expect(resultUrl).toBe(expectedUrl);
  });

  test('Should ignore remove() on non-existing key in link', () => {
    const inputUrl = 'https://www.example.com?key-1=123&key-2=value-2';
    const resultUrl = parse(inputUrl)
      .params()
      .add('key-3', 'value-3')
      .remove('key-5')
      .construct();
    const expectedUrl =
      'https://www.example.com?key-1=123&key-2=value-2&key-3=value-3';
    expect(resultUrl).toBe(expectedUrl);
  });

  test('Should return value for a key in link', () => {
    const inputUrl = 'https://www.example.com?key-1=123&key-2=value-2';
    const resultValue = parse(inputUrl)
      .params()
      .get('key-2');
    const expectedValue = 'value-2';
    expect(resultValue).toBe(expectedValue);
  });

  test('Should return value for a key in link', () => {
    const inputUrl = 'https://www.example.com?key-1=123&key-2=value-2';
    const resultValue = parse(inputUrl)
      .params()
      .get('key-2');
    const expectedValue = 'value-2';
    expect(resultValue).toBe(expectedValue);
  });

  test('Should update the baseUrl in link', () => {
    const inputUrl = 'https://www.example.com?key-1=123&key-2=value-2';
    const resultValue = parse(inputUrl)
      .params()
      .changeBaseUrl('https://www.something.com')
      .construct();
    const expectedValue = 'https://www.something.com?key-1=123&key-2=value-2';
    expect(resultValue).toBe(expectedValue);
  });
});
