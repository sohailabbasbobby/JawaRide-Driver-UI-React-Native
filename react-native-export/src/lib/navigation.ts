import { vibrate } from './haptics';

export const openNavigation = (app: 'waze' | 'google' | 'apple', address: string) => {
  vibrate.success();
  
  // URL encode the address
  const query = encodeURIComponent(address);
  let url = '';

  switch (app) {
    case 'waze':
      url = `https://waze.com/ul?q=${query}&navigate=yes`;
      break;
    case 'google':
      url = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
      break;
    case 'apple':
      url = `http://maps.apple.com/?daddr=${query}&dirflg=d`;
      break;
  }
  
  window.open(url, '_blank');
};
