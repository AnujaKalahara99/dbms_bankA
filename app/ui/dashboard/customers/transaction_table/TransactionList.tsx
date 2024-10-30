// // ui/dashboard/transactions/TransactionList.tsx
// import TransactionItem from "./TransactionItem";
// import { LocalTransaction } from "@/app/lib/data";

// interface TransactionListProps {
//   transactions: LocalTransaction[];
// }

// export default function TransactionList({ transactions }: TransactionListProps) {
//   return (
//     <div className="transaction-list">
//       <h2 className="text-xl font-bold mb-4">Transactions</h2>
//       <ul>
//         {transactions.map((transaction) => (
//           <TransactionItem key={transaction.Transaction_ID} transaction={transaction} />
//         ))}
//       </ul>
//     </div>
//   );
// }
// ui/dashboard/transactions/TransactionList.tsx
import { LocalTransaction } from "@/app/lib/definitions";
import TransactionItem from "./TransactionItem";
import { lusitana } from "@/app/ui/fonts";

interface TransactionListProps {
  transactions: LocalTransaction[];
}

export default function TransactionList({
  transactions,
}: TransactionListProps) {
  return (
    <div className="transaction-list">
      {/* <h2 className="text-xl font-bold mb-4">Transactions</h2> */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Transactions
      </h1>
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
