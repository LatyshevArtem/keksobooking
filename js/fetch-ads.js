import { renderAds } from './map.js'
import { URLS, get } from './api.js';
import {
  unlockFiltersForm,
  onHousingTypeChange,
  onHousingPriceChange,
  onHousingRoomsChange,
  onHousingGuestsChange,
  onHousingFeaturesChange
} from './filters-form.js';

const onFetchAdsSuccess = ads => {
  unlockFiltersForm();
  renderAds(ads);
  onHousingTypeChange(() => renderAds(ads));
  onHousingPriceChange(() => renderAds(ads));
  onHousingRoomsChange(() => renderAds(ads));
  onHousingGuestsChange(() => renderAds(ads));
  onHousingFeaturesChange(() => renderAds(ads));
}

const onFetchAdsError = error => {
  alert(error);
}

const fetchAds = () => {
  get(onFetchAdsSuccess, onFetchAdsError, URLS.GET_ADS);
}

export { fetchAds };
