// // ui/dashboard/transactions/TransactionItem.tsx
import { LocalTransaction } from "@/app/lib/data";

interface TransactionItemProps {
  transaction: LocalTransaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  return (
    <tr className="border-b border-gray-200">
      <td className="border px-4 py-2">{transaction.Transaction_ID}</td>
      <td className="border px-4 py-2">{new Date(transaction.Date_and_Time).toLocaleString()}</td>
      <td className="border px-4 py-2">{transaction.Type}</td>
      <td className="border px-4 py-2">{transaction.Amount}</td>
      <td className="border px-4 py-2">{transaction.Description || "-"}</td>
      <td className="border px-4 py-2">{transaction.Source_Account_ID || "-"}</td>
      <td className="border px-4 py-2">{transaction.Destination_Account_ID || "-"}</td>
    </tr>
  );
}
