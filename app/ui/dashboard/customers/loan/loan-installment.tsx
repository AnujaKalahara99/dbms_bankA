// LoanInstallmentTable.tsx
"use client";

import { fetchAllCustomers, fetchAllLoanInstallments } from "@/app/lib/data";
import { LoanInstallment } from "@/app/lib/definitions";
import { useEffect } from "react";

interface LoanInstallmentTableProps {
  loan_ID: string;
}

export default function LoanInstallmentTable({
  loan_ID,
}: LoanInstallmentTableProps) {
  let installments: LoanInstallment[] = [];
  useEffect(() => {
    const fetchInstallments = async () => {
      installments = await fetchAllLoanInstallments(loan_ID);
      console.log(installments);
    };
    fetchInstallments();
  }, []);
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Installment Details</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Installment ID</th>
            <th className="border border-gray-300 px-4 py-2">Due Date</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {installments.map((installment) => (
            <tr key={installment.Instalment_ID}>
              <td className="border border-gray-300 px-4 py-2">
                {installment.Instalment_ID}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {installment.Due_Date.toISOString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ${installment.Amount.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {installment.Status}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() =>
                    console.log("onPayInstallment(installment.Instalment_ID)")
                  }
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  disabled={installment.Status === "Paid"}
                >
                  Pay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
