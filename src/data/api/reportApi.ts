import { axiosClient } from "@/lib/axiosClient";
import { SummaryReport } from "@/core/models/SummaryReportModel";
import { ApiResponse } from "@/core/interfaces/apiResponse";
import { DailySummaryRaw } from "@/core/models/DailySummaryReportModel";
import { EmployeeSaleSummaryRaw } from "@/core/models/EmployeeSaleSummaryReportModel";
import { ExpenseCategoryRaw } from "@/core/models/ExpenseCategoryRaw";
import { SalesByPayment } from "@/core/models/SalesByPayment";
import { SaleByDateRange } from "@/core/models/SaleByDateRangeModel";

export const reportApi = {
  getSummary: async (fromDate: string, toDate: string) => {
    const response = await axiosClient.get<ApiResponse<SummaryReport>>(
      "/report/summary",
      {
        params: { fromDate, toDate },
      }
    );

    return response.data.data;
  },

  getDailySummary: async (fromDate: string, toDate: string) => {
    const response = await axiosClient.get<ApiResponse<DailySummaryRaw[]>>(
      "/report/daily-summary",
      {
        params: { fromDate, toDate },
      }
    );
    return response.data.data;
  },

  getEmployeeSaleSummary: async (fromDate: string, toDate: string) => {
    const response = await axiosClient.get<EmployeeSaleSummaryRaw[]>(
      "/report/employee-sales-summary",
      {
        params: { fromDate, toDate },
      }
    );

    return response.data;
  },

  getExpensesByCategory: async (fromDate: string, toDate: string) => {
    const response = await axiosClient.get<ApiResponse<ExpenseCategoryRaw[]>>(
      "/report/expenses-by-category",
      {
        params: { fromDate, toDate },
      }
    );

    return response.data.data;
  },

  getSalesSummaryByPayment: async (startDate: string, endDate: string) => {
    const response = await axiosClient.get<SalesByPayment[]>(
      "/report/sales-summary-by-payment",
      {
        params: { startDate, endDate },
      }
    );

    return response.data;
  },

  getSalesByDateRange: async (fromDate: string,toDate: string) => {
    const response = await axiosClient.get<SaleByDateRange[]>("/sale/by-date-range", {
      params: { fromDate, toDate },
    });
    return response.data;
  },
};
