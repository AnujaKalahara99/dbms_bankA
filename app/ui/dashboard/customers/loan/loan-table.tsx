// LoanTable.tsx
"use client";
import { Loan_view, LoanInstallment } from "@/app/lib/definitions";
import { useState } from "react";
import LoanInstallmentTable from "./loan-installment";

interface LoanTableProps {
  loans: Loan_view[];
}

export default function LoanTable({ loans }: LoanTableProps) {
  const [selectedLoan, setSelectedLoan] = useState<Loan_view | null>(null);

  const handleSelect = async (loan: Loan_view) => {
    setSelectedLoan(loan === selectedLoan ? null : loan);
  };

  return (
    <div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Loan ID</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">Interest Rate</th>
            <th className="border border-gray-300 px-4 py-2">Issued Date</th>
            <th className="border border-gray-300 px-4 py-2">
              Duration (Months)
            </th>
            <th className="border border-gray-300 px-4 py-2">Account ID</th>
            <th className="border border-gray-300 px-4 py-2">
              Fixed Deposit ID
            </th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr
              key={loan.Loan_ID}
              className={`${
                selectedLoan?.Loan_ID === loan.Loan_ID ? "bg-blue-100" : ""
              }`}
            >
              <td className="border border-gray-300 px-4 py-2">
                {loan.Loan_ID}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {loan.Amount}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {loan.Interest_Rate}%
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {loan.Issued_Date.toISOString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {loan.Duration_in_Months}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {loan.Account_ID}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {loan.Fixed_Deposit_ID}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className={`px-4 py-2 rounded ${
                    selectedLoan?.Loan_ID === loan.Loan_ID
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleSelect(loan)}
                >
                  {selectedLoan?.Loan_ID === loan.Loan_ID
                    ? "Selected"
                    : "Select"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the LoanInstallmentTable only if a loan is selected */}
      {selectedLoan && <LoanInstallmentTable loan_ID={selectedLoan.Loan_ID} />}
    </div>
  );
}
