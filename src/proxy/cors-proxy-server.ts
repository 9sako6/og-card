const PROXY_URL = "https://9sako6-cors-proxy-server.deno.dev";

export const buildUrlWithProxy = (url: string) => `${PROXY_URL}?quest=${url}`;
