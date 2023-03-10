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

const getRandomArrayElement = (array) => {
  const randomElementIndex = getRandomInteger(0, array.length - 1);

  return array[randomElementIndex];
}

export { getRandomInteger, getRandomFloat, shuffleArray, getRandomArrayElement };
