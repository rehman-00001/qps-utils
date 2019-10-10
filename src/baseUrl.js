import constructUrl from './constructUrl';

export function getBaseUrl() {
  const url = this.baseUrl;
  const baseUrlIndex = url.indexOf('?');
  if (baseUrlIndex < 0) {
    return url;
  }
  return url.substring(0, baseUrlIndex);
}

export default function baseUrl(baseUrlString) {
  let context = {
    baseUrl: baseUrlString,
    qMap: {}
  };

  const handles = {
    add: (key, value) => {
      context.qMap[key] = value;
      return handles;
    },
    construct: constructUrl.bind(context)
  };

  return handles;
}
