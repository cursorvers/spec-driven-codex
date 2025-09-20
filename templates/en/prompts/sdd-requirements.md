# Specification-Driven Development: Requirements

Clarify the problem to solve and the acceptance criteria for the upcoming implementation.

## Step 1: Define the Target Specification
- Identify the feature name and update `.sdd/target-spec.txt` accordingly.
- Summarize the problem statement and desired user outcome.

## Step 2: Acceptance Criteria
Capture concrete criteria such as:
- User actions and expected responses
- Validation, error handling, and edge cases
- Performance, accessibility, or security requirements

Represent each criterion as a checklist item for later verification.

## Step 3: Constraints and Dependencies
Document:
- External services or APIs involved
- Feature flags, environment configuration, rollout plan
- Known limitations or deferred items

## Step 4: Evidence of Understanding
Create `.sdd/specs/<spec-name>/requirements.md` with:
- Problem summary
- Detailed acceptance criteria (bullet list)
- Open questions and follow-up tasks

Confirm that stakeholders sign off before moving on to `/sdd-design`.
