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

/* Practice Lab: application practice instead of recall.
   Situations: realistic scenarios; every option explains why it is right or wrong.
   Agency Math: freshly generated numbers each time, with worked solutions.
   Explain It: write the idea in your own words, then compare with the key points. */
(function () {
  'use strict';
  var A = window.StudyApp, S = A.S, render = A.render, store = A.store, shuffle = A.shuffle, md = A.md, C = A.course;

  var css = document.createElement('style');
  css.textContent =
    '.why { font-size: 0.92rem; margin-top: 4px; }' +
    '.opt .why { display: block; color: var(--ink); }' +
    '.sit { font-size: 1.05rem; line-height: 1.55; padding: 12px 14px; background: var(--surface2); border-radius: 8px; }' +
    '.keys li.hit { color: var(--good); }';
  document.head.appendChild(css);

  /* ---------- Situations: [unit, situation, question, [[option, correct, why], ...]] ---------- */
  var SIT = [
    [1, 'A friend says: "My agency did $20,000 last month. I\'m basically rich now."', 'What is the most useful first question to ask?',
      [['"How much did it cost you to deliver that?"', true, 'Revenue is not profit. LaunchPad once collected $11,025 in a month and kept $28. Until you know costs, $20,000 tells you nothing about how much they made.'],
       ['"How many clients is that?"', false, 'Useful later, but it still does not tell you whether the agency made money.'],
       ['"What niche are you in?"', false, 'Interesting, but unrelated to whether $20,000 of revenue is a good month.'],
       ['"How many dials did that take?"', false, 'That is about acquisition effort, not whether the business is profitable.']]],
    [1, 'You build the automation that texts a roofing client\'s new leads within 60 seconds of them filling out the ad form.', 'Which part of the agency is this?',
      [['Back-end fulfillment', true, 'It serves a client (fulfillment), and it is a system rather than a conversation (back end).'],
       ['Front-end fulfillment', false, 'Front end means talking to people directly, like calling those leads. Building the automation is a system.'],
       ['Back-end acquisition', false, 'Acquisition is about getting YOUR clients. These are your client\'s leads, so it is fulfillment.'],
       ['Front-end acquisition', false, 'Neither front end (it is a system) nor acquisition (it serves an existing client).']]],
    [1, 'You personally call homeowners who filled out your roofing client\'s ad, to book them for roof quotes.', 'Which part of the agency is this?',
      [['Front-end fulfillment', true, 'You are delivering the service you promised the client (fulfillment) by talking to people directly (front end).'],
       ['Front-end acquisition', false, 'It is a phone call, but the people you are calling are your client\'s leads, not prospects for your agency.'],
       ['Back-end fulfillment', false, 'Back end is the systems (automations, onboarding). A live call is front end.'],
       ['Back-end acquisition', false, 'It is neither a system nor about getting your own clients.']]],
    [1, 'A roofer you\'ve never worked with offers a revenue share: you get 10% of every job your ads produce, nothing up front. Another offers a $1,500/month retainer.', 'What is the main risk of the revenue share deal?',
      [['If the ads don\'t produce jobs (or the roofer doesn\'t close them), you may earn nothing for your work', true, 'With revshare your pay depends on results you don\'t fully control. A retainer pays you even in a slow month. LaunchPad\'s first two clients were revshare, so they collected nothing up front from them.'],
       ['Revenue share is illegal for agencies', false, 'It is a normal way to structure a deal.'],
       ['You will always earn less than a retainer', false, 'Not always. If the ads work well, 10% of many jobs can beat $1,500. The point is the uncertainty.'],
       ['There is no risk; revenue share is always better', false, 'You carry the risk that results are slow or poorly tracked.']]],
    [1, 'A prospect on your strategy call says "Let\'s do it."', 'What should happen next, according to the course\'s process?',
      [['Collect payment, then book the onboarding call', true, 'The process is prospect, strategy call, close, collect payment, onboarding. Taking payment first means you are not doing work for someone who has not committed.'],
       ['Book the onboarding call and send the invoice next month', false, 'Payment comes before onboarding in the course\'s process.'],
       ['Start running their ads right away', false, 'You do not have the onboarding information yet, and you have not been paid.'],
       ['Send them more information to think about', false, 'They already said yes. Adding steps risks losing the close.']]],
    [1, 'You are deciding whether to sell to "any local business" or only to roofers.', 'Why does a single niche usually make selling easier?',
      [['Results and wording from one roofer carry over to the next, so your pitch and proof get stronger with each client', true, 'A roofer cares that you got another roofer booked jobs. Your knowledge of their problems compounds.'],
       ['Roofers are the only businesses that buy marketing', false, 'Many industries buy marketing; the benefit is focus, not that roofing is special.'],
       ['It lets you charge any price you want', false, 'A niche helps credibility, but pricing still depends on value and the market.'],
       ['You need fewer dials', false, 'You still need volume; LaunchPad did 150 dials a day in a niche.']]],

    [2, 'Month 4. You have three clients, fulfillment is messy, and one client complains. Your partner says: "Let\'s stop cold calling for three weeks and fix delivery first."', 'What does the course say to do?',
      [['Keep acquiring while improving fulfillment, and be honest with clients about where you are', true, 'This is LaunchPad\'s month 5 mistake. They paused acquisition, lost retainers anyway, and profited $28. You learn fulfillment through reps with real clients.'],
       ['Pause calling until delivery is perfect', false, 'That is exactly what cost LaunchPad month 5: revenue dropped to $11,025 and profit to $28.'],
       ['Drop the complaining client', false, 'Losing clients is the problem you are trying to avoid; honesty plus improvement is the course\'s answer.'],
       ['Lower your price for everyone', false, 'Price is not the issue; delivery is. Cutting price shrinks profit without fixing anything.']]],
    [2, 'You have watched about 20 hours of the classroom but have not made a single call. You want to "finish learning first."', 'What is the course\'s advice?',
      [['Start dialing now, and learn the next module alongside doing', true, 'LaunchPad\'s biggest regret was two months of "getting ready." The classroom is built to learn one module, then implement.'],
       ['Finish everything first so you don\'t make mistakes', false, 'Mistakes are how you learn; the course says it could have cold called on day three.'],
       ['Wait until you incorporate', false, 'The course says you can wait on incorporating until you have a few clients.'],
       ['Buy more software first', false, '"Start lean." Tools are not the bottleneck.']]],
    [2, 'In month 3 LaunchPad collected $11,613 but kept almost nothing, because another agency did the fulfillment while teaching them.', 'What trade-off were they making?',
      [['Giving up profit now to learn fulfillment faster from experts', true, 'Outsourcing to learn costs money. The founder says it was worth it, but you should choose it knowingly.'],
       ['They were cheated by the other agency', false, 'Nothing suggests that; they chose to pay for help and teaching.'],
       ['Revenue share clients paid nothing', false, 'That was month 1, not month 3.'],
       ['They stopped cold calling', false, 'They kept dialing; the cost was outsourcing.']]],
    [2, 'You live in a small town with no other entrepreneurs, and you feel unmotivated.', 'What does the course suggest?',
      [['Build your environment online: post, ask questions, DM members, find people near you on the map', true, '"Your environment is everything." If it is not around you in person, create it online.'],
       ['Move to a big city first', false, 'Not required; the course points to the online community.'],
       ['Work alone until you hit your goals', false, 'The course argues the opposite: the people around you push your growth.'],
       ['Take a break until motivation comes back', false, 'Motivation follows action and environment, not waiting.']]],

    [3, 'On your call, the prospect agrees you clearly know ads, but keeps questioning your numbers and says "I\'ll think about it."', 'What is the most likely missing ingredient?',
      [['Warmth: they believe you are competent but do not yet trust or like you', true, 'Competence without warmth makes people suspicious, and suspicious people push back on numbers and stall.'],
       ['More competence: show more data', false, 'They already believe you know your stuff. More data rarely fixes a trust problem.'],
       ['A lower price', false, 'Discounting does not build trust, and it trains people to push back.'],
       ['Talking faster to cover more', false, 'Speed signals nerves and reduces warmth further.']]],
    [3, 'A new setter is super friendly: lots of laughing, constant nodding, agrees with everything. Prospects enjoy the calls but rarely book.', 'What is going on?',
      [['Too much warmth and not enough competence: they are liked but not taken seriously', true, 'Too much of any warmth cue reads as not credible. Add competence cues like a steady pace, downward inflection, and clear next steps.'],
       ['They need more warmth', false, 'Warmth is already high; that is the problem.'],
       ['The prospects are bad leads', false, 'Possible, but the pattern of "enjoyed it, did not book" points to credibility.'],
       ['They should stop talking to prospects', false, 'They need balance, not silence.']]],
    [3, 'Two setters use the same script. One books three times as many appointments.', 'According to the course, what explains the difference?',
      [['Delivery: how they communicate the same words', true, '"The only difference between salespeople is their level of delivery."'],
       ['Luck', false, 'Over many calls, luck evens out; delivery does not.'],
       ['One has a better script', false, 'They use the same script.'],
       ['One dials more', false, 'Possible in real life, but the course\'s point is delivery.']]],
    [3, 'In month 1 you are tempted to hire a closer on 30% commission so you can focus on ads.', 'What does the course say?',
      [['Close yourself for now: you keep that profit and build the most valuable skill', true, 'Outsourcing setting and closing costs 20 to 40% of profit and skips the skill you most need.'],
       ['Hire the closer; closing is not a founder skill', false, 'The course argues the opposite.'],
       ['Hire two closers to scale faster', false, 'You would double the profit you give away before you know your own offer.'],
       ['Stop closing calls and use only email', false, 'Not what the course teaches; communication is the core skill.']]],

    [4, 'You are about to say your price on a closing call.', 'Which delivery fits the vocal foundations?',
      [['Slow down on the number, end it going down, then pause and let it sit', true, 'Slowing highlights it, a downward inflection signals you believe it, and the pause lets it land instead of rushing to justify it.'],
       ['Say it quickly so it sounds small', false, 'Rushing signals nerves and makes the number feel like something you are embarrassed about.'],
       ['Raise your pitch at the end to sound friendly', false, 'An upward ending turns your price into a question and invites negotiation.'],
       ['Immediately explain why it is worth it before they react', false, 'Filling the silence shows discomfort. Pause first.']]],
    [4, 'Your first record-and-review shows: volume around 3 out of 10, flat melody, lots of "um", and you swivel in your chair.', 'What should next week\'s plan be?',
      [['Pick ONE thing (say, volume), focus on it all week, then record and review again', true, 'Vinh\'s method: one focus per week until it changes. Trying to fix everything leads to overwhelm and nothing changes.'],
       ['Fix all four things at once', false, 'This is the overwhelm trap Vinh warns about.'],
       ['Stop recording; it makes you self-conscious', false, 'Recording is the only way to see your habits.'],
       ['Practice only on real sales calls', false, 'Practice on neutral ears and recordings too; sales calls alone give too few reps.']]],
    [4, 'On a call you feel excited about the client\'s results, but your recording shows you sounded flat.', 'What is Vinh\'s quickest fix?',
      [['Let your face show the emotion; your face is the remote control for tonality', true, 'Change your expression and your voice follows. You can hear a smile.'],
       ['Talk louder', false, 'Volume alone without emotion can sound aggressive.'],
       ['Use more filler words to sound casual', false, 'Filler words reduce clarity.'],
       ['Read from a script', false, 'Scripts often make delivery flatter, not more emotional.']]],
    [4, 'A teammate tries more melody and volume and says "this feels fake, it\'s not me."', 'What is the best response, using Vinh\'s idea?',
      [['"It feels fake because it is unfamiliar. Your current voice is a set of habits you copied; you can practice new ones."', true, 'You can make the sound, so it is you. You are just pressing keys you have not used before.'],
       ['"You\'re right, stick with your natural voice."', false, 'Vinh argues there is no fixed "natural" voice; it is learned habits.'],
       ['"Only extroverts can do that."', false, 'Introversion is about energy, not ability.'],
       ['"Just copy how I talk exactly."', false, 'The goal is range in your own instrument, not imitation.']]],
    [4, 'You pause after an important point, and the prospect keeps jumping in and talking over you.', 'What does Vinh suggest?',
      [['Raise your vocal and physical presence (volume, gestures, posture) so the pause reads as intentional', true, 'People interrupt low-presence speakers. With stronger presence, a pause is clearly for effect, not an invitation.'],
       ['Never pause again', false, 'Pausing is one of the five foundations; the fix is presence, not removing pauses.'],
       ['Talk faster so there is no room', false, 'Speeding up signals nerves.'],
       ['Ask them to stop interrupting', false, 'Sometimes useful, but the course\'s first fix is your own presence.']]],
    [4, 'You start practicing more vocal variety at home and your partner laughs and asks why you are talking weird.', 'What does Vinh recommend?',
      [['Practice on "neutral ears" first, and tell your partner ahead of time what you are working on so they encourage you', true, 'Strangers have no expectations, so new behaviors stick. Priming your partner turns them into support.'],
       ['Give up; people who know you will never accept the change', false, 'Vinh says the change works with a process.'],
       ['Only practice when alone', false, 'You need real reactions to make it feel normal.'],
       ['Do it louder until they get used to it', false, 'Without context, people pull you back to your old self.']]],

    [5, 'You state the price as "The investment is $2,000?" and the prospect immediately asks for a discount.', 'What most likely invited the negotiation?',
      [['The rising, question-like ending, which signaled you were not sure of the number', true, 'An upward inflection on a statement makes it sound like a question. Say it with a downward inflection.'],
       ['$2,000 is always too expensive', false, 'Price objections depend on value and delivery, not a universal number.'],
       ['You said it too slowly', false, 'Slowing down highlights it; the problem was the ending.'],
       ['You should have avoided saying a price', false, 'You must state the price; how you say it matters.']]],
    [5, 'While you explain your guarantee, the prospect slightly tightens their lower eyelids and tilts their head.', 'What should you do?',
      [['Pause and check: "Does that make sense? Any questions about how that works?"', true, 'A lower lid flex shows focus, which can mean confusion or skepticism. Clear it up before moving on.'],
       ['Keep going; it means they love it', false, 'It is a focus cue, not necessarily a positive one.'],
       ['End the call; they are not interested', false, 'It means they are paying close attention.'],
       ['Speed up to finish before they object', false, 'Rushing past doubt lets it grow.']]],
    [5, 'On Zoom your face fills the whole screen, the room is dim, and you sit stiffly.', 'Which change helps most?',
      [['Sit back so your torso and hands show, light your face from the front, and bring more energy than in person', true, 'Too close feels like "intimate space." Showing hands enables gestures, lighting makes you clear, and webcams flatten energy.'],
       ['Move even closer so they see your expressions', false, 'Closer feels uncomfortable for them and hides your gestures.'],
       ['Turn the camera off', false, 'You lose all body-language cues.'],
       ['Stay calm and minimal to seem professional', false, 'On camera, minimal reads as flat; Vinh says to give more.']]],
    [5, 'You need to firmly explain that payment must be received before onboarding.', 'Which gesture fits?',
      [['Leveler: palms facing down', true, 'Palms down signals authority and control, and your pitch naturally drops with it.'],
       ['Placator: palms up', false, 'Palms up is open and friendly, closer to "I don\'t know"; it lacks authority here.'],
       ['Blamer: pointing at the camera', false, 'Pointing feels accusing.'],
       ['Distractor: a clap', false, 'That is a pattern break, not authority.']]],
    [5, 'A prospect is explaining a painful problem with their last marketing agency.', 'How should you show you are listening?',
      [['Slow nods and facial reactions, without interrupting', true, 'A slow nod says "tell me more." Your face lets you react without cutting in.'],
       ['Fast nods', false, 'Fast nods signal "hurry up, I want to talk."'],
       ['A still, neutral face', false, 'They cannot tell if you are with them.'],
       ['Jump in with your solution right away', false, 'Interrupting a painful story signals you are not really listening.']]],
    [5, 'You keep 100% eye contact with your webcam for the entire call.', 'Why might this backfire?',
      [['Constant eye contact can feel intense; looking away to think and landing your points with eye contact feels more natural', true, 'Vanessa suggests about 60 to 70% and making eye contact at the end of your sentences. (The exact numbers are a rule of thumb.)'],
       ['It is always the best practice', false, 'Even the course\'s source warns against 100%.'],
       ['Webcams cannot show eye contact', false, 'Looking at the lens does read as eye contact.'],
       ['It makes you seem warm', false, 'Too much can feel invasive rather than warm.']]],

    [6, 'You want to actually connect with a coworker you have only ever said "hey" to.', 'Which tool fits best?',
      [['High, Low, Buffalo', true, 'Sharing a high, a low, and something random gives six conversation threads and some vulnerability, which builds real connection.'],
       ['3-2-1', false, '3-2-1 is for keeping small talk brief, the opposite of what you want here.'],
       ['"Yes, and"', false, 'That is for handling pushback.'],
       ['Match then lead', false, 'Useful for energy differences, not for deepening a relationship.']]],
    [6, 'The prospect says: "Honestly, you\'re more expensive than the last agency."', 'Which opening keeps the conversation moving forward?',
      [['"Yes, and that\'s because we call every lead within minutes, which is where the last agency lost you jobs."', true, '"Yes, and" accepts their point and builds on it. "Yes, but" negates them and starts an argument.'],
       ['"Yes, but you get what you pay for."', false, '"But" dismisses what they said and puts them on the defensive.'],
       ['"No, we\'re actually not that expensive."', false, 'Arguing with their perception makes them dig in.'],
       ['"Okay, I can drop the price."', false, 'Discounting immediately signals the price was not real.']]],
    [6, 'You are telling a prospect about a roofer you helped.', 'Which version will stick better?',
      [['The roofer\'s name, the moment they saw six appointments on their calendar Monday morning, and what they said when they called you', true, 'Reliving adds what people saw, heard, and felt, plus dialogue. Listeners picture it and remember it.'],
       ['"We helped a roofer get more appointments."', false, 'That is reporting: true but forgettable.'],
       ['A list of statistics only', false, 'Numbers help, but without a story they rarely stick.'],
       ['A long history of how you started your agency', false, 'Long and about you, not the prospect\'s problem.']]],
    [6, 'A quiet, nervous prospect joins the call. You are naturally high energy.', 'What is the best approach?',
      [['Match their calmer energy first, then gradually bring the energy up', true, 'Meet them where they are to build rapport, then lead.'],
       ['Stay at full energy so they catch it', false, 'A big gap in energy can overwhelm a nervous person.'],
       ['Go even quieter than them', false, 'Matching is not undershooting; you still need to lead.'],
       ['Reschedule the call', false, 'Nothing is wrong; you just need to adjust.']]],
    [6, 'You say "That jacket is fire, where\'d you get it?" to a stranger in line, and they look at you like you are weird.', 'How should you think about that?',
      [['It is a rep: it says more about them than you, and it trains you for sales rejection', true, 'The course expects rejection. Volume of attempts is what creates the good conversations.'],
       ['Stop trying; strangers do not want to talk', false, 'Many do; the founder\'s best opportunities came from these.'],
       ['Use a longer, more formal opener next time', false, 'Simple, about-them openers are what the course recommends.'],
       ['Only talk to people who talk to you first', false, 'Then you never trigger the "cause."'] ]],

    [7, 'You have no clients yet and $300 to spend on tools this month.', 'What should you buy first?',
      [['A domain and business email, a calendar and meeting tool, a GHL account, and a payment processor', true, 'That is the course\'s "start lean" minimum. Everything else waits until clients justify it.'],
       ['Claude Max, Zoom Pro, and paid Loom', false, 'Useful later; "buying software feels like building a business," but it is not.'],
       ['Only a nice website', false, 'You need a way to book, track, and get paid.'],
       ['Nothing; tools don\'t matter', false, 'You still need the basic four to book calls and collect payment.']]],
    [7, 'You have just signed your 4th client.', 'How many GHL sub-accounts do you need?',
      [['5: one for your agency and one per client', true, 'Your agency gets its own sub-account, and each client gets a separate one.'],
       ['4', false, 'You forgot your own agency\'s sub-account.'],
       ['1', false, 'Clients each need their own workspace.'],
       ['8', false, 'One per client plus one for you.']]],
    [7, 'You have spent two days comparing payment processors\' fees.', 'What would the course say?',
      [['Stop. Pick one in under 5 minutes (they use Stripe) and spend that time closing', true, 'Small fee differences do not matter at the start; acquisition does.'],
       ['Keep comparing until you find the cheapest', false, 'Exactly what the course says not to do.'],
       ['Use no processor and ask for cash', false, 'Unprofessional and hard to track.'],
       ['Build your own payment system', false, 'Huge time cost for no benefit.']]],
    [7, 'Prospects keep booking strategy calls on top of your cold-calling block.', 'What should you fix in your setup?',
      [['Block your calling time in your calendar and set it as a conflict calendar in GHL', true, 'Conflict calendars stop GHL from booking over events you already have.'],
       ['Stop offering a booking link', false, 'You want bookings, just not over your blocks.'],
       ['Cold call at night instead', false, 'Business owners are not picking up at night.'],
       ['Accept the conflicts', false, 'Your calling volume is what produced LaunchPad\'s results; protect it.']]],
    [7, 'Your closing call on free Zoom tends to run 50 minutes.', 'What problem will you hit?',
      [['Free Zoom cuts all meetings, even one-on-one, at 40 minutes; use Google Meet (free one-on-ones can run much longer) or upgrade', true, 'Getting cut off mid-close is painful. (Free Google Meet limits group calls to 60 minutes, but one-on-ones can run up to 24 hours.)'],
       ['None; free Zoom is unlimited for two people', false, 'That changed in 2022.'],
       ['Zoom will charge you automatically', false, 'It just ends the meeting.'],
       ['The call quality drops after 40 minutes', false, 'The meeting ends.']]],

    [8, 'You wake up, check your messages and email, then try to decide what to work on.', 'What does the course say to change?',
      [['Plan the next day the night before, when you are calm, and spend the morning acting', true, 'In the morning, stress and incoming messages make decisions reactive. Plan when calm, act when fresh.'],
       ['Plan even earlier in the morning', false, 'The course says never plan in the morning.'],
       ['Skip planning and react to what comes in', false, 'That is the reactive pattern the course warns about.'],
       ['Plan once a month', false, 'Daily planning the night before is the habit.']]],
    [8, 'At 3 p.m. after a rough call, you want to rewrite your entire offer right now.', 'What does the logic vs emotion idea suggest?',
      [['Write the idea down and decide tonight when you are calm', true, 'Decisions made while upset are reactive. Make the call when you can look at the facts.'],
       ['Rewrite it immediately while you feel it', false, 'Emotional decisions are often ones you regret.'],
       ['Never change your offer', false, 'Changing it can be right; just decide calmly.'],
       ['Ask the prospect who rejected you to rewrite it', false, 'One upset moment plus one data point is a poor basis.']]]
  ];

  /* ---------- Agency Math generators ---------- */
  function ri(a, b, step) { step = step || 1; return a + step * Math.floor(Math.random() * (Math.floor((b - a) / step) + 1)); }
  function money(n) { return '$' + Math.round(n).toLocaleString('en-US'); }
  var MATH = [
    function () {
      var r = ri(8000, 30000, 500), sw = ri(300, 800, 50), c = ri(1000, 5000, 250), ads = ri(0, 2000, 250);
      var p = r - sw - c - ads, m = 100 * p / r;
      return { u: 1, q: 'This month your agency collected ' + money(r) + '. You paid ' + money(sw) + ' for software, ' + money(c) + ' to a contractor, and ' + money(ads) + ' on your own ads. What is your profit margin (as a percent)?', unit: '%', a: m,
        work: 'Profit = ' + money(r) + ' - ' + money(sw) + ' - ' + money(c) + ' - ' + money(ads) + ' = ' + money(p) + '. Margin = profit / revenue = ' + money(p) + ' / ' + money(r) + ' = ' + m.toFixed(1) + '%.' };
    },
    function () {
      var n = ri(3, 8), ret = ri(1000, 2500, 250), cost = ri(200, 600, 50), fixed = ri(300, 900, 50), target = ri(8000, 20000, 1000);
      var per = ret - cost, need = Math.ceil((target + fixed) / per);
      return { u: 1, q: 'Each client pays a ' + money(ret) + ' monthly retainer and costs you ' + money(cost) + ' a month to serve. Your fixed costs (software, tools) are ' + money(fixed) + ' a month. How many clients do you need to make at least ' + money(target) + ' profit a month?', unit: 'clients', a: need, exact: true,
        work: 'Each client adds ' + money(ret) + ' - ' + money(cost) + ' = ' + money(per) + ' of profit. You need ' + money(target) + ' + ' + money(fixed) + ' fixed = ' + money(target + fixed) + '. ' + money(target + fixed) + ' / ' + money(per) + ' = ' + ((target + fixed) / per).toFixed(2) + ', so round up to ' + need + ' clients.' };
    },
    function () {
      var dials = ri(80, 160, 10), conn = ri(8, 20), book = ri(10, 30), show = ri(60, 85, 5), close = ri(15, 35, 5), days = 6;
      var wk = dials * days, c = wk * conn / 100, b = c * book / 100, s = b * show / 100, cl = s * close / 100;
      return { u: 2, q: 'Practice numbers (made up, not from the course): you make ' + dials + ' dials a day, 6 days a week. ' + conn + '% of dials reach the owner, ' + book + '% of those book a strategy call, ' + show + '% of booked calls show up, and you close ' + close + '% of the calls that show. About how many new clients do you sign per week? (one decimal)', unit: 'clients', a: cl,
        work: dials + ' x 6 = ' + wk + ' dials. x ' + conn + '% = ' + c.toFixed(1) + ' conversations. x ' + book + '% = ' + b.toFixed(1) + ' booked. x ' + show + '% = ' + s.toFixed(1) + ' showed. x ' + close + '% = ' + cl.toFixed(2) + ' clients a week. This is why volume matters: every step loses people.' };
    },
    function () {
      var goal = ri(2, 5), conn = ri(8, 15), book = ri(15, 30), show = ri(60, 80, 5), close = ri(20, 35, 5);
      var rate = conn / 100 * book / 100 * show / 100 * close / 100, need = Math.ceil(goal / rate);
      return { u: 2, q: 'Practice numbers: ' + conn + '% of dials reach the owner, ' + book + '% of those book, ' + show + '% show up, and you close ' + close + '%. How many dials do you need (round up) to sign ' + goal + ' clients?', unit: 'dials', a: need, tol: Math.max(2, need * 0.01),
        work: 'One dial becomes a client ' + conn + '% x ' + book + '% x ' + show + '% x ' + close + '% = ' + (rate * 100).toFixed(3) + '% of the time. ' + goal + ' / ' + rate.toFixed(5) + ' = ' + (goal / rate).toFixed(1) + ', so about ' + need + ' dials.' };
    },
    function () {
      var jobs = ri(2, 10), avg = ri(8000, 20000, 1000), pct = ri(5, 15), ret = ri(1000, 3000, 250);
      var rs = jobs * avg * pct / 100;
      return { u: 1, q: 'A roofer offers either a ' + money(ret) + ' monthly retainer or ' + pct + '% revenue share. Your ads produce ' + jobs + ' closed jobs this month at an average of ' + money(avg) + ' each. How much more (or less, as a negative number) does revenue share pay you than the retainer this month?', unit: '$', a: rs - ret,
        work: 'Revenue share = ' + jobs + ' x ' + money(avg) + ' x ' + pct + '% = ' + money(rs) + '. Difference = ' + money(rs) + ' - ' + money(ret) + ' = ' + money(rs - ret) + '. Next month could be very different; that uncertainty is the revshare risk.' };
    },
    function () {
      var deal = ri(1500, 4000, 250), months = ri(3, 12), pct = ri(10, 30, 5), n = ri(2, 6);
      var cost = n * deal * months * pct / 100;
      return { u: 3, q: 'You hire a closer who takes ' + pct + '% of every client\'s payments. They close ' + n + ' clients at ' + money(deal) + ' a month, and each stays ' + months + ' months. How much revenue do you give the closer in total?', unit: '$', a: cost,
        work: n + ' clients x ' + money(deal) + ' x ' + months + ' months = ' + money(n * deal * months) + ' of revenue. x ' + pct + '% = ' + money(cost) + '. This is the course\'s argument for closing yourself early on.' };
    },
    function () {
      var months = [[939, 469], [4000, 2959], [11613, 450], [17369, 8616], [11025, 28], [21467, 13481]], i = ri(0, 5), m = months[i];
      return { u: 2, q: 'In LaunchPad\'s month ' + (i + 1) + ' they collected ' + money(m[0]) + ' and kept ' + money(m[1]) + '. What was the profit margin (percent)?' + (i === 2 ? ' (Month 3 profit is our estimate; the video just says "very low.")' : ''), unit: '%', a: 100 * m[1] / m[0],
        work: money(m[1]) + ' / ' + money(m[0]) + ' = ' + (100 * m[1] / m[0]).toFixed(1) + '%. Compare months: a high-revenue month can still be a bad month.' };
    }
  ];

  /* ---------- Explain It: [unit, prompt, model answer, key points [[label, keywords]]] ---------- */
  var EXPL = [
    [1, 'Explain to a friend the difference between acquisition and fulfillment, with one front-end and one back-end example of each.', 'Acquisition is getting clients; fulfillment is delivering what you promised them. Front-end acquisition: cold calling a roofer. Back-end acquisition: the calendar link and automations that move a prospect to a booked call. Front-end fulfillment: calling the roofer\'s leads to book quotes. Back-end fulfillment: onboarding and building the ad and lead system.', [['Acquisition = getting clients', ['get', 'client', 'acqui']], ['Fulfillment = delivering the service', ['deliver', 'service', 'fulfil']], ['Front end = talking to people', ['call', 'talk', 'conversation', 'front']], ['Back end = systems', ['system', 'automation', 'onboard', 'back']]]],
    [1, 'Why is revenue not the same as profit? Use a number example.', 'Revenue is everything collected; profit is what is left after costs. If you collect $11,025 but spend $10,997 on contractors and tools, profit is $28. Margin (profit / revenue) shows how much of each dollar you keep.', [['Revenue = all money in', ['revenue', 'collect', 'money in']], ['Profit = after costs', ['cost', 'expense', 'after']], ['A number example', ['$', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']], ['Margin = profit / revenue', ['margin', 'percent', '%']]]],
    [2, 'Why does the course say never to pause acquisition to improve fulfillment?', 'Because you learn fulfillment through reps with real clients, and pausing acquisition kills your income. LaunchPad paused in month 5, lost retainers anyway, and kept $28. Keep acquiring, improve delivery alongside, and be honest with clients about where you are.', [['You learn fulfillment by doing it', ['rep', 'learn', 'doing', 'practice']], ['Pausing kills income', ['income', 'revenue', 'money', 'profit']], ['Month 5 example', ['month 5', '$28', '28', 'retainer']], ['Be transparent with clients', ['honest', 'transparen']]]],
    [3, 'Explain warmth and competence, and what happens when someone has only one of them.', 'Warmth says "you can trust me and I like you." Competence says "I know what I am doing and you can rely on me." Competence without warmth makes people suspicious and they push back. Warmth without competence makes you likable but not credible. You need both, and you can dial up whichever you lack.', [['Warmth = trust and liking', ['trust', 'like', 'warm']], ['Competence = capable and reliable', ['capab', 'reliab', 'know', 'competen']], ['Only competence leads to suspicion', ['suspic', 'push back', 'skeptic']], ['Only warmth leads to not being taken seriously', ['credib', 'serious', 'not taken']]]],
    [3, 'Why does the course argue you should do your own sales calls at the start?', 'Sales is a transfer of belief, so the founder\'s delivery matters most early on. Outsourcing setting and closing gives away roughly 20 to 40% of profit, and you skip building communication, arguably the most valuable skill.', [['Lose a big share of profit', ['profit', '20', '40', 'commission']], ['Miss building the skill', ['skill', 'learn']], ['Delivery and belief matter', ['belief', 'deliver', 'communicat']]]],
    [4, 'Explain the five vocal foundations and how you would use each one when saying your price.', 'Rate: slow down on the number. Volume: steady and confident, or drop slightly to highlight. Pitch: end on a downward note, not a question. Tonality: let your face show calm confidence. Pause: stop after the number and let it land.', [['Rate (slow down)', ['rate', 'slow', 'speed']], ['Volume', ['volume', 'loud', 'quiet']], ['Pitch / downward inflection', ['pitch', 'down', 'melody', 'inflection']], ['Tonality / face', ['tonal', 'tone', 'face', 'emotion']], ['Pause', ['pause', 'silence']]]],
    [4, 'Walk through record-and-review as if teaching it to someone.', 'Record a 5-minute impromptu video standing up. Wait a day. Review it three ways: sound only (rate, volume, melody, tonality, pauses), video muted (gestures, fidgeting, posture), and a transcript (filler words, rambling). Pick one thing, work on it for a week, and repeat.', [['Record 5 minutes impromptu', ['record', '5', 'five', 'impromptu']], ['Wait a day', ['day', 'wait']], ['Three reviews: audio, muted video, transcript', ['audio', 'sound', 'mute', 'transcri']], ['One focus per week', ['one', 'week', 'focus']]]],
    [5, 'Why does saying your price like a question cost you money?', 'A rising ending makes a statement sound like a question. The listener shifts from listening to scrutinizing and hears that you do not fully believe the number, which invites negotiation. A downward inflection signals the price is settled.', [['Rising ending sounds like a question', ['question', 'rising', 'up']], ['Signals doubt', ['doubt', 'believe', 'unsure', 'confiden']], ['Invites negotiation or discounts', ['negotiat', 'discount', 'push']], ['Use a downward inflection', ['down', 'inflection']]]],
    [6, 'A prospect says your price is too high. Explain how "yes, and" changes your answer, and give the exact words you would use.', '"Yes, but" negates what they said and starts an argument. "Yes, and" accepts their view and builds on it, keeping the conversation cooperative. For example: "Yes, and that\'s because we call every lead within minutes, which is where most roofers lose jobs."', [['"But" negates or argues', ['but', 'negat', 'argu', 'dismiss']], ['"And" accepts and builds', ['and', 'build', 'accept', 'agree']], ['Gives an example sentence', ['"', 'because', 'yes, and']]]],
    [6, 'What makes a story "relived" instead of "reported," and why does it matter in sales?', 'Reporting gives just who, what, when. Reliving adds what people saw, heard, felt, and smelled, plus dialogue, so the listener pictures it. Relived stories build rapport and stick, so your point lands after the story.', [['Reporting = facts only', ['report', 'fact', 'who', 'what']], ['Reliving = senses and dialogue', ['saw', 'heard', 'felt', 'sens', 'dialog', 'visual']], ['It makes it memorable or builds rapport', ['remember', 'stick', 'rapport', 'connect']]]],
    [7, 'Explain agency view vs sub-accounts in GHL, and why each client gets its own.', 'The agency view manages everything. Each sub-account is a separate workspace with its own leads, calendars, and automations: one for your agency and one per client. Separation keeps each client\'s leads, data, and systems organized and private.', [['Agency view manages everything', ['agency view', 'manage', 'everything', 'overview']], ['Sub-account = separate workspace', ['separate', 'workspace', 'sub']], ['One for your agency plus one per client', ['one per', 'each client', 'your agency']], ['Keeps data organized or private', ['organiz', 'private', 'separate', 'clean']]]],
    [8, 'Why plan the night before instead of in the morning?', 'At night you are calmer and decide from facts. Mornings bring a cortisol spike plus messages and chores, so decisions become reactive. Planning ahead means your morning goes to action instead of deciding.', [['Night: calmer, logical', ['calm', 'logic', 'fact']], ['Morning: stress and distractions', ['cortisol', 'stress', 'message', 'notification', 'react']], ['Morning goes to action', ['act', 'do', 'action']]]]
  ];

  var P = S.plab = { mode: 'gen', gen: null, gpick: null, gn: 0, sitOrder: null, sitKey: '', i: 0, pick: null, score: 0, tried: 0, math: null, mres: null, mval: '', ex: 0, exText: '', exShown: false };
  var done = store.get('plab', {});

  function inUnits(u) { return A.inSel(u); }
  function sitPool() { return SIT.map(function (s, i) { return i; }).filter(function (i) { return inUnits(SIT[i][0]); }); }
  function buildSit() {
    var pool = sitPool(), un = pool.filter(function (i) { return !done['s' + i]; }), seen = pool.filter(function (i) { return done['s' + i]; });
    P.sitOrder = shuffle(un).concat(shuffle(seen)).map(function (i) { return { i: i, o: shuffle(SIT[i][3].map(function (_, k) { return k; })) }; });
    P.sitKey = S.sel.join(','); P.i = 0; P.pick = null;
  }
  function vSit() {
    if (P.sitKey !== S.sel.join(',') || !P.sitOrder) buildSit();
    if (!P.sitOrder.length) return '<div class="panel"><p class="muted">No situations for these units. Pick other units.</p></div>';
    var cur = P.sitOrder[P.i % P.sitOrder.length], s = SIT[cur.i], answered = P.pick !== null;
    var opts = cur.o.map(function (k, n) {
      var o = s[3][k], cls = 'opt';
      if (answered) { if (o[1]) cls += ' right'; else if (P.pick === k) cls += ' wrong'; }
      return '<button class="' + cls + '" data-a="plsit" data-v="' + k + '"' + (answered ? ' disabled' : '') + '><span class="k">' + (n + 1) + '</span><span>' + o[0] + (answered && (o[1] || P.pick === k) ? '<span class="why">' + (o[1] ? '<b>Why this works:</b> ' : '<b>Why not:</b> ') + md(o[2]) + '</span>' : '') + '</span></button>';
    }).join('');
    var others = answered ? '<details class="chk"><summary>Why the other options don\'t work</summary><ul class="tight">' + cur.o.filter(function (k) { return !s[3][k][1] && k !== P.pick; }).map(function (k) { return '<li><b>' + s[3][k][0] + '</b>: ' + md(s[3][k][2]) + '</li>'; }).join('') + '</ul></details><div class="row"><button class="btn" data-a="plnext">Next situation</button></div>' : '';
    var seen = sitPool().filter(function (i) { return done['s' + i]; }).length;
    return '<div class="row small muted"><span class="mono">score ' + P.score + ' / ' + P.tried + '</span><span class="mono">' + seen + ' of ' + sitPool().length + ' answered correctly at least once</span></div>' +
      '<div class="panel stack"><span class="label">' + A.unitLabel + ' ' + s[0] + ' ' + C.units[s[0]] + '</span><div class="sit">' + s[1] + '</div><h3 style="font-size:1.15rem">' + s[2] + '</h3>' + opts + others + '</div>';
  }

  function newMath() {
    var gens = MATH.filter(function (g) { return true; }), tries = 0, m;
    do { m = gens[Math.floor(Math.random() * gens.length)](); tries++; } while (!inUnits(m.u) && tries < 40);
    P.math = m; P.mres = null; P.mval = '';
  }
  function fmtAns(m) { return m.unit === '%' ? m.a.toFixed(1) + '%' : m.unit === '$' ? money(m.a) : (m.exact || m.unit === 'dials' ? Math.round(m.a) : m.a.toFixed(1)) + ' ' + m.unit; }
  function vMath() {
    if (!P.math) newMath();
    var m = P.math, fb;
    if (P.mres) fb = '<div class="fb ' + (P.mres === 'ok' ? 'ok' : 'no') + '"><b>' + (P.mres === 'ok' ? 'Correct.' : P.mres === 'shown' ? 'Here is the work.' : 'Not quite. Answer: ' + fmtAns(m) + '.') + '</b><br>' + m.work + '</div><div class="row"><button class="btn" data-a="plmnew">New problem</button></div>';
    else fb = '<div class="row"><input type="number" step="any" id="pl-ans" aria-label="Your answer" placeholder="' + (m.unit === '%' ? 'percent, e.g. 42.5' : m.unit === '$' ? 'dollars, e.g. 1500' : m.unit) + '" style="max-width:220px"><button class="btn" data-a="plmcheck">Check</button><button class="btn ghost" data-a="plmshow">Show the work</button></div>';
    return '<div class="row small muted"><span class="mono">score ' + P.score + ' / ' + P.tried + '</span><span>New numbers every time, so you have to understand it, not remember it.</span></div>' +
      '<div class="panel stack"><span class="label">Agency math · ' + A.unitLabel + ' ' + m.u + '</span><h3 style="font-size:1.15rem;line-height:1.45">' + m.q + '</h3>' + fb + '</div>';
  }
  function mathCheck() {
    var inp = document.getElementById('pl-ans'); if (!inp || inp.value === '') return;
    var x = parseFloat(inp.value), m = P.math, tol = m.tol || (m.exact ? 0.01 : m.unit === '%' ? 0.15 : m.unit === '$' ? 1 : 0.06);
    P.tried++; if (Math.abs(x - m.a) <= tol) { P.mres = 'ok'; P.score++; } else P.mres = 'no';
    render();
  }

  function exPool() { return EXPL.map(function (e, i) { return i; }).filter(function (i) { return inUnits(EXPL[i][0]); }); }
  function vExpl() {
    var pool = exPool(); if (!pool.length) return '<div class="panel"><p class="muted">No prompts for these units.</p></div>';
    var e = EXPL[pool[P.ex % pool.length]], body;
    if (!P.exShown) body = '<label class="stack" style="gap:6px"><span class="muted small">Write it as if teaching someone who knows nothing. No peeking at Learn. Aim for 3 to 5 sentences.</span><textarea id="pl-ex" rows="6" placeholder="Explain it in your own words">' + P.exText.replace(/</g, '&lt;') + '</textarea></label><div class="row"><button class="btn" data-a="plexshow">Compare with the key points</button></div>';
    else {
      var t = P.exText.toLowerCase(), keys = e[3].map(function (k) { var hit = k[1].some(function (w) { return t.indexOf(w.toLowerCase()) > -1; }); return '<li class="' + (hit ? 'hit' : '') + '">' + (hit ? '✓ ' : '○ ') + k[0] + '</li>'; }).join('');
      body = '<div class="box"><span class="label">You wrote</span>' + (P.exText.trim() ? P.exText.replace(/</g, '&lt;') : '(nothing)') + '</div>' +
        '<div class="stack" style="gap:4px"><span class="label">Key points a strong answer covers</span><ul class="tight keys" style="list-style:none;padding:0">' + keys + '</ul><span class="small muted">✓ marks are a rough keyword check. Judge for yourself whether you really explained each point.</span></div>' +
        '<div class="box"><span class="label">Model answer</span>' + md(e[2]) + '</div><div class="row"><button class="btn ghost" data-a="plexagain">Try this one again</button><button class="btn" data-a="plexnext">Next prompt</button></div>';
    }
    return '<div class="row small muted"><span class="mono">prompt ' + ((P.ex % pool.length) + 1) + ' of ' + pool.length + '</span><span>If you can explain it, you understand it.</span></div>' +
      '<div class="panel stack"><span class="label">' + A.unitLabel + ' ' + e[0] + ' ' + C.units[e[0]] + '</span><h3 style="font-size:1.2rem;line-height:1.4">' + e[1] + '</h3>' + body + '</div>';
  }

  /* ---------- Endless: generated situations. Each generator returns {u, sit, q, opts: [[text, correct, why]]} ---------- */
  function one(a) { return a[Math.floor(Math.random() * a.length)]; }
  function some(a, n) { return shuffle(a.slice()).slice(0, n); }
  var NICHE = [['roofing company', 'roof quotes'], ['dental office', 'cleanings'], ['HVAC company', 'AC tune-ups'], ['med spa', 'consultations'], ['landscaping company', 'yard estimates'], ['solar installer', 'home assessments'], ['plumbing company', 'service calls'], ['chiropractor', 'first visits'], ['remodeling company', 'kitchen consults'], ['auto detailer', 'detail bookings'], ['law firm', 'case reviews'], ['pest control company', 'inspections'], ['gym', 'free trial sessions'], ['window cleaning company', 'quotes']];
  var NAMES = ['Jordan', 'Taylor', 'Casey', 'Riley', 'Morgan', 'Sam', 'Alex', 'Jamie', 'Drew', 'Avery', 'Priya', 'Marcus', 'Elena', 'Kenji', 'Tomás', 'Aisha', 'Dev', 'Nia'];
  function mc(u, sit, q, right, wrongs) { return { u: u, sit: sit, q: q, opts: shuffle([[right[0], true, right[1]]].concat(wrongs.map(function (w) { return [w[0], false, w[1]]; }))) }; }

  var GEN = [
    function () { // which part of the agency
      var n = one(NICHE), biz = n[0], ap = n[1];
      var T = {
        fa: ['cold call the owner of a ' + biz + ' to pitch your service', 'run a strategy call with a ' + biz + ' owner who booked from your outreach', 'walk into a local ' + biz + ' and introduce yourself to the owner', 'call back a ' + biz + ' owner who missed your strategy call'],
        ba: ['set up the calendar link prospects use to book a strategy call with you', 'build an automation that texts a ' + biz + ' owner a reminder before your strategy call', 'build a spreadsheet of ' + biz + ' owners you plan to call next week', 'write the email sequence that goes to ' + biz + ' owners who said "not right now"'],
        ff: ['call the new leads from your ' + biz + ' client\'s ads to book ' + ap, 'get on the monthly results call with your ' + biz + ' client', 'text a lead from your ' + biz + ' client\'s ad to confirm their booking'],
        bf: ['build the ad campaign for your ' + biz + ' client', 'set up the automation that texts your ' + biz + ' client\'s new leads within 60 seconds', 'build the onboarding form that collects your ' + biz + ' client\'s logins and photos', 'build the lead pipeline inside your ' + biz + ' client\'s GHL sub-account']
      };
      var L = { fa: 'Front-end acquisition', ba: 'Back-end acquisition', ff: 'Front-end fulfillment', bf: 'Back-end fulfillment' };
      var k = one(['fa', 'ba', 'ff', 'bf']), task = one(T[k]);
      var acq = k[1] === 'a', front = k[0] === 'f';
      var why = function (c) {
        var a = c[1] === 'a', f = c[0] === 'f';
        if (c === k) return 'It is ' + (acq ? 'about getting YOUR agency a client' : 'serving a client you already have') + ' (' + (acq ? 'acquisition' : 'fulfillment') + '), and it is ' + (front ? 'talking to a person directly (front end)' : 'a system, not a live conversation (back end)') + '.';
        return (a !== acq ? 'Ask who it serves: ' + (acq ? 'this wins clients for your own agency, so it is acquisition.' : 'this serves an existing client, so it is fulfillment.') : '') + (f !== front ? (a !== acq ? ' Also, ' : '') + (front ? 'it is a live conversation, so it is front end.' : 'it is a system, not a conversation, so it is back end.') : '');
      };
      return mc(1, 'Your task today: ' + task + '.', 'Which part of the agency is this?', [L[k], why(k)], Object.keys(L).filter(function (c) { return c !== k; }).map(function (c) { return [L[c], why(c)]; }));
    },
    function () { // warmth vs competence diagnosis
      var nm = one(NAMES), biz = one(NICHE)[0], lowW = Math.random() < 0.5;
      var B = lowW ? ['jumps straight into numbers with no small talk', 'keeps a serious, unsmiling face the whole call', 'talks mostly about their own results', 'never asks about the owner\'s business', 'sits rigid with arms crossed'] : ['laughs at almost everything', 'agrees with every point the owner makes', 'ends most sentences with a rising "...right?"', 'nods quickly the entire call', 'apologizes for "taking up your time"'];
      var O = lowW ? ['agrees ' + nm + ' clearly knows marketing, but keeps questioning the numbers', 'says "send me something in writing and I\'ll look it over"', 'gives short, guarded answers'] : ['enjoys the call but says they want to "keep looking around"', 'asks if ' + nm + ' has actually done this before', 'immediately asks for a big discount'];
      var b = some(B, 2);
      var W = ['Warmth: the owner does not yet trust or like ' + nm + '. Add warmth, like asking about their business, smiling, and open body language.', lowW ? 'Those behaviors show skill but no warmth, and competence without warmth makes people suspicious. That is why the owner pushes back and stalls.' : 'Warmth is not the problem here; ' + nm + ' has plenty. Too much warmth without competence is the issue.'];
      var Cc = ['Competence: the owner likes ' + nm + ' but does not take them seriously. Add a steady pace, downward endings, and a clear plan.', lowW ? 'The owner already believes ' + nm + ' is skilled. More proof will not fix a trust problem.' : 'Those behaviors are friendly but signal low credibility, so the owner enjoys the call without seeing ' + nm + ' as the expert.'];
      var right = lowW ? W : Cc, wrong = lowW ? Cc : W;
      return mc(3, nm + ' is on a call with the owner of a ' + biz + '. ' + nm + ' ' + b[0] + ' and ' + b[1] + '. The owner ' + one(O) + '.', 'What is most likely missing?', right,
        [wrong, ['A lower price', 'Discounting does not fix how the owner sees ' + nm + ', and it trains them to push back.'], ['More dials, since this lead is a lost cause', 'Volume matters, but this call is telling ' + nm + ' something specific to fix.']]);
    },
    function () { // price delivery: one thing wrong
      var nm = one(NAMES), biz = one(NICHE)[0], price = one([997, 1200, 1500, 1800, 2000, 2500, 3000]);
      var F = [
        { u: 4, good: 'slows down on the number', bad: 'rushes through the number', fix: 'Slow down on the number', why: 'Rushing makes the price sound like something to get past. Slowing down highlights it.' },
        { u: 5, good: 'ends the number on a downward note', bad: 'ends the number going up, like a question', fix: 'End the number on a downward note', why: 'A rising ending turns a statement into a question and invites negotiation.' },
        { u: 4, good: 'pauses and lets the number sit', bad: 'immediately starts justifying the price before the owner says anything', fix: 'Pause after the number instead of justifying it', why: 'Filling the silence shows discomfort. A pause lets the number land.' },
        { u: 4, good: 'keeps their volume steady and clear', bad: 'drops to a near-whisper on the number', fix: 'Keep volume steady and clear on the number', why: 'Going quiet on the price sounds unsure of it.' }
      ];
      var bad = Math.floor(Math.random() * F.length), parts = shuffle(F.map(function (f, i) { return i === bad ? f.bad : f.good; }));
      return mc(F[bad].u, nm + ' tells a ' + biz + ' owner, "The investment is $' + price.toLocaleString('en-US') + ' a month." While saying it, ' + nm + ' ' + parts.slice(0, -1).join(', ') + ', and ' + parts[parts.length - 1] + '.', 'Which ONE change would help most?', [F[bad].fix, F[bad].why],
        F.filter(function (f, i) { return i !== bad; }).map(function (f) { return [f.fix, nm + ' is already doing this (' + f.good + '). The weak spot is elsewhere.']; }));
    },
    function () { // yes, and
      var n = one(NICHE), biz = n[0];
      var X = [
        ['"You\'re more expensive than the last agency."', '"Yes, and that\'s because we call every lead within minutes, which is where most ' + biz + ' owners lose jobs."'],
        ['"I\'m too busy to take this on right now."', '"Yes, and that\'s exactly why we handle the lead calls, so this doesn\'t add to your day."'],
        ['"I get most of my work from referrals."', '"Yes, and referrals are great. This adds a second, steady source on top of them."'],
        ['"I need to talk to my business partner."', '"Yes, and let\'s book 15 minutes with both of you so they hear it firsthand."'],
        ['"My last agency got me nothing."', '"Yes, and that\'s why I\'d rather show you the numbers every week than ask you to trust me."']
      ], x = one(X);
      return mc(6, 'On your strategy call, the owner of a ' + biz + ' says: ' + x[0], 'Which reply keeps the conversation moving forward?', [x[1], '"Yes, and" accepts their point and builds on it, so the conversation stays cooperative.'],
        some([['"Yes, but you have to think long-term here."', '"But" cancels what they said and puts them on the defensive.'], ['"I don\'t think that\'s really true."', 'Arguing with how they see it makes them dig in.'], ['"Okay, what if I knock 30% off?"', 'Jumping to a discount signals your price was never real and skips their actual concern.'], ['"No problem, I\'ll follow up in a few months."', 'Giving up at the first concern loses a conversation you could still win.']], 3));
    },
    function () { // revenue vs profit
      var a = { r: ri(10000, 30000, 1000) }, b = { r: ri(10000, 30000, 1000) };
      a.c = ri(Math.round(a.r * 0.3), Math.round(a.r * 0.95), 100); b.c = ri(Math.round(b.r * 0.3), Math.round(b.r * 0.95), 100);
      a.p = a.r - a.c; b.p = b.r - b.c; if (a.p === b.p) b.c += 300, b.p -= 300;
      var na = one(NAMES), nb = one(NAMES.filter(function (x) { return x !== na; })), win = a.p > b.p ? na : nb;
      var w = na + ' kept ' + money(a.p) + ' (' + (100 * a.p / a.r).toFixed(0) + '% margin); ' + nb + ' kept ' + money(b.p) + ' (' + (100 * b.p / b.r).toFixed(0) + '% margin). Profit, not revenue, is what you keep.';
      var hiRev = a.r >= b.r ? na : nb;
      return mc(1, na + '\'s agency collected ' + money(a.r) + ' last month and spent ' + money(a.c) + ' on contractors, software, and ads. ' + nb + '\'s agency collected ' + money(b.r) + ' and spent ' + money(b.c) + '.', 'Whose agency actually kept more money?', [win, w],
        [[win === na ? nb : na, w], ['They kept the same amount', w], ['Whoever collected more (' + hiRev + ')', hiRev === win ? 'It happens to be the same person this time, but only by checking costs can you know. ' + w : 'Higher revenue does not mean higher profit. ' + w]].filter(function (o) { return o[0] !== win; }).slice(0, 3));
    },
    function () { // funnel: where is the leak
      var rates = [ri(10, 25), ri(15, 40), ri(65, 90), ri(20, 40)], weak = Math.floor(Math.random() * 4);
      rates[weak] = Math.max(3, Math.round(rates[weak] * (weak === 2 ? 0.45 : 0.35)));
      var st = ['dials', 'conversations with owners', 'calls booked', 'calls showed up', 'clients closed'], c = [ri(400, 900, 50)];
      for (var i = 0; i < 4; i++) c.push(Math.max(0, Math.round(c[i] * rates[i] / 100)));
      var pct = function (i) { return c[i] ? Math.round(100 * c[i + 1] / c[i]) : 0; };
      var sorted = [0, 1, 2, 3].sort(function (x, y) { return pct(x) - pct(y); }), worst = sorted[0];
      if (pct(sorted[0]) === pct(sorted[1])) return GEN[5]();
      var L = ['Dial to conversation', 'Conversation to booked call', 'Booked call to showing up', 'Showed up to closed'];
      var all = [0, 1, 2, 3].map(function (i) { return L[i] + ' ' + pct(i) + '%'; }).join(', ');
      return mc(2, 'Practice numbers (made up) for one week: ' + c.map(function (n, i) { return n + ' ' + st[i]; }).join(', ') + '.', 'Which step converts at the lowest rate?', [L[worst], 'Turn each step into a percent: ' + all + '. Find the weakest step before you try to fix anything.'],
        [0, 1, 2, 3].filter(function (i) { return i !== worst; }).map(function (i) { return [L[i], 'This step converts at ' + pct(i) + '%. Steps: ' + all + '.']; }));
    },
    function () { // record and review
      var nm = one(NAMES), iss = some(['talks fast', 'speaks at a low volume', 'has a flat, monotone melody', 'says "um" constantly', 'swivels in the chair', 'never uses their hands', 'ends statements going up'], ri(3, 4)), f = one(iss);
      return mc(4, nm + '\'s first record-and-review shows that ' + nm + ' ' + iss.slice(0, -1).join(', ') + ', and ' + iss[iss.length - 1] + '.', 'What should ' + nm + '\'s plan be for next week?', ['Pick one, say the fact that ' + nm + ' ' + f + ', work only on that all week, then record and review again', 'One focus per week until it changes. Trying to fix everything at once leads to overwhelm and nothing sticks.'],
        [['Work on all ' + iss.length + ' this week to save time', 'This is the overwhelm trap. Spread across ' + iss.length + ' things, none of them change.'], ['Stop recording because it makes ' + nm + ' self-conscious', 'Recording is the only way to see your own habits.'], ['Skip practice and just do more real sales calls', 'Sales calls alone give too few reps; practice with recordings and neutral ears too.']]);
    },
    function () { // gestures
      var biz = one(NICHE)[0], G = {
        lev: ['Leveler: palms facing down', 'Palms down signals authority and control, and your pitch tends to drop with it.', ['explain firmly that payment comes before onboarding', 'state that the contract minimum is three months', 'say that the price is not up for negotiation']],
        pla: ['Placator: palms up and open', 'Open palms signal openness and invite the other person in.', ['invite the owner to share their concerns', 'ask the ' + biz + ' owner what their biggest headache with leads is', 'show you are open to questions before moving on']],
        dis: ['Distractor: a clap or sudden movement', 'A pattern break pulls attention back or marks a shift.', ['pull back the attention of an owner who is clearly distracted', 'mark a clear shift from your questions to your plan']]
      }, k = one(['lev', 'pla', 'dis']), ctx = one(G[k][2]);
      var wr = Object.keys(G).filter(function (x) { return x !== k; }).map(function (x) { return [G[x][0], 'That fits a different moment. ' + G[x][1]]; });
      wr.push(['Blamer: pointing at the camera', 'Pointing feels accusing, so it rarely helps on a sales call.']);
      return mc(5, 'On a call with the owner of a ' + biz + ', you need to ' + ctx + '.', 'Which gesture fits best?', [G[k][0], G[k][1]], wr);
    },
    function () { // sub-accounts
      var n = ri(3, 25);
      return mc(7, 'Your agency just signed client number ' + n + '.', 'How many GHL sub-accounts do you need in total?', [String(n + 1), 'One for your own agency plus one for each client: ' + n + ' + 1 = ' + (n + 1) + '.'],
        [[String(n), 'You forgot your own agency\'s sub-account.'], ['1', 'Each client needs their own separate workspace.'], [String(2 * n), 'It is one per client plus one for you, not two per client.']]);
    },
    function () { // logic vs emotion timing
      var calm = Math.random() < 0.45, m = calm ? one(['at 9 p.m. after dinner, feeling calm', 'Sunday evening with a clear head', 'the night before, after a normal day']) : one(['right after a prospect hung up on you', 'first thing in the morning while your messages are piling up', 'in the middle of handling an angry client complaint', 'after your third rejection in a row']);
      var d = one(['whether to change your price', 'which niche to focus on', 'whether to drop a difficult client', 'what to work on tomorrow', 'whether to rewrite your offer']);
      var yes = ['Yes: you are calm, so you can decide from the facts', 'Calm moments are when the course says to make decisions.'], no = ['No: write the idea down and decide tonight when you are calm', 'Strong emotion or a stressful morning makes decisions reactive. Capture it, decide later.'];
      return mc(8, 'It is ' + m + '. You want to decide ' + d + '.', 'Is this a good moment to make the decision?', calm ? yes : no,
        [calm ? [no[0], 'Nothing here is making you reactive; this is the calm moment the course recommends.'] : [yes[0], 'You are not calm right now, so the decision is likely to be reactive.'], ['Yes: strong feelings mean the decision is important', 'Feeling strongly is a reason to wait, not to rush.'], ['Never change anything; stick to the plan', 'Changing course can be right. The point is to decide when calm.']]);
    },
    function () { // match then lead
      var biz = one(NICHE)[0], low = Math.random() < 0.5;
      var s = low ? 'The owner of a ' + biz + ' joins the call quiet and a little nervous. You are naturally high energy.' : 'The owner of a ' + biz + ' joins the call loud, fast, and excited. You are naturally calm and quiet.';
      return mc(6, s, 'What is the best approach?', ['Match their energy first, then gradually lead toward where you want the call to be', 'Meeting them where they are builds rapport; then you can lead.'],
        [['Stay at your own natural level so they adjust to you', 'A big gap in energy makes people feel out of sync.'], [low ? 'Go even quieter than them' : 'Get even louder than them', 'Matching is not overshooting; you still need to lead.'], ['Reschedule for a better day', 'Nothing is wrong; you just need to adjust.']]);
    }
  ];

  function newGen() {
    var g, t = 0; do { g = one(GEN)(); t++; } while (!inUnits(g.u) && t < 60);
    P.gen = g; P.gpick = null; P.gn = (P.gn || 0) + 1;
  }
  function vGen() {
    if (!P.gen || !inUnits(P.gen.u)) newGen();
    var g = P.gen, answered = P.gpick !== null;
    var opts = g.opts.map(function (o, k) {
      var cls = 'opt'; if (answered) { if (o[1]) cls += ' right'; else if (P.gpick === k) cls += ' wrong'; }
      return '<button class="' + cls + '" data-a="plgen" data-v="' + k + '"' + (answered ? ' disabled' : '') + '><span class="k">' + (k + 1) + '</span><span>' + o[0] + (answered && (o[1] || P.gpick === k) ? '<span class="why">' + (o[1] ? '<b>Why this works:</b> ' : '<b>Why not:</b> ') + o[2] + '</span>' : '') + '</span></button>';
    }).join('');
    var more = answered ? '<details class="chk"><summary>Why the other options don\'t work</summary><ul class="tight">' + g.opts.filter(function (o, k) { return !o[1] && k !== P.gpick; }).map(function (o) { return '<li><b>' + o[0] + '</b>: ' + o[2] + '</li>'; }).join('') + '</ul></details><div class="row"><button class="btn" data-a="plgnext">Next situation</button></div>' : '';
    return '<div class="row small muted"><span class="mono">score ' + P.score + ' / ' + P.tried + ' · #' + P.gn + '</span><span>Generated fresh each time: new businesses, people, numbers, and details.</span></div>' +
      '<div class="panel stack"><span class="label">' + A.unitLabel + ' ' + g.u + ' ' + C.units[g.u] + '</span><div class="sit">' + g.sit + '</div><h3 style="font-size:1.15rem">' + g.q + '</h3>' + opts + more + '</div>';
  }

  function vLab() {
    var modes = [['gen', 'Endless'], ['sit', 'Situations'], ['math', 'Agency Math'], ['expl', 'Explain It']];
    var head = '<div class="stack"><h2>Practice Lab</h2><p class="muted" style="max-width:68ch">Practice that tests understanding, not memory. <b>Endless</b> generates a brand-new situation every time. <b>Situations</b> put you in a real moment and explain every option. <b>Agency Math</b> uses fresh numbers each time. <b>Explain It</b> has you teach the idea back in your own words.</p>' + A.picker() +
      '<div class="row" role="group">' + modes.map(function (m) { return '<button class="chip" data-a="plmode" data-v="' + m[0] + '" aria-pressed="' + (P.mode === m[0]) + '">' + m[1] + '</button>'; }).join('') + '</div></div>';
    return head + (P.mode === 'gen' ? vGen() : P.mode === 'sit' ? vSit() : P.mode === 'math' ? vMath() : vExpl());
  }

  function click(a, v, t) {
    if (a === 'plmode') { P.mode = v; }
    else if (a === 'plsit') {
      if (P.pick !== null) return true;
      var cur = P.sitOrder[P.i % P.sitOrder.length], ok = SIT[cur.i][3][+v][1];
      P.pick = +v; P.tried++; if (ok) { P.score++; done['s' + cur.i] = 1; store.set('plab', done); }
    }
    else if (a === 'plnext') { P.i++; P.pick = null; if (P.i >= P.sitOrder.length) buildSit(); render(); window.scrollTo(0, 0); return true; }
    else if (a === 'plgen') { if (P.gpick !== null) return true; P.gpick = +v; P.tried++; if (P.gen.opts[+v][1]) P.score++; }
    else if (a === 'plgnext') { newGen(); render(); window.scrollTo(0, 0); return true; }
    else if (a === 'plmcheck') { mathCheck(); return true; }
    else if (a === 'plmshow') { P.mres = 'shown'; P.tried++; }
    else if (a === 'plmnew') { newMath(); }
    else if (a === 'plexshow') { var ta = document.getElementById('pl-ex'); P.exText = ta ? ta.value : ''; P.exShown = true; }
    else if (a === 'plexagain') { P.exText = ''; P.exShown = false; }
    else if (a === 'plexnext') { P.ex++; P.exText = ''; P.exShown = false; }
    else return false;
    render(); return true;
  }
  document.addEventListener('keydown', function (e) {
    if (S.tab !== 'plab') return;
    if (e.target.id === 'pl-ans' && e.key === 'Enter') { e.preventDefault(); mathCheck(); return; }
    if (/INPUT|TEXTAREA/.test(e.target.tagName || '')) return;
    if (P.mode === 'gen' && P.gpick === null && P.gen && /^[1-4]$/.test(e.key) && +e.key <= P.gen.opts.length) { click('plgen', String(+e.key - 1)); return; }
    if (P.mode === 'sit' && P.pick === null && /^[1-4]$/.test(e.key) && P.sitOrder && P.sitOrder.length) { var cur = P.sitOrder[P.i % P.sitOrder.length]; click('plsit', String(cur.o[+e.key - 1])); }
  });

  A.register({ tabs: [['plab', 'Practice Lab', vLab]], click: click });
})();
