import { useQuery } from "@tanstack/react-query";
import { reportRepository } from "@/data/repositories/reportRepository";

export const useSalesSummaryByPayment = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ["salesSummaryByPayment", startDate, endDate],
    queryFn: () => reportRepository.getSalesSummaryByPayment(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });
};
