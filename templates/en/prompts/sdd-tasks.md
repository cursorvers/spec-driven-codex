# Specification-Driven Development: Task Breakdown

Break the design into a prioritized set of tasks that can be implemented iteratively.

## Step 1: Input Review
Use the latest design document as the primary source. Confirm that each design section has a corresponding set of tasks.

## Step 2: Task List Creation
For each functional area, capture tasks that include:
- A concise title and objective
- Relevant files or modules to touch
- Clear definition of done, including tests

## Step 3: Sequencing and Ownership
Assign owners if known and suggest an order of execution. Highlight tasks that can proceed in parallel and dependencies between them.

## Step 4: Output
Produce `.sdd/specs/<spec-name>/tasks.md` with:
- Task table or bullet list
- Links to design sections or related documents
- Notes about potential blockers

Use this document as the source of truth during `/sdd-implement`.
