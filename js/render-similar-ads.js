import { RANDOM_AD_COUNT, getRandomAds } from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
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

const renderSimilarAd = similarAd => {
  let newSimilarAdNode = adCardTemplate.cloneNode(true);

  const { author, offer } = similarAd;

  newSimilarAdNode.querySelector('.popup__avatar').src = author.avatar;
  newSimilarAdNode.querySelector('.popup__title').textContent = offer.title;
  newSimilarAdNode.querySelector('.popup__text--address').textContent = offer.adress;
  newSimilarAdNode.querySelector('.popup__text--price').textContent = `${offer.price} \u20bd/ночь`;
  newSimilarAdNode.querySelector('.popup__type').textContent = transateRoomTypeToRussia(offer.type);
  newSimilarAdNode.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  newSimilarAdNode.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  newSimilarAdNode.querySelector('.popup__features').append(...offer.features);
  newSimilarAdNode.querySelector('.popup__description').textContent = offer.description;
  newSimilarAdNode.querySelector('.popup__photos').append(...offer.photos);

  mapCanvas.append(newSimilarAdNode);
}

const randomAds = getRandomAds(RANDOM_AD_COUNT);

renderSimilarAd(randomAds[0]);
