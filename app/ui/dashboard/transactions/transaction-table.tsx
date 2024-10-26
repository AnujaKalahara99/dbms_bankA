import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import { Transaction } from "@/app/lib/definitions";

export default async function TransactionsTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Transactions
      </h1>
      <Search placeholder="Search transactions..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {transactions?.map((transaction) => (
                  <div
                    key={transaction.Transaction_ID}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src="/transactions/default.png"
                              className="rounded-full"
                              alt={`Transaction ${transaction.Transaction_ID}`}
                              width={28}
                              height={28}
                            />
                            <p>{transaction.Transaction_ID}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {transaction.Date.toLocaleDateString()} at{" "}
                          {transaction.Time}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Source Account</p>
                        <p className="font-medium">
                          {transaction.Source_Account_ID}
                        </p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Destination Account</p>
                        <p className="font-medium">
                          {transaction.Destination_Account_ID}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>Amount: ${transaction.Amount}</p>
                      <p>Type: {transaction.Type}</p>
                      <p>Branch: {transaction.Branch_ID}</p>
                    </div>
                  </div>
                ))}
              </div>

              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Transaction ID
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Source Account
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Destination Account
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Amount
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Type
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Branch
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {transactions.map((transaction) => (
                    <tr key={transaction.Transaction_ID} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <p>{transaction.Transaction_ID}</p>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {transaction.Date.toLocaleDateString()} at{" "}
                        {transaction.Time}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {transaction.Source_Account_ID}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {transaction.Destination_Account_ID}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        ${transaction.Amount}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {transaction.Type}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {transaction.Branch_ID}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          {/* Add any update button or delete button here if needed */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
