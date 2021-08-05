let links;

try {
  links = require('../../data/observables.json');
} catch (error) {
  try {
    links = JSON.parse(Buffer.from(process.env.OBSERVABLES_LIST!, 'base64').toString('ascii'));
  } catch (error) {
    links = [];
  }
}

export const observables = links;