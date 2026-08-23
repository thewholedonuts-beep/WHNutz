const { processEmotionRequest } = require('@thewholedonuts/api');

function runCli(input) {
  return processEmotionRequest(input);
}

module.exports = { runCli };
