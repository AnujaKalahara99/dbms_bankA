import {
  fetchBankAccountsCount,
  fetchBankBranch,
  fetchBankLoansCount,
  fetchCustomerName,
  fetchCustomersAccountsCount,
  fetchCustomersCount,
  fetchCustomersFDCount,
  fetchCustomerTotalBalance,
  fetchEmployeeName,
  fetchRecentTransactionsByCustomer,
} from "@/app/lib/data";
import { lusitana } from "../ui/fonts";
import { Card } from "../ui/dashboard/cards";
import RecentTransactionsTable from "../ui/dashboard/transactions/transaction-table";
import { auth } from "@/auth";
import { log } from "console";

export default async function DashboardPage() {
  const session = await auth();
  const id = session?.user?.id;

  // const customerCount = await fetchCustomersCount();
  if (session?.user?.isCustomer) {
    const recentTransactions = await fetchRecentTransactionsByCustomer(id!);
    const [customerName, accounts, fds, total_Balance] = await Promise.all([
      fetchCustomerName(id!),
      fetchCustomersAccountsCount(id!),
      fetchCustomersFDCount(id!),
      fetchCustomerTotalBalance(id!),
    ]);

    return (
      <main>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Dashboard
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card title="Your Name" value={customerName} type="customers" />
          <Card title="Accounts" value={accounts} type="invoices" />
          <Card title="FD" value={fds} type="pending" />
          <Card title="Total Balance" value={total_Balance} type="collected" />
        </div>
        <div className="mt-10">
          <h1
            className={`${lusitana.className} mb-8 text-gray-400 text-center`}
          >
            Recent Transactions
          </h1>
          <div className="w-full min-h-40">
            <RecentTransactionsTable transactions={recentTransactions} />
          </div>
        </div>
      </main>
    );
  } else {
    const [employeeName, accounts, loans, branch] = await Promise.all([
      fetchEmployeeName(id!),
      fetchBankAccountsCount(id!),
      fetchBankLoansCount(id!),
      fetchBankBranch(id!),
    ]);

    return (
      <main>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Dashboard
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card title="Your Name" value={employeeName} type="customers" />
          <Card title="Bank Accounts" value={accounts} type="invoices" />
          <Card title="Loans" value={loans} type="pending" />
        </div>
        <div className="mt-10">
          <h1
            className={`${lusitana.className} mb-8 text-gray-400 text-center`}
          >
            This data is for the branch: {branch}
          </h1>
          {/* <div className="w-full min-h-40">
          </div> */}
        </div>
      </main>
    );
  }
}
