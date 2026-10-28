// Study Gym version. Every update adds one entry to the TOP of this list; the version number is its length.
window.GYM_CHANGES = [
  ['2026-10-28', 'Version number and changelog; Practice Lab questions no longer repeat within 12 hours'],
  ['2026-10-28', 'Business 2025: Endless mode that generates new practice situations'],
  ['2026-10-28', 'Business 2025: Practice Lab with situations, agency math, and Explain It'],
  ['2026-10-28', 'Macro: Unit 8 Unemployment and Unit 9 Inflation'],
  ['2026-10-28', 'Macro: Unit 7 Economic Growth'],
  ['2026-10-25', 'Business 2025: question inflection and danger-zone details'],
  ['2026-10-25', 'New class: Business 2025'],
  ['2026-10-10', 'New class: Intro to Financial Accounting (ACCTG 230)'],
  ['2026-10-10', 'Macro: Unit 6 GDP; renamed to Macro Economics Study'],
  ['2026-10-10', 'Live site link'],
  ['2026-10-10', 'Study Gym launched with Macro and multi-class setup']
];
window.GYM_VERSION = window.GYM_CHANGES.length;
window.gymVersionText = function () {
  var d = new Date(window.GYM_CHANGES[0][0] + 'T12:00:00');
  return 'Version ' + window.GYM_VERSION + ' · updated ' + d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
