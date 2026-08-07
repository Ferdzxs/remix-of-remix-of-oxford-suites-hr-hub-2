# Login polish, interview UI rebuild, recruitment notes, onboarding hire flow

## 1. Login page

Rework the left panel so the photo drives the design instead of sitting behind it:

- Try `oxford-tower-wide.png` / `oxford-suite-makati-interior1-3.png` and pick the one that holds up as a tall panel crop; the current image is letterboxing badly at wide viewports.
- Layered treatment: full-bleed `object-cover` photo, burgundy duotone overlay, a soft bottom-to-top dark gradient for text contrast, and a thin gold rule as the accent.
- Content column: logo top-left, a short hotel-flavoured headline plus one supporting line vertically centered, property/contact footer line pinned bottom — consistent rhythm at both tall and short screens.
- Right credential panel keeps its behaviour; only spacing, heading weight and the role tab strip get a light professional polish.

## 2. Applicant Management — interview UI to match the reference

Rebuild the Interview Calendar and Book an Interview cards to mirror the uploaded mock:

- Calendar card: icon + title header, Today / prev / next / gear (Slot settings) buttons on the right, month picker, month grid with booked / suggested-free / no-availability dot legend, and a right-hand "Interviews on <date>" list showing time chip, applicant name + position, interviewer + mode, and a chevron row action, with a "View all" button.
- Book an Interview card: numbered 4-step tracker (Applicant, Date, Time Slot, Details) with circular step markers, then numbered sections — 1 Select Applicant, 2 Choose Date as a horizontal scrollable date card strip with open counts, 3 Select Interview Slot as a dropdown with "N slots available · N applicants per slot", 4 Interview Details (type + interviewer), and a full-width "Confirm & Send Invitation" primary button.
- Slot Settings modal reworked to the two-column layout in the mock: left column Capacity (applicants per slot, number of slots), Time Configuration (first slot starts, slot duration), Break Slots (toggle + start/end time + quick-set chips), Other Options (walk-in toggle, default interview type); right column a live Schedule Preview list of generated slots with Available/Break labels and a summary checklist. Footer: Reset to default + Save Settings.
- Break-slot support is new state in the slot config; break windows render as non-bookable slots.

## 3. Applicant Management — accept moves the candidate

On accepting a post-assessment candidate, don't stop at a toast: hand the record to the hire store and route the user to New Hire Onboarding with that hire selected under Pre-onboarding, so the move is visible immediately.

## 4. Recruitment Management

- Job Post Builder empty state: make the "Create a job posting" card fill the tab area (much larger min-height, wider content), and swap the plus icon for a job-posting icon (FilePlus2 / ClipboardPlus style) in a filled accent tile.
- Vacancy Requisitions list: clearer, friendlier rows — position and department as the primary line, requester/date/urgency as labelled meta instead of bare columns, plain-language status pills, and an obvious primary action per row.
- Replace the "Justification from Core HCM (REQ-…)" panel that currently sits under the builder's navigation trail with a compact "Note" button in the builder header and on each requisition row. Clicking it opens a popover/dialog showing the requester's justification, so it's available on demand rather than always occupying space.

## 5. New Hire Onboarding

- Remove the "Portal account created — default password Oxford@2026" note and the "Hire & create account" button from the Probationary checklist card.
- Change the advance flow: clicking "Advance to Probationary" opens the Add New Hire modal pre-filled with that candidate, but the hire stays in Pre-onboarding until the modal is saved. Cancelling or closing leaves them in Pre-onboarding; saving moves them to Probationary and creates the portal account.
- Advancing Probationary → Regular is unchanged (no modal).
- The plain "Add New Hire" button keeps its current behaviour: an empty modal that files a new person as Pre-onboarding.
- Status tracker: stages become non-interactive display elements — no button semantics, no pointer cursor, no hover affordance on the connecting line or steps.

## Technical notes

- `src/routes/login.tsx`: image swap + layered overlay markup; no logic change.
- `src/components/modules/ApplicantManagement.tsx`: interview calendar + booking + slot-settings dialog rewritten; slot config gains break-window fields; accept path calls `hireStore.setPending` then navigates to the role's `/onboarding` route.
- `src/components/modules/RecruitmentManagement.tsx`: enlarge builder empty state, new icon, requisition row redesign, justification moved into a note popover.
- `src/components/modules/NewHireOnboarding.tsx`: `advance()` defers the stage write for Probationary until modal save; drop account banner/button; tracker `<button>` → `<div>`.
