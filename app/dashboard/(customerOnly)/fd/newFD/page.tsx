import FDForm from "@/app/ui/dashboard/customers/fd/fdForm";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { getUserAccounts, getFDPlans } from "@/app/lib/data"; // Import your data fetching functions

export default async function NewFDPage() {
  const session = await auth();
  const id = session?.user?.id;

  if (!id || !session?.user?.isCustomer) {
    notFound();
  }

  const accounts = await getUserAccounts(id);  // Fetch user accounts based on user id
  const fdPlans = await getFDPlans();      // Fetch FD plans


  return (
    <main className="container mx-auto p-4">
      <h1 className="text-xl font-bold">Create New Fixed Deposit</h1>
      <FDForm accounts={accounts} fdPlans={fdPlans} />
    </main>
  );
}