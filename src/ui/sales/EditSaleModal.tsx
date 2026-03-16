"use client";

import { useState } from "react";
import { AsyncSearchableSelect, Option } from "@/ui/inputs/SearchSelect";
import { PaymentModal } from "@/ui/sales/Modals/PaymentModal";
import { PaymentItem } from "@/ui/sales/Modals/Hook/usePaymentModal";
import GenericDataTable from "@/ui/dataTable/GenericDataTable";
import { Modal } from "@/ui/Modals";
import { Btn } from "@/ui/PageLayout";
import { ColumnDef } from "@tanstack/react-table";
import { formatARS } from "@/core/utils/format";
import { Sale } from "@/core/models/sales/Sale";
import { CreateSaleDraft } from "@/core/models/sales/CreateSaleDraft";
import { Input } from "@/ui/inputs/Input";

type ServiceRow = {
  serviceTypeId: number;
  serviceName: string;
  employeeId: number;
  employeeName: string;
  unitPrice: number;
  discountPercent: number;
  additionalCharge: number;
  total: number;
};

type Props = {
  sale: Sale;
  isUpdating: boolean;
  loadClients: (input: string) => Promise<Option[]>;
  loadEmployees: (input: string) => Promise<Option[]>;
  loadServiceTypes: (input: string) => Promise<Option[]>;
  onSave: (payload: CreateSaleDraft) => void;
  onClose: () => void;
};

export function EditSaleModal({
  sale, isUpdating, loadClients, loadEmployees, loadServiceTypes, onSave, onClose,
}: Props) {
  const [client, setClient] = useState<Option | null>({
    value: sale.clientId,
    label: sale.nameClient,
  });

  const [details, setDetails] = useState<ServiceRow[]>(() =>
    (sale.saleDetail ?? [])
      .filter((d) => !d.isDeleted)
      .map((d) => ({
        serviceTypeId: d.serviceTypeId,
        serviceName: d.nameServiceTypeSale,
        employeeId: d.employeeId,
        employeeName: d.nameEmployeeSale,
        unitPrice: d.unitPrice,
        discountPercent: d.discountPercent,
        additionalCharge: d.additionalCharge < 0 ? 0 : d.additionalCharge,
        total: d.totalCalculated,
      }))
  );

  const initialPayments: PaymentItem[] = (sale.payments ?? []).map((p) => ({
    paymentMethodId: p.paymentTypeId,
    paymentMethodName: p.paymentTypeName,
    amount: p.amountPaid,
  }));

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [serviceSelected, setServiceSelected] = useState<(Option & { price?: number }) | null>(null);
  const [employeeSelected, setEmployeeSelected] = useState<Option | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [additionalCharge, setAdditionalCharge] = useState(0);

  const saleTotal = details.reduce((acc, d) => acc + d.total, 0);

  const addDetail = () => {
    if (!serviceSelected || !employeeSelected) return;
    const price = serviceSelected.price ?? 0;
    const safeAdditional = Math.max(0, additionalCharge);
    const total = (price + safeAdditional) * (1 - discountPercent / 100);

    setDetails((prev) => [...prev, {
      serviceTypeId: serviceSelected.value,
      serviceName: serviceSelected.label,
      employeeId: employeeSelected.value,
      employeeName: employeeSelected.label,
      unitPrice: price,
      discountPercent,
      additionalCharge: safeAdditional,
      total,
    }]);

    setServiceSelected(null);
    setEmployeeSelected(null);
    setDiscountPercent(0);
    setAdditionalCharge(0);
  };

  const removeDetail = (index: number) =>
    setDetails((prev) => prev.filter((_, i) => i !== index));

  const handleConfirmPayments = (payments: PaymentItem[]) => {
    if (!client) return;
    onSave({
      clientId: client.value,
      saleDetails: details.map(({ serviceTypeId, employeeId, unitPrice, discountPercent, additionalCharge, total }) => ({
        serviceTypeId, employeeId, unitPrice, discountPercent,
        additionalCharge: Math.max(0, additionalCharge),
        total,
      })),
      payments: payments.map((p) => ({
        paymentTypeId: p.paymentMethodId,
        amountPaid: p.amount,
      })),
    });
    setIsPaymentOpen(false);
  };

  const columns: ColumnDef<ServiceRow>[] = [
    {
      header: "Servicio",
      accessorKey: "serviceName",
      cell: ({ getValue }) => (
        <span className="font-medium text-gray-900">{getValue<string>()}</span>
      ),
    },
    {
      header: "Colaborador",
      accessorKey: "employeeName",
      cell: ({ getValue }) => (
        <span className="text-gray-500">{getValue<string>()}</span>
      ),
    },
    {
      header: "Total",
      accessorKey: "total",
      cell: ({ getValue }) => (
        <span className="font-semibold">{formatARS(getValue<number>())}</span>
      ),
    },
    {
      header: "",
      id: "remove",
      cell: ({ row }) => (
        <button
          onClick={() => removeDetail(row.index)}
          className="text-red-500 hover:text-red-700 text-xs font-medium"
        >
          Quitar
        </button>
      ),
    },
  ];

  return (
    <>
      <Modal
        isOpen
        onClose={onClose}
        title={`Editar venta #${sale.id}`}
        subtitle={`${sale.nameClient} · ${sale.dateSale}`}
        size="lg"
        footer={
          <div className="flex items-center justify-between w-full">
            <span className="text-sm font-semibold text-gray-900">
              Total: {formatARS(saleTotal)}
            </span>
            <div className="flex gap-2">
              <Btn variant="secondary" onClick={onClose} disabled={isUpdating}>
                Cancelar
              </Btn>
              <Btn
                variant="primary"
                onClick={() => setIsPaymentOpen(true)}
                disabled={details.length === 0}
                loading={isUpdating}
              >
                Confirmar pago →
              </Btn>
            </div>
          </div>
        }
      >
        <div className="flex flex-col gap-5">
          {/* Cliente */}
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1.5">Cliente</p>
            <AsyncSearchableSelect
              label=""
              loadOptions={loadClients}
              value={client}
              onChange={setClient}
            />
          </div>

          {/* Agregar servicio */}
          <div
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{ background: "#f9fafb", border: "0.5px solid #f3f4f6" }}
          >
            <p className="text-xs font-semibold text-gray-500">Agregar servicio</p>
            <div className="grid grid-cols-2 gap-3">
              <AsyncSearchableSelect
                label="Servicio"
                loadOptions={loadServiceTypes}
                value={serviceSelected}
                onChange={(opt: any) => setServiceSelected(opt)}
              />
              <AsyncSearchableSelect
                label="Colaborador"
                loadOptions={loadEmployees}
                value={employeeSelected}
                onChange={setEmployeeSelected}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Descuento (%)"
                value={String(discountPercent)}
                onChange={(v) => setDiscountPercent(Number(v))}
              />
              <Input
                label="Adicional ($)"
                value={String(additionalCharge)}
                onChange={(v) => setAdditionalCharge(Math.max(0, Number(v)))}
              />
            </div>
            <Btn
              variant="secondary"
              onClick={addDetail}
              disabled={!serviceSelected || !employeeSelected}
              className="w-fit"
            >
              + Agregar servicio
            </Btn>
          </div>

          {/* Tabla servicios */}
          <GenericDataTable
            data={details}
            columns={columns}
            rowKey={(_, i) => i}
            emptyMessage="No hay servicios en esta venta"
            skeletonRows={2}
          />
        </div>
      </Modal>

      <PaymentModal
        isOpen={isPaymentOpen}
        totalAmount={saleTotal}
        initialPayments={initialPayments}
        isLoading={isUpdating}
        onClose={() => setIsPaymentOpen(false)}
        onConfirm={handleConfirmPayments}
      />
    </>
  );
}
