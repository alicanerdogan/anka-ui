export function parseQueryString(query: string): any {
  return query
    .substring(1)
    .split("&")
    .map(pair => pair.split("="))
    .reduce((map, pair) => ({ ...map, [pair[0]]: pair[1] }), {});
}

export function getQueryString(params: any): string {
  return Object.keys(params)
    .filter(k => params[k] !== null && params[k] !== undefined)
    .map(k => `${k}=${params[k]}`)
    .join("&");
}
