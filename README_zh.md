# google-translate-open-api
一个免费无限制的谷歌翻译api（支持单段文本以及多段文本同时翻译） 💵🚫

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

- 多段文本支持
- 自动识别语言
- 拼写纠正
- 语言修正
- 快速可靠 - 它使用和 [translate.google.com](https://translate.google.com/) 相同的服务器
- 免费无限制 (translate.google.com使用令牌来授权请求。 如果你不是Google，则表示你没有此令牌，并且必须每100万字符的文字支付20美元。)

# Install

```shell
npm install --save google-translate-open-api
```

# Why this repo ？

当我有以下一段文本时候 ( 来自 [How Are Function Components Different from Classes?](https://overreacted.io/how-are-function-components-different-from-classes/))

```
Maybe you’ve heard one of them is better for performance. Which one? Many of such benchmarks are flawed so I’d be careful drawing conclusions from them.
```
我并不想将上述的文本一次性翻译，我更喜欢一句一句翻译。尤其是对于一篇文章翻译时，效果可能没有逐段翻译的效果更佳

![1565448193440.jpg](https://s3.qiufengh.com/blog/1565448193440.jpg)

![1565448223736.jpg](https://s3.qiufengh.com/blog/1565448223736.jpg)

当然用现在已经有的库（像 [google-translate-api](https://github.com/matheuss/google-translate-api)），依然能够实现上述的功能，但是在翻译多段文本时候，需要请求api多次，这严重造成请求的浪费与等待漫长的时间。

因此我需要用一个新的 api 来实现上述功能。`google-translate-open-api`就这样诞生了。

# Usage

单段文本
```javascript
import translate from 'google-translate-open-api';
const result = await translate(`I'm fine.`, {
  tld: "cn",
  to: "zh-CN",
});
const data = result.data[0];

// 我很好。
```

多段文本
```javascript
import translate from 'google-translate-open-api';

const result = await translate([`I'm fine.`, `I'm ok.`], {
  tld: "cn",
  to: "zh-CN",
});
const data = result.data[0];
// [[[["我很好。"]],null,"en"],[[["我可以。"]],null,"en"]]
```

> 注意: 多段文本的返回值和单段文本的返回值不同，你需要额外的注意

多段文本中含有多个句子

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

# API

## translate(text, options)

### text

Type: `string`

要翻译的文本

### options

Type: object

**from**
Type: `string` Default: auto

语言来源. 必须是从 src/languages.ts 中的一种，默认为 auto类型。

**to**
Type: `string` Default: en

将要翻译的语言， 必须是从 src/languages.ts 中的一种。

### tld
Type: `string` 'com' | 'cn'

`cn` is for China, `com` for others.


# Related
- [vitalets/google-translate-token](https://github.com/vitalets/google-translate-token)
- [google-translate-api](https://github.com/matheuss/google-translate-api)

# Inspiration

- [google translate](https://chrome.google.com/webstore/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb?hl=zh-CN)

# License

Apache License

Copyright (c) 2019 蓝色的秋风