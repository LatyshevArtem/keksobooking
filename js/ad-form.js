const adForm = document.querySelector('.ad-form');
const selectType = document.querySelector('#type');
const inputPrice = document.querySelector('#price');
const selectTimein = document.querySelector('#timein');
const selectTimeout = document.querySelector('#timeout');

const MIN_PRICE_BY_TYPE = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
}

const AD_FORM_DISABLED_CLASS_NAME = 'ad-form--disabled';

selectType.addEventListener('change', () => {
  const optionSelectedIndex = selectType.selectedIndex;
  const optionSelectedValue = selectType.options[optionSelectedIndex].value;
  const minPrice = MIN_PRICE_BY_TYPE[optionSelectedValue];

  inputPrice.setAttribute('min', minPrice);
  inputPrice.setAttribute('placeholder', minPrice);
})

selectTimein.addEventListener('change', () => {
  selectTimeout.selectedIndex = selectTimein.selectedIndex;
})

selectTimeout.addEventListener('change', () => {
  selectTimein.selectedIndex = selectTimeout.selectedIndex;
})

export { adForm, AD_FORM_DISABLED_CLASS_NAME };
