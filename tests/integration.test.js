const test = require('node:test');
const assert = require('node:assert/strict');

const { analyzeEmotion } = require('@thewholedonuts/emotional-intelligence');
const { renderWelcome } = require('@thewholedonuts/web-ui');
const { processEmotionRequest } = require('@thewholedonuts/api');
const { runCli } = require('@thewholedonuts/cli');
const { renderAppHome } = require('@thewholedonuts/app-web');
const { renderDashboardInsight } = require('@thewholedonuts/app-dashboard');

test('engine returns normalized signal', () => {
  const output = analyzeEmotion('  I feel good today  ');
  assert.equal(output.signal.text, 'I feel good today');
  assert.equal(output.signal.tone, 'uplifted');
});

test('web ui composes engine and shared card', () => {
  const output = renderWelcome('I am stressed right now');
  assert.equal(output.analysis.signal.tone, 'support-needed');
  assert.match(output.card.detail, /support-needed/);
});

test('api and cli surface engine output', () => {
  assert.equal(processEmotionRequest('hello').signal.tone, 'steady');
  assert.equal(runCli('happy day').signal.tone, 'uplifted');
});

test('apps compose package layers', () => {
  assert.equal(renderAppHome('hope').analysis.signal.tone, 'uplifted');
  assert.equal(renderDashboardInsight('sad').signal.tone, 'support-needed');
});
