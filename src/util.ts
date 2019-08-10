export function arrayStringify(data: string[]): string {
  return data.map(item => `q=${encodeURIComponent(item)}`).join('&');
}

export function parseMultiple(list: Array<any>):Array<any> {
  const translateMap = list.map(item => {
    const text = item[0][0][0];
    if(text.indexOf('<b>') > -1) {
      return rmHtml(text);
    }
    return text;
  });
  return translateMap;
}

function rmHtml(value) {
  return value.match(/<b>(.*?)<\/b>/g).map(item => item.match(/<b>(.*)<\/b>/)[1]).join('');
}