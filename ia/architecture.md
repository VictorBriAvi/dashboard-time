# Architecture Guide

This project follows a layered frontend architecture inspired by Clean Architecture.

The goal is to keep the code:

- maintainable
- scalable
- testable
- predictable

The architecture separates responsibilities between UI, state management, and data access.

---

# High Level Architecture


UI Components
↓
Page Hooks
↓
React Query Hooks
↓
Repositories
↓
API Layer
↓
Backend API


Each layer has strict responsibilities.

---

# Layer Responsibilities

## UI Layer

Location:

src/ui  
src/app

Responsibilities:

- render components
- display data
- handle user interaction

Rules:

UI must NEVER call APIs directly.

UI must use hooks to access data.

UI should not contain business logic.

---

## Page Hooks

Location:

app/(private)/**/hook

Responsibilities:

- manage page state
- coordinate multiple queries
- handle modals
- prepare data for UI

Page hooks are the bridge between UI and data layer.

---

## React Query Hooks

Location:

src/data/hooks

Responsibilities:

- fetching server data
- caching
- handling loading and error states

These hooks must not contain UI logic.

---

## Repository Layer

Location:

src/data/repositories

Responsibilities:

- orchestrate API calls
- combine multiple API responses
- apply mappers
- convert DTOs into domain models

Repositories isolate the rest of the application from API changes.

---

## API Layer

Location:

src/data/api

Responsibilities:

- perform HTTP requests
- communicate with backend endpoints

API files must only contain request logic.

No transformation logic allowed.

---

# Domain Layer

Location:

src/core

Contains:

models  
interfaces  
mappers  
utilities

Responsibilities:

- define domain models
- transform raw data
- provide reusable logic

---

# Data Flow

Example flow for fetching clients:


ClientPage
↓
useClientPage
↓
useClientSearch
↓
clientRepository
↓
clientApi
↓
Backend


---

# Architectural Rules

NEVER:

- call APIs from UI components
- duplicate domain models
- mix DTO and domain models
- place business logic in UI

ALWAYS:

- fetch data through React Query hooks
- use repositories for orchestration
- use mappers to transform data