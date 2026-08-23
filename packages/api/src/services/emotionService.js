const { analyzeEmotion } = require('@thewholedonuts/emotional-intelligence');

function processEmotionRequest(input) {
  return analyzeEmotion(input);
}

module.exports = { processEmotionRequest };
