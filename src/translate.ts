const translateToken = require('@vitalets/google-translate-token');
import axios, {AxiosRequestConfig} from 'axios';
import {arrayStringify} from './util';

function handletranslate(data, extra): Promise<any> {
  return translateToken
    .get(data.join(''), extra)
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