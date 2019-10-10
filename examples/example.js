const qps = require('../dist/qps-utils');

const url = qps
  .add('sort', 'asc')
  .add('page', 2)
  .add('total', '10')
  .construct();

console.log('Example 1: ' + url);

const url2 = qps
  .add('something', 'yes')
  .add('nothing', 'no')
  .construct();

console.log('Example 2: ' + url2);

//with baseUrl
const url3 = qps
  .baseUrl('http://example.com')
  .add('sort', 'asc')
  .add('page', 2)
  .add('total', '10')
  .construct();

console.log('Example 3: ' + url3);

const url4 = qps
  .baseUrl('http://example.com')
  .add('something', 'yes')
  .add('nothing', 'no')
  .construct();

console.log('Example 4: ' + url4);

const params = {
  'key-1': 'value-1',
  'key-2': 'value-2',
  'key-3': 'value-3'
};

const url5 = qps.construct(params);
console.log('Example 5: ' + url5);

const url6 = qps.baseUrl('https://www.example.com').construct(params);

console.log('Example 6: ' + url6);

const url7 =
  'https://www.example.com?key-1=somevalue&key-2=anothervalue&key3=extravalue';

console.log(
  'Example 7: ' +
    qps
      .parse(url7)
      .params()
      .add('key-5', 'genius')
      .add('key-6', 'value-6')
      .remove('key-1')
      .changeBaseUrl('http://anotherurl.com')
      .construct()
);
