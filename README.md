# Study Gym

A study app with flashcards, quizzes, lessons, practice modes and practice exams.
Plain HTML and JavaScript, no build step. Progress is saved in your browser, separately for each class.

## Using it

Open `index.html` in a browser and pick a class. To use it from your phone, turn on
GitHub Pages for this repo (Settings → Pages → deploy from the `main` branch) and open the link it gives you.

## Adding a class

1. Copy `classes/_template/` to `classes/<id>/` (for example `classes/bio101/`).
2. Fill in `classes/<id>/content.js`. Set `id` to the folder name. The comments explain every field;
   anything you leave out just doesn't show up.
3. Add the class to `classes/index.js`:
   ```js
   { id: 'bio101', title: 'Bio 101', subtitle: 'Cells, genetics, evolution' }
   ```

That's it. The new class appears on the home page.

Tip: you can paste your lecture notes or slides into Claude and ask it to fill in `content.js` in this format.

## Layout

```
index.html              class picker
app.html                the app; loads one class from ?c=<id>
app/engine.js           shared app logic (tabs, flashcards, quiz, practice, exam)
app/style.css           shared styles
classes/index.js        list of classes
classes/<id>/content.js all study content for one class
classes/<id>/extras.js  optional: class-only tabs and lesson diagrams
                        (macro uses it for the Shock Lab, Tools, and supply/demand graphs)
```

## Custom tabs (optional)

A class can add its own interactive tabs with an `extras.js` and `extras: true` in `classes/index.js`.
It runs after the engine and calls:

```js
StudyApp.register({
  tabs: [['id', 'Tab name', function view() { return '<div class="panel">...</div>'; }]],
  viz: function (key) { return { svg: '<svg>...</svg>', cap: 'caption' }; },   // for lessons with viz: 'key'
  click: function (action, value, el) { /* handle data-a="action" buttons; return true if handled */ },
  input: function (key, el) { /* handle inputs with data-i="key"; return true if handled */ }
});
```

See `classes/macro/extras.js` for a full example.
