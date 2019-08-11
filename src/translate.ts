const translateToken = require('./token');
import axios, { AxiosRequestConfig } from 'axios';
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
  return translateToken
    .get(data.join(''), {
      tld: extra.tld || 'com'
    })
    .then(res => {
      const query = {
        anno: 3,
        client: "webapp",
        format: 'html',
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
      const options: AxiosRequestConfig = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
          "Accept": "application/json, text/plain, */*"
        },
        data: arrayStringify(data),
        url: `https://translate.googleapis.com/translate_a/t`,
        params: query
      };
      return axios(options);
    })
}

export default handletranslate;