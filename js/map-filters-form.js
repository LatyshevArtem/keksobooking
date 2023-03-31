const mapFiltersForm = document.querySelector('.map__filters');

const MAP_FILTERS_FORM_DISABLED_CLASS_NAME = 'map__filters--disabled';

const resetMapFiltersForm = () => mapFiltersForm.reset();

export { mapFiltersForm, MAP_FILTERS_FORM_DISABLED_CLASS_NAME, resetMapFiltersForm };
