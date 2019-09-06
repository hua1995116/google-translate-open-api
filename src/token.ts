import * as rp from 'request-promise-native'

import { userAgent } from './constant'

/**
 * Last update: 2016/06/26
 * https://translate.google.com/translate/releases/twsfe_w_20160620_RC00/r/js/desktop_module_main.js
 *
 * Everything between 'BEGIN' and 'END' was copied from the url above.
 * fork from https://github.com/vitalets/google-translate-token
 * for support brower
 */

/* eslint-disable */
// BEGIN

export function calculateTK(text, tkk) {
    const tkkList = tkk.split('.');
    const tkkFirst = Number(tkkList[0]) || 0;
    const tkkSecond = Number(tkkList[1]) || 0;

    const bytes = Array.prototype.slice.call(Buffer.from(text), 0)

    let tkFirst = tkkFirst;

    for (let i = 0; i < bytes.length; i++) {
        tkFirst += bytes[i];
        tkFirst = encrypt(tkFirst, '+-a^+6');
    }

    tkFirst = encrypt(tkFirst, '+-3^+b+-f');
    tkFirst ^= tkkSecond;

    if (tkFirst < 0) tkFirst = (tkFirst & 2147483647) + 2147483648;

    tkFirst %= 1E6;
    return tkFirst.toString() + '.' + (tkFirst ^ tkkFirst)
}

function encrypt(num, key) {
    for (let i = 0; i < key.length - 2; i += 3) {
        var char = key.charAt(i + 2);

        var cc = char >= 'a'
            ? char.charCodeAt(0) - 87
            : Number(char);

        cc = key.charAt(i + 1) === '+'
            ? num >>> cc
            : num << cc;

        num = key.charAt(i) === '+'
            ? num + cc & 4294967295
            : num ^ cc;
    }
    return num;
}

// END
/* eslint-enable */

let TKK = '.';

async function getTKK(opts) {
    opts = opts || {};

    const now = Math.floor(Date.now() / 3600000);

    if (Number(TKK.split('.')[0]) === now) {
        return TKK;
    } else {
        const reqOpts = {
            method: 'get',
            url: 'https://translate.google.' + (opts.tld || 'com'),
            ...opts.config
        }

        if (opts.proxy) {
            reqOpts.proxy = `http://${opts.proxy.host}:${opts.proxy.port}`
        }

        reqOpts.headers = Object.assign({
            'User-Agent': userAgent,
        }, reqOpts.headers);

        const res = await rp(reqOpts);

        var matches = res.match(/tkk:\s?'(.+?)'/i);

        if (matches) {
            TKK = matches[1];
        }

        if (TKK.length > 1) {
            /**
             * Note: If the regex or the eval fail, there is no need to worry. The server will accept
             * relatively old seeds.
             */

            return TKK
        } else {
            throw new Error('Cannot get TKK.')
        }

    }
}

export async function getTK(text, opts) {
    const tkk = await getTKK(opts);
    return calculateTK(text, tkk);
}