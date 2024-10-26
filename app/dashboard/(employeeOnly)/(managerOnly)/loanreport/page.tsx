import {
  fetchBranchIDfromEmployeeID,
  fetchLateLoansFromBranch,
  fetchTransactionsByBranch,
} from "@/app/lib/data";
import LateLoanReport from "@/app/ui/dashboard/reports/loan-overdue-report";
import { auth } from "@/auth";

export default async function LoanReportPage() {
  const session = await auth();
  const id = session?.user?.id;
  const branchId = await fetchBranchIDfromEmployeeID(id!);
  const lateLoans = await fetchLateLoansFromBranch(branchId);
  return (
    <main>
      <LateLoanReport lateLoans={lateLoans} />
    </main>
  );
}
