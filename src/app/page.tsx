"use client";

import BalanceSummary from "./components/reports/BalanceSummary";
import PorcentajeEmpleados from "./components/reports/PorcentEmployee";
import SalesByDate from "./components/reports/SalesByDate";

export default function HomePage() {
  return (
    <>
      <BalanceSummary />
      <SalesByDate />
      <PorcentajeEmpleados />
    </>
  );
}
