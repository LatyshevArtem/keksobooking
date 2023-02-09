const METHODS = {
  GET: 'GET',
  POST: 'POST',
}

const URLS = {
  GET: 'https://23.javascript.pages.academy/keksobooking/data',
  POST: 'https://23.javascript.pages.academy/keksobooking',
}

const request = (onSuccess, onError ,method, url, data) => {
  fetch(url, {
    method,
    body: data,
  })
    .then(response => response.json())
    .then(response => onSuccess(response))
    .catch(error => onError(error));
}

export { METHODS, URLS, request };
