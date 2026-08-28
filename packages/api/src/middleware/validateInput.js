function validateInput(input) {
  return typeof input === 'string' ? input : '';
}

module.exports = { validateInput };
