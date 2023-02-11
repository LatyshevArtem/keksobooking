import { CENTER_TOKYO } from './map.js';

const adForm = document.querySelector('.ad-form');
const selectType = document.querySelector('#type');
const inputPrice = document.querySelector('#price');
const selectTimein = document.querySelector('#timein');
const selectTimeout = document.querySelector('#timeout');
const address = document.querySelector('#address');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

const MIN_PRICE_BY_TYPE = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
}

const CAPACITY_BY_ROOM_NUMBER = {
  '1': ['для 1 гостя'],
  '2': ['для 2 гостей', 'для 1 гостя'],
  '3': ['для 3 гостей','для 2 гостей', 'для 1 гостя'],
  '100': ['не для гостей'],
}

const ROOM_NUMBER_BY_CAPACITY = {
  '1': ['3 комнаты', '2 комнаты', '1 комната'],
  '2': ['3 комнаты', '2 комнаты'],
  '3': ['3 комнаты'],
  '0': ['100 комнат'],
}

const ROOM_NUMBER_WITHOUT_GUESTS = 100;

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

const roomNumberCorrespondsCapacity = (currentRoomNumber, currentCapacity) => {
  let isCorresponds = false;
  if (currentRoomNumber === ROOM_NUMBER_WITHOUT_GUESTS && currentCapacity === 0) {
    isCorresponds = true;
  }
  if (currentRoomNumber >= currentCapacity &&
      currentCapacity !== 0 && currentRoomNumber !== ROOM_NUMBER_WITHOUT_GUESTS) {
    isCorresponds = true;
  }

  return isCorresponds;
}

adForm.addEventListener('change', evt => {
  if (evt.target === capacity || evt.target === roomNumber) {
    const currentRoomNumber = parseInt(roomNumber.options[roomNumber.selectedIndex].value);
    const currentCapacity = parseInt(capacity.options[capacity.selectedIndex].value);

    if (!roomNumberCorrespondsCapacity(currentRoomNumber, currentCapacity)) {
      if (evt.target === capacity) {
        const availableCapacity = CAPACITY_BY_ROOM_NUMBER[currentRoomNumber].join(', ');
        const errorMessage = `Для выбранного числа комнат доступны варианты: ${availableCapacity}`;
        capacity.setCustomValidity(errorMessage);
      } else {
        const availableRoomNumber = ROOM_NUMBER_BY_CAPACITY[currentCapacity].join(', ');
        const errorMessage = `Для выбранного числа гостей доступны варианты: ${availableRoomNumber}`;
        roomNumber.setCustomValidity(errorMessage);
      }
    } else {
      roomNumber.setCustomValidity('');
      capacity.setCustomValidity('');
    }
    evt.target.reportValidity();
  }
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

export { adForm, AD_FORM_DISABLED_CLASS_NAME, setAddress, formInitialization };
