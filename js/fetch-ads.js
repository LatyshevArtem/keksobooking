import { addSimilarAdPinMarker } from './map.js'
import { URLS, get } from './api.js';

const ADS_COUNT = 10;

const onFetchAdsSuccess = ads => {
  ads.slice(0, ADS_COUNT).forEach(ad => addSimilarAdPinMarker(ad));
}

const onFetchAdsError = error => {
  alert(error);
}

const fetchAds = () => {
  get(onFetchAdsSuccess, onFetchAdsError, URLS.GET_ADS)
}

export { fetchAds };
