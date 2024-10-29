import {
  fetchCustomersCount,
  fetchRecentTransactionsByCustomer,
} from "@/app/lib/data";
import { lusitana } from "../ui/fonts";
import { Card } from "../ui/dashboard/cards";
import RecentTransactionsTable from "../ui/dashboard/transactions/transaction-table";
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  const id = session?.user?.id;

  const recentTransactions = await fetchRecentTransactionsByCustomer(id!);
  // const customerCount = await fetchCustomersCount();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Your Name" value={"customerCount"} type="customers" />
        <Card title="Accounts" value={"numberOfInvoices"} type="invoices" />
        <Card
          title="Pending FDs"
          value={"totalPendingInvoices"}
          type="pending"
        />
        <Card
          title="Total Balance"
          value={"totalPaidInvoices"}
          type="collected"
        />
      </div>
      <div className="mt-10">
        <h1 className={`${lusitana.className} mb-8 text-gray-400 text-center`}>
          Recent Transactions
        </h1>
        <div className="w-full min-h-40">
          <RecentTransactionsTable transactions={recentTransactions} />
        </div>
      </div>
    </main>
  );
}
