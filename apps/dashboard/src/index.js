const { processEmotionRequest } = require('@thewholedonuts/api');

function renderDashboardInsight(input) {
  return processEmotionRequest(input);
}

module.exports = { renderDashboardInsight };
