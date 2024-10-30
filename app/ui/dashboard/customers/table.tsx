import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import { Customer, FilteredCustomer } from "@/app/lib/definitions";
import { UpdateCustomer } from "./buttons";
import { NextApiRequest, NextApiResponse } from 'next';
import { CheckCustomer } from '@/app/lib/data';

export default async function CustomersTableCustomersTable({
  customers,
}: {
  customers: FilteredCustomer[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Search placeholder="Search customers..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {customers?.map((customer) => (
                  <div
                    key={customer.Customer_ID}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src="/customers/evil-rabbit.png"
                              className="rounded-full"
                              alt={`${customer.Name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <p>{customer.Name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {customer.Email}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Accounts</p>
                        <p className="font-medium">{customer.Account_IDs}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Total Deposits</p>
                        <p className="font-medium">{customer.Total_Balance}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{customer.Phone_Number}</p>
                    </div>
                    <div className="flex justify-end gap-3">
                      <UpdateCustomer id={customer.Customer_ID} />
                      {/* <DeleteInvoice id={invoice.id} /> */}
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Accounts
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Deposits
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Contact No.
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {customers.map((customer) => (
                    <tr key={customer.Customer_ID} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src="/customers/evil-rabbit.png"
                            className="rounded-full"
                            alt={`${customer.Name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{customer.Name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.Email}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.Account_IDs}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.Total_Balance}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {customer.Phone_Number}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateCustomer id={customer.Customer_ID} />
                          {/* <DeleteInvoice id={invoice.id} /> */}
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
