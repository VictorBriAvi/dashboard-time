"use client";

import BalanceSummary from "./components/BalanceSummary";
import PorcentajeEmpleados from "./components/PorcentEmployee";



export default function HomePage() {
  return (
    <main>
      <BalanceSummary />
      <PorcentajeEmpleados />
    </main>
  );
}
