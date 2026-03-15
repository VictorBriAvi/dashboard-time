# CONTEXT.md — APICalculos

## Descripción general
API REST en .NET con arquitectura Clean Architecture. Backend del sistema de gestión "AdminTime / Time for You". Maneja ventas, empleados, clientes, gastos, servicios y autenticación por tienda (multi-tenant via storeId).

---

## Stack técnico
- **Framework:** ASP.NET Core (C#)
- **ORM:** Entity Framework Core con Fluent API
- **Base de datos (dev):** SQL Server Express — `AdminTimeForYou`
- **Base de datos (prod):** SQL Server en `SQL5113.site4now.net` — `db_ac2681_time01`
- **Autenticación:** JWT con BCrypt para hashing de contraseñas
- **Mapeo:** AutoMapper
- **Patrón:** Repository + UnitOfWork + Service Layer

---

## Arquitectura — Capas

### API/Controllers/
Endpoints REST. Todos heredan de `BaseController` que expone:
- `GetStoreIdFromToken()` → extrae `storeId` del JWT
- `GetUserIdFromToken()` → extrae `userId` del JWT

Controllers existentes:
- AutenticacionController, AuthController
- ClientController, CustomerHistoryController
- EmployeeController
- ExpenseController, ExpenseTypeController
- PaymentTypeController
- ProductoController
- RolController
- SaleController, SaleDetailController
- ServiceCategoriesController, ServiceTypeController, ServicioController
- UsuarioController, UsuarioRolController

### Application/
- **DTOs/** → Contratos de entrada/salida para cada entidad (CreationDTO, DTO, UpdateDTO)
- **Interfaces/** → Contratos de repositorios y servicios (IXxxRepository, IXxxService)
- **Services/** → Lógica de negocio
- **Mapping/** → `AutoMapperProfiles.cs`
- **Validators/** → (en construcción)

### Domain/Entities/
Entidades del dominio:
`Client, CustomerHistory, Employee, Expense, ExpenseType, PaymentType, Producto, Rol, Sale, SaleDetail, ServiceCategorie, ServiceType, Servicio, Usuario, UsuarioRol`

### Infrastructure/
- **Data/Configurations/** → Fluent API config por entidad (13 archivos)
- **Data/MyDbContext.cs** → DbContext principal
- **Repositories/** → Implementaciones concretas
- **UnitOfWork/** → `IUnitOfWork` / `UnitOfWork`
- **Migrations/** → EF Core migrations

---

## Autenticación
- Endpoint principal: `POST /api/auth/login`
- Endpoint legacy: `POST /api/autenticacion/Validar`
- JWT contiene claims: `userId`, `storeId`, `ClaimTypes.Name`
- Token expira en **4 horas**
- Todos los controllers protegidos con `[Authorize]` via `BaseController`

---

## Convenciones de nombres
- DTOs: `{Entidad}DTO` / `{Entidad}CreationDTO` / `{Entidad}UpdateDTO`
- Interfaces: `I{Entidad}Repository` / `I{Entidad}Service`
- Servicios: `{Entidad}Service.cs`
- Repositorios: `{Entidad}Repository.cs`
- Controllers: `{Entidad}Controller.cs`

---

## Multi-tenancy
Cada request autenticado lleva `storeId` en el JWT. Todos los repositorios filtran por `storeId` para aislar datos por tienda.

---

## Reportes financieros (FinancialReportRepository)
- `GetFinancialSummaryAsync(storeId, fromDate, toDate)` → TotalVentas, TotalPagosColaboradores, TotalGastos
- `GetDailyFinancialSummaryAsync(storeId, fromDate, toDate)` → resumen diario con ventas, pagos y gastos
- Cálculo de ventas: `(UnitPrice + AdditionalCharge) * (1 - DiscountPercent/100)`
- Cálculo de pago colaborador: resultado anterior `* (PaymentPercentage/100)`

---

## URLs
- **Dev:** `https://localhost:7116`
- **Prod:** `https://victoravila-001-site1.ktempurl.com`