import { Offer } from '../interfaces/offer.interface';

export const olx = ($: cheerio.Root) => {
  const offers: Offer[] = [];

  $('.offer').each((index, el) => {
    const url = $(el).find('.photo-cell a').attr('href');

    if (url) {
      const title = $(el).find('.title-cell strong').text()?.trim() || 'Title not found';
      const imageUrl = $(el).find('.photo-cell img').attr('src') || 'http://via.placeholder.com/1200x800?text=Image%20not%20found';
      const price = $(el).find('.price').text()?.trim() || 'Not available';
      const localization = $(el).find('.bottom-cell .breadcrumb:nth-child(1)').text()?.trim() || 'Not available';

      offers.push({
        title,
        url,
        imageUrl,
        localization,
        price,
      });
    }
  });

  return offers;
};
