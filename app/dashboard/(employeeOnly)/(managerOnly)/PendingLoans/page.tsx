import { fetchPendingLoans } from "@/app/lib/data";
import PendingLoanForm from "./PendingLoanForm";
import { lusitana } from "@/app/ui/fonts";
export default async function Page() {
  const pendingLoans = await fetchPendingLoans();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Pending Loans
      </h1>
      <PendingLoanForm pendingLoans={pendingLoans} />
    </main>
  );
}
