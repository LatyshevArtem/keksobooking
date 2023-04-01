import { createAdCard } from './ad-card.js';
import { setAddress } from './ad-form.js';
import { fetchAds } from './fetch-ads.js';
import { enableActivePageState } from './page-state.js';

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
const ADS_COUNT = 10;

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

const clearMap = () => {
  adsMarkers.forEach(adMarker => {
    adMarker.closePopup();
    adMarker.unbindPopup();
    adMarker.remove();
  })
}

const renderAds = ads => {
  const getSelectedHousingFeatures = housingFeaturesElement => {
    return Array.from(housingFeaturesElement.childNodes)
      .filter(childNode => childNode.checked)
      .map(childNode => childNode.value);
  }

  const checkIsValidHousingType = (selectedHousingType, adHousingType) => {
    return selectedHousingType === adHousingType || selectedHousingType === 'any';
  }

  const checkIsValidHousingPrice = (selectedHousingPrice, adHousingPrice) => {
    let isValidPrice = false;
    if (selectedHousingPrice === 'any') {
      isValidPrice = true;
    } else if (selectedHousingPrice === 'middle' && adHousingPrice >= 10000 && adHousingPrice <= 50000) {
      isValidPrice = true;
    } else if (selectedHousingPrice === 'low' && adHousingPrice <= 10000) {
      isValidPrice = true;
    } else if (selectedHousingPrice === 'high' && adHousingPrice >= 50000) {
      isValidPrice = true;
    }

    return isValidPrice;
  }

  const checkIsValidHousingRooms = (selectedHousingRooms, adHousingRooms) => {
    let isValideHousingRooms = false;
    if (selectedHousingRooms === 'any') {
      isValideHousingRooms = true;
    } else if (parseInt(selectedHousingRooms) === adHousingRooms) {
      isValideHousingRooms = true;
    }

    return isValideHousingRooms;
  }

  const checkIsValidHousingGuests = (selectedHousingGuests, adHousingGuests) => {
    let isValideHousingGuests = false;
    if (selectedHousingGuests === 'any') {
      isValideHousingGuests = true;
    } else if (parseInt(selectedHousingGuests) === adHousingGuests) {
      isValideHousingGuests = true;
    }

    return isValideHousingGuests;
  }

  const checkIsValidHousingFeatures = (selectedHousingFeatures, adHousingFeatures) => {
    return selectedHousingFeatures.every(selectedHousingFeature => {
      return adHousingFeatures.includes(selectedHousingFeature);
    })
  }

  const housingTypeElement = document.querySelector('#housing-type');
  const housingPriceElement = document.querySelector('#housing-price');
  const housingRoomsElement = document.querySelector('#housing-rooms');
  const housingGuestsElement = document.querySelector('#housing-guests');
  const housingFeaturesElement = document.querySelector('#housing-features');

  const selectedHousingType = housingTypeElement.options[housingTypeElement.selectedIndex].value;
  const selectedHousingPrice = housingPriceElement.options[housingPriceElement.selectedIndex].value;
  const selectedHousingRooms = housingRoomsElement.options[housingRoomsElement.selectedIndex].value;
  const selectedHousingGuests = housingGuestsElement.options[housingGuestsElement.selectedIndex].value;
  const selectedHousingFeatures = getSelectedHousingFeatures(housingFeaturesElement);

  clearMap();
  ads
    .filter(ad => {
      const { offer } = ad;
      return checkIsValidHousingType(selectedHousingType, offer.type) &&
        checkIsValidHousingPrice(selectedHousingPrice, offer.price) &&
        checkIsValidHousingRooms(selectedHousingRooms, offer.rooms) &&
        checkIsValidHousingGuests(selectedHousingGuests, offer.guests) &&
        checkIsValidHousingFeatures(selectedHousingFeatures, offer.features || []);
    })
    .slice(0, ADS_COUNT)
    .forEach(ad => {
      const adIcon = createNewIcon(SIMILAR_AD_ICON_URL, SIMILAR_AD_ICON_SIZE, SIMILAR_AD_ICON_ANCHOR);
      const adPinMarker = createNewPinMarker(ad.location, adIcon, false);
      adPinMarker.addTo(map);
      adPinMarker.bindPopup(createAdCard(ad));
      adsMarkers.push(adPinMarker);
    });
}

const adsMarkers = [];
const mainPinMarker = createMainPinMarker()
const map = L.map(MAP_CANSAV_ID);

const loadMap = () => {
  map.on('load', () => {
    fetchAds();
    enableActivePageState();
  });
  map.setView(CENTER_TOKYO, ZOOM_LEVEL);
  addTileLayer();
  mainPinMarker.addTo(map);
}

export { CENTER_TOKYO, loadMap, resetMainPinMarker, renderAds };
