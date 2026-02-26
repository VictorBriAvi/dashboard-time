import axios from "axios";
import { SummaryReport } from "@/core/models/reports/SummaryReportModel";
import { ApiResponse } from "@/core/interfaces/apiResponse";
import { DailySummaryRaw } from "@/core/models/reports/DailySummaryReportModel";
import { EmployeeSaleSummaryRaw } from "@/core/models/reports/EmployeeSaleSummaryReportModel";
import { ExpenseCategoryRaw } from "@/core/models/reports/ExpenseCategoryRaw";
import { PaymentTypeBalance } from "@/core/models/reports/SalesByPayment";
import { SaleDTO } from "../DTO/Sale/SaleDTO";

export const reportApi = {
  getSummary: async (fromDate: string, toDate: string) => {
    const response = await axios.get<SummaryReport>(
      "/api/report/summary",
      { params: { fromDate, toDate } }
    );

    return response.data;
  },

  getDailySummary: async (fromDate: string, toDate: string) => {
    const response = await axios.get<DailySummaryRaw[]>(
      "/api/report/daily-summary",
      { params: { fromDate, toDate } }
    );

    console.log(response.data)
    return response.data;
  },

  getEmployeeSaleSummary: async (fromDate: string, toDate: string) => {
    const response = await axios.get<EmployeeSaleSummaryRaw[]>(
      "/api/report/employee-sales-summary",
      { params: { fromDate, toDate } }
    );

    return response.data;
  },

  getExpensesByCategory: async (fromDate: string, toDate: string) => {
  const response = await axios.get<ExpenseCategoryRaw[]>(
    "/api/report/expenses-by-category",
    { params: { fromDate, toDate } }
  );

  return response.data;
},

  getSalesSummaryByPayment: async (startDate: string, endDate: string) => {
    const response = await axios.get<PaymentTypeBalance[]>(
      "/api/report/payment-type-balance",
      { params: { startDate, endDate } }
    );

    return response.data;
  },

  getSalesByDateRange: async (fromDate: string, toDate: string) => {
    const response = await axios.get<SaleDTO[]>(
      "/api/report/sales-by-date-range",
      { params: { fromDate, toDate } }
    );

    return response.data;
  },
};