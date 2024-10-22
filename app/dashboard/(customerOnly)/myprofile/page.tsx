import { fetchCustomerFull } from "@/app/lib/data";
import { notFound } from "next/navigation";
import Form from "@/app/ui/dashboard/customers/edit-form";
import { lusitana } from "@/app/ui/fonts";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  const id = session?.user?.id;
  if (!id || !session?.user?.isCustomer) {
    notFound();
  }

  const customer = await fetchCustomerFull(id);

  if (!customer) {
    notFound();
  }

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        My Profile
      </h1>
      <Form customer={customer} />
    </main>
  );
}
