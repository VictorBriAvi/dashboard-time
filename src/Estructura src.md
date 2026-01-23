Comando para obtener estructura

Get-ChildItem -Recurse | Select-Object FullName > estructura.txt

src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── readme.txt
│   └── dashboard/
│       ├── page.tsx
│       └── components/
│           ├── BalanceGrid.tsx
│           ├── Payment.tsx
│           └── PorcentEmployee.tsx
│
├── core/
│   ├── constants/
│   ├── interfaces/
│   │   └── ApiResponse.ts
│   ├── models/
│   │   └── Sale.ts
│   └── utils/
│
├── data/
│   ├── api/
│   └── repositories/
│       └── salesRepository.ts
│
├── features/
│   ├── readme.txt
│   └── sales/
│       ├── components/
│       ├── hooks/
│       │   └── useSales.ts
│       ├── pages/
│       ├── services/
│       ├── index.ts
│       └── readme.txt
│
├── lib/
│   ├── axiosClient.ts
│   ├── providers.tsx
│   ├── reactQueryClient.ts
│   └── readme.txt
│
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── store/
│   │   ├── useAuthStore.ts
│   │   └── readme.txt
│   ├── styles/
│   │   ├── globals.css
│   │   └── readme.txt
│   └── readme.txt
│
└── ui/
    ├── atoms/
    ├── layouts/
    ├── molecules/
    │   └── DataTableTanstack.tsx
    ├── organisms/
    │   ├── BarChartCustom.tsx
    │   ├── Features.tsx
    │   ├── Footer.tsx
    │   ├── Hero.tsx
    │   ├── LineChartCustom.tsx
    │   ├── Navbar.tsx
    │   ├── PieChartCustome.tsx
    │   └── SummaryCard.tsx
    └── readme.txt
