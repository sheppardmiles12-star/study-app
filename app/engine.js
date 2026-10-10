/* Study app engine. Shared by every class. All class content comes from window.COURSE
   (classes/<id>/content.js). Optional class-specific tabs register via StudyApp.register()
   (classes/<id>/extras.js). Nothing in here should mention a particular class. */
(function () {
  'use strict';
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var C = window.COURSE;
  var UNITS = C.units;
  var UIDS = Object.keys(UNITS).map(Number).sort(function (a, b) { return a - b; });
  var UL = C.unitLabel || 'Unit';
  var RAW_CARDS = C.cards || [], RAW_QS = C.questions || [], LESSONS = C.lessons || {};
  var RAW_TF = C.tf || [], RAW_CLOZE = C.cloze || [], RAW_MATCH = C.match || [];
  var RAW_SORTS = C.sorts || [], RAW_LISTS = C.lists || [], HOOKS = C.hooks || [];
  var EXAM = C.exam || { questions: [] }, GAPS = EXAM.gaps || [];
  var PREFIX = C.storagePrefix || (C.id + '_');
  var EXT = [];
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(PREFIX + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(PREFIX + k, JSON.stringify(v)); } catch (e) {} }
  };
  function hash(s) { var x = 5381; for (var i = 0; i < s.length; i++) x = ((x << 5) + x + s.charCodeAt(i)) | 0; return 'k' + (x >>> 0).toString(36); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function md(s) { return s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>'); }
  function fmt(n) { return Number(n).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 0 }); }
  function money(n) { return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

  var CARDS = RAW_CARDS.map(function (c) { return { id: hash(c[1]), u: c[0], f: c[1], b: c[2] }; });
  var QS = RAW_QS.map(function (q) { return { id: hash(q[1]), u: q[0], q: q[1], o: q[2], e: q[3] }; });
  var MASTERED = 2;

  var S = {
    tab: 'home',
    box: store.get('box', {}),
    qstat: store.get('qstat', {}),
    cs: null,
    sel: store.get('sel', UIDS).filter(function (u) { return UNITS[u]; }),
    P: { mode: 'match' }, hookTest: false, hookOpen: {},
    qz: { phase: 'setup', n: 10, exam: false },
  };

  if (!S.sel.length) S.sel = UIDS.slice();

  // Built in start(), after any extras have registered. Tabs with no content for this class are hidden.
  var TABS, VIEWS;
  function buildTabs() {
    var has = {
      learn: Object.keys(LESSONS).length, cards: RAW_CARDS.length, quiz: RAW_QS.length, exam: EXAM.questions.length,
      practice: RAW_CARDS.length + RAW_TF.length + RAW_CLOZE.length + RAW_MATCH.length + RAW_SORTS.length + RAW_LISTS.length,
      hooks: HOOKS.length
    };
    VIEWS = { home: vHome, learn: vLearn, cards: vCards, quiz: vQuiz, exam: vExam, practice: vPractice, hooks: vHooks };
    TABS = [['home', 'Home'], ['learn', 'Learn'], ['cards', 'Flashcards'], ['quiz', 'Quiz'], ['exam', EXAM.title || 'Practice Exam'], ['practice', 'Practice'], ['hooks', 'Hooks']]
      .filter(function (t) { return t[0] === 'home' || has[t[0]]; });
    EXT.forEach(function (x) { (x.tabs || []).forEach(function (t) { TABS.push([t[0], t[1]]); VIEWS[t[0]] = t[2]; }); });
  }

  /* ---------- progress helpers ---------- */
  function unitStats(u) {
    var cs = CARDS.filter(function (c) { return c.u === u; });
    var done = cs.filter(function (c) { return (S.box[c.id] || 0) >= MASTERED; }).length;
    var qs = QS.filter(function (q) { return q.u === u; });
    var r = 0, w = 0;
    qs.forEach(function (q) { var st = S.qstat[q.id]; if (st) { r += st.r; w += st.w; } });
    return { cards: cs.length, done: done, r: r, w: w, acc: r + w ? Math.round(100 * r / (r + w)) : null };
  }

  /* ---------- nav ---------- */
  function renderTabs() {
    $('#tabs').innerHTML = TABS.map(function (t) {
      return '<button class="tab" data-a="tab" data-v="' + t[0] + '"' + (S.tab === t[0] ? ' aria-current="page"' : '') + '>' + t[1] + '</button>';
    }).join('');
  }
  // C.countdown: { weekday: 0-6, label: 'Friday' } for a weekly target, or { date: 'YYYY-MM-DD', label: 'the final' }.
  function countdown() {
    var cd = C.countdown, d;
    if (!cd) return;
    if (cd.date) {
      var now = new Date(), t = new Date(cd.date + 'T00:00:00');
      d = Math.round((t - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 864e5);
      if (d < 0) return;
    } else d = (cd.weekday - new Date().getDay() + 7) % 7;
    $('#countdown').textContent = d === 0 ? 'Exam day' : d + (d === 1 ? ' day' : ' days') + ' to ' + cd.label;
  }

  /* ---------- HOME ---------- */
  function vHome() {
    var day = new Date().getDay();
    var plan = C.plan || [];
    var rows = UIDS.map(function (u) {
      var s = unitStats(u), pct = s.cards ? Math.round(100 * s.done / s.cards) : 0;
      return '<div class="unit-row"><div><b>' + u + '. ' + UNITS[u] + '</b></div>' +
        '<div class="stack" style="gap:4px"><div class="bar" role="img" aria-label="' + pct + ' percent of cards mastered"><i style="width:' + pct + '%"></i></div>' +
        '<span class="small muted">' + s.done + ' of ' + s.cards + ' cards mastered</span></div>' +
        '<div class="small mono">' + (s.acc === null ? 'no quiz yet' : 'quiz ' + s.acc + '%') + '</div></div>';
    }).join('');
    var weak = QS.filter(function (q) { var st = S.qstat[q.id]; return st && st.last === 0; });
    var weakHtml = weak.length ? '<p>You have <b>' + weak.length + '</b> quiz question' + (weak.length > 1 ? 's' : '') + ' you last got wrong.</p><div class="row"><button class="btn" data-a="quizweak">Drill my weak spots</button></div>' : '<p class="muted">No missed questions yet. Take a quiz and your weak spots will show up here.</p>';
    var start = TABS.filter(function (t) { return t[0] !== 'home' && t[0] !== 'learn'; }).map(function (t, i) { return '<button class="btn' + (i ? ' ghost' : '') + '" data-a="tab" data-v="' + t[0] + '">' + t[1] + '</button>'; }).join('');
    return (plan.length ? '<div class="stack"><h2>What to do today</h2>' +
      '<div class="plan">' + plan.map(function (p) { return '<div class="' + (p[0] === day ? 'now' : '') + '"><div class="label">' + p[1] + (p[0] === day ? ' (today)' : '') + '</div><div class="small">' + p[2] + '</div></div>'; }).join('') + '</div></div>' : '<div class="stack"><h2>' + C.title + '</h2></div>') +
      '<div class="panel stack"><h3>Mastery by unit</h3>' + rows + '<p class="small muted">A card counts as mastered after two correct answers in a row.</p></div>' +
      '<div class="grid2"><div class="panel stack"><h3>Start here</h3><div class="row">' + start + '</div></div>' +
      '<div class="panel stack"><h3>Weak spots</h3>' + weakHtml + '</div></div>' +
      '<div class="row"><button class="btn ghost" data-a="reset">Reset all progress</button></div>';
  }

  /* ---------- LEARN ---------- */
  function paras(arr) {
    var out = '', list = [];
    function flush() { if (list.length) { out += '<ul class="tight">' + list.map(function (x) { return '<li>' + md(x) + '</li>'; }).join('') + '</ul>'; list = []; } }
    arr.forEach(function (p) {
      if (p === '[[tbl]]' || p === '[[viz]]') { flush(); out += p; }
      else if (p.indexOf('- ') === 0) list.push(p.slice(2));
      else { flush(); out += '<p>' + md(p) + '</p>'; }
    });
    flush(); return out;
  }
  function tblHtml(t) {
    return '<div class="scroll"><table class="tbl"><thead><tr>' + t.head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      t.rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  }
  // Lesson diagrams come from a class's extras.js: viz(key) returns { svg, cap } or null.
  function vizHtml(k) {
    for (var i = 0; i < EXT.length; i++) {
      var r = EXT[i].viz && EXT[i].viz(k);
      if (r) return '<figure class="viz">' + r.svg + '<figcaption class="small muted">' + r.cap + '</figcaption></figure>';
    }
    return '';
  }
  function lessonHtml(l, i, n) {
    var body = paras(l.t), hasT = body.indexOf('[[tbl]]') > -1, hasV = body.indexOf('[[viz]]') > -1;
    body = body.replace('[[tbl]]', l.tbl ? tblHtml(l.tbl) : '').replace('[[viz]]', l.viz ? vizHtml(l.viz) : '');
    if (l.tbl && !hasT) body += tblHtml(l.tbl);
    if (l.viz && !hasV) body += vizHtml(l.viz);
    if (l.ex) body += '<div class="box"><span class="label">Example</span>' + md(l.ex) + '</div>';
    if (l.exam) body += '<div class="box"><span class="label">On the exam</span>' + md(l.exam) + '</div>';
    if (l.chk) body += '<details class="chk"><summary>Check yourself: ' + l.chk[0] + '</summary><p>' + md(l.chk[1]) + '</p></details>';
    return '<article class="panel lesson stack" id="l' + i + '"><span class="label">Lesson ' + (i + 1) + ' of ' + n + '</span><h3>' + l.h + '</h3><div class="lbody">' + body + '</div></article>';
  }
  function vLearn() {
    var LU = UIDS.filter(function (k) { return LESSONS[k]; });
    var u = LESSONS[S.learnUnit] ? S.learnUnit : LU[0], U = LESSONS[u], items = U.items, next = LU[LU.indexOf(u) + 1];
    var chips = LU.map(function (k) { return '<button class="chip" data-a="learnunit" data-v="' + k + '" aria-pressed="' + (k === u) + '">' + k + '. ' + UNITS[k] + '</button>'; }).join('');
    var toc = items.map(function (l, i) { return '<button class="chip" data-a="jump" data-v="l' + i + '">' + (i + 1) + '. ' + l.h + '</button>'; }).join('');
    return '<div class="stack"><h2>Learn</h2><div class="row">' + chips + '</div>' + (U.intro ? '<p class="muted" style="max-width:68ch">' + U.intro + '</p>' : '') + '<details><summary style="font-size:1rem;font-family:var(--font-body)">Jump to a lesson (' + items.length + ')</summary><div class="toc" style="margin-top:8px">' + toc + '</div></details></div>' +
      items.map(function (l, i) { return lessonHtml(l, i, items.length); }).join('') +
      '<div class="panel stack"><h3>Done with ' + UL + ' ' + u + '?</h3><div class="row"><button class="btn" data-a="cardsunit" data-v="' + u + '">Flashcards for this unit</button><button class="btn ghost" data-a="quizunit" data-v="' + u + '">Quiz this unit</button>' + (next ? '<button class="btn ghost" data-a="learnunit" data-v="' + next + '">Next: ' + UL + ' ' + next + '</button>' : '') + '</div></div>';
  }

  /* ---------- FLASHCARDS ---------- */
  function startCards(unit) {
    var pool = CARDS.filter(function (c) { return inSel(c.u) && (S.box[c.id] || 0) < MASTERED; });
    S.cs = { unit: unit, queue: shuffle(pool).map(function (c) { return c.id; }), flipped: false, got: 0, missed: 0, total: pool.length };
  }
  function cardById(id) { return CARDS.filter(function (c) { return c.id === id; })[0]; }
  function vCards() {
    if (!S.cs) startCards('sel');
    var cs = S.cs;
    var head = '<div class="stack"><h2>Flashcards</h2>' + picker() + '</div>';
    if (!cs.queue.length) {
      return head + '<div class="panel stack"><h3>' + (cs.total ? 'Deck finished' : 'Everything here is mastered') + '</h3>' +
        '<p class="muted">' + (cs.total ? 'You got ' + cs.got + ' right and missed ' + cs.missed + ' during this run.' : 'Reset these units to study them again.') + '</p>' +
        '<div class="row"><button class="btn" data-a="cardsagain">Reset these cards and go again</button><button class="btn ghost" data-a="tab" data-v="quiz">Take a quiz</button></div></div>';
    }
    var c = cardById(cs.queue[0]);
    var done = cs.total - cs.queue.length;
    var back = cs.flipped ? '<div class="a">' + c.b + '</div>' : '<div class="small muted">Tap or press space to reveal</div>';
    return head + '<div class="row small muted"><span class="mono">' + cs.queue.length + ' left</span><span class="mono">right ' + cs.got + '</span><span class="mono">missed ' + cs.missed + '</span></div>' +
      '<button class="fc" data-a="flip" aria-label="Flashcard. Activate to reveal the answer"><span class="tag label">' + UL + ' ' + c.u + ' ' + UNITS[c.u] + '</span><div class="q">' + c.f + '</div>' + back + '</button>' +
      (cs.flipped ? '<div class="row"><button class="btn bad" data-a="missed">Missed it (left arrow)</button><button class="btn good" data-a="got">Got it (right arrow)</button></div>' : '');
  }
  function cardAnswer(ok) {
    var cs = S.cs, id = cs.queue.shift();
    var b = ok ? (S.box[id] || 0) + 1 : 0;
    S.box[id] = b; store.set('box', S.box);
    if (ok) cs.got++; else cs.missed++;
    if (!ok) { cs.queue.splice(Math.min(3, cs.queue.length), 0, id); }
    else if (b < MASTERED) { cs.queue.push(id); }
    cs.flipped = false;
    render();
  }

  /* ---------- QUIZ ---------- */
  function mkQ(q) { return { id: q.id, u: q.u, q: q.q, e: q.e, o: shuffle(q.o.map(function (t, i) { return { t: t, ok: i === 0 }; })) }; }
  function startQuiz(scope, n, exam) {
    var pool = QS.filter(function (q) {
      if (scope === 'weak') { var st = S.qstat[q.id]; return !st || st.last === 0; }
      return inSel(q.u);
    });
    pool = shuffle(pool).slice(0, n === 'all' ? pool.length : n);
    if (!pool.length) { S.qz = { phase: 'setup', n: 10, exam: false, note: 'Nothing to drill in that set yet.' }; return; }
    S.qz = { phase: 'q', scope: scope, n: n, exam: !!exam, list: pool.map(mkQ), i: 0, picked: null, score: 0, missed: [], byU: {} };
  }
  function vQuiz() {
    var z = S.qz;
    if (z.phase === 'setup') {
      var avail = QS.filter(function (q) { return inSel(q.u); }).length;
      return '<div class="stack"><h2>Quiz</h2><p class="muted">' + QS.length + ' multiple choice questions. Choose one unit or mix several. Mixing is the best exam prep.</p></div>' +
        '<div class="panel stack">' + picker() + '<p class="small muted">' + avail + ' questions in your selected units.</p>' +
        '<div class="label">Length</div><div class="row">' + [10, 20, 'all'].map(function (n) { return '<button class="chip" data-a="qn" data-v="' + n + '" aria-pressed="' + (String(z.n) === String(n)) + '">' + (n === 'all' ? 'Everything in set' : n + ' questions') + '</button>'; }).join('') + '</div>' +
        '<div class="label">Mode</div><div class="row"><button class="chip" data-a="qmode" data-v="0" aria-pressed="' + !z.exam + '">Learn (feedback after each)</button><button class="chip" data-a="qmode" data-v="1" aria-pressed="' + !!z.exam + '">Exam (score at the end)</button></div>' +
        (z.note ? '<p class="muted">' + z.note + '</p>' : '') + '<div class="row"><button class="btn" data-a="qstart">Start quiz</button><button class="btn ghost" data-a="quizweak">Weak spots only</button></div></div>';
    }
    if (z.phase === 'done') {
      var pct = Math.round(100 * z.score / z.list.length);
      return '<div class="stack"><h2>Result</h2></div><div class="panel stack"><div class="mono" style="font-size:2.4rem;font-weight:600">' + z.score + ' / ' + z.list.length + '</div><p class="muted">' + pct + '% correct.' + (z.missed.length ? ' Review what you missed below.' : ' Clean run.') + '</p>' +
        (z.missed.length ? '<div class="stack">' + z.missed.map(function (m) { return '<div class="fb no"><div class="label">' + UL + ' ' + m.u + '</div><p><b>' + m.q + '</b></p><p>Answer: ' + m.a + '</p><p class="small">' + m.e + '</p></div>'; }).join('') + '</div>' : '') +
        '<div class="stack" style="gap:4px"><span class="label">By unit</span>' + Object.keys(z.byU).sort().map(function (u) { var r = z.byU[u]; return '<div class="small mono">' + UL + ' ' + u + ' ' + UNITS[u] + ': ' + r[0] + ' / ' + r[1] + (r[0] < r[1] ? '  (review this unit)' : '') + '</div>'; }).join('') + '</div>' +
        '<div class="row">' + (z.missed.length ? '<button class="btn" data-a="qretry">Retry missed questions</button>' : '') + '<button class="btn ghost" data-a="qsetup">New quiz</button></div></div>';
    }
    var q = z.list[z.i], answered = z.picked !== null;
    var opts = q.o.map(function (o, i) {
      var cls = 'opt';
      if (answered) { if (z.exam) { if (z.picked === i) cls += ' sel'; } else if (o.ok) cls += ' right'; else if (z.picked === i) cls += ' wrong'; }
      return '<button class="' + cls + '" data-a="pick" data-v="' + i + '"' + (answered ? ' disabled' : '') + '><span class="k">' + (i + 1) + '</span><span>' + o.t + (answered && !z.exam && o.ok ? ' <b>(correct)</b>' : '') + (answered && !z.exam && z.picked === i && !o.ok ? ' <b>(your answer)</b>' : '') + '</span></button>';
    }).join('');
    var fb = '';
    if (answered && z.exam) fb = '<div class="row"><button class="btn" data-a="qnext">' + (z.i + 1 === z.list.length ? 'Finish exam' : 'Next question') + ' (Enter)</button></div>';
    else if (answered) { var ok = q.o[z.picked].ok; fb = '<div class="fb ' + (ok ? 'ok' : 'no') + '"><b>' + (ok ? 'Correct.' : 'Not quite.') + '</b> ' + q.e + '</div><div class="row"><button class="btn" data-a="qnext">' + (z.i + 1 === z.list.length ? 'See result' : 'Next question') + ' (Enter)</button></div>'; }
    return '<div class="row" style="justify-content:space-between"><h2>Quiz</h2><span class="mono muted">' + (z.i + 1) + ' / ' + z.list.length + '</span></div>' +
      '<div class="bar"><i style="width:' + Math.round(100 * z.i / z.list.length) + '%"></i></div>' +
      '<div class="panel stack"><span class="label">' + UL + ' ' + q.u + ' ' + UNITS[q.u] + '</span><h3 style="font-size:1.25rem">' + q.q + '</h3>' + opts + fb + '</div>';
  }
  function quizPick(i) {
    var z = S.qz; if (z.picked !== null) return;
    var q = z.list[z.i], ok = q.o[i].ok;
    z.picked = i;
    var bu = z.byU[q.u] || (z.byU[q.u] = [0, 0]); bu[1]++; if (ok) bu[0]++;
    var st = S.qstat[q.id] || { r: 0, w: 0, last: null };
    if (ok) { st.r++; st.last = 1; z.score++; } else { st.w++; st.last = 0; z.missed.push({ id: q.id, u: q.u, q: q.q, e: q.e, a: q.o.filter(function (o) { return o.ok; })[0].t }); }
    S.qstat[q.id] = st; store.set('qstat', S.qstat);
    render();
  }
  function quizNext() {
    var z = S.qz; if (z.picked === null) return;
    if (z.i + 1 >= z.list.length) { z.phase = 'done'; } else { z.i++; z.picked = null; }
    render();
  }


  /* ---------- shared unit picker ---------- */
  function inSel(u) { return S.sel.indexOf(u) > -1; }
  function uOk(u) { return Array.isArray(u) ? u.some(inSel) : inSel(u); }
  function picker() {
    return '<div class="stack" style="gap:6px"><span class="label">' + UL + 's</span><div class="row" role="group" aria-label="Units to study">' +
      UIDS.map(function (u) { return '<button class="chip" data-a="utoggle" data-v="' + u + '" aria-pressed="' + inSel(u) + '">' + u + '. ' + UNITS[u] + '</button>'; }).join('') +
      '<button class="chip" data-a="uall" aria-pressed="' + (S.sel.length === UIDS.length) + '">All</button></div></div>';
  }
  function resetModes() { S.cs = null; S.P = { mode: S.P ? S.P.mode : 'match' }; }
  function norm(s) { return String(s).toLowerCase().replace(/[%$.,;:!?"'()]/g, function (c) { return c === '.' ? '.' : ''; }).replace(/\s+/g, ' ').trim(); }
  function hit(text, kws) {
    var t = String(text).toLowerCase();
    return kws.some(function (k) {
      if (/^\d+$/.test(k)) return new RegExp('(^|[^0-9])' + k + '([^0-9]|$)').test(t);
      return t.indexOf(k) > -1;
    });
  }
  function doneBox(title, body, again, againLabel) {
    return '<div class="panel stack"><h3>' + title + '</h3>' + body + '<div class="row"><button class="btn" data-a="' + again + '">' + againLabel + '</button></div></div>';
  }

  /* ---------- PRACTICE ---------- */
  function vPractice() {
    var modes = [['match', 'Match'], ['tf', 'True or false'], ['cloze', 'Fill in the blank'], ['sort', 'Sort it'], ['write', 'Write it'], ['lists', 'Recall lists']];
    var P = S.P;
    var head = '<div class="stack"><h2>Practice</h2><p class="muted" style="max-width:68ch">Different ways to pull the same ideas out of your head. Pick your units, then a mode. Mixing units forces you to choose the right idea, which is what the exam does.</p>' + picker() +
      '<div class="stack" style="gap:6px"><span class="label">Mode</span><div class="row">' + modes.map(function (m) { return '<button class="chip" data-a="pmode" data-v="' + m[0] + '" aria-pressed="' + (P.mode === m[0]) + '">' + m[1] + '</button>'; }).join('') + '</div></div></div>';
    var body = { match: vMatch, tf: vTF, cloze: vCloze, sort: vSort, write: vWrite, lists: vLists }[P.mode]();
    return head + body;
  }

  /* match */
  function startMatch() {
    var pool = RAW_MATCH.filter(function (r) { return inSel(r[0]); });
    var pick = shuffle(pool).slice(0, 6).map(function (r, i) { return { id: i, term: r[1], def: r[2] }; });
    S.P.m = { pairs: pick, L: shuffle(pick.map(function (p) { return p.id; })), R: shuffle(pick.map(function (p) { return p.id; })), sl: null, sr: null, done: {}, wrong: 0, t0: Date.now(), t1: 0, msg: '' };
  }
  function vMatch() {
    if (!S.P.m) startMatch();
    var m = S.P.m, n = m.pairs.length;
    if (n < 2) return '<div class="panel"><p class="muted">Not enough terms in these units. Select another unit.</p></div>';
    var cnt = Object.keys(m.done).length;
    if (cnt === n) {
      return doneBox('Round cleared', '<p>You matched all ' + n + ' pairs in ' + Math.max(1, Math.round((m.t1 - m.t0) / 1000)) + ' seconds with ' + m.wrong + ' wrong ' + (m.wrong === 1 ? 'try' : 'tries') + '.</p>', 'mnew', 'Next round');
    }
    function col(ids, side, key) {
      return '<div class="stack" style="gap:8px">' + ids.map(function (id) {
        var p = m.pairs[id], d = m.done[id], sel = (side === 'l' ? m.sl : m.sr) === id;
        return '<button class="pbtn' + (d ? ' done' : '') + '" data-a="mpick" data-side="' + side + '" data-v="' + id + '" aria-pressed="' + sel + '"' + (d ? ' disabled' : '') + '>' + p[key] + '</button>';
      }).join('') + '</div>';
    }
    return '<div class="row small muted"><span class="mono">' + cnt + ' / ' + n + ' matched</span><span class="mono">wrong ' + m.wrong + '</span><span aria-live="polite">' + m.msg + '</span></div>' +
      '<p class="muted small">Tap a term, then tap its meaning.</p><div class="pairs">' + col(m.L, 'l', 'term') + col(m.R, 'r', 'def') + '</div>';
  }

  /* true or false */
  function startTF() { S.P.tf = { q: shuffle(RAW_TF.filter(function (r) { return inSel(r[0]); })).slice(0, 15), i: 0, score: 0, ans: null }; }
  function vTF() {
    if (!S.P.tf) startTF();
    var t = S.P.tf;
    if (!t.q.length) return '<div class="panel"><p class="muted">No statements for these units.</p></div>';
    if (t.i >= t.q.length) return doneBox('Done', '<div class="mono" style="font-size:2rem;font-weight:600">' + t.score + ' / ' + t.q.length + '</div>', 'tfnew', 'New set');
    var r = t.q[t.i], a = t.ans, fb = '';
    if (a !== null) { var ok = (a === r[2]); fb = '<div class="fb ' + (ok ? 'ok' : 'no') + '"><b>' + (ok ? 'Correct.' : 'Not quite.') + '</b> It is ' + (r[2] ? 'true' : 'false') + '. ' + r[3] + '</div><div class="row"><button class="btn" data-a="tfnext">' + (t.i + 1 === t.q.length ? 'See result' : 'Next') + '</button></div>'; }
    return '<div class="row small muted"><span class="mono">' + (t.i + 1) + ' / ' + t.q.length + '</span><span class="mono">score ' + t.score + '</span></div>' +
      '<div class="panel stack"><span class="label">' + UL + ' ' + r[0] + ' ' + UNITS[r[0]] + '</span><h3 style="font-size:1.3rem">' + r[1] + '</h3>' +
      '<div class="row"><button class="btn ghost" data-a="tfans" data-v="1"' + (a !== null ? ' disabled' : '') + '>True</button><button class="btn ghost" data-a="tfans" data-v="0"' + (a !== null ? ' disabled' : '') + '>False</button></div>' + fb + '</div>';
  }

  /* fill in the blank */
  function startCloze() { S.P.cl = { q: shuffle(RAW_CLOZE.filter(function (r) { return inSel(r[0]); })).slice(0, 12), i: 0, score: 0, res: null, val: '' }; }
  function clozeOk(val, answers) {
    var n = norm(val);
    return n !== '' && answers.some(function (a) { var na = norm(a); return n === na || (' ' + n + ' ').indexOf(' ' + na + ' ') > -1; });
  }
  function vCloze() {
    if (!S.P.cl) startCloze();
    var c = S.P.cl;
    if (!c.q.length) return '<div class="panel"><p class="muted">No sentences for these units.</p></div>';
    if (c.i >= c.q.length) return doneBox('Done', '<div class="mono" style="font-size:2rem;font-weight:600">' + c.score + ' / ' + c.q.length + '</div>', 'clnew', 'New set');
    var r = c.q[c.i], res = c.res, fb = '';
    var sentence = r[1].replace('___', '<span class="blank">' + (res ? r[2][0] : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;') + '</span>');
    if (res) {
      fb = '<div class="fb ' + (res === 'ok' ? 'ok' : 'no') + '"><b>' + (res === 'ok' ? 'Correct.' : res === 'shown' ? 'Answer shown.' : 'Not quite.') + '</b> The answer is "' + r[2][0] + '".</div><div class="row">' +
        (res !== 'ok' ? '<button class="btn ghost" data-a="clcount">My answer was right, count it</button>' : '') + '<button class="btn" data-a="clnext">' + (c.i + 1 === c.q.length ? 'See result' : 'Next') + '</button></div>';
    }
    return '<div class="row small muted"><span class="mono">' + (c.i + 1) + ' / ' + c.q.length + '</span><span class="mono">score ' + c.score + '</span></div>' +
      '<div class="panel stack"><span class="label">' + UL + ' ' + r[0] + ' ' + UNITS[r[0]] + '</span><h3 style="font-size:1.3rem;line-height:1.4">' + sentence + '</h3>' +
      (res ? '' : '<div class="row"><input type="text" id="cl-in" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Your answer" placeholder="Type the missing word"><button class="btn" data-a="clcheck">Check</button><button class="btn ghost" data-a="clshow">Show answer</button></div>') + fb + '</div>';
  }

  /* sort it */
  function pickSort(avoid) {
    var pool = RAW_SORTS.filter(function (s) { return uOk(s.u); });
    var alt = pool.filter(function (s) { return s !== avoid; });
    if (alt.length) pool = alt;
    if (!pool.length) return null;
    var s = pool[Math.floor(Math.random() * pool.length)];
    return { set: s, order: shuffle(s.items.map(function (_, i) { return i; })).slice(0, 10), i: 0, score: 0, ans: null };
  }
  function vSort() {
    if (!S.P.so) S.P.so = pickSort(null);
    var o = S.P.so;
    if (!o) return '<div class="panel"><p class="muted">No sorting sets for these units.</p></div>';
    var s = o.set;
    if (o.i >= o.order.length) {
      return '<div class="panel stack"><span class="label">' + s.title + '</span><h3>Set done</h3><div class="mono" style="font-size:2rem;font-weight:600">' + o.score + ' / ' + o.order.length + '</div><div class="row"><button class="btn" data-a="sonew">Another set</button><button class="btn ghost" data-a="sosame">Repeat this set</button></div></div>';
    }
    var it = s.items[o.order[o.i]], fb = '';
    if (o.ans !== null) { var ok = o.ans === it[1]; fb = '<div class="fb ' + (ok ? 'ok' : 'no') + '"><b>' + (ok ? 'Correct.' : 'Not quite.') + '</b> It goes in "' + s.b[it[1]] + '".</div><div class="row"><button class="btn" data-a="sonext">' + (o.i + 1 === o.order.length ? 'See result' : 'Next') + '</button></div>'; }
    return '<div class="row small muted"><span class="mono">' + (o.i + 1) + ' / ' + o.order.length + '</span><span class="mono">score ' + o.score + '</span></div>' +
      '<div class="panel stack"><span class="label">' + s.title + '</span><h3 style="font-size:1.3rem">' + it[0] + '</h3>' +
      '<div class="buckets">' + s.b.map(function (b, i) {
        var cls = 'opt';
        if (o.ans !== null) { if (i === it[1]) cls += ' right'; else if (i === o.ans) cls += ' wrong'; }
        return '<button class="' + cls + '" data-a="soans" data-v="' + i + '"' + (o.ans !== null ? ' disabled' : '') + '><span>' + b + '</span></button>';
      }).join('') + '</div>' + fb + '</div>';
  }

  /* write it (explain from memory) */
  function startWrite() {
    var pool = CARDS.filter(function (c) { return inSel(c.u); });
    var unm = pool.filter(function (c) { return (S.box[c.id] || 0) < MASTERED; });
    S.P.wr = { q: shuffle(unm.length >= 5 ? unm : pool).slice(0, 10), i: 0, shown: false, text: '', n: 0, p: 0, m: 0 };
  }
  function vWrite() {
    if (!S.P.wr) startWrite();
    var w = S.P.wr;
    if (!w.q.length) return '<div class="panel"><p class="muted">No cards for these units.</p></div>';
    if (w.i >= w.q.length) return doneBox('Done', '<p>Nailed it: <b>' + w.n + '</b>. Partly: <b>' + w.p + '</b>. Missed: <b>' + w.m + '</b>. Missed cards go back to the start of your flashcard progress.</p>', 'wrnew', 'New set');
    var c = w.q[w.i];
    var body;
    if (!w.shown) {
      body = '<label class="stack" style="gap:6px"><span class="muted small">Write the answer in your own words, from memory. Do not look at the Learn tab.</span><textarea id="wr-in" rows="4" placeholder="Type what you remember"></textarea></label><div class="row"><button class="btn" data-a="wrshow">Reveal the answer</button></div>';
    } else {
      body = '<div class="box"><span class="label">You wrote</span>' + (w.text.trim() ? w.text.replace(/</g, '&lt;') : '(nothing)') + '</div><div class="box"><span class="label">Model answer</span>' + c.b + '</div><p class="muted small">How did you do? Be honest. Missed sends it back to the start.</p>' +
        '<div class="row"><button class="btn bad" data-a="wrrate" data-v="m">Missed</button><button class="btn ghost" data-a="wrrate" data-v="p">Partly</button><button class="btn good" data-a="wrrate" data-v="n">Nailed it</button></div>';
    }
    return '<div class="row small muted"><span class="mono">' + (w.i + 1) + ' / ' + w.q.length + '</span></div><div class="panel stack"><span class="label">' + UL + ' ' + c.u + ' ' + UNITS[c.u] + '</span><h3 style="font-size:1.3rem">' + c.f + '</h3>' + body + '</div>';
  }

  /* recall lists */
  function startLists() { S.P.rl = { sets: shuffle(RAW_LISTS.filter(function (s) { return uOk(s.u); })), i: 0, res: null, text: '' }; }
  function vLists() {
    if (!S.P.rl) startLists();
    var L = S.P.rl;
    if (!L.sets.length) return '<div class="panel"><p class="muted">No lists for these units.</p></div>';
    var s = L.sets[L.i % L.sets.length];
    var body;
    if (!L.res) {
      body = '<label class="stack" style="gap:6px"><span class="muted small">Type everything you remember. Separate items with commas or new lines. There are ' + s.items.length + ' to find.</span><textarea id="rl-in" rows="5" placeholder="Type your list">' + L.text.replace(/</g, '&lt;') + '</textarea></label><div class="row"><button class="btn" data-a="rlcheck">Check my list</button><button class="btn ghost" data-a="rlgive">Show the list</button></div>';
    } else {
      var got = L.res.filter(Boolean).length;
      body = '<div class="mono" style="font-size:1.6rem;font-weight:600">' + got + ' / ' + s.items.length + '</div><ul class="tight" style="list-style:none;padding:0">' + s.items.map(function (it, i) { return '<li><b>' + (L.res[i] ? '[found]' : '[missing]') + '</b> ' + it[0] + '</li>'; }).join('') + '</ul>' +
        '<div class="row"><button class="btn" data-a="rlretry">Try this list again</button><button class="btn ghost" data-a="rlnext">Next list</button></div>';
    }
    return '<div class="row small muted"><span class="mono">list ' + ((L.i % L.sets.length) + 1) + ' of ' + L.sets.length + '</span></div><div class="panel stack"><span class="label">' + UL + ' ' + s.u.join(', ') + '</span><h3 style="font-size:1.3rem">' + s.title + '</h3>' + body + '</div>';
  }

  /* ---------- HOOKS ---------- */
  function vHooks() {
    var list = HOOKS.filter(function (h) { return inSel(h.u); });
    var test = S.hookTest;
    var cards = list.map(function (h, i) {
      var key = h.t, open = !test || S.hookOpen[key];
      return '<div class="panel stack hook"><span class="label">' + UL + ' ' + h.u + ' ' + UNITS[h.u] + '</span><h3>' + h.t + '</h3>' +
        (open ? '<div class="hookline">' + h.h + '</div><p class="small">' + md(h.w) + '</p>' : '<div class="row"><button class="btn ghost" data-a="hookshow" data-v="' + i + '">Show the hook</button></div>') + '</div>';
    }).join('');
    var tips = C.tips && C.tips.length ? '<div class="panel stack"><h3>How to get this into memory</h3><ul class="tight">' + C.tips.map(function (x) { return '<li>' + md(x) + '</li>'; }).join('') + '</ul></div>' : '';
    return '<div class="stack"><h2>Memory hooks</h2><p class="muted" style="max-width:68ch">Short phrases and acronyms that unpack into the full idea. Learn the hook, then use Test me to see if you can recall what it means.</p>' + picker() +
      '<div class="row"><button class="chip" data-a="hooktest" data-v="0" aria-pressed="' + !test + '">Show hooks</button><button class="chip" data-a="hooktest" data-v="1" aria-pressed="' + !!test + '">Test me (hooks hidden)</button></div></div>' + cards + tips;
  }

  function handleNew(a, v, t) {
    var P = S.P;
    switch (a) {
      case 'utoggle': var i = S.sel.indexOf(+v); if (i > -1) { if (S.sel.length > 1) S.sel.splice(i, 1); } else S.sel.push(+v); S.sel.sort(function (a, b) { return a - b; }); store.set('sel', S.sel); resetModes(); render(); return true;
      case 'uall': S.sel = UIDS.slice(); store.set('sel', S.sel); resetModes(); render(); return true;
      case 'pmode': P.mode = v; render(); return true;
      case 'mnew': startMatch(); render(); return true;
      case 'mpick': {
        var m = P.m, id = +v;
        if (t.dataset.side === 'l') m.sl = id; else m.sr = id;
        if (m.sl !== null && m.sr !== null) {
          if (m.sl === m.sr) { m.done[id] = true; m.msg = 'Match.'; if (Object.keys(m.done).length === m.pairs.length) m.t1 = Date.now(); }
          else { m.wrong++; m.msg = 'Not a match. Try again.'; }
          m.sl = null; m.sr = null;
        }
        render(); return true;
      }
      case 'tfnew': startTF(); render(); return true;
      case 'tfans': { var tf = P.tf; if (tf.ans !== null) return true; tf.ans = (v === '1'); if (tf.ans === tf.q[tf.i][2]) tf.score++; render(); return true; }
      case 'tfnext': P.tf.i++; P.tf.ans = null; render(); return true;
      case 'clnew': startCloze(); render(); return true;
      case 'clcheck': { var c = P.cl, val = ($('#cl-in') || {}).value || ''; if (!val.trim()) return true; var r = c.q[c.i]; if (clozeOk(val, r[2])) { c.res = 'ok'; c.score++; } else c.res = 'no'; render(); return true; }
      case 'clshow': P.cl.res = 'shown'; render(); return true;
      case 'clcount': { var c2 = P.cl; if (c2.res !== 'ok') { c2.res = 'ok'; c2.score++; } render(); return true; }
      case 'clnext': P.cl.i++; P.cl.res = null; render(); return true;
      case 'soans': { var o = P.so; if (o.ans !== null) return true; o.ans = +v; if (o.ans === o.set.items[o.order[o.i]][1]) o.score++; render(); return true; }
      case 'sonext': P.so.i++; P.so.ans = null; render(); return true;
      case 'sonew': P.so = pickSort(P.so ? P.so.set : null); render(); return true;
      case 'sosame': { var s0 = P.so.set; P.so = { set: s0, order: shuffle(s0.items.map(function (_, k) { return k; })).slice(0, 10), i: 0, score: 0, ans: null }; render(); return true; }
      case 'wrnew': startWrite(); render(); return true;
      case 'wrshow': P.wr.text = ($('#wr-in') || {}).value || ''; P.wr.shown = true; render(); return true;
      case 'wrrate': {
        var w = P.wr, card = w.q[w.i];
        if (v === 'n') { w.n++; S.box[card.id] = (S.box[card.id] || 0) + 1; }
        else if (v === 'm') { w.m++; S.box[card.id] = 0; }
        else w.p++;
        store.set('box', S.box);
        w.i++; w.shown = false; w.text = '';
        render(); return true;
      }
      case 'rlcheck': { var L = P.rl, set = L.sets[L.i % L.sets.length]; L.text = ($('#rl-in') || {}).value || ''; L.res = set.items.map(function (it) { return hit(L.text, it[1]); }); render(); return true; }
      case 'rlgive': { var L2 = P.rl; L2.res = L2.sets[L2.i % L2.sets.length].items.map(function () { return false; }); render(); return true; }
      case 'rlretry': P.rl.res = null; P.rl.text = ''; render(); return true;
      case 'rlnext': P.rl.i++; P.rl.res = null; P.rl.text = ''; render(); return true;
      case 'hooktest': S.hookTest = (v === '1'); S.hookOpen = {}; render(); return true;
      case 'hookshow': { var list = HOOKS.filter(function (h) { return inSel(h.u); }); S.hookOpen[list[+v].t] = true; render(); return true; }
    }
    return false;
  }

  /* ---------- PRACTICE EXAM ---------- */
  var EXQ = EXAM.questions.map(function (r) { return { n: r[0], q: r[1], o: r[2], a: r[3], e: r[4] }; });
  S.ex = { phase: 'setup', n: 25, exam: true, wrong: store.get('exwrong', []) };
  function vExam() {
    var z = S.ex;
    if (z.phase === 'setup') {
      var gaps = GAPS.map(function (g) { return '<details class="chk"><summary>' + g.h + '</summary><div class="lbody">' + g.t.map(function (p) { return '<p>' + md(p) + '</p>'; }).join('') + '</div></details>'; }).join('');
      return '<div class="stack"><h2>' + (EXAM.title || 'Practice exam') + '</h2>' + (EXAM.intro ? '<p class="muted" style="max-width:68ch">' + EXAM.intro + '</p>' : '') + '</div>' +
        '<div class="panel stack"><div class="label">Length</div><div class="row">' + [25, 50, 'all'].map(function (n) { return '<button class="chip" data-a="exn" data-v="' + n + '" aria-pressed="' + (String(z.n) === String(n)) + '">' + (n === 'all' ? 'All ' + EXQ.length : n + ' questions') + '</button>'; }).join('') + '</div>' +
        '<div class="label">Mode</div><div class="row"><button class="chip" data-a="exmode" data-v="1" aria-pressed="' + z.exam + '">Exam (score at the end)</button><button class="chip" data-a="exmode" data-v="0" aria-pressed="' + !z.exam + '">Learn (feedback after each)</button></div>' +
        '<div class="row"><button class="btn" data-a="exstart">Start</button>' + (z.wrong.length ? '<button class="btn ghost" data-a="exmissed">Redo my ' + z.wrong.length + ' missed</button>' : '') + '</div></div>' +
        (GAPS.length ? '<div class="panel stack"><h3>' + (EXAM.gapsTitle || 'Extra topics') + '</h3>' + (EXAM.gapsNote ? '<p class="muted small">' + EXAM.gapsNote + '</p>' : '') + gaps + '</div>' : '');
    }
    if (z.phase === 'done') {
      var pct = Math.round(100 * z.score / z.list.length);
      return '<div class="stack"><h2>Result</h2></div><div class="panel stack"><div class="mono" style="font-size:2.4rem;font-weight:600">' + z.score + ' / ' + z.list.length + '</div><p class="muted">' + pct + '% correct.' + (z.missed.length ? ' Review what you missed below.' : ' Clean run.') + '</p>' +
        z.missed.map(function (m) { return '<div class="fb no"><div class="label">Practice exam Q' + m.n + '</div><p><b>' + m.q + '</b></p><p>Answer: ' + m.ans + '</p><p class="small">' + m.e + '</p></div>'; }).join('') +
        '<div class="row"><button class="btn" data-a="exsetup">Back</button>' + (z.missed.length ? '<button class="btn ghost" data-a="exretry">Retry missed</button>' : '') + '</div></div>';
    }
    var q = z.list[z.i], answered = z.picked !== null;
    var opts = q.o.map(function (t, i) {
      var cls = 'opt';
      if (answered) { if (z.exam) { if (z.picked === i) cls += ' sel'; } else if (i === q.a) cls += ' right'; else if (z.picked === i) cls += ' wrong'; }
      return '<button class="' + cls + '" data-a="expick" data-v="' + i + '"' + (answered ? ' disabled' : '') + '><span class="k">' + (i + 1) + '</span><span>' + t + '</span></button>';
    }).join('');
    var fb = '';
    if (answered) {
      var last = z.i + 1 === z.list.length;
      fb = z.exam ? '' : '<div class="fb ' + (z.picked === q.a ? 'ok' : 'no') + '"><b>' + (z.picked === q.a ? 'Correct.' : 'Not quite.') + '</b> ' + q.e + '</div>';
      fb += '<div class="row"><button class="btn" data-a="exnext">' + (last ? 'See result' : 'Next question') + ' (Enter)</button></div>';
    }
    return '<div class="row" style="justify-content:space-between"><h2>' + (EXAM.title || 'Practice exam') + '</h2><span class="mono muted">' + (z.i + 1) + ' / ' + z.list.length + '</span></div><div class="bar"><i style="width:' + Math.round(100 * z.i / z.list.length) + '%"></i></div>' +
      '<div class="panel stack"><span class="label">Question ' + q.n + '</span><h3 style="font-size:1.2rem;line-height:1.4">' + q.q + '</h3>' + opts + fb + '</div>';
  }
  function exStart(pool, n, exam) {
    pool = shuffle(pool); if (n !== 'all') pool = pool.slice(0, n);
    S.ex = { phase: 'q', n: n, exam: exam, list: pool, i: 0, picked: null, score: 0, missed: [], wrong: S.ex.wrong };
  }
  function exPick(i) {
    var z = S.ex; if (z.picked !== null) return;
    var q = z.list[z.i]; z.picked = i;
    if (i === q.a) { z.score++; z.wrong = z.wrong.filter(function (n) { return n !== q.n; }); }
    else { z.missed.push({ n: q.n, q: q.q, ans: q.o[q.a], e: q.e, id: q.n }); if (z.wrong.indexOf(q.n) < 0) z.wrong.push(q.n); }
    store.set('exwrong', z.wrong); render();
  }
  function exNext() { var z = S.ex; if (z.picked === null) return; if (z.i + 1 >= z.list.length) z.phase = 'done'; else { z.i++; z.picked = null; } render(); }
  function handleExam(a, v) {
    var z = S.ex;
    switch (a) {
      case 'exn': z.n = v === 'all' ? 'all' : +v; render(); return true;
      case 'exmode': z.exam = (v === '1'); render(); return true;
      case 'exstart': exStart(EXQ.slice(), z.n, z.exam); render(); return true;
      case 'exmissed': exStart(EXQ.filter(function (q) { return z.wrong.indexOf(q.n) > -1; }), 'all', false); render(); return true;
      case 'expick': exPick(+v); return true;
      case 'exnext': exNext(); return true;
      case 'exsetup': S.ex = { phase: 'setup', n: z.n, exam: z.exam, wrong: z.wrong }; render(); return true;
      case 'exretry': { var ids = z.missed.map(function (m) { return m.id; }); exStart(EXQ.filter(function (q) { return ids.indexOf(q.n) > -1; }), 'all', false); render(); return true; }
    }
    return false;
  }

  /* ---------- render + events ---------- */
  function render() {
    renderTabs();
    $('#main').innerHTML = (VIEWS[S.tab] || vHome)();
    var f = $('#cl-in') || $('#wr-in'); if (f) { try { f.focus({ preventScroll: true }); } catch (e) {} }
  }
  function go(tab) { S.tab = tab; render(); window.scrollTo(0, 0); }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-a]'); if (!t) return;
    var a = t.dataset.a, v = t.dataset.v;
    if (a === 'tab') go(v);
    else if (a === 'learnunit') { S.learnUnit = +v; render(); window.scrollTo(0, 0); }
    else if (a === 'jump') { var el = document.getElementById(v); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    else if (a === 'cardsunit') { S.sel = [+v]; store.set('sel', S.sel); startCards('sel'); S.tab = 'cards'; render(); window.scrollTo(0, 0); }
    else if (a === 'cardsagain') { CARDS.forEach(function (c) { if (inSel(c.u)) delete S.box[c.id]; }); store.set('box', S.box); startCards('sel'); render(); }
    else if (a === 'flip') { S.cs.flipped = !S.cs.flipped; render(); }
    else if (a === 'got') cardAnswer(true);
    else if (a === 'missed') cardAnswer(false);
    else if (a === 'quizunit') { S.sel = [+v]; store.set('sel', S.sel); S.cs = null; S.qz = { phase: 'setup', n: 10, exam: false }; S.tab = 'quiz'; render(); window.scrollTo(0, 0); }
    else if (a === 'quizweak') { startQuiz('weak', 10, false); S.tab = 'quiz'; render(); }
    else if (a === 'qmode') { S.qz.exam = (v === '1'); render(); }
    else if (a === 'qn') { S.qz.n = v === 'all' ? 'all' : +v; render(); }
    else if (a === 'qstart') { startQuiz('sel', S.qz.n, S.qz.exam); render(); }
    else if (a === 'pick') quizPick(+v);
    else if (a === 'qnext') quizNext();
    else if (a === 'qsetup') { S.qz = { phase: 'setup', n: 10, exam: false }; render(); }
    else if (a === 'qretry') {
      var ids = S.qz.missed.map(function (m) { return m.id; });
      var list = QS.filter(function (q) { return ids.indexOf(q.id) > -1; });
      S.qz = { phase: 'q', scope: 'retry', n: list.length, exam: false, list: shuffle(list).map(mkQ), i: 0, picked: null, score: 0, missed: [], byU: {} };
      render();
    }
    else if (handleNew(a, v, t)) { }
    else if (handleExam(a, v)) { }
    else if (EXT.some(function (x) { return x.click && x.click(a, v, t); })) { }
    else if (a === 'reset') {
      if (t.dataset.armed) { S.box = {}; S.qstat = {}; store.set('box', {}); store.set('qstat', {}); S.cs = null; S.P = { mode: 'match' }; S.ex.wrong = []; store.set('exwrong', []); render(); }
      else { t.dataset.armed = '1'; t.textContent = 'Tap again to erase all progress'; }
    }
  });
  document.addEventListener('input', function (e) {
    var t = e.target, i = t.dataset && t.dataset.i; if (!i) return;
    EXT.some(function (x) { return x.input && x.input(i, t); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.target.id === 'cl-in' && e.key === 'Enter') { e.preventDefault(); handleNew('clcheck', null, e.target); return; }
    if (/INPUT|TEXTAREA|SELECT/.test((e.target.tagName || ''))) return;
    if (S.tab === 'practice' && S.P.mode === 'cloze' && S.P.cl && S.P.cl.res && e.key === 'Enter' && !(e.target.closest && e.target.closest('button'))) { e.preventDefault(); handleNew('clnext', null, e.target); return; }
    if (S.tab === 'cards' && S.cs && S.cs.queue.length) {
      if (e.key === ' ' || e.key === 'Enter') { if (e.target.closest && e.target.closest('button')) return; e.preventDefault(); S.cs.flipped = !S.cs.flipped; render(); }
      else if (S.cs.flipped && e.key === 'ArrowRight') cardAnswer(true);
      else if (S.cs.flipped && e.key === 'ArrowLeft') cardAnswer(false);
    } else if (S.tab === 'exam' && S.ex.phase === 'q') {
      if (/^[1-4]$/.test(e.key)) exPick(+e.key - 1);
      else if (e.key === 'Enter' && S.ex.picked !== null && !(e.target.closest && e.target.closest('button'))) { e.preventDefault(); exNext(); }
    } else if (S.tab === 'quiz' && S.qz.phase === 'q') {
      if (/^[1-4]$/.test(e.key)) quizPick(+e.key - 1);
      else if (e.key === 'Enter' && S.qz.picked !== null && !(e.target.closest && e.target.closest('button'))) { e.preventDefault(); quizNext(); }
    }
  });

  /* ---------- public API for extras.js + boot ---------- */
  window.StudyApp = {
    course: C, S: S, store: store, $: $, md: md, fmt: fmt, money: money, shuffle: shuffle, hash: hash, render: render,
    // ext: { tabs: [[id, label, viewFn]], viz: fn(key) -> { svg, cap } | null, click: fn(action, value, el) -> handled?, input: fn(dataI, el) -> handled? }
    register: function (ext) { EXT.push(ext); },
    start: function () {
      document.title = C.title;
      $('#brand').textContent = C.title;
      buildTabs();
      countdown();
      render();
    }
  };
})();
