import FDForm from "@/app/ui/dashboard/customers/fd/fdForm";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function NewFDPage() {
  const session = await auth();
  const id = session?.user?.id;

  if (!id || !session?.user?.isCustomer) {
    notFound();
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-xl font-bold">Create New Fixed Deposit</h1>
      <FDForm />
    </main>
  );
}
