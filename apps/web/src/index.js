const { renderWelcome } = require('@thewholedonuts/web-ui');

function renderAppHome(input) {
  return renderWelcome(input);
}

module.exports = { renderAppHome };
