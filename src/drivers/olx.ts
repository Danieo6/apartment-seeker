import { Offer } from '../interfaces/offer.interface';

export const olx = ($: cheerio.Root) => {
  const offers: Offer[] = [];

    $('div[data-testid="listing-grid"] > div').each((index, el) => {
    const container = $(el).find('div[data-cy="l-card"] a');
    const offerUrl = $(container).attr('href');

    if (offerUrl) {
      const title = $(container).find('div[type="list"] div h6').text()?.trim() || 'Title not found'
      // TODO: Implement proper way to handle img/src for the OLX. 
      // Current approach sometimes resulted into wrong div/img or missing images
      const imageUrl = $(container).find('.css-gl6djm img').attr('srcset')?.split(';')[0] || 'http://via.placeholder.com/1200x800?text=Image%20not%20found';
      const localization = $(container).find('p[data-testid="location-date"]').text()?.split(' - ')[0].trim() || 'Not available';
      const price = $(container).find('p[data-testid="ad-price"]').text()?.trim() || 'Not available';
      // Correct handling of the otodom.pl ads posted on olx.pl
      const fullUrl = /^(http)s?\/\//.test(offerUrl) ? offerUrl : 'https://www.olx.pl' + offerUrl;

      offers.push({
        title,
        url: fullUrl,
        imageUrl,
        localization,
        price,
      });
    }
  });

  return offers;
};
