import { createAdCard } from './ad-card.js';
import { setAddress } from './ad-form.js';
import { fetchAds } from './fetch-ads.js';

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

const createMainPinMarker = () => {
  const mainPinIcon = createNewIcon(MAIN_PIN_ICON_URL, MAIN_PIN_ICON_SIZE, MAIN_PIN_ICON_ANCHOR);
  const mainPinMarker = createNewPinMarker(CENTER_TOKYO, mainPinIcon, true);
  mainPinMarker.on('moveend', evt => onMainPinMarkerLocationChange(evt.target.getLatLng()));

  return mainPinMarker
}

const resetMainPinMarker = () => {
  mainPinMarker.setLatLng(CENTER_TOKYO)
}

const addSimilarAdPinMarker = (similarAd) => {
  const similarAdIcon = createNewIcon(SIMILAR_AD_ICON_URL, SIMILAR_AD_ICON_SIZE, SIMILAR_AD_ICON_ANCHOR);
  const similarAdPinMarker = createNewPinMarker(similarAd.location, similarAdIcon, false);
  similarAdPinMarker.addTo(map);
  similarAdPinMarker.bindPopup(createAdCard(similarAd));
}

const mainPinMarker = createMainPinMarker()
const map = L.map(MAP_CANSAV_ID);

const loadMap = () => {
  map.on('load', fetchAds);
  map.setView(CENTER_TOKYO, ZOOM_LEVEL);
  addTileLayer();
  mainPinMarker.addTo(map);
}

export { CENTER_TOKYO, loadMap, addSimilarAdPinMarker, resetMainPinMarker };
