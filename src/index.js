let arrayFormat = 'duplicateKeys';

function isUndefinedOrNull(object) {
  return object === null || object === undefined;
}

function constructUrl(queryParams) {
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
    const values = keyValueMap[key];
    if (Array.isArray(values)) {
      url += constructArrayOfValues(delimiter, key, values);
    } else {
      url += `${delimiter}${encodeURIComponent(key)}=${encodeURIComponent(
        values
      )}`;
    }
    delimiter = '&';
  });

  return url;
}

function constructArrayOfValues(delimiter, key, values) {
  let url = '';
  const encodedKey = encodeURIComponent(key);
  switch (arrayFormat) {
    case 'squareBrackets':
      values.forEach(value => {
        const encodedVal = encodeURIComponent(value);
        url += `${delimiter}${encodedKey}[]=${encodedVal}`;
        delimiter = '&';
      });
      return url;
    case 'index':
      values.forEach((value, index) => {
        const encodedVal = encodeURIComponent(value);
        url += `${delimiter}${encodedKey}[${index}]=${encodedVal}`;
        delimiter = '&';
      });
      return url;
    case 'comma':
      url += `${encodedKey}=${values.join(',')}`;
      return url;
    case 'duplicateKeys':
    default:
      values.forEach(value => {
        const encodedVal = encodeURIComponent(value);
        url += `${delimiter}${encodedKey}=${encodedVal}`;
        delimiter = '&';
      });
      return url;
  }
}

function add(key, value) {
  let context = {
    qMap: {
      [key]: value
    }
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

function baseUrl(baseUrlString) {
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

function parse(url) {
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

function getBaseUrl() {
  const url = this.baseUrl;
  const baseUrlIndex = url.indexOf('?');
  if (baseUrlIndex < 0) {
    return url;
  }
  return url.substring(0, baseUrlIndex);
}

function parseQueryString() {
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
    qMap[decodeURIComponent(keyValuePair[0])] = decodeURIComponent(
      keyValuePair[1]
    );
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

function useArrayFormat(format) {
  arrayFormat = format;
  return this;
}

export {
  arrayFormat,
  add,
  parse,
  baseUrl,
  constructUrl as construct,
  useArrayFormat
};
