export interface Expense {
  id: number;
  description: string;
  price: number;
  expensesDateStr: string;
  expenseTypeId: number;
  nameExpenseType: string;
  paymentTypeId: number;
  paymentTypeName: string;
}

export interface CreateExpense {
  description: string,
  price: number,
  expenseTypeId: number;
  expenseDate: string;
  paymentTypeId: number;
} 

export interface EditExpense {
  id: number;
  description: string,
  price: number,
  expenseTypeId: number,
  expenseDate: string,
  paymentTypeId: number;
}

