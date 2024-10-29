// pages/dashboard/transactions/page.tsx
import { getTransactionsByCustomerId, LocalTransaction } from "@/app/lib/data";
import TransactionList from "@/app/ui/dashboard/customers/transaction_table/TransactionList";
import { auth } from "@/auth"; // Assuming you have an authentication module

export default async function CustomerTransactionsPage() {
  const session = await auth();
  const customerId = session?.user?.id;

  if (!customerId) {
    return <div>Customer not found</div>;
  }


  // Fetch transactions server-side for the authenticated customer
  const transactions: LocalTransaction[] = await getTransactionsByCustomerId(customerId);
  console.log("customerId", customerId);
  return (
    <div className="container mx-auto p-4">
      <TransactionList transactions={transactions} />
    </div>
  );
}
