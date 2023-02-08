const adCardTemplate = document.querySelector('#card').content;

const transateRoomTypeToRussia = roomType => {
  switch (roomType) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalow':
      return 'Бунгало';
  }
}

const createFeaturesFragment = features => {
  const featuresFragment = document.createDocumentFragment();
  features.forEach(feature => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', `popup__feature--${feature}`)
    featuresFragment.append(featureElement);
  });

  return featuresFragment;
}

const createPhotosFragment = photos => {
  const photosFragment = document.createDocumentFragment();
  photos.forEach(photo => {
    const photoElement = document.createElement('img');
    photoElement.src = photo;
    photoElement.width = 45;
    photoElement.height = 40;
    photoElement.alt = 'Фотография жилья';
    photosFragment.append(photoElement);
  })

  return photosFragment;
}

const createAdCard = ({ author, offer}) => {
  const newAdCard = adCardTemplate.cloneNode(true).querySelector('.popup');

  newAdCard.querySelector('.popup__avatar').src = author.avatar;
  newAdCard.querySelector('.popup__title').textContent = offer.title;
  newAdCard.querySelector('.popup__text--address').textContent = offer.address;
  newAdCard.querySelector('.popup__text--price').textContent = `${offer.price} \u20bd/ночь`;
  newAdCard.querySelector('.popup__type').textContent = transateRoomTypeToRussia(offer.type);
  newAdCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  newAdCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  newAdCard.querySelector('.popup__description').textContent = offer.description;
  newAdCard.querySelector('.popup__photos').append(...offer.photos);

  const featuresElement = newAdCard.querySelector('.popup__features');
  featuresElement.innerHTML = '';
  if (offer.features) {
    featuresElement.append(createFeaturesFragment(offer.features));
  } else {
    featuresElement.remove();
  }

  const photosElement = newAdCard.querySelector('.popup__photos');
  photosElement.innerHTML = '';
  if (offer.photos) {
    photosElement.append(createPhotosFragment(offer.photos));
  } else {
    photosElement.remove();
  }

  return newAdCard;
}

export { createAdCard };
