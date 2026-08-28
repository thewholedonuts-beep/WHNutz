const { processEmotionRequest } = require('../services/emotionService');
const { validateInput } = require('../middleware/validateInput');

function emotionRoute(input) {
  return { status: 200, body: processEmotionRequest(validateInput(input)) };
}

module.exports = { emotionRoute };
