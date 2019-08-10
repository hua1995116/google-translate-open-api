import translateService from './translate';
import { parseMultiple } from './util';

export type Tld = 'cn' | 'com'

export interface Options {
  tld?: Tld;
  from?: string,
  to: string,
}

function translate(value, options: Options): Promise<any> {
  // {tld: "cn"}
  let text = value;
  if(typeof value === 'string') {
    text = [value];
  }

  return translateService(text, options);
}

export {
  parseMultiple
};

export default translate;
