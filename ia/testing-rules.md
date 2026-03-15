# Testing Rules

Testing ensures reliability and prevents regressions.

This project should use unit and integration tests.

Recommended tools:

- Vitest
- React Testing Library

---

# What Should Be Tested

Test:

- business logic
- utilities
- hooks
- repositories

Avoid testing pure UI layout.

---

# Hook Testing

Hooks should be tested for:

- correct data fetching
- loading states
- error states

---

# Repository Testing

Repositories should be tested to ensure:

- correct API calls
- correct data mapping

---

# Test Naming

Test files should follow this pattern:


clientRepository.test.ts
useClientSearch.test.ts


---

# Test Structure

Use the Arrange / Act / Assert pattern.

Example:


Arrange
create mock data

Act
call function

Assert
verify expected result


---

# Test Isolation

Tests must not depend on:

- network calls
- external APIs

Use mocks instead.

---

# Goal of Tests

Tests must:

- detect regressions
- document behavior
- give confidence during refactors