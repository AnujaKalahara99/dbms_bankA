import { fetchLoans } from "@/app/lib/data";
import { Loan_view } from "@/app/lib/definitions";
import { lusitana } from "@/app/ui/fonts";
import { auth } from "@/auth";
import Link from "next/link";

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

  //   if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex-grow md:overflow-y-auto">
      {/* <h1 className="__className_89d4b4 mb-4 text-xl md:text-2xl">View Loans</h1>
       */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        View Loans
      </h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Loan ID</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">Interest Rate</th>
            <th className="border border-gray-300 px-4 py-2">Issued Date</th>
            <th className="border border-gray-300 px-4 py-2">
              Duration (Months)
            </th>
            <th className="border border-gray-300 px-4 py-2">Account ID</th>
            <th className="border border-gray-300 px-4 py-2">
              Fixed Deposit ID
            </th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.Loan_ID}>
              <td className="border border-gray-300 px-4 py-2">
                {loan.Loan_ID}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {loan.Amount}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {loan.Interest_Rate}%
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {loan.Issued_Date.toISOString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {loan.Duration_in_Months}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {loan.Account_ID}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {loan.Fixed_Deposit_ID}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
