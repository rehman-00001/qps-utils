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
    url += `${delimiter}${encodeURIComponent(key)}=${encodeURIComponent(
      keyValueMap[key]
    )}`;
    delimiter = '&';
  });

  return url;
}
