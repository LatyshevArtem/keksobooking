const FILTERS_FORM_DISABLED_CLASS_NAME = 'map__filters--disabled';

const filtersForm = document.querySelector('.map__filters');
const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingGuestsElement = document.querySelector('#housing-guests');
const housingFeaturesElement = document.querySelector('#housing-features');

const resetFiltersForm = () => filtersForm.reset();

const lockFiltersForm = () => {
  filtersForm.classList.add(FILTERS_FORM_DISABLED_CLASS_NAME);
  for (let element of filtersForm.children) {
    element.disabled = true;
  }
}

const unlockFiltersForm = () => {
  filtersForm.classList.remove(FILTERS_FORM_DISABLED_CLASS_NAME);
  for (let element of filtersForm.children) {
    element.disabled = false
  }
}

const onHousingTypeChange = cb => {
  housingTypeElement.addEventListener('change', cb);
}

const onHousingPriceChange = cb => {
  housingPriceElement.addEventListener('change', cb);
}

const onHousingRoomsChange = cb => {
  housingRoomsElement.addEventListener('change', cb);
}

const onHousingGuestsChange = cb => {
  housingGuestsElement.addEventListener('change', cb);
}

const onHousingFeaturesChange = cb => {
  housingFeaturesElement.addEventListener('change', cb);
}

export {
  resetFiltersForm,
  lockFiltersForm,
  unlockFiltersForm,
  onHousingTypeChange,
  onHousingPriceChange,
  onHousingRoomsChange,
  onHousingGuestsChange,
  onHousingFeaturesChange
};
