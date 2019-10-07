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
    keyValueMap[key].forEach(val => {
      url += `${delimiter}${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
      delimiter = '&';
    });
  });

  return url;
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
    const keyValuePair = query.split('=').map(val => {
        return decodeURIComponent(val);
    });
    qMap[keyValuePair[0]] = isUndefinedOrNull(qMap[keyValuePair[0]]) ?
          [ keyValuePair[1] ] :
          [ keyValuePair[1], ...qMap[keyValuePair[0]] ];
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

export { add, parse, baseUrl, constructUrl as construct };
