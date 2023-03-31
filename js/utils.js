const KEYS = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

const checkEsc = evt => {
  return evt.key === KEYS.ESC || evt.key === KEYS.ESCAPE;
}

export { checkEsc };
