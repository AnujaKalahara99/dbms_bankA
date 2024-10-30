// pages/dashboard/transactions/page.tsx
import { getTransactionsByEmployeeId } from "@/app/lib/data";
import TransactionLists from "@/app/ui/dashboard/employee/transcation_table/TransactionList";
import { lusitana } from "@/app/ui/fonts";
import { auth } from "@/auth"; // Assuming you have an authentication module

export default async function EmployeeTransactionsPage() {
  const session = await auth();
  const employeeId = session?.user?.id;

  if (!employeeId) {
    return <div>Employee not found</div>;
  }

  // Fetch transactions server-side for the authenticated employee's branch
  const transactions = await getTransactionsByEmployeeId(employeeId);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Transactions
      </h1>
      <div className="container mx-auto p-4">
        <TransactionLists transactions={transactions} />
      </div>
    </main>
  );
}

// export default async function EmployeeTransactionsPage() {
//   const session = await auth();
//   const employeeId = session?.user?.id;

//   if (!employeeId) {
//     return <div>Employee not found</div>;
//   }

//   // Fetch transactions server-side for the authenticated customer
//   const transactions = await getTransactionsByEmployeeId(employeeId);

//   return (
//     <div className="container mx-auto p-4">
//       <TransactionLists transactions={transactions} />
//     </div>
//   );
// }
