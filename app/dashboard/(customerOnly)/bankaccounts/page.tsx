import {
  fetchAllAccounts as fetchAllCustomerAccounts,
  fetchCustomerFull,
} from "@/app/lib/data";
import { notFound } from "next/navigation";
import { lusitana } from "@/app/ui/fonts";
import { auth } from "@/auth";
import AccountList from "@/app/ui/dashboard/customers/accounts-list";

export default async function AccountsPage() {
  const session = await auth();
  const id = session?.user?.id;
  if (!id || !session?.user?.isCustomer) {
    notFound();
  }

  const accounts = await fetchAllCustomerAccounts(id);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Account Details
      </h1>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 mb-6">
        <i> You have to go to bank physically to open a bank account.</i>
      </div>
      <AccountList accounts={accounts} />
    </main>
  );
}
