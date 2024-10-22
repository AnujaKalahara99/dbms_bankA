import { fetchCustomerFull } from "@/app/lib/data";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/ui/dashboard/transactions/breadcrumbs";
import Form from "@/app/ui/dashboard/customers/edit-form";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const customer = await fetchCustomerFull(id);

  if (!customer) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Customers", href: "/dashboard/customers" },
          {
            label: "Edit Customer",
            href: `/dashboard/customers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form customer={customer} />
    </main>
  );
}
