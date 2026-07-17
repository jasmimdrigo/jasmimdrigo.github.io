# JdPortfolio

A single-page academic portfolio/CV site, built with Angular. The site's content lives in one plain data file, so it can be updated without touching any code.

## Updating the site content

All of the content on the page lives in one file: `public/content.json`.

The site is deployed via a GitHub Actions workflow (`.github/workflows/static.yml`) that watches the `main` branch. As soon as a change lands on `main`, the workflow rebuilds the site and publishes it to GitHub Pages, usually within a minute or two.

### How to edit it

1. Open `public/content.json` in the repository on GitHub.
2. Click the pencil icon in the top right of the file view to edit it in your browser.
3. Make your changes (see the field guide and formatting rules below).
4. Click on "Commit changes" and explain your modifications on the available fields, to then commit directly to `main`. It'll go live right away.

No local setup or terminal needed for any of this, it all happens in the browser. If you'd rather edit locally, clone the repo, open `public/content.json` in any text editor (Notepad works fine), then commit and push the change.

### Formatting rules (important!!)

`content.json` is a JSON file, and JSON is picky about punctuation. None of these mistakes will break anything permanently, but the page will show "Couldn't load page content" until they're fixed:

- Every piece of text needs to be wrapped in double quotes, like `"this"`.
- Every entry in a list needs a comma after it, except the last one.
- If your text itself contains a double quote, put a backslash in front of it: `\"like this\"`.
- Don't remove or rename anything to the left of a colon, e.g. `"degree"` or `"years"` - those are field names the app relies on. Only change the text to the right of the colon. Renaming a field means also updating the code that reads it.
- Keep matching curly braces `{ }` and square brackets `[ ]`. If you copy an entry to duplicate it, copy the whole block, opening brace and closing brace included.

If something does go wrong, the site shows an error message. Check for a missing quote or comma near your last edit, or just undo the commit on GitHub using the "Revert" button on the commit page. If you're not sure whether an edit is valid, paste the whole file into a free JSON checker like jsonlint.com before committing and it'll tell you exactly where the problem is.

### Field guide

| Field                                                | What it is                                                                                                                           |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `name`, `tagline`, `university`, `location`, `email` | Header info and contact details.                                                                                                     |
| `photoUrl`, `cvUrl`                                  | Paths to the profile photo and the CV PDF (see "Updating the photo or CV PDF" below).                                                |
| `linkedinUrl`, `academiaUrl`, `blueskyUrl`           | Profile links. Leave one as `""` (empty quotes) to hide it.                                                                          |
| `about`                                              | A list of paragraphs for the About section. Add or remove lines to add or remove paragraphs.                                         |
| `education`                                          | A list of entries, each with `degree`, `institution`, `years`, and `detail`. Copy an existing entry to add a new one.                |
| `researchInterests`, `fellowships`                   | Simple lists of short bullet points.                                                                                                 |
| `publications.peerReviewed`, `publications.other`    | Two separate lists of citations, as plain text strings.                                                                              |
| `selectedPresentations`                              | A curated list shown on the page. Kept short on purpose - it isn't meant to list everything, the full history belongs in the CV PDF. |
| `teaching`                                           | A list of entries, each with `title`, `institution`, and `years`.                                                                    |
| `teachingNote`                                       | One paragraph of extra teaching context, shown below the teaching list.                                                              |
| `languages.modern`, `languages.historical`           | Two paragraphs describing language proficiency.                                                                                      |

### Adding or removing a list item

To add an entry, copy an existing one in that list, paste it below (or above), add a comma after the entry that now comes before it, and edit the copied text. For simple lists like `researchInterests` or `fellowships`, each entry is just a quoted string. For entries with `institution`/`years`/etc, like `education` or `teaching`, copy the whole `{ }` block.

To remove an entry, delete the whole block or line, and check that the entry before it doesn't have a trailing comma if it's now last in the list.

### Updating the photo or CV PDF

Both files live in `public/`: `profile.jpeg` is the photo, `Jasmim-Drigo-CV.pdf` is the CV. The easiest way to update either is to upload a new file with the same name to `public/` on GitHub, which overwrites the old one, no changes to `content.json` needed. If you upload under a different name, update `photoUrl` or `cvUrl` in `content.json` to match (paths start with a slash, e.g. `/my-new-photo.jpg`).
