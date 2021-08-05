import { Offer } from '../interfaces/offer.interface';

export const otodom = ($: cheerio.Root) => {
  const offers: Offer[] = [];

  $('div[data-cy="frontend.search.listing"] > ul > li').each((index, el) => {
    const container = $(el).find('a');
    const offerUrl = $(container).attr('href');

    if (offerUrl) {
      const title = $(container).find('article h3').attr('title') || 'Title not found'
      const imageUrl = $(container).find('aside img').attr('src') || 'http://via.placeholder.com/1200x800?text=Image%20not%20found';
      const localization = $(container).find('article .css-17o293g').text()?.trim() || 'Not available';
      const price = $(container).find('article .css-lk61n3').text()?.trim() || 'Not available';

      offers.push({
        title,
        url: 'https://www.otodom.pl' + offerUrl,
        imageUrl,
        localization,
        price,
      });
    } 
  });

  return offers;
};