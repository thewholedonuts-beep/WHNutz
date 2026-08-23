function normalizeText(input) {
  return String(input || '').trim().replace(/\s+/g, ' ');
}

function detectTone(text) {
  const value = text.toLowerCase();
  if (!value) return 'steady';
  if (/(happy|hope|great|good|love)/.test(value)) return 'uplifted';
  if (/(sad|hurt|angry|down|stress)/.test(value)) return 'support-needed';
  return 'steady';
}

module.exports = { normalizeText, detectTone };
