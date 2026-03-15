# Refactoring Rules

Refactoring must improve code quality without changing behavior.

The goal of refactoring is:

- improve readability
- reduce duplication
- simplify logic

---

# Safe Refactoring Steps

Before refactoring:

1 understand the existing code
2 identify the problem
3 propose improvement
4 implement minimal change

---

# Allowed Refactors

Examples:

- extract functions
- split large components
- rename variables
- move logic to hooks
- remove duplicated code

---

# Dangerous Refactors

Avoid:

- changing data flow
- changing API contracts
- modifying domain models
- introducing breaking changes

---

# Large Components

If a component exceeds 200 lines:

- extract hooks
- split UI components
- isolate logic

---

# Duplication

If the same logic appears twice:

extract it into:

- utility
- hook
- service

---

# Refactoring Goal

After refactoring the code should be:

- easier to understand
- easier to test
- easier to extend