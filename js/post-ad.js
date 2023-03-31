import { URLS,  post } from './api.js';
import { showAdPostSuccessNotification, showAdPostErrorNotification } from './ad-post-notification.js';

const postAd = ad => {
  post(showAdPostSuccessNotification, showAdPostErrorNotification, URLS.POST_ADS, ad)
}

export { postAd };
