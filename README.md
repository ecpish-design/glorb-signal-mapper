# GLORB // Signal Mapper

A student-first emotion and regulation planning tool for middle-school learners. It can be used on its own or alongside the wider Glorb program.

## Student experience

The student does **not** need to know the Signal System.

1. Enter a name or nickname.
2. Choose up to four main feelings that show up at school.
3. Work through one feeling at a time.
4. Answer one short question per screen:
   - What happens in your body?
   - What does your body want to do?
   - What makes the feeling bigger?
   - What helps you?
   - What can someone else do that helps?
   - What does not help?
5. Add a personal answer anywhere using **+ Add my own**.
6. Generate a printable adult-facing Signal Plan.

The student-facing script deliberately avoids asking the learner to classify themselves as Low, Steady, Rising or Overload. The report organises the student's selected body and action patterns into those Signal groups afterward.

## Signal mapping

The report does **not** assign a Signal from an emotion name. For example, "frustrated" is not automatically treated as Rising Signal.

Instead, the build scores the student's selected body and action cues. A feeling can therefore map to Low, Steady, Rising, Overload, or more than one Signal when the selected pattern is mixed. If there is not enough information, the report says that no clear pattern was identified.

This mapping is an organisational aid for collaborative planning, not a diagnosis or validated assessment score.

## What the report includes

- Plain-language definition of the Signal System for adults who have never used Glorb.
- Definitions of Low, Steady, Rising and Signal Overload.
- Student-identified feelings that may appear with each mapped pattern.
- Body cues and action urges.
- Things that can make the feeling bigger.
- Self-selected regulation supports.
- Helpful responses from other people.
- Things the student says do not help.
- A **Catch It Early** section for Rising patterns.
- An **Overload: Support First, Reflection Later** section.
- Print / Save as PDF, Copy Summary and Share with an Adult controls.

## UX choices

- One question per screen.
- Short learner-facing copy.
- Large visual cards.
- Up to four main feelings rather than a full emotion inventory.
- No right/wrong answers or score.
- Read Aloud using the browser Speech Synthesis API.
- Browser-session storage only. No server, account, analytics or database is included.

## Evidence-informed design

See `RESEARCH.md` for the research basis and the limits of the strategy bank. The resource treats strategies as student-selected options to test and review, not universal prescriptions.

## Deployment

This is a static site. Upload the contents of this folder to a GitHub Pages repository.

Main files:

- `index.html`
- `styles.css`
- `app.js`
- `assets/`

No build step or external package is required.
