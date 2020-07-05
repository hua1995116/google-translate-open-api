# google-translate-open-api
A free and unlimited API for Google Translate（support single text and Multi-segment text） 💵🚫

<p align="center">
    <a href="https://travis-ci.org/hua1995116/google-translate-open-api"><img src="https://travis-ci.org/hua1995116/google-translate-open-api.svg?branch=master" /></a>
    <a href="https://codecov.io/gh/hua1995116/google-translate-open-api"><img src="https://codecov.io/gh/hua1995116/google-translate-open-api/branch/master/graph/badge.svg" /></a>
    <a href="https://npmcharts.com/compare/google-translate-open-api?minimal=true" rel="nofollow"><img src="https://img.shields.io/npm/dm/google-translate-open-api.svg" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/google-translate-open-api" rel="nofollow"><img src="https://img.shields.io/npm/v/google-translate-open-api.svg" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/google-translate-open-api" rel="nofollow"><img src="https://img.shields.io/npm/l/google-translate-open-api.svg?style=flat" style="max-width:100%;"></a>
    <a href="https://www.patreon.com/qiufeng"><img src="https://badgen.net/badge/support%20me/donate/ff00ff" alt="Support me"/></a>
</p>

<p align="center">
<a href="./README_zh.md">中文</a>|
<a href="./README.md">English</a>
</p>

# Feature

- Multi-segment text support
- Auto language detection
- Spelling correction
- Language correction
- Fast and reliable – it uses the same servers that [translate.google.com](https://translate.google.com/) uses
- Free and unlimited (translate.google.com uses a token to authorize the requests. If you are not Google, you do not have this token and will have to pay [$20 per 1 million characters of text](https://cloud.google.com/translate/v2/pricing))

# Install

```shell
npm install --save google-translate-open-api
```

# Why this repo ？

when I have the following sentence. ( from [How Are Function Components Different from Classes?](https://overreacted.io/how-are-function-components-different-from-classes/))

```
Maybe you’ve heard one of them is better for performance. Which one? Many of such benchmarks are flawed so I’d be careful drawing conclusions from them.
```
I don't want to translate all the text first and I'd like to translate segment by segment. Especially in an article, the whole translation may not work well.

![1565448193440.jpg](https://s3.qiufengh.com/blog/1565448193440.jpg)

![1565516309452.jpg](https://s3.qiufengh.com/blog/1565516309452.jpg)

In the existing library, if I want to translate multi-segment text, I have to request multiple times.(like [google-translate-api](https://github.com/matheuss/google-translate-api))

So I have to use the new api to implement, so the `google-translate-open-api` is born.

# Usage

Single segment
```javascript
import translate from 'google-translate-open-api';
const result = await translate(`I'm fine.`, {
  tld: "cn",
  to: "zh-CN",
});
const data = result.data[0];

// 我很好。
```

Multi-segment text
```javascript
import translate from 'google-translate-open-api';

const result = await translate([`I'm fine.`, `I'm ok.`], {
  tld: "cn",
  to: "zh-CN",
});
const data = result.data[0];
// [[[["我很好。"]],null,"en"],[[["我可以。"]],null,"en"]]
```

> Note: Multi-segment text result is different from single sentence. You need extra attention.

Multi-segment text contains mylti-sentence.

```javascript
import translate, { parseMultiple } from 'google-translate-open-api';

const result = await translate([`I'm fine. And you?`,`I'm ok.`], {
  tld: "cn",
  to: "zh-CN",
});
// [[[[["<i>I&#39;m fine.</i> <b>我很好。</b> <i>And you?</i> <b>你呢？</b>"]],null,"en"],[[["我可以。"]],null,"en"]]]

// use parseMultiple
const data = result.data[0];
const parseData = parseMultiple(data);
// ["我很好。你呢？","我可以。"]
```

Proxy

proxy-config [https://github.com/axios/axios#request-config](https://github.com/axios/axios#request-config)
```javascript
const result = await translate([`I'm fine. And you?`,`I'm ok.`], {
  tld: "cn",
  to: "zh-CN",
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  }
});
```

Browers

```javascript
const result = await translate([`I'm fine. And you?`,`I'm ok.`], {
  tld: "cn",
  to: "zh-CN",
  browers: true
});

const data = result.data[0];

// 我很好。
```

For commonJS

```javascript
const translate = require('google-translate-open-api').default;
```

# Multi-Terminal Example

https://github.com/hua1995116/google-translate-open-api-demo

# API

## translate(text, options)

### text

Type: `string`

The text to be translated

### options

Type: object

**from？**
Type: `string` Default: auto

The text language. Must be auto or one of the codes/names (not case sensitive) contained in src/languages.ts

**to**
Type: `string` Default: en

The language in which the text should be translated. Must be one of the codes/names (not case sensitive) contained in src/languages.ts.

**tld**
Type: `string` 'com' | 'cn' <Default 'com'>

`cn` is for China, `com` for others.

**proxy**
Type: `AxiosProxyConfig`

proxy for request.

**config**
Type: `object`

config for [axios](https://github.com/axios/axios)

**browers**
Type: `boolean`

support browers via [cors-anywhere](https://github.com/Rob--W/cors-anywhere/) (This is a public service, not necessarily stable)

**browersUrl**
Type: `string`

custom browers proxy url

**format**
Type: `string`  `<text|html>`

When use single translate, default use `text` (but we can set it to `html`) and use batch translate, default and only use `html`.


# Related
- [vitalets/google-translate-token](https://github.com/vitalets/google-translate-token)
- [google-translate-api](https://github.com/matheuss/google-translate-api)
- [translate-md-viewer](https://github.com/hua1995116/translate-md-viewer)

# Inspiration

- [google translate](https://chrome.google.com/webstore/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb?hl=zh-CN)

# License

Apache License

Copyright (c) 2019 蓝色的秋风