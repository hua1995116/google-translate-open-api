import { parseMultiple } from './util';
export declare type Tld = 'cn' | 'com';
export interface Options {
    tld?: Tld;
    from?: string;
    to: string;
}
declare function translate(value: any, options: Options): Promise<any>;
export { parseMultiple };
export default translate;
