"use client";

import BalanceGrid from "./components/BalanceSummary";
import PorcentajeEmpleados from "./components/PorcentEmployee";

export default function DashboardPage() {
  return (
    <main className="pt-6">
      <BalanceGrid />
      <PorcentajeEmpleados />
    </main>
  );
}
