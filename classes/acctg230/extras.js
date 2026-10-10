/* ACCTG 230 extras: two practice tabs built for this class.
   Statements Lab: the horizontal statements model drill (I / D / NA for each element,
   cash flow section, transaction type), with the journal entry shown after each answer.
   Ratio Lab: a randomly generated company and one Chapter 14 ratio to compute by hand. */
(function () {
  'use strict';
  var A = window.StudyApp, S = A.S, $ = A.$, md = A.md, fmt = A.fmt, money = A.money, shuffle = A.shuffle, render = A.render, store = A.store;
  var C = A.course, EVENTS = C.events.map(function (e) { var m = e.m.split(' '); return { id: A.hash(e.t), u: e.u, t: e.t, m: m, act: e.act, type: e.type, je: e.je, w: e.w }; });
  var MASTERED = 2;

  var css = document.createElement('style');
  css.textContent =
    '.lab-rows { display: grid; gap: 10px; }' +
    '.lab-row { display: grid; grid-template-columns: 9.5em 1fr; gap: 10px; align-items: center; }' +
    '.lab-row .seg button { padding: 8px 4px; }' +
    '.lab-row.ok .seg { outline: 2px solid var(--good); outline-offset: 1px; }' +
    '.lab-row.no .seg { outline: 2px solid var(--bad); outline-offset: 1px; }' +
    '.lab-row .fix { grid-column: 2; font-size: 0.85rem; color: var(--bad); margin-top: -4px; }' +
    '.lab-sep { border-top: 1px dashed var(--line); margin: 2px 0; }' +
    '.je td:nth-child(2), .je td:nth-child(3), .je th:nth-child(2), .je th:nth-child(3) { text-align: right; font-family: var(--font-mono); font-variant-numeric: tabular-nums; }' +
    '.je td.cr { padding-left: 2em; }' +
    '.fin { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 16px; }' +
    '@media (max-width: 480px) { .lab-row { grid-template-columns: 1fr; gap: 4px; } .lab-row .fix { grid-column: 1; } }';
  document.head.appendChild(css);

  /* ================= STATEMENTS LAB ================= */
  var ROWS = [['a', 'Assets'], ['l', 'Liabilities'], ['e', 'Stk. equity'], ['r', 'Revenue / gain'], ['x', 'Expense / loss'], ['n', 'Net income'], ['c', 'Cash flow']];
  var IDN = [['D', 'Decrease'], ['NA', 'No effect'], ['I', 'Increase']];
  var ACTS = [['OA', 'Operating'], ['IA', 'Investing'], ['FA', 'Financing'], ['NA', 'None']];
  var TYPES = [['AS', 'Asset source'], ['AU', 'Asset use'], ['AE', 'Asset exch.'], ['CE', 'Claims exch.']];
  var TYPE_NAME = { AS: 'Asset source', AU: 'Asset use', AE: 'Asset exchange', CE: 'Claims exchange' };
  var WORD = { I: 'Increase', D: 'Decrease', NA: 'No effect' };

  var L = S.slab = { key: '', order: [], i: 0, ans: {}, checked: false, score: 0, tried: 0, streak: store.get('slab', {}) };

  function pool() { return EVENTS.filter(function (e) { return A.inSel(e.u); }); }
  function build() {
    var p = pool(), key = S.sel.join(',');
    // Unmastered events first, each group shuffled.
    var un = p.filter(function (e) { return (L.streak[e.id] || 0) < MASTERED; }), ma = p.filter(function (e) { return (L.streak[e.id] || 0) >= MASTERED; });
    L.order = shuffle(un).concat(shuffle(ma)).map(function (e) { return e.id; });
    L.key = key; L.i = 0; L.ans = {}; L.checked = false;
  }
  function cur() { var id = L.order[L.i % L.order.length]; return EVENTS.filter(function (e) { return e.id === id; })[0]; }
  function truth(e) { var t = { a: e.m[0], l: e.m[1], e: e.m[2], r: e.m[3], x: e.m[4], n: e.m[5], c: e.m[6], act: e.act }; if (e.type) t.type = e.type; return t; }

  function seg(k, opts, val, done, right) {
    return '<div class="seg" role="group" aria-label="' + k + '">' + opts.map(function (o) {
      return '<button data-a="slpick" data-k="' + k + '" data-v="' + o[0] + '" aria-pressed="' + (val === o[0]) + '"' + (done ? ' disabled' : '') + '>' + o[1] + '</button>';
    }).join('') + '</div>';
  }
  function row(k, label, opts, e, t) {
    var val = L.ans[k], cls = '', fix = '';
    if (L.checked) {
      var ok = val === t[k]; cls = ok ? ' ok' : ' no';
      if (!ok) fix = '<div class="fix">Answer: ' + (opts.filter(function (o) { return o[0] === t[k]; })[0] || [0, t[k]])[1] + '</div>';
    }
    return '<div class="lab-row' + cls + '"><span class="label">' + label + '</span>' + seg(k, opts, val, L.checked) + fix + '</div>';
  }
  function jeHtml(je) {
    if (!je.length) return '<p class="small muted">No journal entry: nothing is recorded.</p>';
    var dr = je.filter(function (x) { return x[1] > 0; }), cr = je.filter(function (x) { return x[1] < 0; });
    return '<div class="scroll"><table class="tbl je"><thead><tr><th>Account</th><th>Debit</th><th>Credit</th></tr></thead><tbody>' +
      dr.map(function (x) { return '<tr><td>' + x[0] + '</td><td>' + fmt(x[1]) + '</td><td></td></tr>'; }).join('') +
      cr.map(function (x) { return '<tr><td class="cr">' + x[0] + '</td><td></td><td>' + fmt(-x[1]) + '</td></tr>'; }).join('') + '</tbody></table></div>';
  }
  function vLab() {
    if (L.key !== S.sel.join(',')) build();
    var head = '<div class="stack"><h2>Statements Lab</h2><p class="muted" style="max-width:68ch">The horizontal statements model, one event at a time. For each element pick Increase, Decrease, or No effect, then the cash flow section and the type of transaction. This is how your exams test almost every chapter.</p>' + A.picker() + '</div>';
    if (!L.order.length) return head + '<div class="panel"><p class="muted">No events for these chapters yet. Pick other chapters.</p></div>';
    var e = cur(), t = truth(e), keys = Object.keys(t);
    var mastered = pool().filter(function (x) { return (L.streak[x.id] || 0) >= MASTERED; }).length;
    var body = ROWS.map(function (r) { return row(r[0], r[1], IDN, e, t); }).join('') +
      '<div class="lab-sep"></div>' + row('act', 'Cash flow section', ACTS, e, t) +
      (e.type ? row('type', 'Type of transaction', TYPES, e, t) : '');
    var fb;
    if (L.checked) {
      var right = keys.filter(function (k) { return L.ans[k] === t[k]; }).length, all = right === keys.length;
      fb = '<div class="fb ' + (all ? 'ok' : 'no') + '"><b>' + (all ? 'All correct.' : right + ' of ' + keys.length + ' correct.') + '</b> ' + md(e.w) +
        (e.type ? '' : ' <span class="small">(This one is not a single transaction type, so that question is skipped.)</span>') + '</div>' +
        '<div class="stack" style="gap:6px"><span class="label">Journal entry (Chapter 13 format)</span>' + jeHtml(e.je) + '</div>' +
        '<div class="row"><button class="btn" data-a="slnext">Next event (Enter)</button></div>';
    } else {
      var missing = keys.filter(function (k) { return !L.ans[k]; }).length;
      fb = '<div class="row"><button class="btn" data-a="slcheck"' + (missing ? ' disabled' : '') + '>Check</button>' + (missing ? '<span class="small muted">' + missing + ' left to answer</span>' : '') + '</div>';
    }
    return head + '<div class="row small muted"><span class="mono">score ' + L.score + ' / ' + L.tried + '</span><span class="mono">' + mastered + ' of ' + pool().length + ' events mastered</span></div>' +
      '<div class="panel stack"><span class="label">' + A.unitLabel + ' ' + e.u + ' ' + C.units[e.u] + '</span><h3 style="font-size:1.25rem;line-height:1.35">' + e.t + '</h3>' +
      '<div class="lab-rows">' + body + '</div>' + fb + '</div>' +
      '<p class="small muted">An event counts as mastered after two all-correct answers in a row. Gains go with revenue and losses with expenses, as in the textbook\'s model.</p>';
  }
  function labCheck() {
    var e = cur(), t = truth(e);
    var all = Object.keys(t).every(function (k) { return L.ans[k] === t[k]; });
    L.checked = true; L.tried++; if (all) L.score++;
    L.streak[e.id] = all ? (L.streak[e.id] || 0) + 1 : 0; store.set('slab', L.streak);
    render();
  }
  function labNext() { L.i++; L.ans = {}; L.checked = false; if (L.i >= L.order.length) build(); render(); window.scrollTo(0, 0); }

  /* ================= RATIO LAB ================= */
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function k(x) { return Math.round(x / 1000) * 1000; }
  function makeCo() {
    var c = {};
    c.sales = k(rnd(500, 1500) * 1000);
    c.cogs = k(c.sales * rnd(0.55, 0.7));
    c.bonds = k(rnd(50, 250) * 1000); c.interest = Math.round(c.bonds * 0.08);
    c.opex = k(c.sales * rnd(0.2, 0.3));
    c.ebt = c.sales - c.cogs - c.opex - c.interest;
    if (c.ebt < c.interest * 2) { c.opex = k(c.sales - c.cogs - c.interest * 4); c.ebt = c.sales - c.cogs - c.opex - c.interest; }
    c.tax = k(c.ebt * 0.25); c.ni = c.ebt - c.tax;
    c.cash = k(c.sales * rnd(0.02, 0.06)); c.ms = k(c.sales * rnd(0, 0.04)); c.prepaid = k(c.sales * rnd(0.003, 0.01));
    c.arE = k(c.sales * rnd(0.05, 0.12)); c.arB = k(c.arE * rnd(0.85, 1.15));
    c.invE = k(c.cogs * rnd(0.08, 0.18)); c.invB = k(c.invE * rnd(0.8, 1.2));
    c.ca = c.cash + c.ms + c.arE + c.invE + c.prepaid;
    c.cl = k(c.ca / rnd(1.3, 3.2));
    c.ppe = k(c.ca * rnd(1.3, 2.6));
    c.taE = c.ca + c.ppe;
    c.pref = Math.random() < 0.5 ? 0 : 50000;
    c.seE = c.taE - c.cl - c.bonds;
    if (c.seE < c.taE * 0.3) { c.ppe += k(c.taE * 0.3 - c.seE) + 50000; c.taE = c.ca + c.ppe; c.seE = c.taE - c.cl - c.bonds; }
    c.taB = k(c.taE * rnd(0.85, 0.98)); c.seB = k(c.seE * rnd(0.85, 0.97));
    c.shE = Math.round(rnd(10, 40)) * 1000; c.shB = Math.round(c.shE * rnd(0.8, 1) / 500) * 500;
    c.prefDiv = c.pref * 0.06;
    c.eps = (c.ni - c.prefDiv) / ((c.shE + c.shB) / 2);
    c.price = Math.max(5, Math.round(c.eps * rnd(10, 25)));
    c.dps = Math.round(rnd(0.2, 1.5) * 100) / 100;
    return c;
  }
  function avg(a, b) { return (a + b) / 2; }
  var RATIOS = [
    { key: 'wc', name: 'Working capital', fam: 'Liquidity', unit: '$', f: 'Current assets - Current liabilities', calc: function (c) { return [c.ca - c.cl, money(c.ca) + ' - ' + money(c.cl)]; } },
    { key: 'cur', name: 'Current ratio', fam: 'Liquidity', unit: ':1', f: 'Current assets / Current liabilities', calc: function (c) { return [c.ca / c.cl, fmt(c.ca) + ' / ' + fmt(c.cl)]; } },
    { key: 'quick', name: 'Quick (acid-test) ratio', fam: 'Liquidity', unit: ':1', f: '(Cash + Marketable securities + Accounts receivable) / Current liabilities', calc: function (c) { var q = c.cash + c.ms + c.arE; return [q / c.cl, fmt(q) + ' / ' + fmt(c.cl)]; } },
    { key: 'art', name: 'Accounts receivable turnover', fam: 'Liquidity', unit: 'times', f: 'Net sales / Average accounts receivable', calc: function (c) { var a = avg(c.arB, c.arE); return [c.sales / a, fmt(c.sales) + ' / ((' + fmt(c.arB) + ' + ' + fmt(c.arE) + ') / 2 = ' + fmt(a) + ')']; } },
    { key: 'dc', name: 'Average days to collect receivables', fam: 'Liquidity', unit: 'days', f: '365 / Accounts receivable turnover', calc: function (c) { var t = c.sales / avg(c.arB, c.arE); return [365 / t, '365 / ' + t.toFixed(2)]; } },
    { key: 'it', name: 'Inventory turnover', fam: 'Liquidity', unit: 'times', f: 'Cost of goods sold / Average inventory', calc: function (c) { var a = avg(c.invB, c.invE); return [c.cogs / a, fmt(c.cogs) + ' / ((' + fmt(c.invB) + ' + ' + fmt(c.invE) + ') / 2 = ' + fmt(a) + ')']; } },
    { key: 'ds', name: 'Average days to sell inventory', fam: 'Liquidity', unit: 'days', f: '365 / Inventory turnover', calc: function (c) { var t = c.cogs / avg(c.invB, c.invE); return [365 / t, '365 / ' + t.toFixed(2)]; } },
    { key: 'dta', name: 'Debt to assets', fam: 'Solvency', unit: '%', f: 'Total liabilities / Total assets', calc: function (c) { var tl = c.cl + c.bonds; return [100 * tl / c.taE, fmt(tl) + ' / ' + fmt(c.taE)]; } },
    { key: 'dte', name: 'Debt to equity', fam: 'Solvency', unit: ':1', f: 'Total liabilities / Total stockholders\' equity', calc: function (c) { var tl = c.cl + c.bonds; return [tl / c.seE, fmt(tl) + ' / ' + fmt(c.seE)]; } },
    { key: 'tie', name: 'Times interest earned', fam: 'Solvency', unit: 'times', f: '(Income before taxes + Interest expense) / Interest expense', calc: function (c) { return [(c.ebt + c.interest) / c.interest, '(' + fmt(c.ebt) + ' + ' + fmt(c.interest) + ') / ' + fmt(c.interest)]; } },
    { key: 'pa', name: 'Plant assets to long-term liabilities', fam: 'Solvency', unit: ':1', f: 'Net plant assets / Long-term liabilities', calc: function (c) { return [c.ppe / c.bonds, fmt(c.ppe) + ' / ' + fmt(c.bonds)]; } },
    { key: 'nm', name: 'Net margin', fam: 'Profitability', unit: '%', f: 'Net income / Net sales', calc: function (c) { return [100 * c.ni / c.sales, fmt(c.ni) + ' / ' + fmt(c.sales)]; } },
    { key: 'gm', name: 'Gross margin percentage', fam: 'Profitability', unit: '%', f: 'Gross margin / Net sales', calc: function (c) { return [100 * (c.sales - c.cogs) / c.sales, fmt(c.sales - c.cogs) + ' / ' + fmt(c.sales)]; } },
    { key: 'at', name: 'Asset turnover', fam: 'Profitability', unit: 'times', f: 'Net sales / Average total assets', calc: function (c) { var a = avg(c.taB, c.taE); return [c.sales / a, fmt(c.sales) + ' / ' + fmt(a)]; } },
    { key: 'roi', name: 'Return on investment', fam: 'Profitability', unit: '%', f: 'Net income / Average total assets', calc: function (c) { var a = avg(c.taB, c.taE); return [100 * c.ni / a, fmt(c.ni) + ' / ' + fmt(a)]; } },
    { key: 'roe', name: 'Return on equity', fam: 'Profitability', unit: '%', f: 'Net income / Average stockholders\' equity', calc: function (c) { var a = avg(c.seB, c.seE); return [100 * c.ni / a, fmt(c.ni) + ' / ' + fmt(a)]; } },
    { key: 'eps', name: 'Earnings per share', fam: 'Stock market', unit: '$', f: '(Net income - Preferred dividends) / Average outstanding common shares', calc: function (c) { var a = avg(c.shB, c.shE); return [c.eps, '(' + fmt(c.ni) + ' - ' + fmt(c.prefDiv) + ') / ' + fmt(a)]; } },
    { key: 'bvps', name: 'Book value per share', fam: 'Stock market', unit: '$', f: '(Stockholders\' equity - Preferred stock) / Outstanding common shares', calc: function (c) { return [(c.seE - c.pref) / c.shE, '(' + fmt(c.seE) + ' - ' + fmt(c.pref) + ') / ' + fmt(c.shE)]; } },
    { key: 'pe', name: 'Price-earnings ratio', fam: 'Stock market', unit: 'times', f: 'Market price per share / Earnings per share', calc: function (c) { return [c.price / c.eps, money(c.price) + ' / ' + money(c.eps)]; } },
    { key: 'dy', name: 'Dividend yield', fam: 'Stock market', unit: '%', f: 'Annual dividends per share / Market price per share', calc: function (c) { return [100 * c.dps / c.price, money(c.dps) + ' / ' + money(c.price)]; } }
  ];
  var FAMS = ['Liquidity', 'Solvency', 'Profitability', 'Stock market'];
  var R = S.rlab = { fams: FAMS.slice(), co: null, q: null, val: '', res: null, score: 0, tried: 0 };
  function newQ() {
    var list = RATIOS.filter(function (r) { return R.fams.indexOf(r.fam) > -1; });
    R.co = makeCo(); R.q = list[Math.floor(Math.random() * list.length)]; R.val = ''; R.res = null;
  }
  function unitHint(u) { return { '$': 'in dollars, e.g. 1.60', ':1': 'as a number, e.g. 2.04 for 2.04 : 1', 'times': 'as a number, e.g. 10.8', 'days': 'in days, e.g. 34', '%': 'as a percent, e.g. 5.19 for 5.19%' }[u]; }
  function show(v, u) { return u === '$' ? money(v) : u === '%' ? v.toFixed(2) + '%' : u === ':1' ? v.toFixed(2) + ' : 1' : u === 'days' ? Math.round(v) + ' days' : v.toFixed(2) + ' times'; }
  function statements(c) {
    function t(head, rows) { return '<div class="scroll"><table class="tbl"><thead><tr>' + head.map(function (h, i) { return '<th' + (i ? ' class="n"' : '') + '>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' + rows.map(function (r) { return '<tr>' + r.map(function (x, i) { return '<td' + (i ? ' class="n"' : '') + '>' + x + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>'; }
    var is = t(['Income statement', 'This year'], [['Net sales', fmt(c.sales)], ['Cost of goods sold', '(' + fmt(c.cogs) + ')'], ['Gross margin', fmt(c.sales - c.cogs)], ['Operating expenses', '(' + fmt(c.opex) + ')'], ['Interest expense', '(' + fmt(c.interest) + ')'], ['Income before taxes', fmt(c.ebt)], ['Income tax expense', '(' + fmt(c.tax) + ')'], ['Net income', fmt(c.ni)]]);
    var bs = t(['Balance sheet', 'End', 'Beginning'], [['Cash', fmt(c.cash), ''], ['Marketable securities', fmt(c.ms), ''], ['Accounts receivable', fmt(c.arE), fmt(c.arB)], ['Inventory', fmt(c.invE), fmt(c.invB)], ['Prepaid expenses', fmt(c.prepaid), ''], ['Total current assets', fmt(c.ca), ''], ['Property, plant, and equipment (net)', fmt(c.ppe), ''], ['Total assets', fmt(c.taE), fmt(c.taB)], ['Current liabilities', fmt(c.cl), ''], ['Bonds payable, 8%', fmt(c.bonds), ''], ['Preferred stock, 6%', fmt(c.pref), ''], ['Total stockholders\' equity', fmt(c.seE), fmt(c.seB)]]);
    var mk = t(['Share data', 'Value'], [['Common shares outstanding (end)', fmt(c.shE)], ['Common shares outstanding (beginning)', fmt(c.shB)], ['Market price per share', money(c.price)], ['Annual dividends per share', money(c.dps)]]);
    return '<div class="fin">' + is + bs + '</div>' + mk;
  }
  function vRatio() {
    if (!R.q) newQ();
    var c = R.co, q = R.q, ans = q.calc(c);
    var head = '<div class="stack"><h2>Ratio Lab</h2><p class="muted" style="max-width:68ch">A new company every time. Compute the ratio by hand (a four-function calculator is all your exams allow), using averages where the formula says average. This is the skill behind Chapter 14 and Project 3.</p>' +
      '<div class="row" role="group" aria-label="Ratio families">' + FAMS.map(function (f) { return '<button class="chip" data-a="rxfam" data-v="' + f + '" aria-pressed="' + (R.fams.indexOf(f) > -1) + '">' + f + '</button>'; }).join('') + '</div></div>';
    var fb = '';
    if (R.res) {
      fb = '<div class="fb ' + (R.res === 'ok' ? 'ok' : 'no') + '"><b>' + (R.res === 'ok' ? 'Correct.' : R.res === 'shown' ? 'Here is the work.' : 'Not quite.') + '</b> ' + q.name + ' = ' + q.f + '<br><span class="mono">= ' + ans[1] + ' = ' + show(ans[0], q.unit) + '</span></div>' +
        '<div class="row"><button class="btn" data-a="rxnew">New company (Enter)</button></div>';
    } else {
      fb = '<div class="row"><input type="number" step="any" id="rx-ans" aria-label="Your answer" placeholder="' + unitHint(q.unit) + '" value="' + R.val + '" style="max-width:240px"><button class="btn" data-a="rxcheck">Check</button><button class="btn ghost" data-a="rxshow">Show the work</button></div>';
    }
    return head + '<div class="row small muted"><span class="mono">score ' + R.score + ' / ' + R.tried + '</span></div>' +
      '<div class="panel stack"><span class="label">' + q.fam + ' ratio</span><h3 style="font-size:1.3rem">Compute the ' + q.name.toLowerCase() + '.</h3><p class="small muted">Answer ' + unitHint(q.unit) + '. Round to two decimals.</p>' + fb + '</div>' +
      '<div class="panel stack">' + statements(c) + '</div>';
  }
  function ratioCheck() {
    var inp = $('#rx-ans'); if (!inp || inp.value === '') return;
    var x = parseFloat(inp.value), a = R.q.calc(R.co)[0], u = R.q.unit;
    var tol = u === 'days' ? 1 : u === '$' && R.q.key === 'wc' ? 1 : Math.max(0.011, Math.abs(a) * 0.005);
    R.val = inp.value; R.tried++;
    if (Math.abs(x - a) <= tol) { R.res = 'ok'; R.score++; } else R.res = 'no';
    render();
  }

  /* ================= wiring ================= */
  function click(a, v, t) {
    if (a === 'slpick') { if (!L.checked) { L.ans[t.dataset.k] = v; render(); } }
    else if (a === 'slcheck') labCheck();
    else if (a === 'slnext') labNext();
    else if (a === 'rxfam') { var i = R.fams.indexOf(v); if (i > -1) { if (R.fams.length > 1) R.fams.splice(i, 1); } else R.fams.push(v); newQ(); render(); }
    else if (a === 'rxnew') { newQ(); render(); }
    else if (a === 'rxcheck') ratioCheck();
    else if (a === 'rxshow') { R.res = 'shown'; R.tried++; render(); }
    else return false;
    return true;
  }
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' || (e.target.closest && e.target.closest('button'))) return;
    if (S.tab === 'slab' && L.checked) { e.preventDefault(); labNext(); }
    else if (S.tab === 'rlab') {
      if (e.target.id === 'rx-ans') { e.preventDefault(); ratioCheck(); }
      else if (R.res) { e.preventDefault(); newQ(); render(); }
    }
  });

  A.register({
    tabs: [['slab', 'Statements Lab', vLab], ['rlab', 'Ratio Lab', vRatio]],
    click: click
  });
})();
