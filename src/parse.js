import constructUrl from './constructUrl';
import { getBaseUrl } from './baseUrl';

export function parseQueryString() {
  const { baseUrl = '' } = this;

  const baseUrlIndex = baseUrl.indexOf('?');
  const queryString = baseUrl.substring(baseUrlIndex + 1);
  const queries = queryString.split('&');

  const context = {
    baseUrl: baseUrl.substring(0, baseUrlIndex),
    qMap: {}
  };

  const { qMap } = context;
  queries.forEach(query => {
    const keyValuePair = query.split('=');
    const decodedKey = decodeURIComponent(keyValuePair[0]);
    let decodedValue = convertIfBoolean(decodeURIComponent(keyValuePair[1]));
    qMap[decodedKey] = decodedValue;
  });

  const handles = {
    map: () => qMap,
    get: key => qMap[key],
    add: (key, value) => {
      qMap[decodeURIComponent(key)] = decodeURIComponent(value);
      return handles;
    },
    remove: key => {
      delete qMap[encodeURIComponent(key)];
      return handles;
    },
    changeBaseUrl: newBaseUrl => {
      context.baseUrl = newBaseUrl;
      return handles;
    },
    construct: constructUrl.bind(context)
  };

  return handles;
}

export default function parse(url) {
  if (typeof url !== 'string') {
    throw `Expected url in the string format, but received ${url}`;
  }
  const context = {
    baseUrl: url,
    qMap: {}
  };

  const handles = {
    baseUrl: getBaseUrl.bind(context),
    params: parseQueryString.bind(context)
  };
  return handles;
}

function convertIfBoolean(valueString) {
  if (valueString === 'undefined')
    return true;
  if (valueString === 'null') 
    return null;
    
  if (valueString === 'true' || valueString === 'false') {
    return valueString === 'true';
  }
  return valueString;
}