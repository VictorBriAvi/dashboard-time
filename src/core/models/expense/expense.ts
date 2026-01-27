export interface Expense {
  id: number;
  description: string;
  price: number;
  expensesDateStr: string;   // string formateado (UI)
  expenseTypeId: number;
  nameExpenseType: string;
}

export interface CreateExpense {
  description: string,
  price: number,
  expenseTypeId: number
  expenseDate: string;
} 

export interface EditExpense {
  id: number;
  description: string,
  price: number,
  expenseTypeId: number
}

