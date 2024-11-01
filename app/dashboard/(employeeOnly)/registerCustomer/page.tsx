// page.tsx (Server-side fetching in the page function)
import { fetchSAccountPlanTypes, fetchBranch } from "@/app/lib/data"; // import your API functions
import { PlanType, Branch } from "@/app/lib/definitions"; // import your interfaces
import { CreateAccountForm } from "@/app/ui/dashboard/createAccount/create-account-form";
import { RegisterCustomerForm } from "@/app/ui/dashboard/registerCustomer/register-customer-form";
import { lusitana } from "@/app/ui/fonts";

export default async function Page() {
  try {
    return (
      <div>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Register Customer
        </h1>
        <RegisterCustomerForm />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Failed to load data.</div>;
  }
}
