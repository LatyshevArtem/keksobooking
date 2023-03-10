import { getRandomInteger, getRandomFloat, shuffleArray, getRandomArrayElement } from './utils.js';

const RANDOM_AD_COUNT = 10;
const RoomTypes = ['palace', 'flat', 'house', 'bungalow'];
const CheckinTimes = ['12:00', '13:00', '14:00'];
const CheckoutTimes = ['12:00', '13:00', '14:00'];
const Features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const Photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const OFFER_TITLE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id luctus erat, nec tincidunt purus.';
const OFFER_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a laoreet neque. Aliquam vulputate nec turpis ut pharetra. Integer in justo sagittis, scelerisque lacus sed, aliquet tellus. Pellentesque mauris tellus, egestas sit amet nunc eu, dictum suscipit ligula. Proin aliquet sit amet urna nec facilisis. Donec semper a mi et.';

const getRandomAvatars = () => {
  let avatars = []
  for (let i = 0; i < RANDOM_AD_COUNT; i++) {
    if (i + 1 < 10) {
      avatars.push('img/avatars/user0' + (i + 1) + '.png');
    } else {
      avatars.push('img/avatars/user' + (i + 1) + '.png');
    }
  }

  return shuffleArray(avatars);
}

const getRandomLocation = (minX, maxX, minY, maxY) => {
  return {
    lat: getRandomFloat(minX, maxX, 5),
    lng: getRandomFloat(minY, maxY, 5),
  };
}

const getRandomFeatures = () => {
  const randomFeatureCount = getRandomInteger(0, Features.length);

  return shuffleArray(Features).slice(0, randomFeatureCount);
}

const getRandomPhotos = () => {
  const randomPhotoCount = getRandomInteger(0, Photos.length);

  return shuffleArray(Photos).slice(0, randomPhotoCount);
}

const getRandomAds = randomAdCount => {
  const randomAvatars = getRandomAvatars();
  let randomAds = [];

  for (let i = 0; i < randomAdCount; i++) {
    const randomLocation = getRandomLocation(35.65000, 35.70000, 139.70000, 139.80000);

    randomAds.push({
      author: {
        avatar: randomAvatars[i],
      },
      offer: {
        title: OFFER_TITLE,
        address: randomLocation.lat + ', ' + randomLocation.lng,
        price: getRandomInteger(1000, 100000),
        type: RoomTypes[getRandomInteger(0, RoomTypes.length - 1)],
        rooms: getRandomInteger(1, 5),
        guests: getRandomInteger(1, 5),
        checkin: getRandomArrayElement(CheckinTimes),
        checkout: getRandomArrayElement(CheckoutTimes),
        features: getRandomFeatures(),
        description: OFFER_DESCRIPTION,
        photos: getRandomPhotos(),
      },
      location: randomLocation,
    });
  }

  return randomAds;
}

export { RANDOM_AD_COUNT, getRandomAds };
