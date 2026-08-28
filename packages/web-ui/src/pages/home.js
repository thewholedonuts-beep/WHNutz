const { analyzeEmotion } = require('@thewholedonuts/emotional-intelligence');
const { createWelcomeCard } = require('../components/welcomeCard');

function renderWelcome(input) {
  const analysis = analyzeEmotion(input);
  return {
    analysis,
    card: createWelcomeCard(analysis)
  };
}

module.exports = { renderWelcome };
