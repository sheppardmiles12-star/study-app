/* Macro-only extras: the Shock Lab and Tools tabs, plus the graphs used inside lessons.
   A class only needs an extras.js if it wants custom tabs or lesson diagrams.
   Turn it on with `extras: true` for the class in classes/index.js. */
(function () {
  'use strict';
  var A = window.StudyApp, S = A.S, $ = A.$, fmt = A.fmt, money = A.money, shuffle = A.shuffle, render = A.render;
  var SCENARIOS = A.course.scenarios;

  S.lab = { mode: 'drill', order: null, i: 0, sel: { d: 0, s: 0 }, checked: false, score: 0, tried: 0, sb: { d: 1, s: 0, dk: 15, sk: 15 } };
  S.ppf = { x: 15, y: 20, grow: false };

  /* ---------- lesson diagrams ---------- */
  function ppfStatic(grow) {
    var X0 = 48, X1 = 404, Y0 = 290, Y1 = 18, MX = 50, MY = 50;
    var sx = function (v) { return X0 + v * (X1 - X0) / MX; }, sy = function (v) { return Y0 - v * (Y0 - Y1) / MY; };
    var g = grow ? 1.25 : 1;
    var o = '<svg class="g" viewBox="0 0 420 330" role="img" aria-label="Production possibility frontier diagram">';
    for (var k = 0; k <= 50; k += 10) o += '<line class="grid" x1="' + sx(k) + '" y1="' + Y1 + '" x2="' + sx(k) + '" y2="' + Y0 + '"/><line class="grid" x1="' + X0 + '" y1="' + sy(k) + '" x2="' + X1 + '" y2="' + sy(k) + '"/><text x="' + sx(k) + '" y="' + (Y0 + 14) + '" text-anchor="middle">' + k + '</text><text x="' + (X0 - 6) + '" y="' + (sy(k) + 4) + '" text-anchor="end">' + k + '</text>';
    o += '<line class="axis" x1="' + X0 + '" y1="' + Y1 + '" x2="' + X0 + '" y2="' + Y0 + '"/><line class="axis" x1="' + X0 + '" y1="' + Y0 + '" x2="' + X1 + '" y2="' + Y0 + '"/>';
    o += '<text x="' + ((X0 + X1) / 2) + '" y="326" text-anchor="middle">Pizza</text><text x="12" y="' + ((Y0 + Y1) / 2) + '" text-anchor="middle" transform="rotate(-90 12 ' + ((Y0 + Y1) / 2) + ')">Salad</text>';
    o += '<polygon class="area" points="' + sx(0) + ',' + sy(0) + ' ' + sx(30 * g) + ',' + sy(0) + ' ' + sx(0) + ',' + sy(40 * g) + '"/>';
    function pt(x, y, lab) { return '<circle class="pt fill" cx="' + sx(x) + '" cy="' + sy(y) + '" r="5"/><text class="ink" x="' + sx(x) + '" y="' + (sy(y) - 10) + '" text-anchor="middle">' + lab + '</text>'; }
    if (grow) {
      o += '<line class="ppf" style="stroke-dasharray:5 5;opacity:.55;stroke-width:2" x1="' + sx(30) + '" y1="' + sy(0) + '" x2="' + sx(0) + '" y2="' + sy(40) + '"/><line class="ppf2" x1="' + sx(37.5) + '" y1="' + sy(0) + '" x2="' + sx(0) + '" y2="' + sy(50) + '"/>';
      o += '<text x="' + sx(25) + '" y="' + sy(8) + '">Old frontier</text><text class="ink" x="' + sx(30) + '" y="' + sy(15) + '">New frontier</text>' + pt(20, 20, 'C now feasible');
    } else {
      o += '<line class="ppf" x1="' + sx(30) + '" y1="' + sy(0) + '" x2="' + sx(0) + '" y2="' + sy(40) + '"/>' + pt(10, 20, 'A') + pt(15, 20, 'B') + pt(20, 20, 'C');
    }
    return o + '</svg>';
  }
  function viz(k) {
    if (k === 'ppf3') return { svg: ppfStatic(false), cap: 'A (10 pizza, 20 salad) is inside the frontier: feasible but wasteful. B (15, 20) is on it: efficient. C (20, 20) is outside: not feasible.' };
    if (k === 'ppfgrow') return { svg: ppfStatic(true), cap: 'Growth pushes the frontier out. Point C (20 pizza, 20 salad) was impossible before and is now inside the new frontier.' };
    if (k === 'sd') return { svg: graph(0, 0, 15, 15, false), cap: 'Demand (blue) slopes down, supply (orange) slopes up. They cross at equilibrium E.' };
    if (k === 'dshift') return { svg: graph(1, 0, 15, 15, true), cap: 'Demand shifts right (D to D\'). The new equilibrium E2 has a higher price and higher quantity than E1.' };
    if (k === 'sshift') return { svg: graph(0, 1, 15, 15, true), cap: 'Supply shifts right (S to S\'). The new equilibrium E2 has a lower price and higher quantity than E1.' };
    if (k === 'dsboth') return { svg: graph(-1, 1, 18, 10, true), cap: 'Demand left and supply right. Price falls. Quantity depends on which shift is bigger (drawn with one example).' };
    return null;
  }

  /* ---------- SHOCK LAB ---------- */
  var B = 0.8, QMAX = 100, PMAX = 110;
  function outcome(d, s) {
    var t = { '0,0': ['none', 'none'], '1,0': ['up', 'up'], '-1,0': ['down', 'down'], '0,1': ['down', 'up'], '0,-1': ['up', 'down'], '1,1': ['?', 'up'], '-1,-1': ['?', 'down'], '1,-1': ['up', '?'], '-1,1': ['down', '?'] };
    return t[d + ',' + s];
  }
  function eq(d, s, dk, sk) {
    var ad = 90 + B * d * dk, as = 10 - B * s * sk;
    var q = (ad - as) / (2 * B), p = as + B * q;
    return { ad: ad, as: as, q: q, p: p };
  }
  function graph(d, s, dk, sk, revealed) {
    var X0 = 48, X1 = 404, Y0 = 290, Y1 = 18;
    var sx = function (q) { return X0 + q * (X1 - X0) / QMAX; }, sy = function (p) { return Y0 - p * (Y0 - Y1) / PMAX; };
    function seg(a, m) {
      var lo = 0, hi = QMAX;
      if (m > 0) { lo = Math.max(lo, (0 - a) / m); hi = Math.min(hi, (PMAX - a) / m); }
      else { lo = Math.max(lo, (PMAX - a) / m); hi = Math.min(hi, (0 - a) / m); }
      return [lo, a + m * lo, hi, a + m * hi];
    }
    function line(a, m, cls, lab, cl) {
      var g = seg(a, m);
      return '<line class="' + cls + '" x1="' + sx(g[0]) + '" y1="' + sy(g[1]) + '" x2="' + sx(g[2]) + '" y2="' + sy(g[3]) + '"/>' +
        '<text class="' + cl + '" x="' + (sx(g[2]) - 4) + '" y="' + (sy(g[3]) + (m > 0 ? -8 : 16)) + '" text-anchor="end">' + lab + '</text>';
    }
    var e0 = eq(0, 0, 0, 0), e1 = eq(d, s, dk, sk);
    var changed = revealed && (d !== 0 || s !== 0);
    var out = '<svg class="g" viewBox="0 0 420 330" role="img" aria-label="Supply and demand graph with price on the vertical axis and quantity on the horizontal axis">';
    for (var k = 0; k <= 100; k += 25) out += '<line class="grid" x1="' + sx(k) + '" y1="' + Y1 + '" x2="' + sx(k) + '" y2="' + Y0 + '"/>';
    for (var p = 0; p <= 100; p += 25) out += '<line class="grid" x1="' + X0 + '" y1="' + sy(p) + '" x2="' + X1 + '" y2="' + sy(p) + '"/>';
    out += '<line class="axis" x1="' + X0 + '" y1="' + Y1 + '" x2="' + X0 + '" y2="' + Y0 + '"/><line class="axis" x1="' + X0 + '" y1="' + Y0 + '" x2="' + X1 + '" y2="' + Y0 + '"/>';
    out += '<text x="' + ((X0 + X1) / 2) + '" y="322" text-anchor="middle">Quantity</text><text x="14" y="' + ((Y0 + Y1) / 2) + '" text-anchor="middle" transform="rotate(-90 14 ' + ((Y0 + Y1) / 2) + ')">Price</text>';
    out += line(90, -B, changed ? 'd old' : 'd', 'D', 'dl') + line(10, B, changed ? 's old' : 's', 'S', 'sl');
    if (changed) {
      if (d !== 0) out += line(e1.ad, -B, 'd', "D'", 'dl');
      if (s !== 0) out += line(e1.as, B, 's', "S'", 'sl');
    }
    // equilibrium guides
    function guide(e, fill, lab, offset) {
      return '<line class="guide" x1="' + X0 + '" y1="' + sy(e.p) + '" x2="' + sx(e.q) + '" y2="' + sy(e.p) + '"/><line class="guide" x1="' + sx(e.q) + '" y1="' + sy(e.p) + '" x2="' + sx(e.q) + '" y2="' + Y0 + '"/>' +
        '<circle class="pt' + (fill ? ' fill' : '') + '" cx="' + sx(e.q) + '" cy="' + sy(e.p) + '" r="5"/>' +
        '<text class="ink" x="' + (sx(e.q) + 8) + '" y="' + (sy(e.p) + offset) + '">' + lab + '</text>' +
        '<text x="' + (X0 - 6) + '" y="' + (sy(e.p) + 4) + '" text-anchor="end">' + Math.round(e.p) + '</text>' +
        '<text x="' + sx(e.q) + '" y="' + (Y0 + 14) + '" text-anchor="middle">' + Math.round(e.q) + '</text>';
    }
    out += guide(e0, !changed, changed ? 'E1' : 'E', -8);
    if (changed) out += guide(e1, true, 'E2', 16);
    return out + '</svg>';
  }
  function dirWord(x, what) {
    if (x === 'up') return what + ' <b>rises</b>'; if (x === 'down') return what + ' <b>falls</b>'; if (x === '?') return what + ' is <b>ambiguous</b>'; return what + ' is unchanged';
  }
  function resultPanel(d, s, dk, sk) {
    var o = outcome(d, s), e0 = eq(0, 0, 0, 0), e1 = eq(d, s, dk, sk);
    function box(label, dir, a, b) {
      var sym = { up: '↑ up', down: '↓ down', '?': '? depends', none: 'no change' }[dir];
      return '<div class="r"><div class="label">' + label + '</div><b>' + sym + '</b><div class="small muted mono">' + Math.round(a) + ' → ' + Math.round(b) + (dir === '?' ? ' (one example)' : '') + '</div></div>';
    }
    var note = (o[0] === '?' || o[1] === '?') ? '<p class="small muted">When both curves shift, one result is certain and the other depends on which shift is bigger. The graph uses one example size.</p>' : '';
    return '<div class="res">' + box('Price', o[0], e0.p, e1.p) + box('Quantity', o[1], e0.q, e1.q) + '</div>' + note;
  }
  function seg3(k, val, labels, cls) {
    return '<div class="seg ' + cls + '" role="group">' + [-1, 0, 1].map(function (v, i) {
      return '<button data-a="seg" data-k="' + k + '" data-v="' + v + '" aria-pressed="' + (val === v) + '">' + labels[i] + '</button>';
    }).join('') + '</div>';
  }
  function labOrder() { if (!S.lab.order) S.lab.order = shuffle(SCENARIOS.map(function (_, i) { return i; })); return S.lab.order; }
  function vLab() {
    var L = S.lab;
    var head = '<div class="stack"><h2>Shock Lab</h2><div class="row"><button class="chip" data-a="labmode" data-v="drill" aria-pressed="' + (L.mode === 'drill') + '">Drill</button><button class="chip" data-a="labmode" data-v="sandbox" aria-pressed="' + (L.mode === 'sandbox') + '">Sandbox</button></div></div>';
    var dl = ['Decrease ←', 'No change', 'Increase →'];
    if (L.mode === 'sandbox') {
      var b = L.sb;
      return head + '<div class="grid2"><div class="panel stack"><p class="muted">Pick a shock for each curve and drag the sizes. Try a double shift and change the sizes to see the ambiguous result flip.</p>' +
        '<div class="ctrl"><span class="label" style="color:var(--demand)">Demand</span>' + seg3('sbd', b.d, dl, 'd') + '</div>' +
        '<div class="ctrl"><span class="label">Size</span><input type="range" id="sb-dk" min="5" max="25" value="' + b.dk + '" data-i="sbdk" aria-label="Demand shift size"></div>' +
        '<div class="ctrl"><span class="label" style="color:var(--supply)">Supply</span>' + seg3('sbs', b.s, dl, 's') + '</div>' +
        '<div class="ctrl"><span class="label">Size</span><input type="range" id="sb-sk" min="5" max="25" value="' + b.sk + '" data-i="sbsk" aria-label="Supply shift size"></div>' +
        '<div id="sb-res">' + resultPanel(b.d, b.s, b.dk, b.sk) + '</div></div><div class="panel" id="sb-g">' + graph(b.d, b.s, b.dk, b.sk, true) + '</div></div>';
    }
    var order = labOrder(), sc = SCENARIOS[order[L.i % order.length]];
    var sk = sc.ss || (sc.d && sc.s ? 10 : 15), dk = sc.ds || (sc.d && sc.s ? 18 : 15);
    var shown = L.checked;
    var fb = '';
    if (shown) {
      var ok = L.sel.d === sc.d && L.sel.s === sc.s;
      fb = '<div class="fb ' + (ok ? 'ok' : 'no') + '"><b>' + (ok ? 'Correct.' : 'Not quite.') + '</b> ' + sc.w + '</div>' + resultPanel(sc.d, sc.s, dk, sk) + '<div class="row"><button class="btn" data-a="labnext">Next scenario</button></div>';
    } else {
      fb = '<div class="row"><button class="btn" data-a="labcheck">Check my answer</button></div>';
    }
    return head + '<div class="row small muted"><span class="mono">score ' + L.score + ' / ' + L.tried + '</span><span>Decide which curve moves and which way. Right means increase, left means decrease.</span></div>' +
      '<div class="grid2"><div class="panel stack"><span class="label">Scenario</span><h3 style="font-size:1.2rem">' + sc.t + '</h3>' +
      '<div class="ctrl"><span class="label" style="color:var(--demand)">Demand</span>' + seg3('d', L.sel.d, dl, 'd') + '</div>' +
      '<div class="ctrl"><span class="label" style="color:var(--supply)">Supply</span>' + seg3('s', L.sel.s, dl, 's') + '</div>' + fb + '</div>' +
      '<div class="panel">' + graph(shown ? sc.d : 0, shown ? sc.s : 0, dk, sk, shown) + '</div></div>';
  }

  /* ---------- TOOLS ---------- */
  var BRACKETS = [[0, 11925, 0.10], [11925, 48475, 0.12], [48475, 103350, 0.22], [103350, 197300, 0.24], [197300, 250525, 0.32], [250525, 626350, 0.35], [626350, Infinity, 0.37]];
  function taxOut(gross, ded) {
    var taxable = Math.max(0, gross - ded), total = 0, marg = 0.10;
    var rows = BRACKETS.map(function (b) {
      var inb = Math.max(0, Math.min(taxable, b[1]) - b[0]), tx = inb * b[2];
      total += tx; if (inb > 0) marg = b[2];
      return '<tr class="' + (inb > 0 ? 'hit' : '') + '"><td>' + fmt(b[0]) + (b[1] === Infinity ? ' and up' : ' to ' + fmt(b[1])) + '</td><td class="n">' + Math.round(b[2] * 100) + '%</td><td class="n">' + fmt(inb) + '</td><td class="n">' + money(tx) + '</td></tr>';
    }).join('');
    return '<div class="res"><div class="r"><div class="label">Taxable income</div><b>' + money(taxable) + '</b></div><div class="r"><div class="label">Tax owed</div><b>' + money(total) + '</b></div><div class="r"><div class="label">Marginal rate</div><b>' + Math.round(marg * 100) + '%</b></div><div class="r"><div class="label">Effective rate</div><b>' + (taxable ? (100 * total / taxable).toFixed(1) : '0.0') + '%</b><div class="small muted">of taxable (' + (gross ? (100 * total / gross).toFixed(1) : '0.0') + '% of gross)</div></div></div>' +
      '<div class="scroll"><table class="tbl"><thead><tr><th>Bracket ($)</th><th class="n">Rate</th><th class="n">Income in bracket</th><th class="n">Tax</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
  }
  function ppfGeom() {
    var g = S.ppf.grow ? 1.25 : 1;
    return { px: 30 * g, sy: 40 * g, g: g };
  }
  function ppfSvg() {
    var X0 = 48, X1 = 404, Y0 = 290, Y1 = 18, MX = 50, MY = 50;
    var sx = function (v) { return X0 + v * (X1 - X0) / MX; }, sy = function (v) { return Y0 - v * (Y0 - Y1) / MY; };
    var P = S.ppf, g = ppfGeom();
    var out = '<svg class="g" id="ppf-svg" viewBox="0 0 420 330" role="img" aria-label="Production possibility frontier for pizza and salad. Click to place a point." style="cursor:crosshair;touch-action:manipulation">';
    for (var k = 0; k <= 50; k += 10) out += '<line class="grid" x1="' + sx(k) + '" y1="' + Y1 + '" x2="' + sx(k) + '" y2="' + Y0 + '"/><line class="grid" x1="' + X0 + '" y1="' + sy(k) + '" x2="' + X1 + '" y2="' + sy(k) + '"/><text x="' + sx(k) + '" y="' + (Y0 + 14) + '" text-anchor="middle">' + k + '</text><text x="' + (X0 - 6) + '" y="' + (sy(k) + 4) + '" text-anchor="end">' + k + '</text>';
    out += '<line class="axis" x1="' + X0 + '" y1="' + Y1 + '" x2="' + X0 + '" y2="' + Y0 + '"/><line class="axis" x1="' + X0 + '" y1="' + Y0 + '" x2="' + X1 + '" y2="' + Y0 + '"/>';
    out += '<text x="' + ((X0 + X1) / 2) + '" y="326" text-anchor="middle">Pizza</text><text x="12" y="' + ((Y0 + Y1) / 2) + '" text-anchor="middle" transform="rotate(-90 12 ' + ((Y0 + Y1) / 2) + ')">Salad</text>';
    out += '<polygon class="area" points="' + sx(0) + ',' + sy(0) + ' ' + sx(g.px) + ',' + sy(0) + ' ' + sx(0) + ',' + sy(g.sy) + '"/>';
    if (P.grow) out += '<line class="ppf" style="stroke-dasharray:5 5;opacity:.55;stroke-width:2" x1="' + sx(30) + '" y1="' + sy(0) + '" x2="' + sx(0) + '" y2="' + sy(40) + '"/>';
    out += '<line class="' + (P.grow ? 'ppf2' : 'ppf') + '" x1="' + sx(g.px) + '" y1="' + sy(0) + '" x2="' + sx(0) + '" y2="' + sy(g.sy) + '"/>';
    out += '<circle class="pt fill" cx="' + sx(P.x) + '" cy="' + sy(P.y) + '" r="6"/>';
    return out + '</svg>';
  }
  function ppfRead() {
    var P = S.ppf, g = ppfGeom(), v = P.x / g.px + P.y / g.sy, cls, msg;
    if (v > 1.015) { cls = 'no'; msg = '<b>Not feasible.</b> The point is outside the frontier.'; }
    else if (v >= 0.985) { cls = 'ok'; msg = '<b>Feasible and efficient.</b> It is on the frontier.'; }
    else { cls = 'ok'; msg = '<b>Feasible but not efficient.</b> It is inside the frontier, so resources are wasted.'; }
    var oc = g.px / g.sy;
    return '<div class="fb ' + cls + '">' + msg + '</div><p class="mono small">Point: ' + fmt(Math.round(P.x * 10) / 10) + ' pizza, ' + fmt(Math.round(P.y * 10) / 10) + ' salad</p>' +
      '<p class="small">Along this frontier, <b>1 more salad costs ' + oc.toFixed(2) + ' pizza</b>, and 1 more pizza costs ' + (1 / oc).toFixed(2) + ' salad. That is the opportunity cost.</p>';
  }
  function vTools() {
    var T = S.tools || (S.tools = { gross: 60000, ded: 15000 });
    return '<div class="stack"><h2>Tools</h2><p class="muted">Play with the numbers from the decks.</p></div>' +
      '<div class="panel stack"><h3>Production possibility frontier</h3><p class="muted small">Click the graph to place a point, or use the presets from the deck (30 pizza and 0 salad, 15 and 20, 9 and 28, 0 and 40 are on the line).</p>' +
      '<div class="grid2"><div id="ppf-g">' + ppfSvg() + '</div><div class="stack"><div class="row">' +
      '<button class="chip" data-a="ppfset" data-x="15" data-y="20">15, 20 (on)</button><button class="chip" data-a="ppfset" data-x="10" data-y="20">10, 20 (inside)</button><button class="chip" data-a="ppfset" data-x="20" data-y="20">20, 20 (outside)</button><button class="chip" data-a="ppfset" data-x="9" data-y="28">9, 28 (on)</button></div>' +
      '<button class="chip" data-a="ppfgrow" aria-pressed="' + S.ppf.grow + '" style="align-self:flex-start">Economic growth: ' + (S.ppf.grow ? 'on (new frontier in green)' : 'off') + '</button><div id="ppf-r" class="stack">' + ppfRead() + '</div></div></div></div>' +
      '<div class="panel stack"><h3>Federal income tax, single filer, 2025</h3><p class="muted small">Brackets from the inequality deck. Each rate applies only to the income inside its bracket.</p>' +
      '<div class="row"><label class="stack" style="gap:4px;flex:1;min-width:150px">Income ($)<input type="number" id="tx-gross" min="0" step="1000" value="' + T.gross + '" data-i="tax"></label><label class="stack" style="gap:4px;flex:1;min-width:150px">Deduction ($)<input type="number" id="tx-ded" min="0" step="500" value="' + T.ded + '" data-i="tax"></label></div>' +
      '<div id="tx-out" class="stack">' + taxOut(T.gross, T.ded) + '</div></div>';
  }

  /* ---------- events ---------- */
  function click(a, v, t) {
    if (a === 'labmode') { S.lab.mode = v; render(); }
    else if (a === 'seg') {
      var k = t.dataset.k, val = +t.dataset.v;
      if (k === 'sbd') S.lab.sb.d = val; else if (k === 'sbs') S.lab.sb.s = val;
      else if (!S.lab.checked) S.lab.sel[k] = val;
      render();
    }
    else if (a === 'labcheck') {
      var L = S.lab, sc = SCENARIOS[labOrder()[L.i % SCENARIOS.length]];
      L.checked = true; L.tried++; if (L.sel.d === sc.d && L.sel.s === sc.s) L.score++;
      render();
    }
    else if (a === 'labnext') { S.lab.i++; S.lab.sel = { d: 0, s: 0 }; S.lab.checked = false; render(); }
    else if (a === 'ppfset') { S.ppf.x = +t.dataset.x; S.ppf.y = +t.dataset.y; render(); }
    else if (a === 'ppfgrow') { S.ppf.grow = !S.ppf.grow; render(); }
    else return false;
    return true;
  }
  function input(i, t) {
    if (i === 'tax') {
      S.tools = { gross: Math.max(0, +$('#tx-gross').value || 0), ded: Math.max(0, +$('#tx-ded').value || 0) };
      $('#tx-out').innerHTML = taxOut(S.tools.gross, S.tools.ded);
    } else if (i === 'sbdk' || i === 'sbsk') {
      var b = S.lab.sb; if (i === 'sbdk') b.dk = +t.value; else b.sk = +t.value;
      $('#sb-g').innerHTML = graph(b.d, b.s, b.dk, b.sk, true);
      $('#sb-res').innerHTML = resultPanel(b.d, b.s, b.dk, b.sk);
    } else return false;
    return true;
  }
  document.addEventListener('pointerdown', function (e) {
    var svg = e.target.closest && e.target.closest('#ppf-svg'); if (!svg) return;
    var r = svg.getBoundingClientRect(), vx = (e.clientX - r.left) * 420 / r.width, vy = (e.clientY - r.top) * 330 / r.height;
    var x = (vx - 48) * 50 / (404 - 48), y = (290 - vy) * 50 / (290 - 18);
    S.ppf.x = Math.max(0, Math.min(50, x)); S.ppf.y = Math.max(0, Math.min(50, y));
    $('#ppf-g').innerHTML = ppfSvg(); $('#ppf-r').innerHTML = ppfRead();
  });

  A.register({
    tabs: [['lab', 'Shock Lab', vLab], ['tools', 'Tools', vTools]],
    viz: viz,
    click: click,
    input: input
  });
})();
