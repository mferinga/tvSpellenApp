const API_PROTOCOL =
  typeof window !== 'undefined' ? window.location.protocol : 'http:';
const API_HOST =
  typeof window !== 'undefined' ? window.location.hostname : '159.69.146.203';

export const SPELDATA_API_BASE_URL = `${API_PROTOCOL}//${API_HOST}:3333/api`;
export const RECOM_API_BASE_URL = `${API_PROTOCOL}//${API_HOST}:3001/api`;
