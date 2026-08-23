function createSignal(text, tone) {
  return {
    text,
    tone,
    timestamp: new Date().toISOString()
  };
}

module.exports = { createSignal };
