import { Expense } from "@/core/models/expense/expense";
import { ExpenseDTO } from "@/data/DTO/expense/expenseDTO";
import { Option } from "@/ui/inputs/SearchSelect";

export const expenseMapperSearch = {
  fromSearchpDto(dtos: ExpenseDTO[]): Option[] {
    return dtos.map((c) => ({
      value: c.id,
      label: c.description,
      price: c.price,
    }));
  },
};

export const expenseAllMapper = {
  All(dtos: ExpenseDTO[]): Expense[] {
    return dtos.map((dto) => ({
      id: dto.id,
      description: dto.description,
      price: dto.price,  
      expensesDateStr: dto.expensesDateStr, 
      expenseTypeId: dto.expenseTypeId,
      nameExpenseType: dto.nameExpenseType,
      paymentTypeId: dto.paymentTypeId,
      paymentTypeName: dto.paymentTypeName,

    }));
  },
};


// export const expenseEditMapper = {
//   toDto(expense: Expense): ExpenseDTO {
//     const [day, month, year] = expense.expensesDateStr.split("-");

//     return {
//       id: expense.id,
//       description: expense.description,
//       price: expense.price,
//       expenseTypeId: expense.expenseTypeId,
//       expensesDateStr: 
//       paymentTypeId: expense.paymentTypeId // ✅ ISO válido
//     };
//   },
// };
