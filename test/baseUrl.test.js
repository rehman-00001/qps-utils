import baseUrl, { getBaseUrl } from '../src/baseUrl';

describe('function baseUrl(): ', () => {
  test('Should expose the methods "add" & "construct"', () => {
    const expectedUrl = 'https://www.example.com';
    const object = baseUrl(expectedUrl);
    expect(object).toHaveProperty('add');
    expect(object).toHaveProperty('construct');
  });

  test('construct url with specified baseUrl', () => {
    const expectedUrl = 'https://www.example.com';
    const resultUrl = baseUrl(expectedUrl).construct();
    expect(resultUrl).toBe(expectedUrl);
  });

  test('construct url with specified baseUrl and added keys', () => {
    const testBaseUrl = 'https://www.example.com';
    const expectedUrl = 'https://www.example.com?key-1=value-1';
    const resultUrl = baseUrl(testBaseUrl)
      .add('key-1', 'value-1')
      .construct();
    expect(resultUrl).toBe(expectedUrl);
  });

  test('baseUrl().add() should expose methods: "add" & "construct"', () => {
    const testBaseUrl = 'https://www.example.com';
    const object = baseUrl(testBaseUrl).add('key-1', 'value-1');
    expect(object).toHaveProperty('add');
    expect(object).toHaveProperty('construct');
  });
});

describe('function getBaseUrl(): ', () => {
  test('Should extract baseUrl from the given link which has url params', () => {
    const inputUrl = 'https://www.example.com?key-1=value-1';
    const expectedBaseUrl = 'https://www.example.com';
    const qpsUtil = {
      baseUrl: inputUrl,
      getBaseUrl
    };
    expect(qpsUtil.getBaseUrl(inputUrl)).toBe(expectedBaseUrl);
  });

  test('Should extract baseUrl from the given link which do not have url params', () => {
    const inputUrl = 'https://www.example.com';
    const expectedBaseUrl = 'https://www.example.com';
    const qpsUtil = {
      baseUrl: inputUrl,
      getBaseUrl
    };
    expect(qpsUtil.getBaseUrl(inputUrl)).toBe(expectedBaseUrl);
  });
});
