const { normalizeText, detectTone, createSignal, COMMUNITY_NAME } = require('@thewholedonuts/shared');

function analyzeEmotion(input) {
  const text = normalizeText(input);
  const tone = detectTone(text);
  const signal = createSignal(text || 'No signal provided', tone);
  return {
    community: COMMUNITY_NAME,
    signal
  };
}

module.exports = { analyzeEmotion };
