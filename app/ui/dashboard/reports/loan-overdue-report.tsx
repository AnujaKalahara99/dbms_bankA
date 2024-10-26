import { LateLoan } from "@/app/lib/definitions";
import { lusitana } from "@/app/ui/fonts";

export default function LateLoanReport({
  lateLoans,
}: {
  lateLoans: LateLoan[];
}) {
  const totalAmountDue = lateLoans.reduce(
    (sum, loan) => sum + loan.Amount_Due,
    0
  );

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Branch-wise Late Loan Installment Report
      </h1>
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <table className="min-w-full rounded-md text-gray-900">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Loan ID
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Account ID
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Customer Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Amount Due
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Due Date
                    </th>
                    <th className="px-4 py-5 font-medium text-right">
                      Days Overdue
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {lateLoans.map((loan) => (
                    <tr key={loan.Loan_ID} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black sm:pl-6">
                        {loan.Loan_ID}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {loan.Account_ID}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {loan.Customer_Name}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm text-right">
                        ${loan.Amount_Due.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {new Date(loan.Due_Date).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm text-right text-red-600">
                        {loan.Days_Overdue} days
                      </td>
                    </tr>
                  ))}
                </tbody>

                {/* Footer row for total amount due */}
                <tfoot className="bg-gray-100">
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-5 font-semibold text-right"
                    >
                      Total Amount Due:
                    </td>
                    <td className="px-4 py-5 font-semibold text-red-600 text-right">
                      ${totalAmountDue.toLocaleString()}
                    </td>
                    <td colSpan={2} />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
