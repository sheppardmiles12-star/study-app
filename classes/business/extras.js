/* Business 2025 extras: a Daily Reps tab that turns the course's practice missions into
   something you check off: 10 conversations a week, 15 minutes of coordination a day,
   a weekly record-and-review focus, planning the night before, and a vocal drill.
   Progress is saved in this browser only. */
(function () {
  'use strict';
  var A = window.StudyApp, S = A.S, render = A.render, store = A.store, shuffle = A.shuffle;

  var css = document.createElement('style');
  css.textContent =
    '.days { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; }' +
    '.days button { border: 1px solid var(--line); background: var(--surface); border-radius: 8px; padding: 8px 0; font-size: 0.85rem; }' +
    '.days button[aria-pressed="true"] { background: var(--good); border-color: var(--good); color: var(--on-sem); }' +
    '.days button.today { outline: 2px solid var(--ink); outline-offset: 1px; }' +
    '.big { font-family: var(--font-mono); font-size: 2.2rem; font-weight: 600; }' +
    '.line { font-size: 1.15rem; line-height: 1.5; padding: 12px 14px; border-left: 3px solid var(--ink); background: var(--surface2); border-radius: 0 8px 8px 0; }';
  document.head.appendChild(css);

  // Week key = the Monday of the current week, so every count resets each Monday.
  function monday(d) { d = new Date(d.getFullYear(), d.getMonth(), d.getDate()); var k = (d.getDay() + 6) % 7; d.setDate(d.getDate() - k); return d; }
  function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function weekKey() { return iso(monday(new Date())); }
  function todayIdx() { return (new Date().getDay() + 6) % 7; }

  var R = store.get('reps', {});
  function wk() { var k = weekKey(); if (!R[k]) R[k] = { convos: 0, coord: [0, 0, 0, 0, 0, 0, 0], plan: [0, 0, 0, 0, 0, 0, 0], focus: '', review: [0, 0, 0, 0] }; return R[k]; }
  function save() { store.set('reps', R); }

  var FOUNDATIONS = ['Rate of speech', 'Volume', 'Pitch / melody', 'Tonality', 'Pausing'];
  var REVIEW = ['Recorded 5 minutes, impromptu, standing', 'Waited a day, then listened with sound only', 'Watched it muted', 'Read the transcript and highlighted filler words'];
  var DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Practice lines written for this app (cold-call style, roofing niche).
  var LINES = [
    'Hey, it\'s Sam, I work with a few roofing companies in the area. Quick question: who takes care of getting new jobs on the calendar there?',
    'Most roofers I talk to are great at the work. The part that keeps them up at night is where next month\'s jobs are coming from.',
    'Here\'s what we do. We run the ads, we call every lead within minutes, and the appointments land on your calendar. You just show up and quote.',
    'The investment is two thousand dollars a month.',
    'If we don\'t get you booked appointments, you shouldn\'t keep paying us. That\'s how sure we are.',
    'So what happened the last time you tried marketing? What worked, and what didn\'t?',
    'I\'ve got Thursday at ten or Friday at two. Which one works better for you?'
  ];
  var DRILLS = [
    { f: 'Rate of speech', d: 'Read the line twice. First at your normal speed. Then race through the unimportant words and go painfully slow on the one phrase that matters most.' },
    { f: 'Volume', d: 'Read it at a 3 out of 10, then a 7, then drop to a near-whisper on the most important words. Notice which makes people lean in.' },
    { f: 'Pitch / melody', d: 'Siren it: start low and slide high and back within the sentence. Then read it normally with a little more melody than usual.' },
    { f: 'Tonality', d: 'Read it four times with four faces: bored, excited, confused, confident. Hear how your face changes your voice.' },
    { f: 'Pausing', d: 'Read it with a full two-second pause right before (or right after) the key phrase. Stay in the silence; do not fill it.' },
    { f: 'Downward inflection', d: 'Read it once ending every sentence going up, like a question. Then again ending every sentence going down. Which one would you trust?' },
    { f: 'Gestures', d: 'Stand up. Read it with your hands in the Power Sphere, once with palms up (placator) and once with palms down (leveler). Listen to your pitch change.' }
  ];
  var D = S.reps = { line: Math.floor(Math.random() * LINES.length), drill: Math.floor(Math.random() * DRILLS.length) };

  function bar(n, of) { var p = Math.min(100, Math.round(100 * n / of)); return '<div class="bar" role="img" aria-label="' + p + ' percent"><i style="width:' + p + '%"></i></div>'; }
  function days(kind, arr) {
    var t = todayIdx();
    return '<div class="days" role="group">' + DAYS.map(function (d, i) { return '<button data-a="repday" data-k="' + kind + '" data-v="' + i + '" aria-pressed="' + !!arr[i] + '" class="' + (i === t ? 'today' : '') + '">' + d + '</button>'; }).join('') + '</div>';
  }

  function vReps() {
    var w = wk(), coordDone = w.coord.filter(Boolean).length, planDone = w.plan.filter(Boolean).length, dr = DRILLS[D.drill];
    var weeks = Object.keys(R).sort().reverse().slice(1, 5).map(function (k) { var x = R[k]; return '<div class="small mono">Week of ' + k + ': ' + x.convos + ' conversations, ' + x.coord.filter(Boolean).length + ' coordination days</div>'; }).join('');
    return '<div class="stack"><h2>Daily Reps</h2><p class="muted" style="max-width:68ch">Reading about communication changes nothing. These are the course\'s practice missions. Check them off as you go; the week resets every Monday. Saved in this browser only.</p></div>' +

      '<div class="grid2"><div class="panel stack"><span class="label">Mission · this week</span><h3>Start 10 conversations with strangers</h3>' +
      '<div class="row" style="align-items:center"><button class="btn ghost" data-a="repconvo" data-v="-1" aria-label="Remove one">-</button><span class="big">' + w.convos + ' / 10</span><button class="btn" data-a="repconvo" data-v="1">+1 conversation</button></div>' + bar(w.convos, 10) +
      '<p class="small muted">' + (w.convos >= 10 ? 'Done for the week. Tell the community how one of them went.' : 'Elevators, drive-thrus, coffee lines, checkouts, transit, Ubers. Open with something about them.') + '</p></div>' +

      '<div class="panel stack"><span class="label">Mission · every day</span><h3>15 minutes of react-and-adjust practice</h3>' + days('coord', w.coord) + bar(coordDone, 7) +
      '<p class="small muted">Juggling, jump rope tricks, freestyle dancing to music you don\'t know, or drumming and improvising. ' + coordDone + ' of 7 days this week.</p></div></div>' +

      '<div class="panel stack"><span class="label">Vocal drill · ' + dr.f + '</span><div class="line">' + LINES[D.line] + '</div><p>' + dr.d + '</p>' +
      '<div class="row"><button class="btn ghost" data-a="repnew" data-v="line">New line</button><button class="btn ghost" data-a="repnew" data-v="drill">New drill</button></div>' +
      '<p class="small muted">Practice lines are written for this app in cold-call style. Record yourself doing the drill if you can.</p></div>' +

      '<div class="grid2"><div class="panel stack"><span class="label">Record and review · this week</span><h3>This week\'s one focus</h3>' +
      '<div class="row" role="group">' + FOUNDATIONS.map(function (f) { return '<button class="chip" data-a="repfocus" data-v="' + f + '" aria-pressed="' + (w.focus === f) + '">' + f + '</button>'; }).join('') + '</div>' +
      '<div class="stack" style="gap:6px">' + REVIEW.map(function (r, i) { return '<label style="display:flex;gap:8px;align-items:flex-start"><input type="checkbox" data-a="reprev" data-v="' + i + '"' + (w.review[i] ? ' checked' : '') + '> <span class="small">' + r + '</span></label>'; }).join('') + '</div>' +
      '<p class="small muted">Pick one foundation and stay on it all week. If it did not change, keep the same focus next week.</p></div>' +

      '<div class="panel stack"><span class="label">Habit · every night</span><h3>Planned tomorrow the night before</h3>' + days('plan', w.plan) + bar(planDone, 7) +
      '<p class="small muted">Plan while you are calm; spend the morning acting, not deciding.</p></div></div>' +

      (weeks ? '<div class="panel stack"><span class="label">Past weeks</span>' + weeks + '</div>' : '');
  }

  function click(a, v, t) {
    var w = wk();
    if (a === 'repconvo') { w.convos = Math.max(0, w.convos + (+v)); }
    else if (a === 'repday') { var arr = w[t.dataset.k]; arr[+v] = arr[+v] ? 0 : 1; }
    else if (a === 'repfocus') { w.focus = w.focus === v ? '' : v; }
    else if (a === 'reprev') { w.review[+v] = t.checked ? 1 : 0; save(); return true; }
    else if (a === 'repnew') { if (v === 'line') D.line = (D.line + 1 + Math.floor(Math.random() * (LINES.length - 1))) % LINES.length; else D.drill = (D.drill + 1 + Math.floor(Math.random() * (DRILLS.length - 1))) % DRILLS.length; render(); return true; }
    else return false;
    save(); render(); return true;
  }

  A.register({ tabs: [['reps', 'Daily Reps', vReps]], click: click });
})();
