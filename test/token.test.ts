import { expect } from 'chai';
import { calculateTK, getTK } from '../src/token';

describe('test token', () => {
  it('calculateTK()', () => {
    expect(calculateTK('abc', '435462.2376340196')).to.equal('30550.447056');
    expect(calculateTK('一二三', '435466.2449120182')).to.equal('767985.856827');
  });

  it('getTK()', async () => {
    expect(await getTK('abc', { tld: 'cn' })).length.gt(1)
  });
})