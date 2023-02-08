import { CENTER_TOKYO } from "./map.js";

const adForm = document.querySelector('.ad-form');
const selectType = document.querySelector('#type');
const inputPrice = document.querySelector('#price');
const selectTimein = document.querySelector('#timein');
const selectTimeout = document.querySelector('#timeout');
const address = document.querySelector('#address');

const MIN_PRICE_BY_TYPE = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
}

const AD_FORM_DISABLED_CLASS_NAME = 'ad-form--disabled';

const setMinPricePerNight = () => {
  const optionSelectedIndex = selectType.selectedIndex;
  const optionSelectedValue = selectType.options[optionSelectedIndex].value;
  const minPrice = MIN_PRICE_BY_TYPE[optionSelectedValue];

  inputPrice.min = minPrice;
  inputPrice.placeholder = minPrice;
}

selectType.addEventListener('change', setMinPricePerNight);

selectTimein.addEventListener('change', () => {
  selectTimeout.selectedIndex = selectTimein.selectedIndex;
})

selectTimeout.addEventListener('change', () => {
  selectTimein.selectedIndex = selectTimeout.selectedIndex;
})

const setAddress = newAddress => {
  const formatedLat = parseFloat(newAddress.lat).toFixed(5);
  const formatedLng = parseFloat(newAddress.lng).toFixed(5);
  address.value = `${formatedLat}, ${formatedLng}`
}

const formInitialization = () => {
  setAddress(CENTER_TOKYO);
  setMinPricePerNight();
}

export { adForm, AD_FORM_DISABLED_CLASS_NAME, formInitialization };
