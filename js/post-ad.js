import { URLS,  post } from './api.js';

const postAd = (onPostAdSuccess, onPostAdError, ad) => {
  post(onPostAdSuccess, onPostAdError, URLS.POST_ADS, ad)
}

export { postAd };
