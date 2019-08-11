import { parseMultiple } from './util';
import { isSupport, getAllLanguage, getAllCode } from './language';
export declare type Tld = 'cn' | 'com';
export interface Options {
    tld?: Tld;
    from?: string;
    to: string;
}
declare function translate(value: string | string[], options: Options): Promise<any>;
export { parseMultiple, isSupport, getAllLanguage, getAllCode };
export default translate;
