// chatApiUtils.js

export const BASE_URL_PROD = 'https://api.staging.springprod.com'; // or from env

// Chat-related endpoints
export const FETCH_MESSAGE = '/chat/v1/message';
export const FETCH_USERS = '/chat/v1/user/list';

// Build full URL
export const getApiUrl = (url, mainUrl = BASE_URL_PROD) => `${mainUrl}${url}`;

// Convert object to query params string
export const getQueryParams = (object) => {
  if (!object || typeof object !== 'object') return '';
  const params = Object.entries(object)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
  return `?${params}`;
};
