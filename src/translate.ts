const translateToken = require('./token');
import axios, { AxiosRequestConfig } from 'axios-https-proxy-fix';
import { arrayStringify } from './util';
import { Options } from './index';
import { isSupport, getCode } from './language';

function handletranslate(data: string[], extra: Options): Promise<any> {
  let e: any;
  if(extra.from) {
    if(!isSupport(extra.from)) {
      e = new Error();
      e.language = extra.from;
    }
  }
  if(!isSupport(extra.to)) {
    e = new Error();
    e.language = extra.to;
  }
  if (e) {
    e.code = 400;
    e.message = 'The language \'' + e.language + '\' is not supported';
    return new Promise(function (_, reject) {
        reject(e);
    });
  }
  const tld = extra.tld || 'com';
  return translateToken
    .get(data.join(''), {
      tld,
      proxy: extra.proxy || false,
    })
    .then(res => {
      const query = {
        anno: 3,
        client: extra.client || "t",
        format: extra.format,
        v: 1.0,
        key: null,
        logld: "vTE_20190506_00",
        sl: extra.from || 'auto',
        tl: extra.to || 'zh-CN',
        hl: 'zh-CN',
        sp: "nmt",
        tc: 2,
        sr: 1,
        tk: res.value,
        mode: 1
      };

      const headers = {
        "content-type": "application/x-www-form-urlencoded",
        "Accept": "application/json, text/plain, */*",
        'X-Requested-With': 'XMLHttpRequest'
      }

      if (typeof extra.isUserAgent === 'undefined' || extra.isUserAgent) {
        headers['User-Agent'] = extra.userAgent ? extra.userAgent : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36';
      }

      const options: AxiosRequestConfig = {
        method: "POST",
        headers,
        data: arrayStringify(data),
        url: '/translate_a/t',
        baseURL: `https://translate.google.${tld}`,
        params: query,
        proxy: extra.proxy || false,
        ...(extra.config)
      };
      let browersUrl = 'https://cors-anywhere.herokuapp.com/';
      if (extra.browersUrl) {
        browersUrl = extra.browersUrl;
      }
      if(extra.browers) {
        options.baseURL = browersUrl + options.baseURL;
      }

      return axios(options);
    })
}

export default handletranslate;