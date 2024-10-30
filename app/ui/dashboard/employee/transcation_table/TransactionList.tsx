import { EmployeeTransaction } from "@/app/lib/definitions";
import TransactionItem from "./TransactionItem";

interface TransactionListProps {
  transactions: EmployeeTransaction[];
}

export default function TransactionLists({
  transactions,
}: TransactionListProps) {
  return (
    <div className="transaction-list">
      {/* <h2 className="text-xl font-bold mb-4">Transactions</h2> */}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Transaction ID</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Source Account</th>
            <th className="border px-4 py-2">Destination Account</th>
            {/* <th className="border px-4 py-2">Branch</th> */}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.Transaction_ID}
              transaction={transaction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
