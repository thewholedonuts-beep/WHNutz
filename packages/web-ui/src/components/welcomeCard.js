const { signalCard } = require('@thewholedonuts/shared');

function createWelcomeCard(analysis) {
  return signalCard(analysis.signal);
}

module.exports = { createWelcomeCard };
