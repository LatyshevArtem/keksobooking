const URLS = {
  GET_ADS: 'https://23.javascript.pages.academy/keksobooking/data',
  POST_ADS: 'https://23.javascript.pages.academy/keksobooking',
}

const get = (onSuccess, onError, url) => {
  fetch(url)
    .then(response => response.json())
    .then(response => onSuccess(response))
    .catch(onError)
}

const post = (onSuccess, onError, url, data) => {
  fetch(url, {
    method: 'POST',
    body: data,
  })
    .then(response => response.json())
    .then(response => onSuccess(response))
    .catch(error => onError(error));
}

export { URLS, get, post };
