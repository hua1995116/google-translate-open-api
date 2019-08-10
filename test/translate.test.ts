import { expect } from 'chai';
import translate, { parseMultiple } from '../src/index';

describe('google-translate-open-api', () => {
  it('translate single', async () => {
    const result = await translate(`I'm fine.`, {
      tld: "cn",
      to: "zh-CN",
    });
    const data = result.data[0];
    const compare = '我很好。';
    expect(data).to.equal(compare);
  });
  it('translate single', async () => {
    const result = await translate([`I'm fine.`, `I'm ok.`], {
      tld: "cn",
      to: "zh-CN",
    });
    const data = result.data[0];
    const compare = '[[[["我很好。"]],null,"en"],[[["我可以。"]],null,"en"]]';
    expect(JSON.stringify(data)).to.equal(compare);
  });
  it('translate single', async () => {
    const result = await translate([`I'm fine. And you?`,`I'm ok.`], {
      tld: "cn",
      to: "zh-CN",
    });
    const data = result.data[0];
    const parseData = parseMultiple(data);
    const compare = '["我很好。你呢？","我可以。"]';
    expect(JSON.stringify(parseData)).to.equal(compare);
  });
})
