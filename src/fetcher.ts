import Axios, { AxiosRequestConfig } from 'axios';
import * as Tunnel from 'tunnel';
import Cheerio from 'cheerio';
import { getRandomElement } from './util/array-random';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import * as Tough from 'tough-cookie';

import { Config } from './config';

import { otodom } from './drivers/otodom';
import { olx } from './drivers/olx';
import { Offer } from './interfaces/offer.interface';

export class Fetcher {
  private drivers: Record<string, Function>;  

  constructor () {
    this.drivers = {
      otodom,
      olx,
    };

    axiosCookieJarSupport(Axios);
  }

  async fetchObservables(): Promise<Offer[]> {
    const offers: Offer[] = [];

    for (let i = 0; i < Config.observables.length; ++i) {
      offers.push(...(await this.fetchOffers(Config.observables[i])));
    }

    return offers;
  }

  async fetchOffers(offerUrl: string): Promise<Offer[]> {
    const url = new URL(offerUrl);
    const config: AxiosRequestConfig = {
      headers: {
        ...Config.headers,
        'user-agent': getRandomElement(Config.userAgents),
      },
    };

    const proxy = getRandomElement(Config.proxyList);
    if (proxy) {
      console.info('Running with proxy');
      const httpsAgent = Tunnel.httpsOverHttp({
        proxy,
      });

      config.httpAgent = httpsAgent;
    }

    const cookieJar = new Tough.CookieJar();
    config.jar = cookieJar;

    const { data } = await Axios.get(url.href, config);

    const root = Cheerio.load(data);
    const driver = this.drivers[url.hostname.split('.')[1]];

    return driver(root);
  }
}