/* TEMPLATE for a new class. Copy this folder to classes/<your-id>/, fill it in,
   then add { id: '<your-id>', title: '...' } to classes/index.js.

   Only `id`, `title` and `units` are required. Every other list is optional:
   leave it out (or empty) and its tab or practice mode simply won't show.

   Text can use **bold**. Most strings are inserted as HTML, so you can also use <b>, <i>, etc. */
(function () {

window.COURSE = {
  id: 'example',               // must match the folder name and the id in classes/index.js
  title: 'Example Class',
  unitLabel: 'Unit',           // optional: 'Chapter', 'Week', 'Module'...

  // Unit number -> name. Every item below starts with (or has a `u` for) one of these numbers.
  units: { 1: 'First topic', 2: 'Second topic' },

  // Flashcards: [unit, front, back]. Also used by Practice > Write it.
  cards: [
    [1, 'Term', 'Definition.'],
    [2, 'Another term', 'Another definition.']
  ],

  // Quiz (multiple choice): [unit, question, [CORRECT answer first, wrong, wrong, wrong], explanation].
  // Options are shuffled when shown, so always put the right one first here.
  questions: [
    [1, 'Which one is right?', ['This one', 'Not this', 'Nor this', 'Nope'], 'Why it is right.']
  ],

  // Learn tab. One entry per unit. Lesson fields:
  //   h: title   t: paragraphs (start a line with "- " for a bullet; "[[tbl]]" / "[[viz]]" place the table / diagram)
  //   tbl: { head: [...], rows: [[...], ...] }   viz: key handled by extras.js
  //   ex: example box   exam: "On the exam" box   chk: [question, answer] collapsible self-check
  lessons: {
    1: { intro: 'What this unit is about.', items: [
      { h: 'First lesson', t: ['A paragraph.', '- a bullet', '- another bullet'], ex: 'An example.', chk: ['A question?', 'The answer.'] }
    ] }
  },

  // Practice > True or false: [unit, statement, true/false, explanation]
  tf: [
    [1, 'This statement is true.', true, 'Because...']
  ],

  // Practice > Fill in the blank: [unit, sentence with ___, [accepted answers]]
  cloze: [
    [1, 'The missing word is ___.', ['blank', 'the blank']]
  ],

  // Practice > Match: [unit, term, short meaning]. Needs at least 2 per selected unit set.
  match: [
    [1, 'Term A', 'Meaning A'],
    [1, 'Term B', 'Meaning B']
  ],

  // Practice > Sort it: u = units it belongs to, b = bucket names, items = [text, bucket index]
  sorts: [
    { u: [1], title: 'A or B?', b: ['A', 'B'], items: [['goes in A', 0], ['goes in B', 1]] }
  ],

  // Practice > Recall lists: items = [display text, [keywords that count as remembering it]]
  lists: [
    { u: [1], title: 'The two things', items: [['First thing', ['first']], ['Second thing', ['second']]] }
  ],

  // Hooks tab: memory aids. u = unit, t = topic, h = the hook, w = what it unpacks to.
  hooks: [
    { u: 1, t: 'The two things', h: 'F-S', w: '**F**irst thing, **S**econd thing.' }
  ],

  // Optional quick-pick buttons above the unit chips, e.g. one per exam.
  groups: [
    { label: 'Exam 1', units: [1, 2] }
  ],

  // Header countdown. One date, a list of dates (counts down to the next one), or a weekly day (0 = Sunday ... 6 = Saturday).
  countdown: { date: '2026-12-15', label: 'the final' },
  // countdown: { dates: [{ date: '2026-10-23', label: 'Exam 2' }, { date: '2026-12-14', label: 'the final' }] },
  // countdown: { weekday: 5, label: 'Friday' },

  // Home > "What to do today": [weekday 0-6 (or -1 to never highlight), label, what to do]
  planTitle: 'What to do today',
  plan: [],

  // Study tips shown under the Hooks tab.
  tips: [],

  // Practice Exam tab. questions: [number, question, [options], index of correct option, explanation]
  exam: {
    title: 'Practice Exam',
    intro: 'Where these questions came from.',
    questions: [
      [1, 'Exam question?', ['A', 'B', 'C', 'D'], 2, 'C, because...']
    ],
    gapsTitle: 'Extra topics',   // optional collapsible notes shown before the exam
    gaps: [{ h: 'Topic', t: ['A paragraph of notes.'] }]
  }
};

})();
