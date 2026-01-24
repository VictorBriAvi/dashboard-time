export interface Expense{
  id: number;
  description: string;
  price: number;
  nameExpenseType: string;
  expensesDateStr: string;
  expenseTypeId: number;
}

export interface CreateExpense {
  description: string,
  price: number,
  expenseTypeId: number
} 

export interface EditExpense {
  id: number;
  description: string,
  price: number,
  expenseTypeId: number
}

