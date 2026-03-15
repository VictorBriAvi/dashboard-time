# Coding Rules

This document defines coding standards for this project.

All code must follow these principles.

---

# Core Principles

Code must be:

- readable
- predictable
- modular
- strongly typed

Avoid clever code. Prefer clear code.

---

# TypeScript Rules

Always use TypeScript strictly.

Rules:

- avoid `any`
- prefer interfaces for objects
- define return types for functions
- use readonly when data should not change

Example:


interface Client {
id: number
name: string
}


---

# Function Design

Functions should:

- do one thing
- be small
- have descriptive names

Avoid large functions with multiple responsibilities.

---

# Component Rules

React components should:

- be small
- focus on rendering
- avoid business logic
- receive data through props or hooks

Preferred pattern:


Page
↓
Page Hook
↓
UI Components


---

# Error Handling

All async operations must use try/catch.

Example:


try {
const result = await apiCall()
} catch (error) {
console.error(error)
}


User-facing errors must be friendly.

---

# Performance Rules

Use optimization only when needed.

Allowed tools:

- useMemo
- useCallback
- React.memo

Avoid premature optimization.

---

# Reusability

Reusable logic should go into:

- hooks
- utils
- services

Avoid duplicating logic across components.