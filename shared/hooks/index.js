function useSignalMemory(signal) {
  return { latest: signal, remembered: Boolean(signal && signal.text) };
}

module.exports = { useSignalMemory };
