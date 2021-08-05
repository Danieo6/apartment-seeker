let proxies;

try {
  proxies = require('../../data/proxy-list.json');
} catch (error) {
  try {
    proxies = JSON.parse(Buffer.from(process.env.PROXY_LIST!, 'base64').toString('ascii'));
  } catch (error) {
    proxies = [];
  }
}

export const proxyList = proxies;