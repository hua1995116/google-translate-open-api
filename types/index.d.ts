import { parseMultiple } from './util';
import { isSupport, getAllLanguage, getAllCode } from './language';
import { AxiosProxyConfig } from 'axios-https-proxy-fix';
export declare type Tld = 'cn' | 'com';
export interface Options {
    tld?: Tld;
    from?: string;
    to: string;
    proxy?: AxiosProxyConfig;
    config?: Object;
    browers?: boolean;
    browersUrl?: string;
    format?: string;
    isUserAgent?: boolean;
    userAgent?: string;
    client?: string;
}
declare function translate(value: string | string[], options: Options): Promise<any>;
export { parseMultiple, isSupport, getAllLanguage, getAllCode };
export default translate;
