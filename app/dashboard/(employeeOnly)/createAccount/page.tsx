import { fetchCustomerFull } from "@/app/lib/data";
import { notFound } from "next/navigation";
import {CreateAccountForm} from "@/app/ui/dashboard/customers/edit-form";
import { lusitana } from "@/app/ui/fonts";
import { auth } from "@/auth";

export default async function Page() {

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Create Account
      </h1>
      <CreateAccountForm />
    </main>
  );
}
