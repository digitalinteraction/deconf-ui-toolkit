//
// Utility for generating sponsors
//

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function createSponsors(n) {
  const s = [];
  for (let i = 0; i < n; i++) {
    s.push({
      title: `Corp ${alphabet[i % alphabet.length]}`,
      image: '/openlab.svg',
      href: 'https://openlab.ncl.ac.uk'
    });
  }
  return s;
}
