# Study Gym

Static study app (no build step). See README.md for the layout and how classes work.

## Versioning (required on every update)

Every change pushed to the site is a new version. Before committing, add one entry to the TOP of
`window.GYM_CHANGES` in `app/version.js`: `['YYYY-MM-DD', 'short, plain description of what changed']`.
The version number is the list's length, so it goes up by one automatically. One entry per update
(one push the user sees), not per file. Mention the new version number when reporting the update.

## Offline mode

`sw.js` (service worker) saves the whole gym on the device. It reads `classes/index.js` and `app/version.js`
itself, so new classes and version bumps need no change there. If you add a new shared file (anything other
than a class's `content.js` / `extras.js`), add it to `FILES` in `sw.js` or it will be missing offline.
