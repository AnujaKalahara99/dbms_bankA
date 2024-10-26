import { Transaction_Report } from "@/app/lib/definitions";
import { lusitana } from "@/app/ui/fonts";

export default function TransactionReport({
  transactions,
}: {
  transactions: Transaction_Report[];
}) {
  // Calculate totals for Credit and Debit
  const totalCredit = transactions.reduce(
    (sum, transaction) => sum + (transaction.Credit || 0),
    0
  );
  const totalDebit = transactions.reduce(
    (sum, transaction) => sum + (transaction.Debit || 0),
    0
  );

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Branch Transaction Report
      </h1>
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <table className="min-w-full rounded-md text-gray-900">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Transaction ID
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Source Account
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Destination Account
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Type
                    </th>
                    <th className="px-4 py-5 font-medium w-1/5  text-right">
                      Credit
                    </th>
                    <th className="px-4 py-5 font-medium w-1/5  text-right">
                      Debit
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {transactions.map((transaction) => (
                    <tr key={transaction.Transaction_ID} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black sm:pl-6">
                        {transaction.Date.toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {transaction.Transaction_ID}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {transaction.Source_Account_ID}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {transaction.Destination_Account_ID}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {transaction.Type}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm text-right">
                        {transaction.Credit > 0 ? `${transaction.Credit}` : " "}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm text-right">
                        {transaction.Debit > 0 ? `${transaction.Debit}` : " "}
                      </td>
                    </tr>
                  ))}
                </tbody>

                {/* Footer row for total Credit and Debit */}
                <tfoot className="bg-gray-100">
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-5 font-semibold text-right"
                    >
                      Total:
                    </td>
                    <td className="px-4 py-5 font-semibold text-green-600 w-1/5 text-right">
                      + {totalCredit}
                    </td>
                    <td className="px-4 py-5 font-semibold text-red-600 w-1/5 text-right">
                      - {totalDebit}
                    </td>
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
