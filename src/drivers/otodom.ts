import { Offer } from '../interfaces/offer.interface';

export const otodom = ($: cheerio.Root) => {
  const offers: Offer[] = [];

    $('div[data-cy="search.listing"] > ul > li').each((index, el) => {
    const container = $(el).find('a');
    const offerUrl = $(container).attr('href');
    if (offerUrl) {
      const title = $(container).find('article div h3').text()?.trim() || 'Title not found'
      const imageUrl = $(container).find('aside picture source').attr('srcset') || 'http://via.placeholder.com/1200x800?text=Image%20not%20found';
      const localization = $(container).find('article p span[class="css-17o293g es62z2j9"]').text()?.trim() || 'Not available';
      const price = $(container).find('article div span').first().text() || 'Not available';

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