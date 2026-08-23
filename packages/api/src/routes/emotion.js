const { processEmotionRequest } = require('../services/emotionService');

function emotionRoute(input) {
  return { status: 200, body: processEmotionRequest(input) };
}

module.exports = { emotionRoute };
