// включить строгий режим

// создать массив из 10 сгенерированных объектов (случайные объявления)

const RANDOM_AD_COUNT = 10;
const RoomType = ['palace', 'flat', 'house', 'bungalow'];
const CheckinTime = ['12:00', '13:00', '14:00'];
const CheckoutTime = ['12:00', '13:00', '14:00'];
const Features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const Photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const OFFER_TITLE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id luctus erat, nec tincidunt purus.';
const OFFER_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a laoreet neque. Aliquam vulputate nec turpis ut pharetra. Integer in justo sagittis, scelerisque lacus sed, aliquet tellus. Pellentesque mauris tellus, egestas sit amet nunc eu, dictum suscipit ligula. Proin aliquet sit amet urna nec facilisis. Donec semper a mi et.';

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0 || max < min) {
    return -1;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomFloat = (min, max, decimalPlaces) => {
  if (min < 0 || max < 0 || max < min || decimalPlaces < 0) {
    return -1;
  }

  let randomValue = Math.random() * (max - min) + min;
  randomValue = Number(randomValue.toFixed(decimalPlaces));

  return randomValue;
}

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = getRandomInteger(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

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
    x: getRandomFloat(minX, maxX, 5),
    y: getRandomFloat(minY, maxY, 5),
  };
}

const getRandomArrayElement = (array) => {
  const randomElementIndex = getRandomInteger(0, array.length - 1);

  return array[randomElementIndex];
}

const getRandomFeatures = () => {
  const randomFeatureCount = getRandomInteger(0, Features.length);

  return shuffleArray(Features).slice(0, randomFeatureCount);
}

const getRandomPhotos = () => {
  const randomPhotoCount = getRandomInteger(0, Photos.length);

  return shuffleArray(Photos).slice(0, randomPhotoCount);
}

const getRandomAds = randomAdsCount => {
  const randomAvatars = getRandomAvatars();
  let randomAds = [];

  for (let i = 0; i < randomAdsCount; i++) {
    const randomLocation = getRandomLocation(35.65000, 35.70000, 139.70000, 139.80000);

    randomAds.push({
      author: {
        avatar: randomAvatars[i],
      },
      offer: {
        title: OFFER_TITLE,
        address: randomLocation.x + ', ' + randomLocation.y,
        price: getRandomInteger(1000, 100000),
        type: RoomType[getRandomInteger(0, RoomType.length - 1)],
        rooms: getRandomInteger(1, 5),
        guests: getRandomInteger(1, 5),
        checkin: getRandomArrayElement(CheckinTime),
        checkout: getRandomArrayElement(CheckoutTime),
        features: getRandomFeatures(),
        description: OFFER_DESCRIPTION,
        photos: getRandomPhotos(),
      },
      location: randomLocation,
    })
  }

  return randomAds;
}

const randomAds = getRandomAds(RANDOM_AD_COUNT);