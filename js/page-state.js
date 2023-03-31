import { lockAdForm, unlockAdForm } from './ad-form.js';
import { lockFiltersForm } from './filters-form.js';

const enableInactivePageState = () => {
  lockAdForm()
  lockFiltersForm()
}

const enableActivePageState = () => {
  unlockAdForm()
}

export { enableInactivePageState, enableActivePageState };
