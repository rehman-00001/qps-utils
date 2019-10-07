# qps-utils
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

:fire: An elegant way to parse and manipulate query-params in javascript. :fire:<br>

## Installation

`npm install --save qps-utils`
or
`yarn add qps-utils`

## Demo

Try it out here: <br>
<a href="https://codesandbox.io/s/optimistic-cloud-9rc3r?expanddevtools=1&fontsize=14&hidenavigation=1">
<img alt="Edit qps-utils-demo" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

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

_Note: If any existing key present, calling `add()` function updates that existing `key`'s value_

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

# API

##### qpsUtils

An object that exposes these functions:
`add()`, `baseUrl()`, `construct()`, `parse()`

<br>

### 1) Syntax: qpsUtils.add( _string:_ key , _string:_ value )

##### Description

Internally maintains the url by adding the key & value in this format: "key=value" and returns a `handle`.
Subsequent calls to this method appends key & value to the url string.

##### Parameters

_{string}_ key, _{string}_ value - (required)

##### Returns

_{object}_ handle - Exposes two functions `add()`, `construct()`

<br>

### 2) Syntax: qpsUtils.baseUrl( _string:_ url )

##### Description

Sets the baseUrl and returns a `handle`.
Using that handle's `add` method, query parameters can be appended and with `construct` method, the complete url can be obtained.

##### Parameters

_{string}_ : baseUrl - (required) A string that represents the endpoint/baseUrl.

##### Returns

_{object}_ handle - Exposes two functions `add()`, `construct()`

<br>

### 3) Syntax: qpsUtils.construct( _object:_ paramsObj )

##### Description

Constructs the query param url from the given javascript object.

##### Parameters

_{object}_ : paramsObject - (optional) An object with keys & values with which the url is formed.

##### Returns

_{string}_ : url - representing query params.

<br>

#### 4) Syntax: qpsUtils.parse( _string:_ url )

##### Description

Reads the given url and internally constructs a map of its query parameters, if any
available.

##### Parameters

_{string}_ : url - (required) Url with query parameters that needs to be manipulated

##### Returns

_{object}_ : handle - Exposes two functions: `baseUrl()`, `params()`

<br>

#### 5) Syntax: qpsUtils.parse( _string:_ url ).baseUrl()

##### Description

Returns the base URL string in the input that is passed to the `parse()` function.

##### Parameters

None

##### Returns

_{string}_ : baseUrl - substring of the url string from the beginning till the point where '?' is found.

<br>

#### 6) Syntax: qpsUtils.parse( _string:_ url ).params()

##### Description

Returns a `handle` that allows manipulation of the url which was passed to `parse()` function.

##### Parameters

None

##### Returns

_{object}_ : handle - Exposes these functions: `map()`, `get()`, `add()`, `remove()`, `changeBaseUrl()`, `construct()`

<br>

#### 7) Syntax: qpsUtils.parse( _string:_ url ).params().map()

##### Description

Returns an object that represents the query parameters in the url string given to `parse()` function

##### Parameters

None

##### Returns

_{object}_ : queryParams - Javascript object which the keys & values represent the keys & values in the url query parameters

<br>

#### 7) Syntax: qpsUtils.parse( _string:_ url ).params().get( _string:_ key )

##### Description

Returns a string which is the value for the given key as per the input url.

##### Parameters

_{string}_: key - A string that represents the key as query params in the url.

##### Returns

_{string}_ : value - A string that represents the value for the given key in the input url. If key not present, returns the empty string.

<br>

#### 8) Syntax: qpsUtils.parse( _string:_ url ).params().add( _string:_ key , _string:_ value )

##### Description

Adds the new pair of query params to the map maintained internally. If the key was already present, it replaces the old value with the new value passed.

##### Parameters

_{string}_ key, _{string}_ value - (required)

##### Returns

_{object}_ : handle - which exposes the same set of functions like the one returned by `params()` function:
`map()`, `get()`, `add()`, `remove()`, `changeBaseUrl()`, `construct()`

<br>

#### 9) Syntax: qpsUtils.parse( _string:_ url ).params().remove( _string:_ key )

##### Description

Removes the key, value pair from the map maintained internally.

##### Parameters

_{string}_ key, _{string}_ value - (required)

##### Returns

_{object}_ : handle - which exposes the same set of functions like the one returned by `params()`
function
<br>
`map()`, `get()`, `add()`, `remove()`, `changeBaseUrl()`, `construct()`

<br>

#### 10) Syntax: qpsUtils.parse( _string:_ url ).params().changeBaseUrl( _string:_ newUrl )

##### Description

Updates the baseUrl with the new one.

##### Parameters

_{string}_ newUrl - (required)

##### Returns

_{object}_ : handle - which exposes the same set of functions like the one returned by `params()` function:<br>
`map()`, `get()`, `add()`, `remove()`, `changeBaseUrl()`, `construct()`

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/bautistaaa"><img src="https://avatars0.githubusercontent.com/u/3660667?v=4" width="100px;" alt="bautistaaa"/><br /><sub><b>bautistaaa</b></sub></a><br /><a href="#infra-bautistaaa" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/rehman-00001/qps-utils/commits?author=bautistaaa" title="Tests">⚠️</a> <a href="https://github.com/rehman-00001/qps-utils/commits?author=bautistaaa" title="Code">💻</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!