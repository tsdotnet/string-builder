<a href="https://tsdotnet.github.io/string-builder/"><img src="https://cdn.jsdelivr.net/gh/tsdotnet/string-builder@master/assets/banner.svg" alt="@tsdotnet/string-builder: Build text piece by piece. Append now, join once."></a>

[![npm version](https://img.shields.io/npm/v/@tsdotnet/string-builder.svg?style=flat-square)](https://www.npmjs.com/package/@tsdotnet/string-builder)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/tsdotnet/string-builder/blob/master/LICENSE)

`StringBuilder` collects pieces of text and joins them into one string at the end, like .NET's `StringBuilder`.

## Install

```sh
npm install @tsdotnet/string-builder
```

## Usage

```ts
import StringBuilder from '@tsdotnet/string-builder';

const sb = new StringBuilder('Hello');
sb.append(', ', 'world').appendLine('!');
sb.toString(); // "Hello, world!\n"
```

`join(delimiter)` joins the parts with a separator, and `clear()` empties the builder for reuse.

## Use it from

ESM (`import StringBuilder from '@tsdotnet/string-builder';`) or CommonJS (`const StringBuilder = require('@tsdotnet/string-builder').default;`).

<details><summary>In a browser, without a bundler</summary>

```html
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/string-builder@1/dist/umd/string-builder.min.js"></script>
<script>
  const StringBuilder = tsdotnet.stringBuilder.default;
</script>
```

</details>

## Docs

[tsdotnet.github.io/string-builder](https://tsdotnet.github.io/string-builder/)
