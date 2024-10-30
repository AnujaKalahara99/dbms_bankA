// pages/dashboard/transactions/page.tsx
import { getTransactionsByCustomerId } from "@/app/lib/data";
import TransactionList from "@/app/ui/dashboard/customers/transaction_table/TransactionList";
import { auth } from "@/auth"; // Assuming you have an authentication module

export default async function CustomerTransactionsPage() {
  const session = await auth();
  const customerId = session?.user?.id;

  if (!customerId) {
    return <div>Customer not found</div>;
  }

  // Fetch transactions server-side for the authenticated customer
  const transactions = await getTransactionsByCustomerId(customerId);

  return (
    <div className="container mx-auto">
      <TransactionList transactions={transactions} />
    </div>
  );
}
