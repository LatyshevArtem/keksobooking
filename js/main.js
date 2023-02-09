import { enableInactivePageState } from './page-state.js';
import { addSimilarAdPinMarker, loadMap } from './map.js';
import { formInitialization } from './ad-form.js';
import { METHODS, URLS, request } from './api.js';

const onGetSimilarAdsSuccess = similarAds => {
  similarAds.forEach(similarAd => addSimilarAdPinMarker(similarAd));
}

const onGetSimilarAdsError = error => {
  alert(error);
}

enableInactivePageState();
loadMap();
request(onGetSimilarAdsSuccess, onGetSimilarAdsError, METHODS.GET, URLS.GET);
formInitialization();
