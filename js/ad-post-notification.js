import { checkEsc } from './utils.js';

const closeAdPostSuccessNotification = evt => {
  if (evt.type === 'click' || checkEsc(evt)) {
    document.querySelector('.success').remove();
    document.removeEventListener('click', closeAdPostSuccessNotification);
    document.removeEventListener('keydown', closeAdPostSuccessNotification);
  }
}

const showAdPostSuccessNotification = () => {
  const successNotificationTemplate = document.querySelector('#success').content;
  const successNotification = successNotificationTemplate.cloneNode(true).querySelector('.success');
  const htmlBodyElement = document.querySelector('body');
  htmlBodyElement.append(successNotification);

  document.addEventListener('click', closeAdPostSuccessNotification);
  document.addEventListener('keydown', closeAdPostSuccessNotification);
}

const closeAdPostErrorNotification = evt => {
  if (evt.type === 'click' || checkEsc(evt)) {
    document.querySelector('.error').remove();
    document.removeEventListener('click', closeAdPostSuccessNotification);
    document.removeEventListener('keydown', closeAdPostSuccessNotification);
  }
}

const showAdPostErrorNotification = () => {
  const errorNotificationTemplate = document.querySelector('#error').content;
  const errorNotification = errorNotificationTemplate.cloneNode(true).querySelector('.error');
  const htmlBodyElement = document.querySelector('body');
  htmlBodyElement.append(errorNotification);

  document.addEventListener('click', closeAdPostErrorNotification);
  document.addEventListener('keydown', closeAdPostErrorNotification);
}

export { showAdPostSuccessNotification, showAdPostErrorNotification };
