import {
  fetchBranchIDfromEmployeeID,
  fetchTransactionsByBranch,
} from "@/app/lib/data";
import TransactionsReport from "@/app/ui/dashboard/reports/transaction-report";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  const id = session?.user?.id;
  const branchId = await fetchBranchIDfromEmployeeID(id!);
  const transactions = await fetchTransactionsByBranch(branchId);
  return (
    <main>
      <TransactionsReport transactions={transactions} />
    </main>
  );
}
