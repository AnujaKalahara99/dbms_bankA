

import FDForm from "@/app/ui/dashboard/customers/fd/fdForm";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { getUserAccounts, getFDPlans } from "@/app/lib/data";
import { lusitana } from "@/app/ui/fonts";

export default async function NewFDPage() {
  const session = await auth();
  const id = session?.user?.id;

  if (!id || !session?.user?.isCustomer) {
    notFound();
  }

  const accounts = await getUserAccounts(id); // Fetch user accounts based on user id
  const fdPlans = await getFDPlans(); // Fetch FD plans

  return (
    <main className= "container mx-auto p-6">
      <h1 className={`${lusitana.className} text-2xl mb-6 font-bold`}>
        Create New Fixed Deposit
      </h1>
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <FDForm accounts={accounts} fdPlans={fdPlans} />
      </div>
    </main>
  );
}
