# GLORB // Earth Signal Calibration

A standalone or program-linked student self-regulation planning tool for middle school learners.

## What this build does

- Teaches the four Signal states before asking the student to use them, so no prior Glorb knowledge is required.
- Uses one question per screen and records student-selected feelings, body signs, observable signs, contexts, strategies, adult supports and student-written "Other" responses.
- Builds a printable adult-facing Signal Plan with definitions of the Signal System and each signal.
- Includes a Catch It Early section for Rising Signal and a First Support section for Signal Overload.
- Supports print or Save as PDF using the browser print dialog.
- Supports Web Share where available, with an email fallback.
- Keeps data in the browser session only. No server, account, analytics or database is included.
- Includes Read Aloud using the browser Speech Synthesis API.

## Evidence-informed design notes

This is a formative SEL self-report and planning tool, not a clinical diagnostic assessment.

The structure is informed by:

1. CASEL self-awareness and self-management: identifying emotions, linking emotions and behaviour, managing stress and using stress-management strategies.
2. Australian Curriculum V9 Personal and Social Capability: constructing, expressing, managing, monitoring and evaluating emotional responses.
3. Research on school-based adolescent emotion-regulation programs showing beneficial, though variable, effects and supporting explicit teaching of regulation skills.
4. Emotion-regulation flexibility research. No single strategy is best in every context, so the tool asks students which strategies help them rather than prescribing one universal response.
5. Developmental co-regulation research. Adult support is included as part of the plan because young people continue to benefit from external scaffolding during challenging states.
6. Relaxation and breathing research. Slow comfortable breathing is offered as one optional strategy, not as a guaranteed or compulsory technique.
7. Body-signal and interoception research is still mixed in adolescents. Body-cue questions are therefore framed as personal noticing and communication, not as a claim that identifying body sensations will automatically improve regulation.

Some strategy cards, such as fidgets, quiet space, movement, water/snack and strong-muscle movement, are common classroom supports and are also present in the supplied Glorb framework. Their effectiveness is individual and context-dependent. The report deliberately says "student has identified" and encourages adults to observe, collaborate and revise the plan based on what actually helps.

## Deployment

This is a static site. Upload the contents of this folder to a GitHub Pages repository.

Main files:

- `index.html`
- `styles.css`
- `app.js`
- `assets/`

No build step or external package is required.
