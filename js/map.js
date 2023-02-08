import { enableActivePageState } from './page-state.js';
import { getRandomAds, RANDOM_AD_COUNT } from './data.js';
import { createAdCard } from './ad-card.js';

const MAP_CANSAV_ID = 'map-canvas';
const CENTER_TOKYO = {
  lat: 35.68950,
  lng: 139.69171,
}
const ZOOM_LEVEL = 10;
const TILE_LAYER = {
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}
const MAIN_PIN_ICON_URL = '../img/main-pin.svg';
const MAIN_PIN_ICON_SIZE = [52, 52];
const MAIN_PIN_ICON_ANCHOR = [26, 52];

const SIMILAR_AD_ICON_URL = '../img/pin.svg';
const SIMILAR_AD_ICON_SIZE = [40, 40];
const SIMILAR_AD_ICON_ANCHOR = [20, 40];

const addTileLayer = () => {
  L.tileLayer(
    TILE_LAYER.url,
    {
      attribution: TILE_LAYER.attribution,
    },
  ).addTo(map);
}

const createNewIcon = (iconUrl, iconSize, iconAnchor) => {
  return L.icon({
    iconUrl,
    iconSize,
    iconAnchor,
  })
}

const createNewPinMarker = (latLng, icon, draggable) => {
  return L.marker(
    latLng,
    {
      icon,
      draggable,
    },
  );
}

const onMainPinMarkerLocationChange = newLocation => setAddress(newLocation);

const addMainPinMarker = () => {
  const mainPinIcon = createNewIcon(MAIN_PIN_ICON_URL, MAIN_PIN_ICON_SIZE, MAIN_PIN_ICON_ANCHOR);
  const mainPinMarker = createNewPinMarker(CENTER_TOKYO, mainPinIcon, true);
  mainPinMarker.on('moveend', evt => onMainPinMarkerLocationChange(evt.target.getLatLng()));
  mainPinMarker.addTo(map);
}

const addSimilarAdPinMarker = (similarAd) => {
  const similarAdIcon = createNewIcon(SIMILAR_AD_ICON_URL, SIMILAR_AD_ICON_SIZE, SIMILAR_AD_ICON_ANCHOR);
  const similarAdPinMarker = createNewPinMarker(similarAd.location, similarAdIcon, false);
  similarAdPinMarker.addTo(map);
  similarAdPinMarker.bindPopup(createAdCard(similarAd));
}

const map = L.map(MAP_CANSAV_ID);

const randomAds = getRandomAds(RANDOM_AD_COUNT);

const loadMap = () => {
  map.on('load', enableActivePageState);
  map.setView(CENTER_TOKYO, ZOOM_LEVEL);
  addTileLayer();
  addMainPinMarker();
  addSimilarAdPinMarker(randomAds[0]);
  addSimilarAdPinMarker(randomAds[1]);
  addSimilarAdPinMarker(randomAds[2]);
}

export { CENTER_TOKYO, loadMap };
