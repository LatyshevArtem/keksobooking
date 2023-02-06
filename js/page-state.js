import { adForm, AD_FORM_DISABLED_CLASS_NAME } from './ad-form.js';
import { mapFiltersForm, MAP_FILTERS_FORM_DISABLED_CLASS_NAME } from './map-filters-form.js';

const enableInactivePageState = () => {
  adForm.classList.toggle(AD_FORM_DISABLED_CLASS_NAME);
  for (let element of adForm.children) {
    element.disabled = true;
  }

  mapFiltersForm.classList.toggle(MAP_FILTERS_FORM_DISABLED_CLASS_NAME);
  for (let element of mapFiltersForm.children) {
    element.disabled = true;
  }
}

export { enableInactivePageState };
