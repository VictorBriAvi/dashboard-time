"use client";

import Navbar from "@/ui/Navbar";
import BalanceSummary from "./components/BalanceSummary";
import PorcentajeEmpleados from "./components/PorcentEmployee";
import SalesByDate from "./components/SalesByDate";

export default function HomePage() {
  return (
    <main>
      <Navbar />

      <div className="pt-6">

        <BalanceSummary />
        <SalesByDate />
        <PorcentajeEmpleados />
      </div>
    </main>
  );
}
