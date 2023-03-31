import { enableInactivePageState } from './page-state.js';
import { loadMap } from './map.js';
import { formInitialization } from './ad-form.js';
import { fetchAds } from './fetch-ads.js';

enableInactivePageState();
loadMap();
formInitialization();
fetchAds()
