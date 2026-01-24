import type { ExpenseCategorieDTO } from "@/data/DTO/expenseCategorie/expenseCategorieDTO";
import { ExpenseCategorie } from "@/core/models/expenseCategorie/expenseCategorie";

export const expenseCategorieMapper = {
  All(dtos: ExpenseCategorieDTO[]): ExpenseCategorie[] {
    return dtos.map((dto) => ({ id: dto.id, name: dto.name }));
  },
};
