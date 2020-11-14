import { expect } from 'chai';
import { isSupport, getCode, getAllLanguage, getAllCode } from '../src/language';

describe('test language', () => {
  it('support', () => {
    expect(isSupport('zh-CN')).to.equal(true);
  });

  it('not support', () => {
    expect(isSupport('javascript')).to.equal(false);
  });

  it('get code full', () => {
    expect(getCode('Korean')).to.equal('ko');

  })
  it('get code simple', () => {
    expect(getCode('zu')).to.equal('zu');
  })
  it('get undefined language', () => {
    expect(getCode('sss')).to.equal(false);
  });
  it('get null language', () => {
    expect(getCode('')).to.equal(false);
  });
  it('getAllLanguage', () => {
    const compare = '["Automatic","Afrikaans","Albanian","Amharic","Arabic","Armenian","Azerbaijani","Basque","Belarusian","Bengali","Bosnian","Bulgarian","Catalan","Cebuano","Chichewa","Chinese Simplified","Chinese Traditional","Corsican","Croatian","Czech","Danish","Dutch","English","Esperanto","Estonian","Filipino","Finnish","French","Frisian","Galician","Georgian","German","Greek","Gujarati","Haitian Creole","Hausa","Hawaiian","Hebrew","Hindi","Hmong","Hungarian","Icelandic","Igbo","Indonesian","Irish","Italian","Japanese","Javanese","Kannada","Kazakh","Khmer","Korean","Kurdish (Kurmanji)","Kyrgyz","Lao","Latin","Latvian","Lithuanian","Luxembourgish","Macedonian","Malagasy","Malay","Malayalam","Maltese","Maori","Marathi","Mongolian","Myanmar (Burmese)","Nepali","Norwegian","Pashto","Persian","Polish","Portuguese","Punjabi","Romanian","Russian","Samoan","Scots Gaelic","Serbian","Sesotho","Shona","Sindhi","Sinhala","Slovak","Slovenian","Somali","Spanish","Sundanese","Swahili","Swedish","Tajik","Tamil","Telugu","Thai","Turkish","Ukrainian","Urdu","Uyghur","Uzbek","Vietnamese","Welsh","Xhosa","Yiddish","Yoruba","Zulu"]';
    expect(JSON.stringify(getAllLanguage())).to.equal(compare);
  })
  it('getAllCode', () => {
    const compare = '["auto","af","sq","am","ar","hy","az","eu","be","bn","bs","bg","ca","ceb","ny","zh-cn","zh-tw","co","hr","cs","da","nl","en","eo","et","tl","fi","fr","fy","gl","ka","de","el","gu","ht","ha","haw","iw","hi","hmn","hu","is","ig","id","ga","it","ja","jw","kn","kk","km","ko","ku","ky","lo","la","lv","lt","lb","mk","mg","ms","ml","mt","mi","mr","mn","my","ne","no","ps","fa","pl","pt","pa","ro","ru","sm","gd","sr","st","sn","sd","si","sk","sl","so","es","su","sw","sv","tg","ta","te","th","tr","uk","ur","ug","uz","vi","cy","xh","yi","yo","zu"]';
    expect(JSON.stringify(getAllCode())).to.equal(compare);
  })
})