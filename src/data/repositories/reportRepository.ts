import { reportApi } from "@/data/api/reportApi";
import { summaryService } from "@/core/mappers/statics/summaryService";
import { dailySummaryService } from "@/core/mappers/statics/dailySummaryService";
import { employeeSaleRawService, employeeSaleSummaryService } from "@/core/mappers/statics/employeeSaleSummaryService";
import { expenseCategoryService } from "@/core/mappers/expenses/expenseCategoryService";
import { salesByPaymentService } from "@/core/mappers/statics/salesByPaymentService";
import { saleMapper } from "@/core/mappers/sales/SaleByDateMapper";


export const reportRepository = {
  getSummary: async (fromDate: string, toDate: string) => {
    const summary = await reportApi.getSummary(fromDate, toDate);
    return summaryService.formatSummary(summary);
  },

  getDailySummary: async (fromDate: string, toDate: string) => {
    const rawData = await reportApi.getDailySummary(fromDate, toDate);
    return dailySummaryService.formatForChart(rawData); // delega al service
  },

  getEmployeeSaleSummary: async (fromDate: string, toDate: string) => {
    const rawData = await reportApi.getEmployeeSaleSummary(fromDate, toDate);
    return employeeSaleSummaryService.formatForChart(rawData);
  },

    getEmployeeSalePorcentSummary: async (fromDate: string, toDate: string) => {
    const rawData = await reportApi.getEmployeeSaleSummary(fromDate, toDate);
    return employeeSaleRawService.toRaw(rawData);
  },


    getExpensesByCategory: async (fromDate: string, toDate: string) => {
    const rawData = await reportApi.getExpensesByCategory(fromDate, toDate);
    return expenseCategoryService.formatForPieChart(rawData);
  },
    getSalesSummaryByPayment: async (startDate: string, endDate: string) => {
      const raw = await reportApi.getSalesSummaryByPayment(startDate, endDate);
      return salesByPaymentService.formatForGroupedChart(raw);
    },


  getSalesByDateRange: async (fromDate: string, toDate: string) => {
    const raw = await reportApi.getSalesByDateRange(fromDate, toDate);
    return saleMapper.fromDto(raw);
  },

  
};
