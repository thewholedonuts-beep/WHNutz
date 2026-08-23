function signalCard(signal) {
  return {
    title: 'Emotional Signal',
    detail: `${signal.tone}: ${signal.text}`
  };
}

module.exports = { signalCard };
