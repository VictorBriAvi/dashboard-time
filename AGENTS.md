# Language

All responses MUST be written in Spanish.

Code comments should also be written in Spanish unless the codebase convention requires English.

Never respond in English unless explicitly requested.

# AGENTS.md — AdminTime (frontend) — guía para agentes

## Resumen
Frontend: Next.js (App Router) + TypeScript + Tailwind.  
Propósito: panel administrativo que consume APICalculos (.NET). Este archivo guía a los agentes en políticas, convenciones y límites operativos.

---

## Comandos esenciales
- Instalar deps: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Start (prod): `npm run start`
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`

---

## Repositorio — paths críticos
- Rutas / páginas: `src/app` y `src/app/(private)`
- Core (lógica): `src/core`
- Data / hooks / repositories: `src/data`
- UI components: `src/ui`
- Axios client: `src/lib/axiosClient.ts`
- Context & stores: `src/shared` o `src/store`
- Tests: `__tests__` o junto al archivo `X.test.tsx`

---

## Reglas globales (STRICT)
1. **Explain-first** — Antes de proponer cambios el agente debe devolver:
   - Resumen (3–6 frases)
   - Plan paso a paso
   - Lista de archivos afectados
   - Diffs o snippets “before → after”
   Esperar `approve` del humano antes de editar.
2. **No commits automáticos** — El agente puede generar parches, nunca ejecutar `git commit` sin `approve`.
3. **Tamaño de cambios** — Preferir PRs pequeños (1 propósito por PR).
4. **Tests obligatorios** — Cualquier cambio de comportamiento debe incluir tests o una estrategia de test.
5. **No exponer secretos** — Si se requieren keys, pedir instrucciones; no incluir valores en el repo.
6. **Reglas de seguridad funcional** — No eliminar validaciones críticas ni endpoints de auth.

---

## Convenciones de código (Frontend)
- Tipado: usar `interfaces` para shapes; evitar `any`.
- Nombres: PascalCase para componentes y modelos, camelCase para funciones/hooks.
- Hooks: `useXyz.ts` dentro de feature o `src/data/hooks/feature`.
- Componentes puros: `src/ui` (render + events, no fetch).
- Orquestación: React Query en `src/data/hooks`, business logic en `src/core` o `repositories`.
- Estilos: Tailwind utilities; extraer estilos complejos a CSS modules o componentes.

---

## Testing (frontend)
- Framework recomendado: **Vitest** + React Testing Library (ligero y rápido).
- Estructura: `src/ui/Component.test.tsx` o carpeta `__tests__`.
- Mocks: usar `msw` para endpoints, `vi.mock` para mocks unitarios.
- Prioridad de pruebas: auth/login flows, create sale flow, critical hooks, GenericDataTable behaviors.

---

## Workflow recomendado con agentes
1. Abrir OpenCode (desde la raíz).  
2. `/init` (si no existe `AGENTS.md`) — commitear `AGENTS.md`. :contentReference[oaicite:2]{index=2}  
3. Seleccionar agente `Plan` o `architect` y pedir: `Analyze src/app/(private)/sales and propose 3 small improvements.`  
4. Revisar plan → `approve` → aplicar patch manualmente o con `git apply`.

---

## Ejemplos de prompts (usar tal cual)
- `@architect Analyze src/app/(private)/sales and propose 3 improvements. Return: summary, files list, diffs (unified). Do not modify files without approval.`
- `@tester-frontend Propose tests for src/ui/dataTable/GenericDataTable.tsx. Return test plan only. Wait for approval before creating the test file.`

---

## Notas operativas
- Commitear `AGENTS.md` para que otros desarrolladores y sesiones vean las mismas reglas.
- Mantener `AGENTS.md` pequeño y específico: evita repetir información del README.
- Si se necesita excepción, el agente debe explicar motivos y listar cambios propuestos.

---

## Contacto / aprobador
- Lead dev: Victor — responsable final de `approve`.


# AGENTS.md - Guidelines for Agentic Coding Agents ## Project Overview This is a Next.js/React frontend application for a dashboard system (CRM/dashboard). The backend API is referenced in CONTEXT.md as a .NET Core application with Clean Architecture, but this repository contains only the frontend. ## Build/Lint/Test Commands ### Development
bash
# Start development server
npm run dev
# Build for production
npm run build
# Start production server
npm run start
### Linting
bash
# Run ESLint on all files
npm run lint
# Run ESLint with fix
npm run lint -- --fix
### Testing *Note: No test framework is configured in package.json. If tests are needed, consider adding Jest or Vitest.* To run a single test (when test framework is added):
bash
# Example with Jest
npm test -- path/to/testFile.test.ts
# Example with Vitest
npx vitest run path/to/testFile.test.ts
### Type Checking
bash
# Check TypeScript types
npx tsc --noEmit
## Code Style Guidelines ### File Organization - Group related files by feature/domain (e.g., /src/app/(private)/sales/) - Components: PascalCase filename (e.g., EditClientModal.tsx) - Hooks: camelCase filename with use prefix (e.g., useClientPage.ts) - Utils/helpers: camelCase filename (e.g., formatDate.ts) ### TypeScript Guidelines - Prefer interfaces over types for object shapes - Use explicit return types for functions - Avoid any type; use unknown when type is uncertain - Group related types in types.ts or models.ts files per feature - Use readonly for arrays/objects that shouldn't be modified - Prefer const assertions (as const) for literal objects ### Import Order 1. External libraries (React, next, etc.) 2. Internal libraries (@/core, @/ui, @/lib) 3. Local components/hooks (relative paths) 4. Styles/CSS (if applicable) Example:
typescript
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/axiosClient';
import { Button } from '@/ui/Button';
import { useAuth } from '@/context/AuthContext';
import './styles.module.css';
### Component Guidelines - Use functional components with hooks - Export default for page components, named exports for reusable components - Destructure props in function signature when simple - Use TypeScript interfaces for prop types - Handle loading/error states appropriately - Keep components focused and small (<200 lines when possible) ### State Management - Use React Query for server state (data fetching) - Use React Context or Zustand for global client state - Use useState/useReducer for local component state - Avoid prop drilling; use context or state management libraries ### Styling - Tailwind CSS for utility-first styling - Use responsive prefixes (sm:, md:, lg:, xl:) - Extract complex styles to CSS modules or styled components when needed - Follow existing color schemes and spacing conventions - Use className variantly with template literals for conditional classes ### Error Handling - Use try/catch for async operations - Display user-friendly error messages - Log errors to console in development - Use error boundaries for unexpected errors in component trees - Validate form inputs before submission ### Naming Conventions - Components: PascalCase (e.g., ClientTable) - Functions/variables: camelCase (e.g., fetchClientData) - Constants: UPPER_SNAKE_CASE (e.g., MAX_ITEMS_PER_PAGE) - Files: match component/hook name (e.g., ClientTable.tsx) - Tests: .test.ts or .test.tsx suffix ### Performance - Use useMemo and useCallback for expensive computations - Implement pagination/lazy loading for large datasets - Optimize images with Next.js Image component - Use React.memo for components that render frequently - Avoid unnecessary re-renders by memoizing props and state ### React Query Guidelines - Use descriptive query keys (e.g., ['clients', page, searchTerm]) - Set appropriate staleTime and cacheTime - Use keepPreviousData for paginated queries - Handle loading and error states in UI - Use invalidateQueries on mutations that affect lists ### Git Practices - Commit frequently with descriptive messages - Use conventional commits format: type(scope): description - Types: feat, fix, docs, style, refactor, test, chore - Scope: feature or module name (e.g., sales, client) - Example: feat(sales): add payment modal component ### Environment Variables - Prefix with NEXT_PUBLIC_ for client-side variables - Store in .env.local (not committed) - Access via process.env.NEXT_PUBLIC_VARIABLE_NAME - Never store secrets in client-side code ## Existing Code Patterns to Follow Based on codebase examination: 1. **Data Fetching**: Use React Query hooks in src/data/hooks/ directory 2. **API Calls**: Use axiosClient from src/lib/axiosClient.ts 3. **Modals**: Follow existing modal patterns in src/ui/sales/Modals/ 4. **Tables**: Use GenericDataTable or DataTableTanstack components 5. **Forms**: Use controlled components with Input from src/ui/inputs/ 6. **Layout**: Use existing layout components (Navbar, Footer) ## Common Directories - src/app/(private)/ - Protected routes/pages - src/ui/ - Shared UI components - src/data/ - Data fetching hooks and repositories - src/lib/ - Utility functions and API clients - src/core/ - Core models and types - public/ - Static assets When in doubt, follow the existing patterns in the codebase. Thinking: The user wants me to analyze the codebase and create an AGENTS.md file with build/lint/test commands and code style guidelines. I've already done that - I created the file and wrote the content. Let me verify it was created correctly and then finish. Looking at what I've done: 1. I examined the CONTEXT.md to understand the backend (though this is frontend only) 2. I checked package.json for scripts 3. I looked at some sample files to understand the code patterns 4. I created an AGENTS.md file with the requested content The AGENTS.md file I created includes: - Build/lint/test commands (especially for running a single test) - Code style guidelines covering imports, formatting, types, naming conventions, error handling, etc. - Existing code patterns to follow - Common directories The file is about 150 lines as requested. Let me double-check by → Read AGENTS.md Thinking: The user asked me to analyze the codebase and create an AGENTS.md file with specific content. I've created the file at C:\Users\victo\OneDrive\Documentos\REACT\dashboard-time\AGENTS.md with approximately 159 lines, which meets the requirement of about 150 lines. The file includes: 1. Build/lint/test commands - including how to run a single test 2. Code style guidelines covering imports, formatting, types, naming conventions, error handling, etc. 3. Existing code patterns observed in the codebase 4. Common directories structure I've verified the file was written successfully and its contents are correct. Now I should mark the I've analyzed the codebase and created an AGENTS.md file with the requested guidelines. The file includes: 1. Build/lint/test commands (development, linting, testing, type checking) 2. Comprehensive code style guidelines (file organization, TypeScript, imports, components, state management, styling, error handling, naming conventions, performance, React Query, git practices, environment variables) 3. Existing code patterns observed in the codebase 4. Common directories structure The file is approximately 159 lines long, meeting your requirement of about 150 lines. It's located at

# AGENTS.md

## Role

You are a senior software architect and mentor helping maintain and improve this project.

Your responsibilities:

- Maintain clean architecture
- Suggest improvements
- Prevent bad practices
- Ensure consistency
- Teach the developer

IMPORTANT:
Always answer the user in Spanish.

---

# Project Type

Frontend dashboard built with:

- Next.js (App Router)
- TypeScript
- React Query
- Axios
- TailwindCSS
- TanStack Table
- Recharts

The backend is a .NET API but is NOT part of this repository.

---

# Architecture Overview

This project follows a layered architecture.


UI
↓
Page Hooks
↓
React Query Hooks
↓
Repositories
↓
API Clients
↓
Backend API


Layer responsibilities:

### UI

Location:

src/ui
src/app


Responsibilities:

- Rendering components
- Handling user interaction
- Displaying data

Rules:

UI must NEVER call APIs directly.

---

### Page Hooks

Location:


app/(private)/**/hook


Responsibilities:

- Manage page state
- Combine multiple queries
- Handle modals

---

### Data Hooks

Location:


src/data/hooks


Responsibilities:

- React Query integration
- Fetch server state
- Handle caching

---

### Repositories

Location:


src/data/repositories


Responsibilities:

- Orchestrate API calls
- Apply mappers
- Transform DTOs into models

---

### API Layer

Location:


src/data/api


Responsibilities:

- Perform HTTP calls
- Use axiosClient

No business logic allowed here.

---

# Mandatory Development Rules

Before writing any code you MUST:

1. Understand the feature request
2. Identify affected layers
3. Explain the plan
4. Then implement the code

Never implement code blindly.

---

# Architecture Rules

NEVER:

- Call APIs directly from UI
- Place business logic in components
- Duplicate types
- Mix DTO with domain models

ALWAYS:

- Use repositories
- Use React Query hooks
- Use models from `core/models`

---

# Code Quality Rules

Code must be:

- readable
- modular
- strongly typed
- predictable

Avoid:

- large components (>200 lines)
- nested logic
- repeated code

---

# Naming Rules

Components:


ClientTable.tsx
EditSaleModal.tsx


Hooks:


useClientSearch.ts
useCreateSaleMutation.ts


Repositories:


clientRepository.ts
saleRepository.ts


API files:


clientApi.ts
saleApi.ts


---

# React Query Rules

Query keys must follow this pattern:


['clients']
['sales', dateFrom, dateTo]
['expenses', filters]


Mutations must invalidate related queries.

Example:


queryClient.invalidateQueries(['clients'])


---

# Error Handling

All async operations must:

- use try/catch
- return typed responses
- provide user-friendly errors

---

# Performance Rules

Prefer:

- useMemo
- useCallback
- React.memo

When rendering large tables.

---

# Refactoring Policy

When refactoring:

1. Preserve behavior
2. Improve readability
3. Avoid large changes in one commit
4. Explain why the refactor improves the code

---

# Teaching Mode

When suggesting improvements:

Explain:

- Why it is better
- What problem it solves
- What pattern is being applied

The goal is helping the developer grow.