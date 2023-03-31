const FILTERS_FORM_DISABLED_CLASS_NAME = 'map__filters--disabled';

const filtersForm = document.querySelector('.map__filters');

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

export { resetFiltersForm, lockFiltersForm, unlockFiltersForm };
