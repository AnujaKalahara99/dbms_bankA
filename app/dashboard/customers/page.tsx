import { fetchCustomersFiltered } from "@/app/lib/data";
import CustomersTable from "@/app/ui/dashboard/customers/table";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  const customers = await fetchCustomersFiltered(query, page);
  return (
    <main>
      <CustomersTable customers={customers} />
    </main>
  );
}
