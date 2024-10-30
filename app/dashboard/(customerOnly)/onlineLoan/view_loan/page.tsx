import { fetchLoans } from "@/app/lib/data";
import { Loan_view } from "@/app/lib/definitions";
import LoanTable from "@/app/ui/dashboard/customers/loan/loan-table";
import { lusitana } from "@/app/ui/fonts";
import { auth } from "@/auth";

export default async function viewLoan() {
  let loans: Loan_view[] = [];

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return (
        <p className="text-center mt-10">
          You need to log in to view your loans.
        </p>
      );
    }
    const id = session.user.id;

    loans = await fetchLoans(id);
  } catch (error) {
    console.error("Error fetching loans:", error);
    return (
      <p className="text-center mt-10">
        Failed to fetch loans. Please try again later.
      </p>
    );
  }

  if (!loans.length) {
    return (
      <p className="text-center mt-10">
        No loans available or failed to fetch data.
      </p>
    );
  }

  return (
    <div className="flex-grow md:overflow-y-auto">
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        View Loans
      </h1>
      <LoanTable loans={loans} /> {/* Use the extracted LoanTable component */}
    </div>
  );
}
