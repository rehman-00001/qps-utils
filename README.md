# qps-utils
:fire: An elegant way to parse and manipulate query-params in javascript. :fire:<br>

## Installation <br>
`npm install --save qps-utils` <br>
or <br>
`yarn add qps-utils`  <br>
## Usage

```
import qpsUtils from 'qps-utils'; 
```

#### 1) Construct a query param url from an object
```
const params = {
  'id': '341',
  'name': 'john',
  'color': 'purple'
};

const url = qpsUtils.construct(params);

console.log(url); //prints: 'id=341&name=john&color=purple'
```
<br>

#### 2) Construct a complete url from an object by specifying the `baseUrl`

```
const params = {
  'id': '341',
  'name': 'john',
  'color': 'purple'
};

const url = qpsUtils.baseUrl('https://example.com')
                .construct(params);

console.log(url); 
//prints: 'https://example.com?id=341&name=john&color=purple'
```

<br>

#### 3) Construct the query params string dynamically

```
const url = qpsUtils
  .add('mode', 'production')
  .add('version', '1.0.0')
  .construct();

console.log(url); 
//prints: 'mode=production&version=1.0.0'
```

<br>


#### 4) With `baseUrl`:

```
const url = qpsUtils
  .baseUrl('https://www.example.com')
  .add('mode', 'production')
  .add('version', '1')
  .add('public', 'yes')
  .construct();

console.log(url); 
//prints: 'https://www.example.com?mode=production&version=1&public=yes'
```

<br>


#### 5) Parse a valid URL and retrive its query params as a map (javascript object)

```
const url =
  'https://example.com?mode=production&version=1&public=true';

const params = qpsUtils.parse(url)
                .params().map();

console.log(params);
// { 'mode': 'production', 'version': '1', 'public': true }
```

<br>

#### 6) Get an individual value for a given key
```
const url =
  'https://example.com?mode=production&version=1&public=true';

const isPublic = qpsUtils.parse(url)
                .params().get('public');

console.log(isPublic);
// prints: true
```

<br>


#### 7) Add new keys to the url
```
const url =
  'https://example.com?mode=production&version=1&public=true';

const updatedUrl = qpsUtils.parse(url)
                    .params()
                    .add('license', 'MIT')
                    .add('stars', 0)
                    .construct();

console.log(updatedUrl);
// prints: https://example.com?mode=production&version=1&public=true&license=MIT&stars=0
```

*Note: If any existing key present, calling `add()` method updates that existing `key`'s value*

<br>

#### 8) Remove keys from the URL
```
const url =
  'https://example.com?mode=production&version=1&public=true';

const updatedUrl = qpsUtils.parse(url)
                    .params()
                    .add('license', 'MIT')
                    .add('stars', 0)
                    .remove('mode')
                    .remove('version')
                    .construct();

console.log(updatedUrl);
// prints: https://example.com?&public=true&license=MIT&stars=0
```

<br>

#### 9) Update the baseUrl itself
```
const url =
  'https://example.com?mode=production&version=1&public=true';

const updatedUrl = qpsUtils.parse(url)
                    .params()
                    .add('license', 'MIT')
                    .add('stars', 0)
                    .remove('mode')
                    .remove('version')
                    .changeBaseUrl('https://qps-utils.github.io')
                    .construct();

console.log(updatedUrl);
// prints: https://qps-utils.github.io?&public=true&license=MIT&stars=0
```

<br>