# Naming Conventions

Naming must be clear and descriptive.

Avoid abbreviations.

Bad example:


data
temp
value


Good example:


clientList
salesSummary
employeePayments


---

# File Naming

Components:

PascalCase

Example:


ClientTable.tsx
EditSaleModal.tsx


Hooks:

camelCase with use prefix.


useClientSearch.ts
useCreateSaleMutation.ts


Repositories:


clientRepository.ts
saleRepository.ts


API files:


clientApi.ts
saleApi.ts


---

# Variable Naming

Variables should explain their meaning.

Example:


const salesByEmployee
const totalExpenses
const selectedClient


Avoid generic names.

---

# Boolean Naming

Booleans should sound like questions.

Example:


isLoading
isAuthenticated
hasPermission


---

# Event Handlers

Use the prefix "handle".

Example:


handleSave
handleDelete
handleSubmit


---

# Constants

Use UPPER_SNAKE_CASE.

Example:


MAX_ITEMS_PER_PAGE
DEFAULT_TIMEOUT