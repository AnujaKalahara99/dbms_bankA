import {
  Account_Branch,
  Branch,
  FullCustomerDetails,
  PlanType,
} from "@/app/lib/definitions";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function AccountList({
  accounts,
}: {
  accounts: Account_Branch[];
}) {
  return (
    <div>
      {/* Accounts */}
      {accounts.map((account, index) => (
        <div
          key={index + " acc_number"}
          className="rounded-md bg-gray-50 p-4 md:p-6 mb-6"
        >
          <div className="mb-4">
            <label
              htmlFor="customer_id"
              className="mb-2 block text-sm font-medium"
            >
              Customer Name
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  disabled
                  type="string"
                  defaultValue={`${account.Customer_Name}`}
                  placeholder={"XXX-XXX-XXX"}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
          <div key={index + "acc"} className="mb-4">
            <label
              htmlFor="acc_number"
              className="mb-2 block text-sm font-medium"
            >
              Account Number
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  disabled
                  type="string"
                  defaultValue={account.Account_ID}
                  placeholder={"XXX-XXX-XXX"}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
          <div key={index + " branch"} className="mb-4">
            <label htmlFor="branch" className="mb-2 block text-sm font-medium">
              Branch
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  disabled
                  type="string"
                  defaultValue={`${account.Branch_Name}`}
                  placeholder={"XXX - Branch"}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
          <div key={index + " balance"} className="mb-4">
            <label htmlFor="balance" className="mb-2 block text-sm font-medium">
              Balance
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  disabled
                  type="number"
                  defaultValue={account.Balance}
                  placeholder={"XXX"}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
