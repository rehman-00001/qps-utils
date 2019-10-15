import { isUndefinedOrNull } from './utils';

export default function constructUrl(queryParams) {
  let url = '',
    delimiter = '';

  const keyValueMap = isUndefinedOrNull(queryParams) ? this.qMap : queryParams;

  if (isUndefinedOrNull(keyValueMap)) {
    return '';
  }

  if (typeof this.baseUrl === 'string' && this.baseUrl.length > 0) {
    url += this.baseUrl;

    if (Object.keys(keyValueMap).length > 0) {
      url += '?';
    }
  }

  const keysList = Object.keys(keyValueMap);
  keysList.forEach(key => {
    const encodedKey = encodeURIComponent(key);
    const value = keyValueMap[key];
    if (Array.isArray(value)) {
      value.forEach(valueItem => {
        const encodedValue = encodeURIComponent(valueItem);
        url += `${delimiter}${encodedKey}=${encodedValue}`;
        delimiter = '&';        
      })
    } else {
      const encodedValue = encodeURIComponent(value === '' ? true : value);
      url += `${delimiter}${encodedKey}=${encodedValue}`;
      delimiter = '&';
    }
  });

  return url;
}
