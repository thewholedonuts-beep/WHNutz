const { analyzeEmotion } = require('@thewholedonuts/emotional-intelligence');
const { validateInput } = require('../middleware/validateInput');

function processEmotionRequest(input) {
  return analyzeEmotion(validateInput(input));
}

module.exports = { processEmotionRequest };
