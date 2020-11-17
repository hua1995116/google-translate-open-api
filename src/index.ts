import translateService from './translate';
import { parseMultiple } from './util';
import { isSupport, getAllLanguage, getAllCode } from './language';
import { AxiosProxyConfig } from 'axios-https-proxy-fix';

export type Tld = 'cn' | 'com'

export interface Options {
  tld?: Tld;
  from?: string,
  to: string,
  proxy?: AxiosProxyConfig,
  config?: Object,
  browers?: boolean,
  browersUrl?: string,
  format?: string,
  isUserAgent?: boolean,
  userAgent?: string,
  client?: string
}

function translate(value: string | string[], options: Options): Promise<any> {
  // {tld: "cn"}
  let text: string[];
  if(typeof value === 'string') {
    text = [value];
    !options.format && (options.format = 'text');
  } else {
    text = value;
    !options.format && (options.format = 'html');
  }

  return translateService(text, options);
}

export {
  parseMultiple,
  isSupport,
  getAllLanguage,
  getAllCode
};

export default translate;
