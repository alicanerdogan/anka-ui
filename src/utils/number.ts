const _1K = 1000;
const _100K = 100 * _1K;
const _1M = 10 * _100K;
const _10M = 10 * _1M;

export function shortenNumber(n: number): string {
  if (n < _1K) {
    return `${n}`;
  } else if (n < _1M) {
    return `${Math.round(n / _1K)}K`;
  } else if (n < _10M) {
    return `${(n / _1M).toFixed(1)}M`;
  } else {
    return `${Math.round(n / _1M)}M`;
  }
}
