# Project Map

This document describes the structure of the project.

---

# UI Components

Location:

src/ui

Contains reusable visual components.

Examples:

- DataTableTanstack
- Navbar
- Inputs
- Charts

---

# Pages

Location:

src/app

Pages follow Next.js App Router.

Protected routes exist inside:


app/(private)


Each folder represents a feature.

Examples:

- client
- employee
- sales
- expenses

---

# Page Hooks

Location:


app/(private)/**/hook


Responsible for page state and orchestration.

---

# Domain Layer

Location:


src/core


Contains:

models  
interfaces  
mappers  
utilities

---

# Data Layer

Location:


src/data


Contains:

api  
repositories  
hooks

---

# API Routes

Location:


src/app/api


Used as proxy between frontend and backend.

Handles authentication cookies.

---

# Charts

Location:


src/ui/statistics


Contains Recharts visualizations.

---

# Shared Utilities

Location:


src/lib


Examples:

axiosClient
serverApi