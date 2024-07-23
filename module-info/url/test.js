import { URL, format, resolve } from 'url';

// Функция для разбора URL-строки
export function parseUrl(urlString) {
  const myUrl = new URL(urlString);
  return {
    href: myUrl.href,
    protocol: myUrl.protocol,
    hostname: myUrl.hostname,
    port: myUrl.port,
    pathname: myUrl.pathname,
    search: myUrl.search,
    hash: myUrl.hash,
  };
}
// Есть также метод parse(), но он считается устаревшим.

// Функция для извлечения query параметров из URL
export function getQueryParams(urlString) {
  const myUrl = new URL(urlString);
  const params = Object.fromEntries(myUrl.searchParams.entries());
  return params;
}

// Функция для форматирования URL-объекта
export function formatUrl(urlObject) {
  return format(urlObject);
}

// Функция для разрешения URL-адресов
export function resolveUrl(from, to) {
  return resolve(from, to);
}

// Функция для работы с классом URL
export function getUrlDetails(urlString) {
  const myUrl = new URL(urlString);
  return {
    hostname: myUrl.hostname,
    pathname: myUrl.pathname,
    query: myUrl.searchParams.get('query'),
  };
}

