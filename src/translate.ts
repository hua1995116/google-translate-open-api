import { getTK } from './token';
import * as rp from 'request-promise-native'
import { arrayStringify } from './util';
import { Options } from './index';
import { isSupport, getCode } from './language';
import { userAgent } from './constant'

async function handletranslate(data: string[], extra: Options): Promise<any> {
  let e: any;
  if (extra.from) {
    if (!isSupport(extra.from)) {
      e = new Error();
      e.language = extra.from;
    }
  }
  if (!isSupport(extra.to)) {
    e = new Error();
    e.language = extra.to;
  }
  if (e) {
    e.code = 400;
    e.message = 'The language \'' + e.language + '\' is not supported';

    return e;
  }
  const tk = await getTK(data.join(''), {
    tld: extra.tld || 'com',
    proxy: extra.proxy || false,
    config: extra.config
  })

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
    tk: tk,
    mode: 1
  };

  const options: any = {
    method: 'POST',
    headers: {},
    form: arrayStringify(data),
    url: 'https://translate.googleapis.com/translate_a/t',
    qs: query,
    json: true,
    ...(extra.config)
  };

  if (extra.proxy) {
    options.proxy = `http://${extra.proxy.host}:${extra.proxy.port}`
  }

  options.headers = Object.assign({
    "User-Agent": userAgent,
  }, options.headers, {
    'content-type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json, text/plain, */*',
    'X-Requested-With': 'XMLHttpRequest'
  })

  let browersUrl = 'https://cors-anywhere.herokuapp.com/';
  if (extra.browersUrl) {
    browersUrl = extra.browersUrl;
  }
  if (extra.browers) {
    options.baseURL = browersUrl + options.baseURL;
  }

  const res = await rp(options);

  return {
    data: res
  };
}

export default handletranslate;