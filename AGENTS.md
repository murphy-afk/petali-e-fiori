# AGENTS

Instructions for anyone (human or AI agent) working on the Petali e Fiori website.

Read ROADMAP.md first. It holds the research, the design direction and the sessions.

## Hard rules

These rules apply to every file you create or edit.

1. No em-dashes. Never write the character U+2013 or U+2014. Use a period, a comma, a colon or
   parentheses instead.
2. No emojis. Plain text only, in code, comments, commits and documents.
3. No lines that only contain `>` or `/>`. Keep self closing tags on the same line as the rest of
   the tag, for example `<img src="rose.jpg" alt="Rosa pesca" />`.
4. Never commit without permission. Do not run git commit, git push, git tag or any other command
   that records history until the user explicitly allows it. Prepare the changes, then ask and
   wait for a clear yes.
5. Never put the session number in a commit message. Describe what actually changed, for example
   "Add contact form validation and rate limit".
6. Commit messages stay under 12 words. Subject line only, no session number, no emoji.

Any file that breaks one of these rules must be fixed before you move on.

## Language

- Website copy: Italian, warm and polite, in the voice of the shop. Never invent facts, prices or
  phone numbers. Everything comes from ROADMAP.md section 3 or from the database.
- Code, code comments, commit messages and documentation: English.
- No placeholder text. If content is missing, take it from ROADMAP.md or ask.

## Tech rules

- Stack is fixed: React with Vite, Express, MySQL, custom CSS. Do not add UI frameworks such as
  Bootstrap or Tailwind, do not add CSS preprocessors, do not add an ORM.
- CSS lives in client/src/styles: tokens.css for palette and type, base.css for reset and
  typography, layout.css for grid, one file per component next to the component.
- Colors, spacing and font sizes always come from CSS variables defined in tokens.css. Never hard
  code a hex value inside a component.
- React: function components, hooks, no class components, no Redux, state stays local or goes
  through the API client.
- Data access goes through controllers in server/src/controllers, never inside route files.
- Database changes always go into db/schema.sql and db/seed.sql so a fresh import reproduces the
  whole site. The gallery photos live in db/seed_gallery.sql, which is generated, never edit it
  by hand, change scripts/export-images.ps1 instead. Test with MySQL Workbench before committing.
- Secrets stay in .env, commit .env.example only.
- Every request to the database is wrapped in error handling, no unhandled promise rejections.

## SEO rules

- One H1 per page, heading levels never skip.
- Every route sets its own title, meta description, canonical and Open Graph tags during server
  side rendering.
- Every image needs a descriptive Italian alt text.
- Navigation links are text, never images.
- Keep the JSON LocalBusiness Florist schema up to date when contact details change.

## Workflow

1. Open ROADMAP.md and work only on the session named in the task.
2. Complete the tasks, then check the acceptance list of that session.
3. Update the session status in ROADMAP.md when the acceptance list passes.
4. Keep the repository clean: no leftover screenshots, no unused assets, no commented out blocks
   of old code.

## Definition of done for any session

- The app runs with `npm run dev` from a clean install.
- `npm run build` produces the production bundle without warnings that matter.
- Schema plus seed import cleanly into MySQL.
- No line in any file breaks the hard rules above.
- Italian copy reads naturally and matches the shop facts in ROADMAP.md.
